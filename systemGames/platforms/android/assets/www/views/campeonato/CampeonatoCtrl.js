/**
 * Created by Ademar on 20/01/2016.
 */
(function() {

	'use strict';

	var app = angular.module('materialAdmin');

	app.controller('CampeonatoCtrl', ['$scope', '$rootScope', '$location', '$modal', 'CampeonatoFactory',  function($scope, $rootScope, $location, $modal, CampeonatoFactory){
		$rootScope.titulo = "jogos";
		$rootScope.activetab = $location.path();
		$rootScope.esconderHeader = true;

		$scope.ToggleCampeonato = false;


		$scope.salvar = function() {

			console.log($scope.campeonato);

			CampeonatoFactory.salvar($scope.campeonato).then(function(resposta){


				if(resposta == "OK"){


					listarCampeonatos();

					swal("Aviso!", "Cadastrado com Sucesso.", "success");

					$scope.campeonato = "";
				}


			});
		} 




		listarCampeonatos();

		function listarCampeonatos(){

			CampeonatoFactory.listarTodos().then(function(resposta) {

				var capeonatosCopy = angular.copy(resposta);

				$rootScope.campeonatos = capeonatosCopy;

				console.log($scope.campeonatos);

			});
		}


		$scope.editar = function (campeonato) {

			$scope.campeonato = campeonato;

		};




		$scope.cancel = function(){

			$scope.modalInstance.dismiss();

		};



		$scope.remover = function(campeonato) {

			swal({   
				title: "Deseja Realmente Remover?",   
				text: "",   
				type: "warning",   
				showCancelButton: true,   
				confirmButtonColor: "#DD6B55",   
				confirmButtonText: "Sim",   
				closeOnConfirm: false
			}, function(){ 

				CampeonatoFactory.remover(campeonato).then(function(resposta){


					if(resposta == "OK"){

						swal("Aviso!", "Removido com Sucesso.", "success");
						
						listarCampeonatos();
						
						$scope.campeonato = "";

					}


				});

			});
		} 


	}]);

}());
