var express = require('express');
var request = require('request');
var bodyParser = require('body-parser')

var appName = 'Bicing API Middleware'
var app = express()
var port = process.env.PORT || 5555

app.use(bodyParser.json())

var apiURL = 'https://www.bicing.cat/availability_map/getJsonObject'

app.get('/availability', (req, res) => {

	request(apiURL, function (error, response, body) {
	  console.log('requesting' + apiURL)
	  console.log('error:', error); // Print the error if one occurred
	  console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
	  console.log('body:', body); // Print the HTML for the Google homepage.
	  res.send(body)
	})

})

if (process.env.NODE_ENV !== 'test') {
  app.listen(port, () => {
    console.log(`${appName} listening on port ${port}...`)
  })
}