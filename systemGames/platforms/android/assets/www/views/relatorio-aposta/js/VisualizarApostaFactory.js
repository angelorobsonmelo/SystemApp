materialAdmin
.factory('VisualizarApostaFactory', ['$http','$q', 'GerenciarApostaFactory', function($http,$q, GerenciarApostaFactory){


	var urlRaiz = 'http://107.170.26.161:8080/SystemGames/rest/aposta/';
		var usuarioLogado = JSON.parse(localStorage.getItem("usuarioLogado"));



	function buscarAposta(aposta2, $scope) {

		var retorno = $q.defer();
		var dataInicial = new Date();
		var codUsuario;

		if(usuarioLogado.tipoUsuarioVO.sequencial != 3){

			codUsuario = usuarioLogado.sequencial;

		}else{
			codUsuario = usuarioLogado.usuarioVO.sequencial;
		}


		if(aposta2.dtFinal == null){
			aposta2.dtFinal = aposta2.dtInicial;
		}

		if(aposta2.dtFinal == null){
			aposta2.dtFinal = aposta2.dtInicial;
		}

		var apostaToJson = function () {
			return angular.toJson({

				"cambistaVO":{"sequencial": aposta2.seq, "usuarioVO": {"sequencial": codUsuario}},
				"dataInicial": aposta2.dtInicial,
				"dataFinal": aposta2.dtFinal,
				"codigo": aposta2.codigo

			});
		};

		apostaToJson();

		$http.post(urlRaiz + 'apostaPorParams',apostaToJson()).success(function(resultado) {

			retorno.resolve(resultado);
			console.log(resultado);
			var somaValorPago = 0;

			if(resultado == null){
				var dlg = dialogs.error('Atenção','Nenhum resultado encotrado, selecione outro filtro');
			}

			angular.forEach(resultado, function(item, index) {


				if(resultado[index].resultadoAposta == 'SIM'){
					somaValorPago += resultado[index].valRetornoPossivel;

				}

			});

			$scope.valorPago = somaValorPago;
			console.log($scope.valorPago);


		})
		.error(function(data) {
			alert('Sistema indisponível no momento...');
			console.log(data);
		});


		return retorno.promise;

	}

	function listarPorSequencial(aposta, $scope) {
		console.log(aposta);
		var retorno = $q.defer();

		var apostaToJson = function () {
			return angular.toJson({

				"sequencial": aposta

			});
		};

		apostaToJson();

		$http.post(urlRaiz + 'apostaPorSeq',apostaToJson()).success(function(resultado) {



			console.log(resultado);

			var resultadoBilhete = [];
			var verificadorVitoria = [];

			angular.forEach(resultado, function(item, index) {


				if(item.jogoApostadoVO2.tipoAposta == 'Casa') {


					if(item.resultadoJogoVO.resultadoCasa >  item.resultadoJogoVO.resultadoFora){

						item.status = 'SIM';

						resultadoBilhete.push(item);

						verificadorVitoria.push(item);


					}else if(item.resultadoJogoVO.resultadoCasa <  item.resultadoJogoVO.resultadoFora){


						item.status = 'NÃO';

						resultadoBilhete.push(item);

					}

				}

				if(item.jogoApostadoVO2.tipoAposta == 'Fora') {


					if(item.resultadoJogoVO.resultadoCasa <  item.resultadoJogoVO.resultadoFora){

						item.status = 'SIM';

						resultadoBilhete.push(item);

						verificadorVitoria.push(item);


					}else if(item.resultadoJogoVO.resultadoCasa >  item.resultadoJogoVO.resultadoFora){


						item.status = 'NÃO';

						resultadoBilhete.push(item);

					}

				}

				if(item.jogoApostadoVO2.tipoAposta == 'Empate') {


					if(item.resultadoJogoVO.resultadoCasa ==  item.resultadoJogoVO.resultadoFora){

						item.status = 'SIM';

						resultadoBilhete.push(item);

						verificadorVitoria.push(item);


					}else if(item.resultadoJogoVO.resultadoCasa !=  item.resultadoJogoVO.resultadoFora){


						item.status = 'NÃO';

						resultadoBilhete.push(item);

					}

				}

				if(item.jogoApostadoVO2.tipoAposta == 'Ambos') {


					if(item.resultadoJogoVO.resultadoCasa > 0 &&  item.resultadoJogoVO.resultadoFora > 0){

						item.status = 'SIM';

						resultadoBilhete.push(item);

						verificadorVitoria.push(item);


					}else if(item.resultadoJogoVO.resultadoCasa == 0 ||  item.resultadoJogoVO.resultadoFora == 0){


						item.status = 'NÃO';

						resultadoBilhete.push(item);

					}

				}

				if(item.jogoApostadoVO2.tipoAposta == 'Dupla Chance') {


					if(item.resultadoJogoVO.resultadoCasa !=  item.resultadoJogoVO.resultadoFora){

						item.status = 'SIM';

						resultadoBilhete.push(item);

						verificadorVitoria.push(item);


					}else if(item.resultadoJogoVO.resultadoCasa == item.resultadoJogoVO.resultadoFora){


						item.status = 'NÃO';

						resultadoBilhete.push(item);



					}

				}

				if(item.jogoApostadoVO2.tipoAposta == 'Gol e Meio') {


					var resultadoMenos = item.resultadoJogoVO.resultadoCasa -  item.resultadoJogoVO.resultadoFora;

					var resultadoMenos2 = item.resultadoJogoVO.resultadoFora - item.resultadoJogoVO.resultadoCasa;

					if(resultadoMenos >= 2 || resultadoMenos2 >= 2){

						item.status = 'SIM';

						resultadoBilhete.push(item);

						verificadorVitoria.push(item);


					}else if(resultadoMenos < 2 || resultadoMenos2 < 2){


						item.status = 'NÃO';

						resultadoBilhete.push(item);

					}

				}



			});

			console.log(resultadoBilhete);
			console.log(verificadorVitoria);

			if(resultado.length == verificadorVitoria.length){
console.log(verificadorVitoria.length);
				console.log(resultado.length);
				GerenciarApostaFactory.inserirResultadoAposta(verificadorVitoria[0]).then(function(resposta) {

					if(resposta == 'OK'){

						console.log("salvo ok");
					}

				})

				console.log("ganhou todos");


			}else{


				$scope.apostaVO = {};
				$scope.apostaVO.status = "NÃO";
				$scope.apostaVO.sequencial = aposta;
				GerenciarApostaFactory.inserirResultadoAposta($scope.apostaVO).then(function(resposta) {

					if(resposta == 'OK'){

						console.log("salvo ok");
					}

				})

				console.log("Perdeu");
			}



			retorno.resolve(resultadoBilhete);
			if(resultado == null){
				var dlg = dialogs.error('Atenção','Nenhum resultado encotrado, selecione outro filtro');
			}

		})
		.error(function(data) {
			alert('Sistema indisponível no momento...');
			console.log(data);
		});


		return retorno.promise;

	}

	function atualizar(aposta){

		var retorno = $q.defer();

		$http.put(urlRaiz + 'atualizar', aposta)
		.success(function(resposta) {

			retorno.resolve(resposta);
		})
		.error(function(resposta, status) {

			console.log(resposta);
			console.log(status);
		})

		return retorno.promise;

	}

		function cancelarAposta(cancelar){

			var retorno = $q.defer();

			$http.put(urlRaiz + 'atualizarStatus', cancelar)
				.success(function(resposta) {

					retorno.resolve(resposta);
				})
				.error(function(resposta, status) {

					console.log(resposta);
					console.log(status);
				})

			return retorno.promise;

		}

		function listaBilhete(aposta, $scope){
			var valPago = 0;
			var status = '';
			var usuarioAlteracao = '';
			var retorno = $q.defer();

			$http.get(urlRaiz + 'bilhete/' + aposta.codigo)
				.success(function(resposta) {

					retorno.resolve(resposta);

					if(resposta[0].resultadoAposta == 'SIM'){
						status = resposta[0].resultadoAposta = 'Ganhou';
						valPago = resposta[0].valRetornoPossivel;
					}else if(resposta[0].resultadoAposta == 'NÃO') {
						status = resposta[0].resultadoAposta = 'Perdeu';
						valPago = 0;
					}else if(resposta[0].resultadoAposta == null || resposta[0].resultadoAposta == 0) {
						status = resposta[0].resultadoAposta = 'Em Aberto';
						valPago = '';
					}

					if(resposta[0].dthAlteracao != null ){
						usuarioAlteracao = resposta[0].cambistaVO.apelido;
						status = 'Cancelado';
						valPago = 0;
					}

					$scope.resultado = status;
					$scope.valorPago = valPago;
					$scope.usuario = usuarioAlteracao;
					console.log(status + ' ' + valPago);
				})
				.error(function(resposta, status) {

					console.log(resposta);
					console.log(status);
				})

			return retorno.promise;

		}

		function listarBilhetePorSequencial(aposta) {
			console.log(aposta);
			var retorno = $q.defer();

			var apostaToJson = function () {
				return angular.toJson({

					"sequencial": aposta

				});
			};

			apostaToJson();

			$http.post(urlRaiz + 'apostaPorSeq',apostaToJson()).success(function(resultado) {


				retorno.resolve(resultado);
				console.log(resultado);







			})
				.error(function(data) {
					alert('Sistema indisponível no momento...');
					console.log(data);
				});


			return retorno.promise;

		}




	return {


		buscarAposta: buscarAposta,
		listarPorSequencial: listarPorSequencial,
		atualizar: atualizar,
		cancelarAposta: cancelarAposta,
		listaBilhete: listaBilhete,
		listarBilhetePorSequencial: listarBilhetePorSequencial

	}



}]);
