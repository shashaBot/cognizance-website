var app = angular.module('controller.postCtrl', []);

app.controller('postCtrl', function($scope, Socialshare, postService, $location, $rootScope, $anchorScroll, $location, authService, $state) {


    $scope.loading = false;

    $scope.load = function() {
        $scope.loading = true;
        $scope.showLoadMore = false;
        postService.load().then(function(data) {
            if(data){
              $scope.posts = data;
              $scope.showLoadMore = true;
            }
            else{
              //no posts to display
              $scope.showLoadMore = false;
            }
            $scope.loading = false;
        }, function(){
          //loading failure error message
          $scope.showLoadMore = true;
        });
    };


    $scope.showLoadMore= true;
    $scope.loadMore = function() {
      console.log('loadMore called');
        if (!$scope.loading) {
            if(!postService.hasMore){
              $scope.showLoadMore = false;
              $scope.loading = false;
            }
            else{
              $scope.loading = true;
              postService.loadMore().then(function(data){
                if(data){
                  if(JSON.stringify(data)!==JSON.stringify($scope.posts))
                    $scope.posts = data;
                  else{
                    //notification of no more data
                    $scope.showLoadMore = false;
                  }
                }
                else{
                  //no data received, error
                }
                $scope.loading = false;
              });
            }
        }
    };
    $scope.load();

    for(var key in $scope.posts){
      if($scope.posts[key].type === 'blog'){
        var blogDate = new Date($scope.posts[key].date);
        $scope.posts[key].dateBlog = blogDate.toDateString();
        console.log($scope.posts[key].dateBlog);
      }
    }

    //back to top button function
    $scope.backToTop = function (){
        console.log('back to top called');
        var scrollTo = $('#scrollToSection').position();
        console.log('scrollTo:', scrollTo);
        $("html, body").animate({ scrollTop:  scrollTo.top}, 1000);
    };
    $scope.scrollToFollowSection = function (){
      console.log('scrolling to follow section');
      var scrollTo = $('#followSection').position();
      console.log('scrollTo:', scrollTo);
      $("html, body").animate({scrollTop: scrollTo.top}, 1000);
    };

});
