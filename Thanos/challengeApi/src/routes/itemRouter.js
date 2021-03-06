// itemRoutes.js

var express = require('express');
var app = express();
var itemRouter = express.Router();

// Require Item model in our routes module
var Item = require('../models/Item');
var Hackathon = require('../models/Hackathon');
var RegisterHackathon = require('../models/RegisterHackathon');


// Defined store route
itemRouter.route('/add/post').post(function (req, res) {
  var item = new Item(req.body);
      item.save()
    .then(item => {
    res.json('Item added successfully');
    })
    .catch(err => {
    res.status(400).send("unable to save to database");
    });
});

// Defined get data(index or listing) route
itemRouter.route('/tedst').get(function (req, res) {
  Item.find(function (err, itms){
    if(err){
      console.log(err);
    }
    else {
      res.json(itms);
    }
  });
});


itemRouter.route('/').get(function (req, res) {
  Hackathon.find(function (err, itms){
    if(err){
      console.log(err);
    }
    else {
      res.json(itms);
    }
  });
});

itemRouter.route('/getHackathonParticipants').get(function (req, res) {
  RegisterHackathon.find(function (err, itms){
    if(err){
      console.log(err);
    }
    else {
      res.json(itms);
    }
  });
});

itemRouter.route('/addHackathon/post').post(function (req, res) {
  //console.log(req);
  //console.log(req.body);
  var item = new Hackathon(req.body);
      item.save()
    .then(item => {
    res.json('Item added successfully');
    })
    .catch(err => {
    res.status(400).send("unable to save to database");
    });
});

itemRouter.route('/registerToHack/post').post(function (req, res) {
  //console.log(req);
  //console.log(req.body);
  var item = new RegisterHackathon(req.body);
      item.save()
    .then(item => {
    res.json('Item added successfully');
    })
    .catch(err => {
    res.status(400).send("unable to save to database");
    });
});
/*Hackathon*/

// Defined edit route
itemRouter.route('/edit/:id').get(function (req, res) {
  var id = req.params.id;
  Item.findById(id, function (err, item){
      res.json(item);
  });
});

//  Defined update route
itemRouter.route('/update/:id').post(function (req, res) {
  Item.findById(req.params.id, function(err, item) {
    if (!item)
      return next(new Error('Could not load Document'));
    else {
      // do your updates here
      item.item = req.body.item;

      item.save().then(item => {
          res.json('Update complete');
      })
      .catch(err => {
            res.status(400).send("unable to update the database");
      });
    }
  });
});

// Defined delete | remove | destroy route
itemRouter.route('/delete/:id').get(function (req, res) {
  Item.findByIdAndRemove({_id: req.params.id},
       function(err, item){
        if(err) res.json(err);
        else res.json('Successfully removed');
    });
});

module.exports = itemRouter;