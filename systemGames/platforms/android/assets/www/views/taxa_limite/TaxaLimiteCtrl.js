
(function() {

	'use strict';

	var app = angular.module('materialAdmin');

	app.controller('TaxaLimiteCtrl', ['$scope', '$rootScope', '$location', '$modal', 'TaxaLimiteFactory', 'jogo', '$uibModalInstance',  function($scope, $rootScope, $location, $modal, TaxaLimiteFactory, jogo, $uibModalInstance){
		$rootScope.titulo = "jogos";
		$rootScope.activetab = $location.path();
		$rootScope.esconderHeader = true;

		$scope.ToggleCampeonato = false;

		$scope.jogo = jogo;

		var usuario = JSON.parse(localStorage.getItem("usuarioLogado"));


		$scope.salvar = function(){


			$scope.limiteApostaVO.jogoVO = {};
			$scope.limiteApostaVO.jogoVO.sequencial = jogo.sequencial;
			$scope.limiteApostaVO.usuarioVO = {};
			$scope.limiteApostaVO.usuarioVO.sequencial = usuario.sequencial;

			TaxaLimiteFactory.salvar($scope.limiteApostaVO).then(function(resposta) {

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

			TaxaLimiteFactory.buscarTodosPorSeqJogoEUsuario(jogo).then(function(resposta) {

				var limitesApostaVOCopy = angular.copy(resposta);

				$scope.limiteApostaVO = limitesApostaVOCopy;
				
				console.log(limitesApostaVOCopy);

			})

		}


	}]);

}());
