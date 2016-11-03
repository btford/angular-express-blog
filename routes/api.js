var mongoose = require('mongoose');
mongoose.connect('mongodb://ofcourseSD:cse170xd@ds047085.mlab.com:47085/ofcoursedb');
var courseSchema = require('./schema');
/*
 * Serve JSON to our AngularJS client
 */

// For a real app, you'd make database requests here.
// For this example, "data" acts like an in-memory "database"
var data = {
  "posts": [
    {
      "title": "Lorem ipsum",
      "text": "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
    },
    {
      "title": "Sed egestas",
      "text": "Sed egestas, ante et vulputate volutpat, eros pede semper est, vitae luctus metus libero eu augue. Morbi purus libero, faucibus adipiscing, commodo quis, gravida id, est. Sed lectus."
    }
  ]
};

// GET

exports.posts = function (req, res) {
  var posts = [];
  data.posts.forEach(function (post, i) {
    posts.push({
      id: i,
      title: post.title,
      text: post.text.substr(0, 50) + '...'
    });
  });
  res.json({
    posts: posts
  });
};

exports.posttodatabase = function (req, res) {
  var courseId = req.params.course;
  var mainpost = req.params.mainpost;
  courseSchema.update({course_abbreviation : courseId}, 
    {$push : {"posts" : {"post" : mainpost, "vote" : 0}}},
    {safe: true, upsert: true},
    function(err,model){
      res.json(model);
    });
/*var id = req.params.id;
  if (id >= 0 && id < data.posts.length) {
    res.json({
      post: data.posts[id]
    });
  } else {
    res.json(false);
  }*/
};

// POST

exports.displayclasses = function (req, res) {

  //data.posts.push(req.body);
    console.log("Inside node request");
    courseSchema.find(function(err, data) {
    var courselist = [];
    for (var i = 0; i < data.length; i++) {
      courselist[i] = data[i].course_abbreviation;
    }

    console.log("sending json data");
    res.json(courselist);
  });
  //res.json(req.body)
};

// PUT

exports.showoneclass = function (req, res) {
  console.log("Inside node function #2");
  var courseId = req.params.course;
  courseSchema.findOne({course_abbreviation : courseId},function(err, data) {
    res.json(data);
  });
  /*if (id >= 0 && id < data.posts.length) {
    data.posts[id] = req.body;
    res.json(true);
  } else {
    res.json(false);
  }*/

};

// DELETE

exports.deletePost = function (req, res) {
  var id = req.params.id;

  if (id >= 0 && id < data.posts.length) {
    data.posts.splice(id, 1);
    res.json(true);
  } else {
    res.json(false);
  }
};