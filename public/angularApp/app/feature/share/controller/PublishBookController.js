'use strict';

angular.module('myVirtualStoryBookApp')
  .controller('PublishBookController', function ($scope, $interval, $state, PlayerService, BookService, GameService) {

    $scope.books = PlayerService.player.books;
    $scope.init = function(){
      $scope.progressBarStyle = "primary";
      $scope.loading = 0;
      $scope.publishedOnce = false;
      $scope.showError = false;
    }
    
    $scope.publishBook = function(book){
      $scope.publishedOnce = true;
      $scope.showError = false;
      $scope.progressBarStyle = "primary";
      $scope.loading = 0;
      $interval(function(){
        $scope.loading += 25;
      }, 500, 4).then(function(){
        book.draft=false;
        BookService.updateBook(book).success(function(){
          PlayerService.player.refreshBooks(false);
          $scope.progressBarStyle = "success";
        }).error(function(){
          book.draft=true;
          $scope.progressBarStyle = "danger";
          $scope.showError = true;
        });
      });
    };
    
    $scope.init();
});
