const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const app = express();

require('dotenv').config()

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true}));

app.set('view engine', 'ejs');

// app.get works with the code below W/O using the locals object in the ejs file
// app.get('/', function(req, res) {
//   res.render('index', {
//     weather: req.weather,
//     error: req.error
//   })
// })

// app.get works this way with using the locals object in ejs file
app.get('/', function(req, res) {
  res.render('index')
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
      let weather = JSON.parse(body);

      if(weather.main == undefined) {
        res.render('index', {
          weather: null,
          error: 'Error, please try again'
        });
      } else {
        let weatherText = `It's ${weather.main.temp} degrees in ${weather.name}!`;

        res.render('index', {
          weather: weatherText,
          error: null
        });
      }
    }
  })

})

app.listen(3000, function() {
  console.log('Example app listening on port 3000!');
})
