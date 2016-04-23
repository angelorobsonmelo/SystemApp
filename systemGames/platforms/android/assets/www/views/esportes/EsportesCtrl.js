/**
 * Created by Ademar on 20/01/2016.
 */
(function() {

	'use strict';

	var app = angular.module('materialAdmin');

	app.controller('EsportesCtrl', ['$scope', '$rootScope', '$location', '$modal',  'EsporteFactory',  function($scope, $rootScope, $location, $modal, EsporteFactory){
		$rootScope.titulo = "jogos";
		$rootScope.activetab = $location.path();
		$rootScope.esconderHeader = true;

		$scope.ToggleCampeonato = false;

		$scope.salvar = function() {

			console.log($scope.esporte);

			EsporteFactory.salvar($scope.esporte).then(function(resposta){


				if(resposta == "OK"){

					swal("Aviso!", "Cadastrado com Sucesso.", "success");

					listarEsportes();
					
					$scope.esporte = "";

				}


			});
		} 


		$scope.remover = function(esporte) {

			swal({   
				title: "Deseja Realmente Remover?",   
				text: "",   
				type: "warning",   
				showCancelButton: true,   
				confirmButtonColor: "#DD6B55",   
				confirmButtonText: "Sim",   
				closeOnConfirm: false
			}, function(){   
				EsporteFactory.remover(esporte).then(function(resposta){


					if(resposta == "OK"){

						swal("Aviso!", "Removido com Sucesso.", "success");

						listarEsportes();
						
						$scope.esporte = "";

					}


				});
			});


		} 


		listarEsportes();

		function listarEsportes(){

			EsporteFactory.listarTodos().then(function(resposta) {

				var esportesCopy = angular.copy(resposta);

				$rootScope.esportes = esportesCopy;

				console.log($rootScope.esportes);

			});
		}


		$scope.editar = function(esporte){

			$scope.esporte = esporte;

		}




		$scope.cancel = function(){

			$scope.modalInstance.dismiss();

		};




	}]);

}());
