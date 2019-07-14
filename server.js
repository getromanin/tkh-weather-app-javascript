const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const app = express();

require('dotenv').config()

// const API_KEY = process.env.weatherAPIKey;
// const API_KEY = '3901c8ea6c8c3aa81af4848a5bc00fdb'

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true}));

app.set('view engine', 'ejs');

app.get('/', function(req, res) {
  res.render('index');
})

app.post('/', function(req, res) {
  console.log(req.body)
  console.log(req.body.city);

  let city = req.body.city;
  let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${process.env.weatherAPIKey}`

  request(url, function (err, response, body) {
    if(err) {
      res.render('index', {
        weather: null,
        error: 'Error, please try again'
      });
    } else {
      console.log('body:', body);
    }
  })

})

app.listen(3000, function() {
  console.log('Example app listening on port 3000!');
})
