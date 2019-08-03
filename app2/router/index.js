const router = require('express').Router()
const fetch = require('node-fetch')

router.get('/', (req, res) => res.render('../pages/index'))

router.get('/:city', (req, res) => {
    let city = req.params.city
    fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city},ua&appid=c2dcf8ffb5cdc3f8977bfd2ae7ea4738`)
        .then(resp => resp.json())
        .then(data => {
            if (data.cod == 200) res.render('../pages/city', {
                icon: data.weather[0].icon,
                name: data.name,
                temperature: Math.round(parseFloat(data.main.temp) - 273.15),
                description: data.weather[0].description,
                wind: data.wind.speed
            }) 
            else res.render('../pages/error', {
                message: data.message
            })
        })
        .catch(error => res.send({ error: true, message: error }).status(500))
})

module.exports = router