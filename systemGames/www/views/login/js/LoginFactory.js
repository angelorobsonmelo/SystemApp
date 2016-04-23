(function () {

	'use strict';

	var app = angular.module('materialAdmin');

	app.factory('LoginFactory', ['$http', '$q', '$location', 'growlService', function ($http, $q, $location, growlService) {


		var urlRaiz;
		var redirecionamento;


		function autenticar(usuario, url) {


			if (url == '/login-cambista') {


				urlRaiz = 'http://107.170.26.161:8080/SystemGames/rest/cambista/';




			}
			else if (url == '/login-usuario') {

				urlRaiz = 'http://107.170.26.161:8080/SystemGames/rest/usuario/';



			}

			$http.post(urlRaiz + 'autenticar', usuario)
			.success(function (resposta) {

				if (resposta != '') {

					if (resposta.tipoUsuarioVO.sequencial == 2) {

						localStorage.setItem('usuarioLogado', angular.toJson(resposta));

						$location.path('/home');

					} 

					else if (resposta.tipoUsuarioVO.sequencial == 1) {

						localStorage.setItem('usuarioLogado', angular.toJson(resposta));

						$location.path('/gerenciar-jogo-admin');
					}



					else if (resposta.tipoUsuarioVO.sequencial == 3) {

						localStorage.setItem('usuarioLogado', angular.toJson(resposta));
						
						growlService.growl('Bem-vindo ' + resposta.nome + '!', 'inverse');
						
						$location.path('/gerenciar/gerenciar-aposta');
						

					}

				} else {

					swal("Aviso!", "Usuário Inválido", "warning");

				}

			})
			.error(function (error, status) {

				console.log(error);
			})


		}


		return {
			autenticar: autenticar

		}

	}]);

}());