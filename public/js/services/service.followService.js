var app = angular.module('service.followService', []);

app.factory('followService', function($q){
  var self = {};

  //adding new follower
  self.newFollower = function(email) {
      // A post entry.
      var followerData = {
          email: email
      };
      var newFollowerKey = firebase.database().ref().child('followers').push().key;
      // Write the new post's data simultaneously in the posts list and the user's post list.
      var updates = {};
      updates['/followers/' + newFollowerKey] = followerData;
      return firebase.database().ref().update(updates);
    };
  return self;
});
