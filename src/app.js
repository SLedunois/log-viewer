var angular = require('angular');
var socketIO = require('socket.io-client');

var app = angular.module('logViewer', []);

app.controller('viewerController', ['$scope', '$sce', function ($scope, $sce) {
  var socket = socketIO();

  socket.on('file:content', function (content) {
    content = content.replace(/\n/g, '<br />');
    $scope.file = $sce.trustAsHtml(content);
    $scope.$apply();
  });

  socket.on('file:newline', function (line) {
    $scope.file += line;
    $scope.file = $sce.trustAsHtml($scope.file.replace(/\n/g, '<br />'));
    $scope.$apply();
  });
}]);