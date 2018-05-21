myapp.controller("loginCtr" , function($scope,$firebaseAuth,$location) {
    $scope.username=myService.getUser();
    if($scope.username){
        $location.path("/success");
    }
    $scope.login=function(){
        $scope.message = "welcome" + $scope.user.email;
        var username=$scope.user.email;
        var password=$scope.user.password;

        var auth=$firebaseAuth();

        
            auth.$signInWithEmailAndPassword(username,password).then(function(){
                console.log("succesfully log in");
                $location.path("views/success.html");

            }).catch(function(err){
                console.log(err);
                $scope.errMsg=true;
                $scope.errorMessage=err.message;
            });
        
    }
    myapp.service("myService" , ["$location" , "$firebaseAuth" , function($location , $firebaseAuth){
    
        var user = "";
        var auth = $firebaseAuth();
        return {
          getUser : function(){
            if(user == ""){
              user = localStorage.getItem("userEmail");
            }
            return user;
          },
          setUser : function(value){
            localStorage.setItem("userEmail" , value);
            user = value;
          },
  
          logoutUser : function(){
            auth.$signOut().then(function(){
              console.log("signout");
                user = "";
                localStorage.removeItem("userEmail");
                localStorage.clear();
                $location.path("/login");
      
            }).catch(function(err){
              console.log(err);
            });
          }
        
});