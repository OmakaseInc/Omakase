var express = require('express');
var path = require('path');
var app = express();
var cors = require('cors');
var request = require('request');
var bodyParse = require('body-parser');
var db = require('./database/db.js');
var searchRouter = require('./router/searchRouter.js');
var userRouter = require('./router/userRouter.js');
var dishRouter = require('./router/dishRouter.js');
var searchGoogleRouter = require('./router/searchGooglePlacesRouter.js');
var authRouter = require('./router/authRouter.js');
var passport = require('passport');
var flash = require('connect-flash');
var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var session = require('express-session');


app.use(cors());
app.use(bodyParse.json({limit: '50mb'}));

app.use(express.static('./client'));

app.get('*', function (request, response){
  response.sendFile(path.resolve('./client', 'index.html'));
});

require('./config/passport')(passport);
app.use(morgan('dev')); 
app.use(cookieParser());

//app.set('view engine', 'ejs');

app.use(session({ secret: 'ilovescotchscotchyscotchscotch' }));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// require('./router/authRouter.js')(app, passport)


app.use('/api/signin', authRouter);
app.use('/api/signup', authRouter);

app.use('/api/google', searchGoogleRouter);
app.use('/api/user', userRouter);
app.use('/api/search', searchRouter);
app.use('/api/dish', dishRouter);
app.set('port', process.env.PORT || 3000);

app.listen(app.get('port'), function() {
  db.ensureSchema();
  console.log('we are now listening on ', app.get('port'));
});