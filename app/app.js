'use strict';

/**
 * @ngdoc overview
 * @name myVisualStoryBookApp
 * @description
 * # myVisualStoryBookApp
 *
 * Main module of the application.
 */
var myVirtualStoryBookApp = angular
  .module('myVirtualStoryBookApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ui.utils',
    'ui.router',
    'ui.bootstrap',
    'angular.layout'
  ]).config(function($stateProvider, $urlRouterProvider){

        // For any unmatched url, send to /signup
        //TODO: à changer plus tard.
        $urlRouterProvider.otherwise("/signin");
        
        // /player place seulement le header, on redirige donc vers une page avec un contenu.
        $urlRouterProvider.when("/player","/player/mygames");
        
        //idem
        $urlRouterProvider.when("/edition","/player/mygames");
        
        //idem
        $urlRouterProvider.when("/game","/player/mygames");
        $stateProvider
            //Portail
            .state('signup', {
                url: "/signup",
                templateUrl: "feature/portal/view/Signup.html"
            })
            .state('signin', {
                url: "/signin",
                templateUrl: "feature/portal/view/Signin.html",
                controller: "SignInController"
            })
            
            
            //Joueur
            .state('player', {
                url: "/player",
                templateUrl: "feature/player/template/Player.template.html"
            })
            .state('player.books', {
                url: "/books",
                templateUrl: "feature/player/view/Books.html",
                controller: "PlayerBooksController"
            })
            .state('player.myprofile', {
                url: "/myprofile",
                templateUrl: "feature/player/view/MyProfile.html",
                controller: "PlayerProfileController"
            })
            
            
            //Edition
            .state('edition', {
                url: "/edition",
                templateUrl: "feature/edition/template/Edition.template.html",
                abstract: true
            })
            
            //Jeu
            .state('game', {
                url: "/game/{id}",
                templateUrl: "feature/game/view/CurrentGame.html",
                controller: "GameController"
            })
    });