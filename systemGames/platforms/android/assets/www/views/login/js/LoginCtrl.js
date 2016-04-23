/**
 * Created by Ademar on 20/01/2016.
 */
(function () {

    'use strict';

    var app = angular.module('materialAdmin');

    app.controller('loginCtrl', ['$scope', '$rootScope', '$location', '$modal', 'LoginFactory', function ($scope, $rootScope, $location, $modal, LoginFactory) {
        $rootScope.titulo = "Login";
        $rootScope.activetab = $location.path();
        $rootScope.esconderHeader = true;

        $scope.ToggleCampeonato = false;

        localStorage.removeItem("usuarioLogado");

        var url = $location.path();

        //Status

        this.login = 1;
        this.register = 0;
        this.forgot = 0;

        console.log(url);

        $scope.autenticar = function () {

            console.log($scope.usuario, url);

            LoginFactory.autenticar($scope.usuario, url);

        }


    }]);

}());
