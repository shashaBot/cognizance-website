var app = angular.module('controller.readCtrl', []);

app.controller('readCtrl', function($scope, postService, $stateParams, $timeout, $location){
  $scope.loading = true;
  if(!postService.posts){
    $scope.loading = true;
    postService.load().then(function(){
      $scope.selectedPost = postService.selectPost($stateParams.id);
      $scope.selectedPostKey = postService.selectPostKey;
      $timeout(function(){
        $scope.loading = false;
      }, 2000);
    });
  }
  else{
    $timeout(function(){
      $scope.loading = false;
    }, 2000);
    $scope.selectedPost = postService.selectPost($stateParams.id);
    $scope.selectedPostKey = postService.selectPostKey;
  }
  $scope.disqusConfig = {
    disqus_shortname: 'cognizance-4',
    disqus_identifier: $stateParams.id,
    disqus_url: 'https://cognizance-dc325.firebaseapp.com' + $location.path()
  };
  $scope.goToComments = function(){
    let scrollTo = $('.comment-section').position();
    $("html, body").animate({ scrollTop:  scrollTo.top}, 1500);
  };
  console.log($scope.selectedPostKey);
  $scope.commentsLoaded = false;
  $scope.disqusLoaded = function(){
    $scope.commentsLoaded = true;
    console.log('disqus comments loaded');
    //other stuff you wanna do when comments get loaded
  };
  $scope.deletePost = function (postKey){
    postService.deletePost(postKey);
  }
});
