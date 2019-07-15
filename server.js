// pull in express module
const express = require('express');
// pull in bodyparser middleware to extract the body and expose on req.body
const bodyParser = require('body-parser');
// pull in the requst module
const request = require('request');
// create a new instance of express
const app = express();
// pull in the .env module to hide our api credentials
require('dotenv').config()
// allow access to our public static file
app.use(express.static('public'));
// allow access to our bodyParser
app.use(bodyParser.urlencoded({ extended: true}));
// set up EJS to be used
app.set('view engine', 'ejs');

// app.get works with the code below W/O using the locals object in the ejs file
app.get('/', function(req, res) {
  res.render('index')
  // res.render('index', {
  //   weather: req.weather,
  //   error: req.error
  // })
  // res.sendFile(path.join(__dirname, 'index'));
})

// respond to the POST request on the route
app.post('/', function(req, res) {
  console.log(req.body)
  console.log(req.body.city);
  // grab the city text from the form/req.body
  let city = req.body.city;
  // creatre a URL string from the API
  console.log('process.env.weatherAPIKey:', process.env.weatherAPIKey);
  let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${process.env.weatherAPIKey}`
  // fetch the API using the request module
  request(url, function (err, response, body) {
    debugger
    // if the api doesnt work let the user know
    if(err) {
      console.log('err:', err);
      console.log('response', response);
      debugger
      res.render('index', {
        weather: null,
        error: 'Error, please try again sucka'
      });
      // otherwise move on to the API
    } else {
      // store and parse through the JSON to make it readable
      let weather = JSON.parse(body);
      console.log('weather:', weather)
      console.log('weather.main', weather.main);
      // if we find an error i.e typo or empty call let the user know
      if(weather.main == undefined) {
        res.render('index', {
          weather: null,
          error: 'Error, please try again mother effer'
        });
      // otherwise give the user the weather
      } else {
        // create and store the string from the req.body
        let weatherText = `It's ${weather.main.temp} degrees in ${weather.name}!`;
        // render the string to the view/EJS
        res.render('index', {
          weather: weatherText,
          error: null
        });
      }
    }
  })
})

// let port = process.env.PORT;
// if (port == null || port == "") {
//   port = 8000;
// }
//
// app.listen(port);

// for dev server testing
// app.listen(3000, function() {
//   console.log('Example app listening on port 3000!');
// })

app.listen(process.env.PORT || 4000, function () {
  console.log('Your node js server is running');
})
