var app = angular.module('controller.followCtrl', []);

app.controller('followCtrl', function($scope, followService){
  $scope.followerEmail = "";
  //event listener for follower email enter
  var input = document.getElementsByName("email-input")[0];
  if (input.addEventListener) {
    input.addEventListener("keypress", function(e) {
        if (e.keyCode === 13) {
            // do stuff
            $scope.addFollower($scope.followerEmail);
            e.preventDefault();
        }
    }, false);
  }
  else if (input.attachEvent) {
    input.attachEvent("onkeypress", function(e) {
        if (e.keyCode === 13) {
            // do stuff
            $scope.addFollower($scope.followerEmail);
            return e.returnValue = false;
        }
    });
  }


  //load followers and store them in scope variable
  var followers = firebase.database().ref().child('followers');
  followers.on("value", function(data) {
    $scope.followers = {};
    $scope.followers = data.val();
  });
  //new follower
  $scope.addFollower = function (email){
    var alreadyPresent = false;
    for(var key in $scope.followers){
      if(email === $scope.followers[key].email){
        alreadyPresent = true;
        break;
      }
    }
    if(alreadyPresent){
      alert("Wow! You are already in our mailing list. Happy reading!");
      $scope.followerEmail = "";
    }
    else{
      followService.newFollower(email).then(function(){
        //show notification of successful addition to mailing list
        alert("Thanks for subscribing. '" + $scope.followerEmail + "' has been added to our mailing list.");
        $scope.followerEmail = "";
      });
    }
  };
});
