/**
 * Created by Ademar on 20/01/2016.
 */
(function() {

	'use strict';

	var app = angular.module('materialAdmin');

	app.controller('GerenciarJogosCtrl', ['$scope','TaxaLimiteFactory', '$rootScope', '$location', '$modal', 'CampeonatoFactory', 'EsporteFactory', 'GerenciarJogoFactory', function($scope,TaxaLimiteFactory, $rootScope, $location, $modal, CampeonatoFactory, EsporteFactory, GerenciarJogoFactory){
		$rootScope.titulo = "jogos";
		$rootScope.activetab = $location.path();
		$rootScope.esconderHeader = true;
		
		var usuarioAlunoLogado = JSON.parse(localStorage.getItem("aprendizLogado"));

		$scope.ToggleCampeonato = false;

		$scope.mostrar = false;


		$scope.imprimirTabelaJogos = function () {

			$scope.mostrar = true;

			var page = document.getElementById('PDFtoPrint');


			$scope.mostrar = false;

			cordova.plugins.printer.print(page, 'Document.html', function () {
				//alert('printing finished or canceled')

			});


		}



		$scope.cancel = function(){

			$scope.modalInstance.close();

		}

		$scope.salvar = function() {

			console.log($scope.jogo);

			GerenciarJogoFactory.salvar($scope.jogo).then(function(resposta){


				if(resposta == "OK"){


					listartodos();
					$scope.modalInstance.dismiss();

					swal("Aviso!", "Cadastrado com Sucesso.", "success");

				}


			});
		} 


		$scope.filtro = function(item){
			console.log(item);
			if(item.codigo == 1){

				return item;

			}

		};
		listartodos();

		function listartodos() {

			TaxaLimiteFactory.buscarTodosPorSeqUsuario().then(function(resposta) {

				var jogosCopy = angular.copy(resposta);

				$rootScope.jogos = jogosCopy;

				console.log($scope.jogos);

			});

		}


		listarCampeonatos();

		function listarCampeonatos(){

			CampeonatoFactory.listarTodos().then(function(resposta) {

				var capeonatosCopy = angular.copy(resposta);

				$rootScope.campeonatos = capeonatosCopy;

				console.log($rootScope.campeonatos);

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

		/*$scope.openModalInserirJogo = function () {

			var modalScope = $rootScope.$new();
			modalScope.modalInstance = $modal.open({
				templateUrl: 'views/gerenciar-jogo/modals/modal-gerenciar-jogo.html',
				controller: 'GerenciarJogosCtrl',
				scope: modalScope
			});

		};

		$scope.openModalGerenciarEsporte = function () {

			var modalScope = $rootScope.$new();
			modalScope.modalInstance = $modal.open({
				templateUrl: 'views/esportes/modals/modal-gerenciar-esporte.html',
				controller: 'EsportesCtrl',
				scope: modalScope
			});

		};

		$scope.openModalGerenciarCampeonato = function () {

			var modalScope = $rootScope.$new();
			modalScope.modalInstance = $modal.open({
				templateUrl: 'views/campeonato/modals/modal-gerenciar-campeonato.html',
				controller: 'CampeonatoCtrl',
				scope: modalScope
			});

		};

		$scope.openModalGerenciarResultadoJogo = function (jogo) {

			var modalScope = $rootScope.$new();
			modalScope.modalInstance = $modal.open({
				templateUrl: 'views/gerenciar-resultado/modals/modal-gerenciar-resultado-jogo.html',
				controller: 'GerenciarResultadoCtrl',
				scope: modalScope,
				resolve: {
					jogo: function () {
						return jogo;
					}
				}
			});

		};

		$scope.editarJogo = function(jogo){

			var modalScope = $rootScope.$new();
			modalScope.modalInstance = $modal.open({
				templateUrl: 'views/gerenciar-jogo/modals/modal-gerenciar-jogo.html',
				controller: AtualizarJogo,
				scope: modalScope,
				resolve: {
					jogo: function () {
						return jogo;
					}
				}
			});

		}
		
		$scope.openModalApostaRealizada = function(jogo){
			
			//console.log($scope.jogos,"Obj completo");

			var modalInstance = $modal.open({
				templateUrl: 'views/gerenciar-jogo/modals/modal-aposta-realizada.html',
				controller: ApostaRealizada,
				resolve: {
					jogo: function () {
						return jogo;
					}
				}
			});

		}
		
		function ApostaRealizada($scope, $uibModalInstance, jogo) {
			
			$scope.jogo = jogo;
			
			console.log($scope.jogo);
			
			$scope.cancel = function () {
				$uibModalInstance.dismiss('cancel');
			};
			
		}
		
		$scope.openModaTaxaLimite = function(jogo){
			

			var modalInstance = $modal.open({
				templateUrl: 'views/taxa_limite/modals/modal-taxa-limite.html',
				controller: 'TaxaLimiteCtrl',
				resolve: {
					jogo: function () {
						return jogo;
					}
				}
			});

		}
		
		
	
		
		function TaxaLimite($scope, $uibModalInstance, jogo) {
			
			$scope.jogo = jogo;
			
			console.log($scope.jogo);
			
			$scope.cancel = function () {
				$uibModalInstance.dismiss('cancel');
			};
			
		}

		function AtualizarJogo($scope, $uibModalInstance, jogo, EsporteFactory, CampeonatoFactory) {


			$scope.jogo = jogo;


			$scope.salvar = function() {
				swal("Aviso!", "Atualizado com Sucesso.", "success");
			
				console.log();

				GerenciarJogoFactory.salvar($scope.jogo).then(function(resposta){


					if(resposta == "OK"){


						listartodos();
						$uibModalInstance.dismiss('cancel');
						swal("Aviso!", "Cadastrado com Sucesso.", "success");
					}


				});
			} 


			function listartodos() { 

				GerenciarJogoFactory.listarTodos().then(function(resposta) {

					var jogosCopy = angular.copy(resposta);

					$rootScope.jogos = jogosCopy;

					console.log($scope.jogos);

				});

			}



			EsporteFactory.listarTodos().then(function(resposta) {

				var esportesCopy = angular.copy(resposta);

				$scope.esportes = esportesCopy;

				console.log($scope.esportes);

			});


			CampeonatoFactory.listarTodos().then(function(resposta) {

				var capeonatosCopy = angular.copy(resposta);

				$scope.campeonatos = capeonatosCopy;

				console.log($scope.campeonatos);

			});
			
			$scope.cancel = function () {
				$uibModalInstance.dismiss('cancel');
			};

		};

		$scope.cancel = function () {
			$uibModalInstance.dismiss('cancel');
		};


		$scope.cancel = function(){

			$scope.modalInstance.close();

		};


		$scope.remover = function (jogo) {

			swal({   
				title: "Deseja Realmente Remover?",   
				text: "",   
				type: "warning",   
				showCancelButton: true,   
				confirmButtonColor: "#DD6B55",   
				confirmButtonText: "Sim",   
				closeOnConfirm: false
			}, function(){ 

				GerenciarJogoFactory.remover(jogo).then(function(resposta){


					if(resposta == "OK"){

						swal("Aviso!", "Removido com Sucesso.", "success");
						listartodos();

					}


				});

			});
		}
		*/
		
	


	}]);

}());
