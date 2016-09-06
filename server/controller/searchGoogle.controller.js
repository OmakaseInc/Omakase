var searchGooglePlacesModel = require('../model/searchGoogle.model.js');


exports.searchGooglePlacesModel = {
	getRestaurantList: getRestaurantList
}

function getRestaurantList(req, res) {
	searchGooglePlacesModel.getRestaurantList(req.body)
	.then(function(result) {
		res.status(200).send(result)
	})
	.catch(function(err) {
		res.status(500).end('Error in getRestaurantList', err)
	})
}

