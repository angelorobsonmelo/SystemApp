(function() {

	'use strict';

	var app = angular.module('materialAdmin');

	app.factory('EsporteFactory', ['$http', '$q', function($http, $q){


		var urlRaiz = 'http://107.170.26.161:8080/SystemGames/rest/esporte/'; 

		function listarTodos(){

			var retorno = $q.defer();

			$http.get(urlRaiz + 'listarTodos')
			.success(function(data) {

				retorno.resolve(data);
			})
			.error(function(data, status) {

				console.log(data);
				console.log(status);
			})

			return retorno.promise;


		}


		function salvar(esporte){

			var retorno = $q.defer();

			$http.post(urlRaiz + 'salvar', esporte)
			.success(function(data) {

				retorno.resolve(data);
			})
			.error(function(data, status) {

				console.log(data);
				console.log(status);
			})

			return retorno.promise;


		}

		function remover(esporte){

			var retorno = $q.defer();

			$http.delete(urlRaiz + 'remover/' + esporte.sequencial)
			.success(function(data) {

				retorno.resolve(data);
			})
			.error(function(data, status) {

				console.log(data);
				console.log(status);
			})

			return retorno.promise;


		}


		return {

			listarTodos: listarTodos,
			salvar: salvar,
			remover: remover


		}

	}]);

}());