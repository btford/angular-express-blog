
/**
 * Module dependencies.
 */

var express = require('express'),
    routes  = require('./routes'),
    api     = require('./routes/api'),
    http   = require('http'),
    path    = require('path');

var app = module.exports = express();

// Configuration
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.static(path.join(__dirname, 'public')));
app.use(app.router);

if (app.get('env') === 'development') {
  app.use(express.errorHandler());
}

if (app.get('env') === 'production') {
  app.use(express.errorHandler());
};

// Routes

app.get('/', routes.index);
app.get('/partials/:name', routes.partials);

// JSON API

app.get('/api/posts', api.posts);
app.get('/api/post/:id', api.post);
app.post('/api/post', api.addPost);
app.put('/api/post/:id', api.editPost);
app.delete('/api/post/:id', api.deletePost);

// redirect all others to the index (HTML5 history)
app.get('*', routes.index);

// Start server
http.createServer(app).listen(app.get('port'), function () {
  console.log("Express server listening on port %d in %s mode", app.get('port'), app.get('env'));
});