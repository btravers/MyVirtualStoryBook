'use strict';

angular.module('myVirtualStoryBookApp')
  .controller('WritePageController', function ($scope, $state, $stateParams, $timeout, BookService, PageService, D3Service) {

    $scope.savePage = function(){
      PageService.updatePage($scope.page);
    }
    
    $scope.pageLoading=true;
    $scope.transitionsLoading=true;
    
    PageService.getPage($stateParams.id).success(function(page){
      $scope.page = page;
      $scope.pageLoading=false;
      BookService.getBookPages($scope.page.book.id).success(function(pages){
        $scope.pages = pages;
        $scope.transitionsLoading=false;
      });
    });
    
    $scope.addNewTransition = function(){
      $scope.transitionsLoading=true;
      PageService.updatePage($scope.page).success(function(){
        PageService.addNewTransition($scope.page).success(function(){
          PageService.getTransitions($scope.page).success($scope.updateTransitions);
        });
      });
    };
    
    $scope.updateTransitions = function(transitions){
      $scope.page.transitions = transitions;
      $scope.transitionsLoading=false;
    }
    
    $scope.deleteTransition = function(transition){
      PageService.updatePage($scope.page).success(function(){
        PageService.deleteTransition(transition).success(function(){
          PageService.getTransitions($scope.page).success($scope.updateTransitions);
        });
      })
    };
    
    $scope.addNewPage = function(transition){
      BookService.addNewPage($scope.page.book).success(function(page){
        transition.to_page = page;
        PageService.updatePage($scope.page).success(function(){
          $state.go("app.write.page",{id:page.id});
        });
      });
    }
    
  });
