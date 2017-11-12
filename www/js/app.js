var app = angular.module('myApp', []);

app.controller('myCtrl', function ($scope, $filter, $http) {
 	$scope.today = new Date();
 	$scope.numeroParte;
 	$scope.totalHoras = "00:00";
 	$scope.mantenimiento = 0;
 	$scope.mantenimientoText = "No";

  var config = {
    apiKey: "AIzaSyBRHf3QTmXwrmNX3vnvjYRLroOpLYgUQPk",
    authDomain: "pepeapp-e6fc3.firebaseapp.com",
    databaseURL: "https://pepeapp-e6fc3.firebaseio.com",
    projectId: "pepeapp-e6fc3",
    storageBucket: "pepeapp-e6fc3.appspot.com",
    messagingSenderId: "517134154769"
  };

    firebase.initializeApp(config);
    var database = firebase.database();

    $scope.sebadal = "Revisión Nave I El Sebadal";
    $scope.tiendasLP = "Revisión tienda confección Las Palmas, dos plantas de Almacén y dos de oficinas" +
    				    "\n" + "Revisión tienda J.M. Durán dos plantas" +
    				    "\n" + "Revisión tienda Calzados y almacén";
    $scope.arucas = "Revisión tienda confección Arucas y almacén" +
    				"\n" + "Revisión tienda Calzados Arucas y almacén" +
    				"\n" + "Revisión garajes Arucas 2 plantas";
    $scope.maspalomas = "Revisión tienda Maspalomas" +
    					"\n" + "Revisión almacén Calzados Maspalomas" +
    					"\n" + "Revisión garajes y zonas comunes de Maspalomas";
	$scope.SietePalmas = "Revisión tienda de 7 Palmas";								    

function recuperarUltimoParte(){
	var numParteTrabajo=database.ref("partes_de_trabajo").limitToLast(1);
	database.ref("partes_de_trabajo").limitToLast(1).once('value').then(function(snapshot) {
  		// The Promise was "fulfilled" (it succeeded).
  		var ultimoParte = snapshot.val();
		angular.forEach(ultimoParte, function(value, key) {
			  $scope.numeroParteAnterior = key;
		});
  		$scope.$apply(function () {
            $scope.numeroParteNuevo = ++$scope.numeroParteAnterior;
        });
	}, function(error) {
	  // The Promise was rejected.
	  console.error(error);
	});
}

$("#time-2" ).bind( "change", function(event, ui) {
  
var hora2 = ($('#time-1').val()).split(":");
var hora1 = ($('#time-2').val()).split(":");
var t1 = new Date();
var t2 = new Date();

t1.setHours(hora1[0], hora1[1]);
t2.setHours(hora2[0], hora2[1]);

t1.setHours(t1.getHours() - t2.getHours(), t1.getMinutes() - t2.getMinutes());

$scope.$apply(function () {
	$scope.totalHoras = (t1.getHours() ? t1.getHours() + (t1.getHours() > 1 ? " horas" : " hora") : "") + (t1.getMinutes() ? ", " + t1.getMinutes() + (t1.getMinutes() > 1 ? " minutos" : " minuto") : "");
});
});

$("#lugar").bind( "change", function(event, ui) {
	var options =  parseInt(event.currentTarget.value);
	$('#textarea-1').textinput().val("");
	switch(options) {
    case 1:
        $('#textarea-1').textinput().val($scope.sebadal);
        break;
    case 2:
        $('#textarea-1').textinput().val($scope.tiendasLP);
        break;
    case 3:
        $('#textarea-1').textinput().val($scope.arucas);
        break;
    case 4:
        $('#textarea-1').textinput().val($scope.maspalomas);
        break;
    case 5:
    	$('#textarea-1').textinput().val($scope.SietePalmas);
    	break;    
}
});

$("#mantenimiento" ).bind( "change", function(event, ui) {
	$scope.mantenimiento = parseInt(event.currentTarget.value);

	if($scope.mantenimiento == 1){
		$scope.mantenimientoText = "Si";
		$('#lugar').selectmenu('enable');
  		$('#time-1').textinput('disable');
		$('#time-2').textinput('disable');
		$scope.totalHoras = "00:00";
	}
	if($scope.mantenimiento == 0){
		$scope.mantenimientoText = "No";
		$('#lugar').selectmenu('disable');
  		$('#time-1').textinput('enable');
		$('#time-2').textinput('enable');
	}
});

$("#cerrarPopup").popup("close");

function validation(){
	$scope.errores = 0;
	$scope.erroresText_1 = "";
	$scope.erroresText_2 = "";
	$scope.erroresText_3 = "";
	$scope.erroresText_4 = "";
	$scope.errorHora = "";
    $scope.cliente = $("#select-cliente option:selected").text();
    $scope.mailCliente = $('#correo-cliente').val();
    $scope.es_mantenimiento = $scope.mantenimientoText;
    $scope.lugar = $("#lugar option:selected").text();
    $scope.textArea = $('#textarea-1').val();
	$scope.horaEntrada = $('#time-1').val();
	$scope.horaSalida = $('#time-2').val();
	$scope.totalHoras;
	$scope.firmante = $('#firmante').val();
	var canvas = $("#canvas").get(0);
	$scope.imgData = canvas.toDataURL();
	$scope.horaEntrada = $('#time-1').val();

	if($scope.mantenimiento == 0){
		if($scope.horaEntrada > $scope.horaSalida){
			++$scope.errores;
			$scope.errorHora = "La hora de entrada no puede ser mayor a la hora de salida";
		}
		if($scope.horaEntrada == ""){
			++$scope.errores;
			$scope.erroresText_2 = "Hay que rellenar la hora de entrada";
		}
		if($scope.horaSalida == ""){
			++$scope.errores;
			$scope.erroresText_3 = "Hay que rellenar la hora de salida";
		}
	}
	if($scope.textArea == ""){
		++$scope.errores;
		$scope.erroresText_1 = "El campo 'trabajo realizado' está vacio";
	}
	if($scope.firmante == ""){
		++$scope.errores;
		$scope.erroresText_4 = "Es necesario indicar quién firma";
	}
}

$scope.enviar = function() {

    validation();
    if($scope.errores>=1){
		$("#popupBasic").popup("open");
    }else{

    	var fecha = $filter('date')($scope.today, "dd-MM-yyyy");     
	    var refPartesTrabajo=database.ref("partes_de_trabajo");		

		refPartesTrabajo.child($scope.numeroParteNuevo).set({
			fecha: fecha,
			cliente: $scope.cliente,
			mailCliente: $scope.mailCliente,
			es_mantenimiento: $scope.es_mantenimiento,
			lugar: $scope.lugar,
			trabajo_realizado: $scope.textArea,
			horaEntrada: $scope.horaEntrada,
			horaSalida: $scope.horaSalida,
			totalHoras: $scope.totalHoras,
			firma: $scope.imgData,
			firmante: $scope.firmante
		});
		enviar_email();
		alert("Enviado");
		recuperarUltimoParte();
	}
}

function enviar_email(){
	var data = {
			numeroDeParte: $scope.numeroParteNuevo,
			fecha: $scope.today,
			cliente: $scope.cliente,
			mailCliente: $scope.mailCliente,
			es_mantenimiento: $scope.es_mantenimiento,
			lugar: $scope.lugar,
			trabajo_realizado: $scope.textArea,
			horaEntrada: $scope.horaEntrada,
			horaSalida: $scope.horaSalida,
			totalHoras: $scope.totalHoras,
			firma: $scope.imgData,
			firmante: $scope.firmante
	};

    var config = {
        headers : {
            'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
        }
    }
	$http(
	    {
	       method: 'POST',
	       url: 'http://triatlononline.es/PepeWeb/recibe-formulario.php', 
	       //url: 'http://localhost/pepeWeb/recibe-formulario.php', 
	       data: data  /*You data object/class to post*/
	    }).then(function successCallback(response) {
	    	console.log(response);
	    }, function errorCallback(response) {
	       // called asynchronously if an error occurs
	       // or server returns response with an error status.

	});

} 





recuperarUltimoParte();

});