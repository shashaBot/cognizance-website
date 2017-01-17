var app = angular.module('controller.aboutCtrl', []);

app.controller('aboutCtrl', function($scope){
  $(document).ready(function() {

    $("#cogniOwlCarousel").owlCarousel({
      autoPlay: 5300, //Set AutoPlay to 3 seconds
      items : 4,
      itemsDesktop : [1199,3],
      itemsDesktopSmall : [979,3],
      lazyLoad: true,
    });

  });
});
