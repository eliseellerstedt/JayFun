var express 	= require('express');
var app 		= express();
var bodyParser 	= require('body-parser');
var Funfixer 	= require('./app/models/funfixer');
var mongoose 	= require('mongoose');
var uriUtil 	= require('mongodb-uri');
var path 		= require('path');

var mongodbUri = 'mongodb://testuser1:password@ds061374.mongolab.com:61374/traineetestdb';
var mongooseUri = uriUtil.formatMongoose(mongodbUri);

mongoose.connect(mongooseUri);

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res){
  res.sendFile(path.join(__dirname+'/public/index.html'));
});

// ROUTES FOR OUR API
// =============================================================================

var router = express.Router();

// middleware to use for all requests
router.use(function(req, res, next) {
	// do logging
	console.log('Something is happening.');
	next(); // make sure we go to the next routes and don't stop here
 });

// test route to make sure everything is working (accessed at GET http://localhost:3000/api)
router.get('/', function(req, res) {

});

var funfixersRoute = router.route('/funfixers');

funfixersRoute.get(function(req, res) {
 // Use the Activity model to find all activities
 Funfixer.find({}, null, function(err, funfixers) {
   if (err) {
     res.send(err);
     return;
   }
   var result = funfixers.map(function(funfixer) {
     return {
       _id: funfixer._id,
       title: funfixer.title,
       
     }});
   res.send(result);
   });
   
 });

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

// START THE SERVER
// =============================================================================
var server = app.listen(8081, function () {

  var host = server.address().address
  var port = server.address().port

  console.log("Example app listening at http://%s:%s", host, port)

});