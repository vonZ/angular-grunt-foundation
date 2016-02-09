/*! angular-grunt-foundation 2016-02-09 */
var app = angular.module("myApp", [ "ngRoute", "ngAnimate", "ui.router", "ui.bootstrap" ]);

app.controller("mainCtrl", [ "$scope", "$http", function(a, b) {
    console.log("Inne i mainCtrl");
} ]);

app.directive("loading", function() {
    return {
        restrict: "E",
        replace: true,
        template: '<div class="respCenter loading"><span>Laddar</span><img src="images/ajax-loader.gif" class="respCenterIcon"/></div>',
        link: function(a, b, c) {
            a.$watch("loading", function(a) {
                if (a) $(b).show(); else $(b).hide();
            });
        }
    };
});

app.factory("posts", [ "$http", function(a) {
    var b = {
        posts: []
    };
    b.get = function(b) {
        console.log("get post");
        return a.get("/posts/" + b).then(function(a) {
            return a.data;
        });
    };
    b.getAll = function() {
        console.log("get all posts");
        return a.get("/posts/").success(function(a) {
            angular.copy(a, b.posts);
        });
    };
    b.create = function(c) {
        return a.post("/posts", c).success(function(a) {
            console.log("data: ", a);
            b.posts.push(a);
        });
    };
    b.upvote = function(b) {
        return a.put("/posts/" + b._id + "/upvote").success(function(a) {
            b.upvotes += 1;
        });
    };
    b.deleteItem = function(b) {
        return a.put("/posts/" + b._id + "/delete").success(function(a) {
            console.log("success!");
        });
    };
    b.addComment = function(b, c) {
        console.log("add comment");
        return a.post("/posts/" + b + "/comments", c);
    };
    b.upvoteComment = function(b, c) {
        return a.put("/posts/" + b._id + "/comments/" + c._id + "/upvote").success(function(a) {
            c.upvotes += 1;
        });
    };
    return b;
} ]);

app.config([ "$stateProvider", "$urlRouterProvider", function(a, b) {
    a.state("home", {
        url: "/",
        templateUrl: "/index.html",
        controller: "mainController"
    });
    b.otherwise("home");
} ]);