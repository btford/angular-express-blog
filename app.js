
/**
 * Module dependencies.
 */

var express = require('express');
var  routes = require('./routes');
var  api = require('./routes/api');
var PORT = process.env.PORT || 3000;


var app = module.exports = express.createServer();

// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.set('view options', {
    layout: false
  });
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.static(__dirname + '/public'));
  app.use(app.router);
});


app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});

// Routes

app.get('/', routes.index);
app.get('/partials/:name', routes.partials);

// JSON API

app.get('/api/posts', api.posts);

app.put('/api/post/:course/:mainpost', api.posttodatabase);
app.get('/api/post', api.displayclasses);
app.get('/api/:course', api.showoneclass);
app.delete('/api/post/:id', api.deletePost);

// redirect all others to the index (HTML5 history)
app.get('*', routes.index);

// Start server

app.listen(PORT, function(){
	console.log("listening on port");
};
