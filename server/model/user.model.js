var db = require('../database/db.js')
var _ = require('underscore')
var scrypt = require("scrypt");


var userModel = module.exports

userModel.addUser = function(attr) {
	return new Promise(function(resolve,reject) {
		return db('Users').insert(attr)
		.then(function(result) {
			attr.id = result[0]
			return resolve(attr)
		})
	})
}

userModel.methods.generateHash = function(password){
	return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

userSchema.methods.validPassword = function(password) {
	return bcrypt.compareSync(password, this.local.password);
};


// userModel.methods.generateHash = function(password){
// 	var scryptParameters = scrypt.paramsSync(0.1);
// 	var key = new Buffer(password); 

// 	return scrypt.kdfSync(key, scryptParameters);
//   	console.log(result.toString("hex"));

// };

// userSchema.methods.validPassword = function(password) {
// 	var scryptParameters = scrypt.paramsSync(0.1);
// 	var key = new Buffer(this.local.password); 
// 	var kdfResult = scrypt.kdfSync(key, scryptParameters); 

// 	return scrypt.verifyKdfSync(password, kdfResult);
// }

userModel.findUserById = function(params) {
	return db('Users').where({
		FB_id: params.FB_id
	}).limit(1)
	.then(function(rows) {
		return rows[0]
	})
}
