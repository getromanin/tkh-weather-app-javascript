const express = require('express');
const bodyParser = require('body-parser');
const app = express();

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
  let url = `http://api.openweathermap.org/data/2.5/weather?
  q=${city}&units=imperial&appid=${apiKey}`

  res.render('index');
})

app.listen(3000, function() {
  console.log('Example app listening on port 3000!');
})
