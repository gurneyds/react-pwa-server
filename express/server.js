const express = require('express');
// const serverless = require('serverless-http')
// const bodyParser = require('body-parser')
const path = require('path')
const cors = require('cors')
const countries = require('../countries.js')
const people = require('../people.js')
const images = require('../images.js')

const app = express();

app.use(cors())

const router = express.Router()

app.get('/ping', function (req, res) {
  return res.send('pong');
});

app.get('/api/countries', function (req, res) {
  res.send(countries)
})

app.get('/api/people', function(req, res) {
  res.send(people)
})

app.post('/api/people', function(req, res) {
  const incoming = req.body
  console.log('people posted with:', incoming)
  res.sendStatus(200);
})

app.get('/api/people/details/:id', function (req, res) {
  const person = people.find(p => String(p.id) === req.params.id)
  if (person) {
    res.send(person)
  } else {
    res.statusCode(404)
    res.send('Cant find that person, sorry!')
  }
})

app.get('/api/people/image/:id', (req, res, next) => {
  const person = people.find(p => String(p.id) === req.params.id)

  if (person) {
    const parts = __dirname.split('/')
    parts.splice(parts.length-1, 1)
    const newPath = parts.join('/')

    var imagePath = path.join(newPath, 'images', person.imageName);

    res.download(imagePath, function (err) {
      if (!err) return; // file sent
      if (err.status !== 404) return next(err); // non-404 error
      // file for download not found
      res.statusCode = 404;
      res.send('Cant find that image, sorry!');
    });
  } else {
    res.statusCode = 404;
    res.send('Cant find that image, sorry!');
  }
})

app.get('/api/image/:id', (req, res, next) => {
  const image = images.find(p => String(p.id) === req.params.id)

  if (image) {
    var imagePath = path.join(__dirname, 'images', image.imageName);

    res.download(imagePath, function (err) {
      if (!err) return; // file sent
      if (err.status !== 404) return next(err); // non-404 error
      // file for download not found
      res.statusCode = 404;
      res.send('Cant find that image, sorry!');
    });
  } else {
    res.statusCode = 404;
    res.send('Cant find that image, sorry!');
  }
})

// app.use(bodyParser.json());
// app.use('/.netlify/functions/server', router);  // path must route to lambda
// app.use('/', (req, res) => res.sendFile(path.join(__dirname, '../index.html')));

module.exports = app
// module.exports.handler = serverless(app)
