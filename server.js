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
       description: funfixer.description,
       host: funfixer.host,
       img: funfixer.img,
       joined: funfixer.joined
       
     }});
   res.send(result);
   });
   
 });

funfixersRoute.post(function(req, res){
   // Create a new instance of the activity model
  var funfixer = new Funfixer();

  // Set the activity properties that came from the POST data
  funfixer.title = req.body.title;
  funfixer.description = req.body.description;
  funfixer.host = req.body.host;
  funfixer.img = req.body.img;
  funfixer.joined = req.body.joined;

  // Save the activity and check for errors
  funfixer.save(function(err) {
    if (err)
      res.send(err);
      Funfixer.find({}, null, function(err, funfixers) {
     if (err)
        res.send(err);

      var result = funfixers.map(function(funfixer) {
       return {
         _id: funfixer._id,
         title: funfixer.title,
         host: funfixer.host,
         description: funfixer.description,
         img: funfixer.img,
         joined: funfixer.joined
       }});

        console.log(result);
        res.json(result);
    });
  });
});

//Single funfixer-----------------------------------------------

var funfixerRoute = router.route('/funfixers/:funfixer_id');

funfixerRoute.delete(function(req, res){

  Funfixer.findByIdAndRemove(req.params.funfixer_id, function(err, funfixer){
    if (err) res.send(err);
    res.json({message: "Removed funfixer"});
  });

});

funfixerRoute.put(function(req, res) {
  Funfixer.findById(req.params.funfixer_id, function(err, funfixer) {
    if (err)
      res.send(err);

    funfixer.title = req.body.title;
    funfixer.host = req.body.host;
    funfixer.description = req.body.description;
    funfixer.img = req.body.img;
    funfixer.joined = req.body.joined;

    funfixer.save(function(err) {
      if (err)
        res.send(err);

      Funfixer.find({}, null, function(err, funfixers) {
        if (err)
          res.send(err);

        var result = funfixers.map(function(funfixer) {
         return {
           _id: funfixer._id,
           title: funfixer.title,
           host: funfixer.host,
           description: funfixer.description,
           img: funfixer.img,
           joined: funfixer.joined
         }});

        console.log(result);
        res.json(result);
      });
    });
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