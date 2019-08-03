const express = require('express')
const app = express()

const router = require('./router')

app.set("view engine", "ejs")
app.use("/app2/", router)

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});