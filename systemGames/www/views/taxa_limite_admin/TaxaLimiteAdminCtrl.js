
(function() {

	'use strict';

	var app = angular.module('materialAdmin');

	app.controller('TaxaLimiteAdminCtrl', ['$scope', '$rootScope', '$location', '$modal', 'TaxaLimiteAdminFactory', 'jogo', '$uibModalInstance',  function($scope, $rootScope, $location, $modal, TaxaLimiteAdminFactory, jogo, $uibModalInstance){
		$rootScope.titulo = "jogos";
		$rootScope.activetab = $location.path();
		$rootScope.esconderHeader = true;

		$scope.ToggleCampeonato = false;

		$scope.jogo = jogo;

		$scope.salvar = function(){

			$scope.limiteApostaVO.jogoVO = {};
			$scope.limiteApostaVO.jogoVO.sequencial = jogo.sequencial;

			TaxaLimiteAdminFactory.salvar($scope.limiteApostaVO).then(function(resposta) {

				if(resposta == 'OK'){

					swal("Aviso!", "Cadastrado com Sucesso.", "success");

				}

			})


		}


		$scope.salvarLimiteUsuario = function(limiteApostaVO){

			TaxaLimiteAdminFactory.salvar(limiteApostaVO).then(function(resposta) {

				if(resposta == 'OK'){

					swal("Aviso!", "Cadastrado com Sucesso.", "success");

				}

			})


		}


		$scope.cancel = function () {
			$uibModalInstance.dismiss('cancel');
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



			});
		} 

		listarLimiteTaxa();
		function listarLimiteTaxa() {

			TaxaLimiteAdminFactory.buscarTodosPorSeqJogo(jogo).then(function(resposta) {

				var limitesApostaVOCopy = angular.copy(resposta);

				$scope.limitesApostasVO = limitesApostaVOCopy;

				console.log(limitesApostaVOCopy);

			})

		}


	}]);

}());
