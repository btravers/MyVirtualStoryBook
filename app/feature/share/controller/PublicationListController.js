'use strict';

angular.module('myVirtualStoryBookApp')
  .controller('PublicationListController', function ($scope, $state,$mdSidenav, $modal, $filter, PlayerService, BookService, GameService) {

    $scope.editBook = function(book){
      $state.go("app.write.book",{id:book.id});
    }
    
    $scope.books = PlayerService.player.books;
    
    $scope.loaders = PlayerService.player.loaders;
    
    $scope.updateBooks = function(){
      PlayerService.player.refreshBooks();
    }
    
    $scope.openDeleteBookModal = function(book){
      $scope.modalYesNo = {
        title:"Demande de confirmation",
        content:"Voulez vous supprimer definitivement le livre partagé : '"+book.name+"' ?",
        yes:{
          label:"Oui",
          action: function(){
            BookService.deleteBook(book).success($scope.updateBooks);
            $scope.modal.close();
          }
        },
        no:{
          label:"Non",
          action: function(){
            $scope.modal.dismiss()
          }
        }
      };
      $scope.modal = $modal.open({
        templateUrl: 'feature/common/modal/ModalYesNo.template.html',
        scope: $scope
      });
    }
    
  });