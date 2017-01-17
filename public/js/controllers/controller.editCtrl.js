var app = angular.module('controller.editCtrl', []);

app.controller('editCtrl', function($scope, postService, $state, $stateParams){
  console.log(postService.selectedPost);
  console.log($stateParams.id);
  $scope.editPost = postService.selectedPost;
  console.log($scope.editPost);
  $scope.editPostKey = postService.selectPostKey;
  $scope.editPost = function(formVar, postType){
    if(formVar.$valid){

      if(postType == 'magazine'){
        console.log("Editing magazine Post");
        //anglular ladda calls
        var issue = $scope.editPost.issueMonth + ', ' + $scope.editPost.issueYear;
        return postService.editMagazinePost($scope.editPost.title, $scope.editPost.body, issue, $scope.editPost.magLink, $scope.editPost.pdfLink, $scope.editPostKey).then(function(){
          console.log("written to database");
          //ladda calls
          $state.go('home');
          //show notification
        }, function(error){
          alert(error);
        });
      }
      else{
        console.log("Editing blog post");
        return postService.newBlogPost($scope.editPost.title, $scope.editPost.body, $scope.editPostKey).then(function(){
          console.log("written to database");
          //
          $state.go('home');
          //show notification
        }, function (error){
          alert(error);
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
