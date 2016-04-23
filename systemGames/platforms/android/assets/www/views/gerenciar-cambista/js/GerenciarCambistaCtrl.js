/**
 * Created by Ademar on 20/01/2016.
 */
(function() {

	'use strict';

	var app = angular.module('materialAdmin');

	app.controller('GerenciarCambistaCtrl', ['$scope', '$rootScope', '$location', '$modal','gerenciarCambistaFactory', function($scope, $rootScope, $location, $modal,gerenciarCambistaFactory){
		$rootScope.titulo = "jogos";
		$rootScope.activetab = $location.path();
		$rootScope.esconderHeader = true;

		$scope.ToggleCampeonato = false;


		$scope.openModalGerenciarCambista = function () {

			var modalScope = $rootScope.$new();
			modalScope.modalInstance = $modal.open({
				templateUrl: 'views/gerenciar-cambista/modals/modal-gerenciar-cambista.html',
				controller: 'GerenciarCambistaCtrl',
				scope: modalScope
			});

		};
		
		
		$scope.openModaDadosPessoais = function(cambista){

			var modalInstance = $modal.open({
				templateUrl: 'views/gerenciar-cambista/modals/modal-dados-pessoais.html',
				controller: ModaDadosPessoais,
				resolve: {
					cambista: function () {
						return cambista;
					}
				}
			});

		}
		
		function ModaDadosPessoais($scope, $uibModalInstance, cambista) {
			
			$scope.cambista = cambista;
			
			console.log($scope.cambista);
			
			$scope.cancel = function () {
				$uibModalInstance.dismiss('cancel');
			};
			
		}
		
		
		$scope.openModaLimiteTaxa = function(cambista){

			var modalInstance = $modal.open({
				templateUrl: 'views/gerenciar-cambista/modals/modal-limite-taxa-cambista.html',
				controller: LimiteTaxa,
				resolve: {
					cambista: function () {
						return cambista;
					}
				}
			});

		}
		
		function LimiteTaxa($scope, $uibModalInstance, cambista) {
			
			$scope.cambista = cambista;
			
			console.log($scope.cambista);
			
			$scope.cancel = function () {
				$uibModalInstance.dismiss('cancel');
			};
			
		}

		$scope.cancel = function(){


			$scope.modalInstance.close();


		};

		function AtualizarCambista($scope, $uibModalInstance, cambista, gerenciarCambistaFactory) {


			$scope.cambista = cambista;

			$scope.salvar = function() {
				gerenciarCambistaFactory.salvar($scope.cambista).then(function(data) {


					if(data == "OK") {

						swal("Aviso!", "Alterado com Sucesso.", "success");

						pesquisarPorSeqUsuario();
						$uibModalInstance.dismiss('cancel');
					}

				});


			};



			$scope.cancel = function () {
				$uibModalInstance.dismiss('cancel');
			};
		};

		$scope.editarCambista = function(cambista){

			var modalScope = $rootScope.$new();
			modalScope.modalInstance = $modal.open({
				templateUrl: 'views/gerenciar-cambista/modals/modal-gerenciar-cambista.html',
				controller: AtualizarCambista,
				scope: modalScope,
				resolve: {
					cambista: function () {
						return cambista;
					}
				}
			});
			$scope.cancel = function () {
				$uibModalInstance.dismiss('cancel');
			};

		}

		$scope.salvar = function() {

			var usuarioLogado = JSON.parse(localStorage.getItem("usuarioLogado"));

			$scope.cambista.usuarioVO = {};
			$scope.cambista.usuarioVO.sequencial = usuarioLogado.sequencial;

			console.log($scope.cambista);


			gerenciarCambistaFactory.salvar($scope.cambista).then(function(data) {


				if(data == 'OK') {

					swal("Aviso!", "Salvo com Sucesso.", "success");
					pesquisarPorSeqUsuario();
					$scope.modalInstance.close();

				}

			});



		};



		$scope.remover = function (cambista) {

			swal({
				title: "Deseja Realmente Remover?",
				text: "",
				type: "warning",
				showCancelButton: true,
				confirmButtonColor: "#DD6B55",
				confirmButtonText: "Sim",
				closeOnConfirm: false
			}, function(){

				gerenciarCambistaFactory.remover(cambista).then(function(resposta){


					if(resposta == "OK"){

						swal("Aviso!", "Removido com Sucesso.", "success");

						pesquisarPorSeqUsuario();
					}


				});

			});
		}



		pesquisarPorSeqUsuario();
		function pesquisarPorSeqUsuario() {

			gerenciarCambistaFactory.pesquisarPorSeqUsuario().then(function(dado) {

				$rootScope.cambistas = dado;
				console.log(dado);

			})

		}


	}]);

}());
