var app = angular.module('myApp',[]);
app.controller('myCtrl', MyController)

function MyController($scope, $http) {
    var creating=false
    var defaultId = "5b270feea5bc0d059405e734"
    var pagId = document.location.pathname
    var rx = /\/p\/([a-zA-Z0-9]{24})$/gm
    var arr = rx.exec(document.location.pathname)
    if (arr)
        var pageId = arr[1]
    else
        var pageId = defaultId
    console.log(pageId)

    $scope.getPage = function () {
        $http({
                method: "GET",
                url: "/api/page/"+pageId,
                params: {id: 1}
            }
        ).then(function mySuccess(response) {
            myEl = angular.element(document.querySelector('#content'));
            myEl.html(response.data['content_html'])
            myEl = angular.element(document.querySelector('#title'));
            myEl.html("<h1>"+response.data['title']+"</h1>")
        }, function myError(response) {
        })
    }

    $scope.savePage = function () {
        console.log("savepage: " + pageId)
        var idToSend=pageId
        if(creating){idToSend=""}
        $http({
            method: "PUT",
            url: "/api/page/" +idToSend,
            headers: {
                'Content-Type': 'application/json'
            },
            data: {"title": $scope.title_edit, "content": $scope.content_edit}
        }).then(function mySuccess(response) {
            pageId = response.data
            $scope.getPage()
            document.location.pathname="/p/"+pageId;
        }, function myError(response) {
            $scope.context = response.statusText;
        });
    }

    $scope.createPage = function () {
            creating=true
            $scope.content_edit="";
            $scope.title_edit="";
            $scope.showEdit=true
            $scope.showBody=false
        }


    $scope.bookmarkPage = function () {
    	$http({
    		method: "PUT",
    		url: "/api/bookmark/" + pageId,
    		headers: { 'Content-Type': 'application/json' },
    		data: {"pageId":pageId, "user": "ankita"}
    	}).then(
    		function mySuccess(response) {
    		    bookmarkID = response.data;
    		    $scope.getBookMarks()
    		},
    		function myError(response) { });
    }

    $scope.editPage = function () {
       $http({
                method: "GET",
                url: "/api/page/"+pageId,
                params: {id: 1}
            }
               ).then(function mySuccess(response) {
                   $scope.content_edit = response.data['content']
                   $scope.title_edit = response.data['title']
                   $scope.showEdit=true
                   $scope.showBody=false
               }, function myError(response) {
               })
    }

    $scope.cancelEdit = function () {
        creating=false
        $scope.showEdit=false
        $scope.showBody=true
    }

    $scope.getBookMarks = function () {
    	$http({
    		method: "GET",
    		url: "/api/bookmarks",
    	}).then(
    		function mySuccess(response) { $scope.bookmarks = response.data },
    		function myError(response) { $scope.bookmarks = []});
    }
    $scope.showEdit=false
    $scope.showBody=true
    $scope.getBookMarks()
    $scope.getPage()

}