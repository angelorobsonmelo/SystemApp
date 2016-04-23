/**
 * Created by Ademar on 20/01/2016.
 */
(function() {

	'use strict';

	var app = angular.module('materialAdmin');

	app.controller('RelatorioCambistaCtrl', ['$scope','VisualizarApostaFactory', '$rootScope', '$location', '$modal',  function($scope,VisualizarApostaFactory, $rootScope, $location, $modal){
		$rootScope.titulo = "jogos";
		$rootScope.activetab = $location.path();
		$rootScope.esconderHeader = true;
		$scope.teste = false;
		$scope.imprimirBilhete = false;
		var usuarioLogado = JSON.parse(localStorage.getItem("usuarioLogado"));
		$scope.usuarioBilhete = usuarioLogado;
		console.log(usuarioLogado);

	/*	function DetalheAposta($scope, $uibModalInstance, aposta, VisualizarApostaFactory) {


			$scope.aposta = aposta;

			console.log($scope.aposta);*/

			/*listartodos();*/

			$scope.listarDetalheBilhete = function() {


				$scope.teste = true;

				$scope.teste = false;


				VisualizarApostaFactory.listarBilhetePorSequencial($scope.bilhete[0].sequencial).then(function(data) {


					var apostaCopy = angular.copy(data);

					$rootScope.detalheAposta = apostaCopy;



					console.log($scope.detalheAposta);



					var page = document.getElementById('PDFtoPrint');


					cordova.plugins.printer.print(page, 'Document.html', function () {
						//alert('printing finished or canceled')

					});



				});
				/*$scope.atualiza = function(aposta){
					console.log(aposta);
					VisualizarApostaFactory.atualizar($scope.aposta).then(function(resposta) {

						if(resposta == 'OK'){

							swal("Aviso!", "Alterado com Sucesso.", "success");

						}

					});
				}*/






			};
/*


			$scope.cancel = function () {
				$uibModalInstance.dismiss('cancel');
			};
		};*/

/*
		$scope.openModalVizulizarDadosAposta = function (aposta) {

			var modalScope = $rootScope.$new();
			modalScope.modalInstance = $modal.open({
				templateUrl: 'views/relatorio-aposta/modals/modal-visualizar-dados-aposta.html',
				controller: DetalheAposta,
				scope: modalScope,
				resolve: {
					aposta: function () {
						return aposta;
					}
				}
			});
			$scope.cancel = function () {
				$uibModalInstance.dismiss('cancel');
			};

		};*/
		
		$scope.cancel = function(){

			$scope.modalInstance.dismiss();

		};



		$scope.listarBilhete = function(aposta) {
			$scope.imprimirBilhete = true;
			VisualizarApostaFactory.listaBilhete(aposta, $scope).then(function(resposta) {

				var bilheteCopy = angular.copy(resposta);

				$rootScope.bilhete = bilheteCopy;

				console.log($scope.bilhete);

			});

		}

		$rootScope.bilhete = '';


	}]);

}());
