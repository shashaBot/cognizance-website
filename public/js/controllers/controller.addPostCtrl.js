var app = angular.module('controller.addPostCtrl', []);

app.controller('addPostCtrl', function($scope, postService, $state){
  $scope.newPost = {
    type: 'magazine'
  };
  $scope.writeNewPost = function(formVar, postType){
    if(formVar.$valid){

      if(postType == 'magazine'){
        console.log("writing New magazine Post");
        //anglular ladda calls
        var issue = $scope.newPost.issueMonth + ', ' + $scope.newPost.issueYear;
        return postService.newMagazinePost($scope.newPost.title, $scope.newPost.body, issue, $scope.newPost.magLink, $scope.newPost.pdfLink).then(function(){
          console.log("written to database");
          //ladda calls
          $state.go('home');
          //show notification
        });
      }
      else{
        console.log("Writing blog post");
        return postService.newBlogPost($scope.newPost.title, $scope.newPost.body).then(function(){
          console.log("written to database");
          //
          $state.reload('home');
          //show notification
        });
      }
    }
    else{
      //form is Invalid
      alert('Please fill all the required fields');
    }
  };
 $scope.months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
 $scope.years = ['2012', '2013', '2014', '2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022', '2023', '2024', '2025', '2026', '2027', '2028', '2029'];
});
