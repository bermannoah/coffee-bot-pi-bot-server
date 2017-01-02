var express    = require('express');
var app        = express(); 
var bodyParser = require('body-parser');
var mongoose   = require('mongoose');
var Brew       = require('./app/models/brew'); 

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost/test')

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
});


var port = process.env.PORT || 8080;

var router = express.Router();

router.use(function(req, res, next) {
  console.log('Something is happening.');
  next();
});

router.get('/', function(req, res) {
  res.json({ message: 'hooray! welcome to our api!' });
})


// routes for all brews
router.route('/brews')

  .post(function(req, res) {
    
    var brew = new Brew();
    brew.type = req.body.type;
    
    brew.save(function(err) {
      if (err)
        res.send(err);
        
      res.json({ message: 'Brew created!' });
    });
  })
  
  .get(function(req, res){
    Brew.find(function(err, brews) {
      if (err)
        res.send(err);
        
      res.json(brews);
    });
  });

// routes for a single brew
router.route('/brews/:brew_id')
  
  .get(function(req, res) {
    Brew.findById(req.params.brew_id, function(err, brew) {
      if (err)
        res.send(err);
        
      res.json(brew);
    });
  });


app.use('/api', router);

app.listen(port);
console.log('Magic happens on port ' + port);