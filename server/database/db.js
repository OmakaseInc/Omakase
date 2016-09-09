var mysql = require('mysql');
var config = require(__dirname + '/../../knexfile.js')

var env = 'development'
var knex = require('knex')(config[env])

module.exports = knex;

knex.ensureSchema = function() {
	return Promise.all([
		knex.schema.hasTable('Users').then(function(exists) {
			if (!exists) {
  			 knex.schema.createTable('Users', function(table) {
  				table.increments('id').primary();
          // table.string('FB_id', 50); //for FB auth token
          table.string('name');
					table.string('password');
  			}).then(function(table) {
  				console.log('UsersTable has been created', table)
  			})
  		}
  	}),
  	knex.schema.hasTable('Restaurants').then(function(exists) {
			if (!exists) {
  			 knex.schema.createTable('Restaurants', function(table) {
  				table.increments('id').primary();
  				table.string('restaurant_name');
  				table.string('address');
  				table.integer('zipcode');
  				table.string('imageUrl');
  			}).then(function(table) {
  				console.log('Restaurants Table has been created', table)
  			})
  		}
  	}),
  	knex.schema.hasTable('Locations').then(function(exists) {
			if (!exists) {
  			 knex.schema.createTable('Locations', function(table) {
  				table.increments('id').primary();
  				table.string('location_name');
  			}).then(function(table) {
  				console.log('LocationsTable has been created', table)
  			})
  		}
  	}),
  	knex.schema.hasTable('Dishes').then(function(exists) {
			if (!exists) {
  			 knex.schema.createTable('Dishes', function(table) {
  				table.increments('id').primary();
  				table.string('dish_name');
  				table.integer('voteCount');
          table.integer('restaurant_id').unsigned();
          table.integer('location_id').unsigned();
          table.foreign('restaurant_id').references('Restaurants.id');
          table.foreign('location_id').references('Locations.id');
  			}).then(function(table) {
  				console.log('DishesTable has been created', table)
  			})
  		}
  	}),
  	knex.schema.hasTable('UsersDishes').then(function(exists) {
			if (!exists) {
  			 knex.schema.createTable('UsersDishes', function(table) {
  				table.increments('id').primary();
          table.integer('dish_id').unsigned();
          table.integer('user_id').unsigned();
          table.foreign('dish_id').references('Dishes.id');
          table.foreign('user_id').references('Users.id');
  			}).then(function(table) {
  				console.log('UsersTable has been created', table)
  			})
  		}
  	})

  	])
}

knex.deleteEverything = function () {
 return knex('Users').truncate()
    .then(function () {
      return knex('UsersDishes').truncate();
    })
     .then(function () {
      return knex('Dishes').truncate();
    })
      .then(function () {
      return knex('Restaurants').truncate();
    })
      .then(function () {
      return knex('Locations').truncate();
    }).then(function() {
      console.log("everything wiped")
 }
 )}
