var myapp=angular.module("loginApp",["ngRoute","firebase"]);

myapp.config(["$routeProvider","$locationProvider",function($routeProvider,$locationProvider){
    
    $routeProvider.when("/register",{
        title:"register",
        templateUrl:"views/register.html",
        controller:"registerCtr"
    }).when("/login",{
        title:"login",
        templateUrl:"views/login.html",
        controller:"registerCtr"
    })
    
    .when("/success",{
        title:"success",
        templateUrl:"views/success.html",
        controller:"successCtr"
    })
    .when("/home",{
        title:"home",
        templateUrl:"views/home.html",
       controller:"homectr"
    }).otherwise({
        redirectTo:"/login.html"
    });
}])