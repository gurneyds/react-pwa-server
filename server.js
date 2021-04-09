const express = require('express');
const path = require('path')
const app = express();
const cors = require('cors')
const countries = require('./countries.js')

app.use(cors())

app.get('/ping', function (req, res) {
  return res.send('pong');
});

const people = [
  {
    first: 'David',
    last: 'Gray',
    id: 1,
    imageName: 'man1.jpeg',
    role: 'Web Developer'
  },
  {
    first: 'Bob',
    last: 'Jones',
    id: 2,
    imageName: 'man2.jpeg',
    role: 'Web Developer'
  },
  {
    first: 'Frank',
    last: 'Smith',
    id: 3,
    imageName: 'man3.jpeg',
    role: 'QA Engineer'
  },
  {
    first: 'Bill',
    last: 'Johnson',
    id: 4,
    imageName: 'man4.png',
    role: "Project Management"
  },
  {
    first: 'Henry',
    last: 'Johanson',
    id: 5,
    imageName: 'man5.png',
    role: 'Designer'
  },
  {
    first: 'Clint',
    last: 'Walker',
    id: 6,
    imageName: 'man6.png',
    role: 'Software Engineer'
  },
  {
    first: 'Chad',
    last: 'Christenson',
    id: 7,
    imageName: 'man7.jpeg',
    role: 'Engineering Manager'
  },
  {
    first: 'Gus',
    last: 'Guliver',
    id: 8,
    imageName: 'man8.jpeg',
    role: 'Product owner'
  },
  {
    first: 'Mike',
    last: 'Walton',
    id: 9,
    imageName: 'man9.png',
    role: 'Product owner'
  }
]

const images = [
  {
    id: 1,
    imageName: 'tree.jpeg'
  }
]

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
    var imagePath = path.join(__dirname, 'images', person.imageName);

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

app.listen(process.env.PORT || 8080);