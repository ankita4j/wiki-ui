var app = angular.module('myApp', []);
app.controller('myCtrl', function($scope) {
$scope.firstName = "John";
    $scope.lastName = "Doe";
    $scope.createWiki = function() {
        return window.open("create.html",'_self',false);

    };

});