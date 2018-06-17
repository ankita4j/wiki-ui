angular.module('pageService', [])

// super simple service
// each function returns a promise object
    .factory('Page', ['$http',function($http) {
        return {
            list : function() {
                return $http.get('/pages');
            },
            get : function(id) {
                return $http.get('/page/'+id);
            }
        }
    }]);