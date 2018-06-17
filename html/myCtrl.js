var app = angular.module('myApp',[]);
app.controller('myCtrl', MyController)

function MyController($scope, $http) {
    var pagId = document.location.pathname
    var rx = /\/p\/([a-zA-Z0-9]{24})$/gm
    var arr = rx.exec(document.location.pathname)
    if (arr)
        var pageId = arr[1]
    else
        var pageId = "5b260aae8a3b28ce1664f206"
    console.log(pageId)
    $scope.getPage = function () {
        $http({
                method: "GET",
                url: "/page/"+pageId,
                params: {id: 1}
            }
        ).then(function mySuccess(response) {
            myEl = angular.element(document.querySelector('#content'));
            myEl.html(response.data['content_html'])
            $scope.content_text = response.data['content']
            // $scope.title = response.data['title']
            $scope.title = document.location.pathname

        }, function myError(response) {
            $scope.context = response.statusText;
        })
    }

    $scope.savePage = function () {
        console.log("savepage: " + pageId)
        $http({
            method: "PUT",
            url: "/page/" +pageId,
            headers: {
                'Content-Type': 'application/json'
            },
            data: {"title": "wiki-ui", "content": $scope.content_text}
        }).then(function mySuccess(response) {
            $scope.getPage()
        }, function myError(response) {
            $scope.context = response.statusText;
        });
    }

    $scope.getPage()
}