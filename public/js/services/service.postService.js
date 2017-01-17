var app = angular.module('service.postService', []);

app.factory('postService', function($state, $stateParams, $q, $timeout) {

    var self = {
        'loading': false,
        'page': 1
    };
    var postsPerPage = 5;
    var page = 1;
    self.newMagazinePost = function(title, body="Let us know how you like it!", issue, magLink, pdfLink) {

        var postData = {
            title: title,
            body: body,
            magLink: magLink,
            pdfLink: pdfLink,
            issue: issue,
            type: "magazine",
            date: new Date()
        };

      // Get a key for a new Post.
      var newPostKey = firebase.database().ref().child('posts').push().key;
      // Write the new post's data simultaneously in the posts list and the user's post list.
      var updates = {};
      updates['/posts/' + newPostKey] = postData;
      return firebase.database().ref().update(updates);
    };

    self.editMagazinePost = function(title, body="Let us know how you like it!", issue, magLink, pdfLink, postKey) {
        var postData = {
            body: body,
            title: title,
            magLink: magLink,
            pdfLink: pdfLink,
            issue: issue,
            type: "magazine",
            date: self.selectedPost.date,
            editedDate: new Date()
        };

      var updates = {};
      updates['/posts/' + postKey] = postData;
      return firebase.database().ref().update(updates);
    };

    self.newBlogPost = function(title, body){
      var postData = {
        title: title,
        body: body,
        type: "blog",
        date: new Date()
      };

      var updates = {};
      var newPostKey = firebase.database().ref().child('posts').push().key;
      updates['/posts/' + newPostKey] = postData;
      return firebase.database().ref().update(updates);

    };

    self.editBlogPost = function(title, body, postKey){
      var postData = {
        title: title,
        body: body,
        type: "blog",
        date: selectedPost.date
      };
      var updates = {};
      updates['/posts/' + postKey] = postData;
      return firebase.database().ref().update(updates);
    };

    var dataRef = firebase.database().ref();

    self.load = function() {
        var d = $q.defer();

        self.loading = true;
        console.log("self.load::" + page);
        var queryPosts = dataRef.child('posts').orderByKey().limitToLast(postsPerPage*self.page);

        queryPosts.on("value", function(data) {
          //order incoming data
          if(data.val()){
            var ordered = self.orderPosts(data.val());
          }
          //compare if old data and data received is same
            if (JSON.stringify(self.posts) === JSON.stringify(ordered) && self.page!==1) {
                console.log("no more data");
                self.hasMore = false;
            } else {
                console.log("there is more data");
                self.hasMore = true;
            }

            self.posts = {};
            self.posts = ordered;

            console.log("postService::on function called: ");
            self.loading = false;
            d.resolve(self.posts);
        });

        self.loading = false;

        return d.promise;

    };

    var findPostKey = function(postDate){
      for (var key in self.posts) {
          if (self.posts[key].date === postDate) {
              return key;
          }
      }
    };

    self.loadMore = function() {
      if (self.hasMore && !self.loading) {
          self.loading = true;
          self.page += 1;
          console.log("postService :: load more");
          return self.load();
      }
    };
    self.orderPosts = function(unordered){
      var ordered = {};
      Object.keys(unordered).reverse().forEach(function(key) {
        ordered[key] = unordered[key];
      });

      return ordered;
    };

    self.selectPost = function(postDate) {
        self.selectPostKey = findPostKey(postDate);
        self.selectedPost = self.posts[self.selectPostKey];
        return self.selectedPost;

    };

    self.deletePost = function (postKey){
      firebase.database().ref('/posts/' + postKey).remove().then(function(){
        $state.go('home');
      });
    }

    return self;
});
