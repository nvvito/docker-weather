const router = require('express').Router()
const fetch = require('node-fetch')
const path = require('path')

router.get('/', (req, res) => res.sendFile(path.join(__dirname, '../public/index.html')))

router.get('/:city', (req, res) => {
    let city = req.params.city
    if (city) {
        fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city},ua&appid=c2dcf8ffb5cdc3f8977bfd2ae7ea4738`)
            .then(resp => resp.json())
            .then(data => {
                if (data.cod == 200) res.send({ result: createHtml(data) })
                else res.send({ result: createHtml(data) }).status(500)
            })
            .catch(error => res.send({ error: true, message: error }).status(500))
    } else res.send({ error: true, message: 'pls send city name' }).status(500)
})

module.exports = router

function createHtml(data) {
    if (!data.message) return `
    <div class="card" style="width: 16rem; margin: auto;">
        <img src="http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" class="card-img-top" style="width:120px; margin:auto">
        <div class="card-body">
            <h5 class="card-title">${data.name}</h5>
        </div>
        <ul class="list-group list-group-flush">
            <li class="list-group-item">Temperature - ${Math.round(parseFloat(data.main.temp) - 273.15)} °C</li>
            <li class="list-group-item">Description - ${data.weather[0].description}</li>
            <li class="list-group-item">Wind speed - ${data.wind.speed} meter/sec</li>
        </ul>
    </div>`
    else return `
    <div class="alert alert-danger" role="alert">
        ${data.message}
    </div>
  `
}