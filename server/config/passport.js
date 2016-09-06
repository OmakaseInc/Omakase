var LocalStrategy = require('passport-local').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;
var userModel = require('./../model/user.model.js');
var configAuth = require('./auth');


module.exports = function(passport){
	//passport persistent login sessions
	passport.serializeUser(function(user,done) {
		done(null, user.id);
	});

	passport.deserializeUser(function(id, done){
		User.findById(id, function(err, user){
			done(err, user);
		});
	});

	passport.use('local-signup', new LocalStrategy({
		usernameField: 'email',
		passwordField: 'password',
		passReqToCallback: true
	},

	function(req, email, password, done){
			process.nextTick(function(){
				UsfindOne({'local.email' : email}, function(err, user){
				if(err)
					return done(err);
				if(user){
					return done(null, false, req.flash('signupMessage', 'That email is already taken.'));
				} else {
					var newUser = new User();

					///NOT APPLICABLE TO MYSQL

					newUser.local.email = email;
					newUser.local.passport = newUser.generateHash(passport);

					///NOT APPLICABLE TO MYSQL

					newUser.save(function(err){        
						if(err)
							throw err;
						return done(null, newUser)
					});
				}
			});
		});
	}));

	passport.use('local-login', new LocalStrategy({
		usernameField: 'email',
		passwordField: 'password',
		passReqToCallback: true
	},

	function(req, email, password, done){
			User.findOne({'local.email' : email}, function(err, user){
			if(err)
				return done(err);

			if(!user){
				return done(null, false, req.flash('loginMessage', 'No user found.'))
			}
			if(!user.validPassword(password)){
				return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.'));
			}

			return done(null, user);
		})
	}));

	passport.use(new FacebookStrategy({
		clientID : configAuth.facebookAuth.clientID,
		clientSecret : configAuth.facebookAuth.clientSecret,
		callbackURL : configAuth.facebookAuth.callbackURL,
		profileFields: ["emails", "displayName"]
	},

	function(token, refreshToken, profile, done){
			process.nextTick(function(){
				User.findOne({'facebook.id' : profile.id}, function(err, user){
					if(err)
						return done(err)
					if(user){
						return done(null, user);
					} else {
						var newUser = new User();

						newUser.facebook.id = profile.id;
						newUser.facebook.token = token;
						newUser.facebook.name = profile.displayName;
						newUser.facebook.email = profile.emails[0].value;

						newUser.save(function(err){
							if(err)
								throw err;
							return done(null, newUser);
						});
					}
				});
			});
	}));

};