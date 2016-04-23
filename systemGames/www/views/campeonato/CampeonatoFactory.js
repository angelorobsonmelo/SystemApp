(function() {

	'use strict';

	var app = angular.module('materialAdmin');

	app.factory('CampeonatoFactory', ['$http', '$q', function($http, $q){


		var urlRaiz = 'http://107.170.26.161:8080/SystemGames/rest/campeonato/'; 

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
		
		
		function salvar(campeonato){

			var retorno = $q.defer();

			$http.post(urlRaiz + 'salvar', campeonato)
			.success(function(data) {

				retorno.resolve(data);
			})
			.error(function(data, status) {

				console.log(data);
				console.log(status);
			})

			return retorno.promise;


		}

		function remover(campeonato){

			var retorno = $q.defer();

			$http.delete(urlRaiz + 'remover/' + campeonato.sequencial)
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