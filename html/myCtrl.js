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
                url: "/api/page/"+pageId,
                params: {id: 1}
            }
        ).then(function mySuccess(response) {
            myEl = angular.element(document.querySelector('#content'));
            myEl.html(response.data['content_html'])
//            $scope.content = "My name is: <h1>John Doe</h1>" //response.data['content_html']

            $scope.content_edit = response.data['content']
            $scope.title_edit = response.data['title']

            myEl = angular.element(document.querySelector('#title'));
            myEl.html("<h1>"+response.data['title']+"</h1>")
//            $scope.title = response.data['title']


        }, function myError(response) {
            $scope.context = response.statusText;
        })
    }

    $scope.savePage = function () {
        console.log("savepage: " + pageId)
        $http({
            method: "PUT",
            url: "/api/page/" +pageId,
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

    $scope.bookmarkPage = function () {
            $http({
                        method: "PUT",
                        url: "/api/bookmark/" +pageId,
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        data: {"pageId": pageId, "user": "ankita"}
                    }).then(function mySuccess(response) {
                        pageId = response.data
                    }, function myError(response) {
                        $scope.context = response.statusText;
                    });
        }

    $scope.createPage = function () {
            pageId="";
            $scope.content_edit="";
            $scope.title_edit="";
            myEl = angular.element(document.querySelector('#title'));
            myEl.html("");
            myEl = angular.element(document.querySelector('#content'));
            myEl.html("");
        }

    $scope.getPage()
}