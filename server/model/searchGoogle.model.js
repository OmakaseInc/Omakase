require('dotenv').config();
var request = require("request");

var searchGoogleModel = module.exports;

searchGoogleModel.getRestaurantList = function(params){
  var query = params.restaurant + params.location;

  var options = { method: 'GET',
    url: 'https://maps.googleapis.com/maps/api/place/textsearch/json',
    qs:
     { query: location,
       key: process.env.google_api_key + '\t  ',
       type: 'restaurant',
       fields: 'results (formatted_address, name, opening_hours/open_now, photos)'   },
    headers:
     { 'postman-token': '21482a77-ec74-c13a-99c5-06dcad37ba43',
       'cache-control': 'no-cache' },
    body: '{\n  "title": "Michael T\'s GooglePlaces",\n  "content": "I LOVE LAMP!"\n}' };


  request(options, function(error, response, body) {
    if (error) {
      console.log('Error inside searchController inside request: ',error);
    } else {
      console.log('Success inside searchController inside request: response is', response);
      return response
    }
  });
}
