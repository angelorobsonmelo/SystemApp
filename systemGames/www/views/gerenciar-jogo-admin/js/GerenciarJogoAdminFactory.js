(function() {

	'use strict';

	var app = angular.module('materialAdmin');

	app.factory('GerenciarJogoAdminFactory', ['$http', '$q', function($http, $q){


		var urlRaiz = 'http://107.170.26.161:8080/SystemGames/rest/jogo/'; 

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


		function salvar(jogo) {

			var retorno = $q.defer();

			$http.post(urlRaiz + 'salvar', jogo)
			.success(function(resposta) {



				retorno.resolve(resposta);



			})
			.error(function(resposta, status) {

				alert("Erro Status: " + status);
				retorno.resolve(resposta);
			})

			return retorno.promise;

		}

		function remover(jogo) {

			var retorno = $q.defer();

			$http.delete(urlRaiz + 'remover/'+ jogo.sequencial)
			.success(function(resposta) {



				retorno.resolve(resposta);



			})
			.error(function(resposta, status) {

				alert("Erro Status: " + status);
				retorno.resolve(resposta);
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