materialAdmin
.factory('GerenciarResultadoFactory', ['$http','$q', function($http,$q){

	var urlRaiz = 'http://107.170.26.161:8080/SystemGames/rest/resultado_jogo/'; 


	function salvar(jogo){

		var retorno = $q.defer();

		$http.post(urlRaiz + 'salvar', jogo)
		.success(function(resposta) {

			retorno.resolve(resposta);
		})
		.error(function(resposta, status) {

			console.log(resposta);
			console.log(status);
		})

		return retorno.promise;

	}
	
	
	function atualizar(jogo){

		var retorno = $q.defer();

		$http.put(urlRaiz + 'atualizar', jogo)
		.success(function(resposta) {

			retorno.resolve(resposta);
		})
		.error(function(resposta, status) {

			console.log(resposta);
			console.log(status);
		})

		return retorno.promise;

	}


	return {

		salvar: salvar,
		atualizar: atualizar
	}



}]);



/*
 'cabecalhoConsulta':{'registroANS':guiaConsulta.fabrica,'numeroGuiaPrestador': guiaConsulta.numGuiaPrestador},*/
