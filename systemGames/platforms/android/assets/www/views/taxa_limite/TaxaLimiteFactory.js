(function() {

	'use strict';

	var app = angular.module('materialAdmin');

	app.factory('TaxaLimiteFactory', ['$http', '$q', function($http, $q){


		var urlRaiz = 'http://107.170.26.161:8080/SystemGames/rest/taxa_limite/'; 

		function buscarTodosPorSeqJogoEUsuario(jogo){

			var retorno = $q.defer();

			var usuario = JSON.parse(localStorage.getItem("usuarioLogado"));

			$http.get(urlRaiz + 'listarPorSeqJogoEUsuario/' + jogo.sequencial + '/' + usuario.sequencial)
			.success(function(data) {

				retorno.resolve(data);
			})
			.error(function(data, status) {

				console.log(data);
				console.log(status);
			})

			return retorno.promise;


		}
		
		
		function buscarTodosPorSeqUsuario(){

			var retorno = $q.defer();

			var usuario = JSON.parse(localStorage.getItem("usuarioLogado"));

			$http.get(urlRaiz + 'listarPorSeqUsuario/' + usuario.usuarioVO.sequencial)
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

			$http.post(urlRaiz + 'salvar', limiteApostaVO)
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

			buscarTodosPorSeqJogoEUsuario: buscarTodosPorSeqJogoEUsuario,
			buscarTodosPorSeqUsuario: buscarTodosPorSeqUsuario,
			salvar: salvar,
			remover: remover


		}

	}]);

}());