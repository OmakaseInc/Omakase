module.exports = function(app, passport){
	app.get('/login', function(req, res){
		res.render('login.ejs', {message: req.flash('loginMessage')});

	});

	app.get('/signup', function(req, res){
		res.render('/signup', {message: req.flash('signupMessage') });
	})

	app.post('/signup', passport.authenticate('local-signup', {
		successRedirect : '/voteSurvey',
		failureRedirect : '/signup',
		failureFlash : true
	}));

	app.post('/login', passport.authenticate('local-login', {
		successRedirect : '/voteSurvey',
		failureRedirect : '/login-to-vote',
		failureFlash : true
	}));


	app.get('/vote', isLoggedIn, function(req, res){
		res.render('profile.ejs', {
			user: req.user
		});
	});

	app.get('/auth/facebook', passport.authenticate('facebook', { scope : 'email' }));

    app.get('/auth/facebook/callback',
        passport.authenticate('facebook', {
            successRedirect : '/voteSurvey',
            failureRedirect : '/'
        }));


	app.get('/logout', function(req, res){
		req.logout();
		res.redirect('/');
	});
};

function isLoggedIn(req, res, next){
	if(reqisAuthenticated()){
		return next();

	}
	res.redirect('/');
}

