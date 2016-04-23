(function() {

	'use strict';

	var app = angular.module('materialAdmin');

	app.factory('TaxaLimiteAdminFactory', ['$http', '$q', function($http, $q){


		var urlRaiz = 'http://107.170.26.161:8080/SystemGames/rest/taxa_limite/'; 

		function buscarTodosPorSeqJogo(jogo){

			var retorno = $q.defer();


			$http.get(urlRaiz + 'listarPorSeqJogo/' + jogo.sequencial)
			.success(function(data) {

				retorno.resolve(data);
			})
			.error(function(data, status) {

				console.log(data);
				console.log(status);
			})

			return retorno.promise;


		}


		function salvar(limiteApostaVO){

			var retorno = $q.defer();

			$http.post(urlRaiz + 'salvarAdmin', limiteApostaVO)
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

			buscarTodosPorSeqJogo: buscarTodosPorSeqJogo,
			salvar: salvar,
			remover: remover


		}

	}]);

}());