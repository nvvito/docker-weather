const express = require('express')
const app = express()

const router = require('./router')

app.use(express.static('public'))
app.use('/app1/', router)

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});