/**
 * Created by Ademar on 20/01/2016.
 */
(function() {

	'use strict';

	var app = angular.module('materialAdmin');

	app.controller('GerenciarJogoAdminCtrl', ['$scope', '$rootScope', '$location', '$modal', 'CampeonatoFactory', 'EsporteFactory', 'GerenciarJogoAdminFactory', 'TaxaLimiteAdminFactory', function($scope, $rootScope, $location, $modal, CampeonatoFactory, EsporteFactory, GerenciarJogoAdminFactory, TaxaLimiteAdminFactory){
		$rootScope.titulo = "jogos";
		$rootScope.activetab = $location.path();
		$rootScope.esconderHeader = true;


		$scope.ToggleCampeonato = false;

		$scope.cancel = function(){

			$scope.modalInstance.close();

		}

		$scope.openModaTaxaLimiteAdmin = function(jogo){


			TaxaLimiteAdminFactory.buscarTodosPorSeqJogo(jogo).then(function(resposta) {

				var limitesApostaVOCopy = angular.copy(resposta);

				console.log(limitesApostaVOCopy);

				if(limitesApostaVOCopy != ''){

					var modalInstance = $modal.open({
						templateUrl: 'views/taxa_limite_admin/modals/modal-taxa-limite-admin.html',
						controller: 'TaxaLimiteAdminCtrl',
						resolve: {
							jogo: function () {
								return jogo;
							}
						}
					});

				}else {

					var modalInstance = $modal.open({
						templateUrl: 'views/taxa_limite_admin/modals/modal-taxa-limite.html',
						controller: 'TaxaLimiteAdminCtrl',
						resolve: {
							jogo: function () {
								return jogo;
							}
						}
					});

				}

			})




		}



		$scope.salvar = function() {

			console.log($scope.jogo);

			GerenciarJogoAdminFactory.salvar($scope.jogo).then(function(resposta){


				if(resposta == "OK"){


					listartodos();
					$scope.modalInstance.dismiss();

					swal("Aviso!", "Cadastrado com Sucesso.", "success");

				}


			});
		} 


		listartodos();

		function listartodos() { 


			var jogosArray = [];

			GerenciarJogoAdminFactory.listarTodos().then(function(resposta) {

				var jogosCopy = angular.copy(resposta);

				angular.forEach(jogosCopy, function(item, index) {

					var myDate = new Date(item.dataJogo);

					myDate = new Date(myDate.getUTCFullYear(), myDate.getUTCMonth(), myDate.getUTCDate());

					item.dataJogo = myDate;

					jogosArray.push(item)

				})






				$rootScope.jogos = jogosArray;

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

		$scope.openModalInserirJogo = function () {

			var modalScope = $rootScope.$new();
			modalScope.modalInstance = $modal.open({
				templateUrl: 'views/gerenciar-jogo-admin/modals/modal-gerenciar-jogo-admin.html',
				controller: 'GerenciarJogoAdminCtrl',
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

			var myDate = new Date(jogo.dataJogo);

			myDate = new Date(myDate.getUTCFullYear(), myDate.getUTCMonth(), myDate.getUTCDate());

			jogo.dataJogo = myDate;

			var modalScope = $rootScope.$new();
			modalScope.modalInstance = $modal.open({
				templateUrl: 'views/gerenciar-jogo-admin/modals/modal-gerenciar-jogo-admin.html',
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

			//console.log($scope.jogos,"Obj completo");

			var modalInstance = $modal.open({
				templateUrl: 'views/gerenciar-jogo/modals/modal-taxa-limite.html',
				controller: TaxaLimite,
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


				var myDate = new Date($scope.jogo.dataJogo);

				myDate = new Date(myDate.getUTCFullYear(), myDate.getUTCMonth(), myDate.getUTCDate());

				$scope.jogo.dataJogo = myDate;

				GerenciarJogoAdminFactory.salvar($scope.jogo).then(function(resposta){


					if(resposta == "OK"){

						listartodos();
						$uibModalInstance.dismiss('cancel');
						swal("Aviso!", "Cadastrado com Sucesso.", "success");
					}


				});
			} 


			function listartodos() { 

				GerenciarJogoAdminFactory.listarTodos().then(function(resposta) {

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

				GerenciarJogoAdminFactory.remover(jogo).then(function(resposta){


					if(resposta == "OK"){

						swal("Aviso!", "Removido com Sucesso.", "success");
						listartodos();

					}


				});

			});
		}


	}]);

}());
