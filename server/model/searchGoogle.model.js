var request = require("request");
var path = require('path')
require('dotenv').config();


var searchGoogleModel = module.exports;

searchGoogleModel.getRestaurantList = function(params){
  var location = params.location;

  var options = { method: 'GET',
    url: 'https://maps.googleapis.com/maps/api/place/textsearch/xml',
    qs: 
     { query: location,
       key: googleAPI.APIKey + '\t  ',
       type: 'restaurant',
       opennow: 'true',
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




