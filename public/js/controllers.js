'use strict';

/* Controllers */

function IndexCtrl($scope, $http) {
  $scope.posts = [];

  $http({method: 'GET', url: '/api/posts'}).
    success(function(data, status, headers, config) {
      $scope.posts = data.posts;
    });
}

function AddPostCtrl($scope, $http, $location) {
  $scope.submitPost = function () {
    $http.post('/api/addPost', {
      title: $scope.title,
      text: $scope.text
    }).
    success(function(data, status, headers, config) {
      $location.path('/');
    });
  };
}

function ReadPostCtrl($scope, $http, $routeParams) {
  $http({method: 'GET', url: '/api/post/' + $routeParams.id}).
    success(function(data, status, headers, config) {
      $scope.post = data.post;
    });
}

function EditPostCtrl($scope, $http, $location, $routeParams) {
  $http({method: 'GET', url: '/api/post/' + $routeParams.id}).
    success(function(data, status, headers, config) {
      $scope.title = data.post.title;
      $scope.text = data.post.text;
    });

  $scope.editPost = function () {
    $http.post('/api/editPost', {
      id: $routeParams.id,
      title: $scope.title,
      text: $scope.text
    }).
    success(function(data, status, headers, config) {
      $location.path('/readPost/' + $routeParams.id);
    });
  };
}

function DeletePostCtrl($scope, $http, $location, $routeParams) {
  $http({method: 'GET', url: '/api/post/' + $routeParams.id}).
    success(function(data, status, headers, config) {
      $scope.post = data.post;
    });

  $scope.deletePost = function () {
    $http.post('/api/deletePost', {
      id: $routeParams.id
    }).
    success(function(data, status, headers, config) {
      $location.path('/');
    });
  };

  $scope.home = function () {
    $location.path('/');
  };
}
