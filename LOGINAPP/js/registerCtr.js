myapp.controller("registerCtr" , function($scope,$firebaseAuth,$location,myService) {

   $scope.username=myService.getUser();
   if($scope.username){
       $location.path("/success");
   }

    $scope.register=function(){
        var username=$scope.user.email;
        var password=$scope.user.password;

        var auth=$firebaseAuth();

        if(username && password){
            auth.$createUserWithEmailAndPassword(username,password).then(function(){
                console.log("succesfully created");
                $location.path("/login");

            }).catch(function(err){
                console.log(err);
                $scope.errMsg=true;
                $scope.errorMessage=err.message;
            });
        };
    }
        var auth=$firebaseAuth();
        auth.$onAuthStateChanged(function(firebaseUser){
            if(firebaseUser){
                console.log("Signed in",firebaseUser.uid);
            }
            else{
                console.log("Signed out");
            }
    
        });

          //login
    $scope.login = function() {
        $scope.message = "Welcome " + $scope.user.email;
        var username = $scope.user.email;
        var password = $scope.user.password;
        var auth = $firebaseAuth();
    
        auth.$signInWithEmailAndPassword(username , password).then(function(){
          console.log("succusfully logged in");
          myService.setUser($scope.user.email);
          $location.path("/success");
        }).catch(function(err){
          console.log(err);
          $scope.errMsg = true;
          $scope.errorMessage = err.message;
        });
    }; 
});
        //normal service for set user

        myapp.service("myService",["$location","$firebaseAuth",function($location,$firebaseAuth){
            var user="";
            var auth=$firebaseAuth();
            return{
                getUser : function(){
                    if(user==""){
                        user=localStorage.getItem("userEmail");
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
                        localStorage.clearAll();
                        $location.path("/login");
              
                    }).catch(function(err){
                      console.log(err);
                    });
                  }
                };
        }]);

 

