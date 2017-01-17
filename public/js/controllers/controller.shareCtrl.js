var app = angular.module('controller.shareCtrl', []);

app.controller('shareCtrl', function($scope, Socialshare){
  $scope.fbShare = function(post){
    Socialshare.share({
     'provider': 'facebook',
     'attrs': {
       'socialshareUrl': 'https://cognizance-dc325.firebaseapp.com/#/read/' + post.date,
       'socialshareVia': '1576264192675940',
       'socialshareTitle': post.title + ' | ' + post.issue,
       'socialshareText': 'Check out this post by \'Cognizance: The BVPIEEE-HKN e-newsletter\'.',
       'socialshareHashtags': 'Cognizance, ' + post.issue + ', BVPIEEE-HKN'
      }
    });
  };

  $scope.gpShare = function(post){
    Socialshare.share({
     'provider': 'google',
     'attrs': {
     'socialshareUrl': 'https://cognizance-dc325.firebaseapp.com/#/read/' + post.date
      }
    });
  };

  $scope.pkShare = function(post){
    Socialshare.share({
     'provider': 'pocket',
     'attrs': {
     'socialshareUrl': 'https://cognizance-dc325.firebaseapp.com/#/read/' + post.date,
     'socialshareText': 'Check out this post by \'Cognizance: The BVPIEEE-HKN e-newsletter\' ... '+ post.title + ' | ' + post.issue
      }
    });
  };

  $scope.wsShare = function(post){
    Socialshare.share({
     'provider': 'whatsapp',
     'attrs': {
     'socialshareUrl': 'https://cognizance-dc325.firebaseapp.com/#/read/' + post.date,
     'socialshareTitle': post.title + ' | ' + post.issue,
     'socialshareText': 'Check out this post by \'Cognizance: The BVPIEEE-HKN e-newsletter\'.'
      }
    });
  };

  $scope.twShare = function(post){
    Socialshare.share({
     'provider': 'twitter',
     'attrs': {
       'socialshareUrl': 'https://cognizance-dc325.firebaseapp.com/#/read/' + post.date,
       'socialshareHashtags': 'Cognizance, ' + post.issue + ', BVPIEEE-HKN',
       'socialshareTitle': post.title + ' | ' + post.issue,
       'socialshareText': 'Check out this post by \'Cognizance: The BVPIEEE-HKN e-newsletter\'.'
      }
    });
  };
});
