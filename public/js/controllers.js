'use strict';

/* Controllers */

function IndexCtrl($scope, $http) {
  $http.get('/api/posts').
    success(function(data, status, headers, config) {
      $scope.posts = data.posts;
    });
};

function AddPostCtrl($scope, $http, $location) {
  //$scope.form = {};
    console.log("Inside controller");
    $http.get('/api/post').
      success(function(data) {
        console.log("Success of first function");
        $scope.listofallclasses = data;
        //$location.path('/');
      });
  };

function ReadPostCtrl($scope, $http, $routeParams, $route) {
  console.log("Inside controller #2");
  console.log($routeParams.id);
  $http.get('/api/' + $routeParams.id).
    success(function(data) {
      console.log("Success");
      console.log(data);
      $scope.courseabbreviation = data['course_abbreviation'];
      $scope.allpostsonpage = data['posts'];
    });

  console.log($scope.commenttext);
  $scope.makeapost = function(){
    $http.put('/api/post/' + $routeParams.id + '/' + $scope.commenttext).
    success(function(data) {
      console.log("route.reloading()");
      console.log(data);
      $route.reload();
    });
  };
}

function EditPostCtrl($scope, $http, $location, $routeParams) {
  $scope.form = {};
  $http.get('/api/post/' + $routeParams.id).
    success(function(data) {
      $scope.form = data.post;
    });

  $scope.editPost = function () {
    $http.put('/api/post/' + $routeParams.id, $scope.form).
      success(function(data) {
        $location.url('/readPost/' + $routeParams.id);
      });
  };
}

function DeletePostCtrl($scope, $http, $location, $routeParams) {
  $http.get('/api/post/' + $routeParams.id).
    success(function(data) {
      $scope.post = data.post;
    });

  $scope.deletePost = function () {
    $http.delete('/api/post/' + $routeParams.id).
      success(function(data) {
        $location.url('/');
      });
  };

  $scope.home = function () {
    $location.url('/');
  };
}
