var express = require('express');
var request = require('request');
var bodyParser = require('body-parser')

var appName = 'Bicing API Middleware'
var app = express()
var port = process.env.PORT || 5555

app.use(bodyParser.json())

var apiURL = 'https://www.bicing.cat/availability_map/getJsonObject'

const loadBCN = () => {
  return new Promise((resolve, reject) => {
    request(apiURL, function (error, response, body) {
      if (error) reject(error);
      resolve(body);
    });
  });
};

const dataBCN = false;

const main = async () => {
  const dataBCN = await loadBCN();
 
  app.post('/search', (req, res) => {
    console.log(req.params)
    res.send(dataBCN);
  })

  app.get('/', (req, res) => {
    res.sendStatus(200)
  })
};

if (process.env.NODE_ENV !== 'test') {
  app.listen(port, () => {
    console.log(`${appName} listening on port ${port}...`)
  })
}

main();

module.exports = app