var app = angular.module('myApp', []);

app.controller('myCtrl', function ($scope, $filter, $http) {
 	$scope.today = new Date();
 	$scope.numeroParte;
 	$scope.totalHoras = "00:00";
 	$scope.mantenimiento = 0;
 	$scope.mantenimientoText = "No";
 	$scope.averia = 0;
 	$scope.averiaText = "No";
 	$scope.tipoDeTrabajo = "";
 	$scope.esCasa = false;

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

    $scope.sebadalMantenimiento = "Revisión Nave I El Sebadal";
    $scope.sebadal = "El Sebadal";
    $scope.tiendasLPMantenimiento = "Revisión tienda confección Las Palmas, dos plantas de Almacén y dos de oficinas" +
    				    "\n" + "Revisión tienda J.M. Durán dos plantas" +
    				    "\n" + "Revisión tienda Calzados y almacén";
    $scope.tiendasLP = "Tienda LP";				    
    $scope.arucasMantenimiento = "Revisión tienda confección Arucas y almacén" +
    				"\n" + "Revisión tienda Calzados Arucas y almacén" +
    				"\n" + "Revisión garajes Arucas 2 plantas";
    $scope.arucas = "Arucas";				
    $scope.maspalomasMantenimiento = "Revisión tienda Maspalomas" +
    					"\n" + "Revisión almacén Calzados Maspalomas" +
    					"\n" + "Revisión garajes y zonas comunes de Maspalomas";
    $scope.maspalomas = "Maspalomas";					
	$scope.SietePalmasMantenimiento = "Revisión tienda de 7 Palmas";
	$scope.SietePalmas = "Siete Palmas";								    

function recuperarUltimoParte(){
	var numParteTrabajo=database.ref("partes_de_trabajo").limitToLast(1);
	database.ref("partes_de_trabajo").limitToLast(1).once('value').then(function(snapshot) {
  		// The Promise was "fulfilled" (it succeeded).
  		var ultimoParte = snapshot.val();
  		if(ultimoParte != null){
			angular.forEach(ultimoParte, function(value, key) {
				  $scope.numeroParteAnterior = key;
			});
	  		$scope.$apply(function () {
	            $scope.numeroParteNuevo = ++$scope.numeroParteAnterior;
	        });
  		}else{
	  		$scope.$apply(function () {
	            $scope.numeroParteNuevo = 1;
	        });
  		}
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
    	$scope.esCasa = false;
    	if($scope.mantenimiento == 1){
			$('#textarea-1').textinput().val($scope.sebadalMantenimiento);
    	}else{
        	$('#textarea-1').textinput().val($scope.sebadal);
    	}
        break;
    case 2:
    	$scope.esCasa = false;
    	if($scope.mantenimiento == 1){
			$('#textarea-1').textinput().val($scope.tiendasLPMantenimiento);
    	}else{
        	$('#textarea-1').textinput().val($scope.tiendasLP);
    	}
        break;
    case 3:
    	$scope.esCasa = false;
    	if($scope.mantenimiento == 1){
        	$('#textarea-1').textinput().val($scope.arucasMantenimiento);
    	}else{
			$('#textarea-1').textinput().val($scope.arucas);
    	}
        break;
    case 4:
    	$scope.esCasa = false;
    	if($scope.mantenimiento == 1){
        	$('#textarea-1').textinput().val($scope.maspalomasMantenimiento);
    	}else{
			$('#textarea-1').textinput().val($scope.maspalomas);
    	}
        break;
    case 5:
    	$scope.esCasa = false;
    	if($scope.mantenimiento == 1){
    		$('#textarea-1').textinput().val($scope.SietePalmasMantenimiento);
    	}else{
    		$('#textarea-1').textinput().val($scope.SietePalmas);
    	}
    	break; 
    case 6:
    	$scope.esCasa = true;
		$('#textarea-1').textinput().val("");
    	break;    
}
});

$("#mantenimiento" ).bind( "change", function(event, ui) {
	$scope.mantenimiento = parseInt(event.currentTarget.value);

	if($scope.mantenimiento == 1){
		$('#textarea-1').textinput().val("");
		$scope.mantenimientoText = "Si";
		$scope.averia = 0;
		$('#lugar').selectmenu('enable');
  		$('#time-1').textinput('disable');
		$('#time-2').textinput('disable');
		$scope.totalHoras = "00:00";
	}
	if($scope.mantenimiento == 0){
		$scope.mantenimientoText = "No";
		//$('#lugar').selectmenu('disable');
  		$('#time-1').textinput('enable');
		$('#time-2').textinput('enable');
	}
});

$("#averia" ).bind( "change", function(event, ui) {
	$scope.averia = parseInt(event.currentTarget.value);

	if($scope.averia == 1){
		$('#textarea-1').textinput().val("");
		$scope.averiaText = "Si";
		$scope.mantenimiento = 0;
		$('#mantenimiento').val('0');
		$('#mantenimiento').slider('refresh');

		$('#lugar').selectmenu('enable');
  		$('#time-1').textinput('enable');
		$('#time-2').textinput('enable');
		$scope.totalHoras = "00:00";
	}
	if($scope.averia == 0){
		$scope.averiaText = "No";
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
    $scope.es_averia = $scope.averiaText;
    $scope.lugar = $("#lugar option:selected").text();
    $scope.textArea = $('#textarea-1').val();
	$scope.horaEntrada = $('#time-1').val();
	$scope.horaSalida = $('#time-2').val();
	$scope.totalHoras;
	$scope.firmante = $('#firmante').val();
	var canvas = $("#canvas").get(0);
	$scope.imgData = canvas.toDataURL();
	$scope.horaEntrada = $('#time-1').val();

	if($scope.mantenimiento == 0 || $scope.averia == 1){
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
	if($scope.esCasa == false){
		if($scope.firmante == ""){
			++$scope.errores;
			$scope.erroresText_4 = "Es necesario indicar quién firma";
		}
	}
}

$scope.enviar = function() {
	var canvas = $("#canvas").get(0);
	$scope.imgData = canvas.toDataURL();
	if ((signaturePad.isEmpty()) && ($scope.esCasa == false)) {
		alert('La firma esta vacia');
	}else{
		$scope.fecha = $filter('date')($scope.today, "dd-MM-yyyy");     
	    var refPartesTrabajo=database.ref("partes_de_trabajo");		

	    if(($scope.averia == 1) && ($scope.mantenimiento == 0)){
	    	$scope.tipoDeTrabajo = "Avería";
	    }
	    else if(($scope.mantenimiento) == 1 && ($scope.averia== 0)){
			$scope.tipoDeTrabajo = "Mantenimiento";
	    }else{
	    	$scope.tipoDeTrabajo = "Obra";
	    }

		refPartesTrabajo.child($scope.numeroParteNuevo).set({
			fecha: $scope.fecha,
			cliente: $scope.cliente,
			mailCliente: $scope.mailCliente,
			tipoDeTrabajo: $scope.tipoDeTrabajo,
			lugar: $scope.lugar,
			trabajo_realizado: $scope.textArea,
			horaEntrada: $scope.horaEntrada,
			horaSalida: $scope.horaSalida,
			totalHoras: $scope.totalHoras,
			firma: $scope.imgData,
			firmante: $scope.firmante
		});
		enviar_email();
		$scope.reset();
		recuperarUltimoParte();
	}
}

function enviar_email(){
	var data = {
			numeroDeParte: $scope.numeroParteNuevo,
			fecha: $scope.fecha,
			cliente: $scope.cliente,
			mailCliente: $scope.mailCliente,
			tipoDeTrabajo: $scope.tipoDeTrabajo,
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
			alert("Enviado");
	    }, function errorCallback(response) {
	       // called asynchronously if an error occurs
	       // or server returns response with an error status.

	});

} 

$scope.popFirma = function(){
    validation();
    if($scope.errores>=1){
		$("#popupBasic").popup("open");
		window.scrollTo(0, 0);
    }else{
    	var w = screen.width;
    	var h = screen.height;
    	$("#firma").css('width', w);
    	$("#firma").css('height', 900);
		bloquear_campos();
		$("#firma").popup("open");
		window.scrollTo(0, 0);
	}
}

function bloquear_campos(){
	$('#select-cliente').selectmenu('disable');
	$('#mantenimiento').slider('disable');
	$('#averia').slider('disable');
   	$('#textarea-1').textinput('disable');
   	$('#lugar').selectmenu('disable');
	$('#time-1').textinput('disable');
	$('#time-2').textinput('disable');
	$('#firmante').textinput('disable');
}

function desbloquear_campos(){
	$('#select-cliente').selectmenu('enable');
	$('#mantenimiento').slider('enable');
	$('#averia').slider('enable');
   	$('#textarea-1').textinput('enable');
   	$('#lugar').selectmenu('enable');
	$('#time-1').textinput('enable');
	$('#time-2').textinput('enable');
	$('#firmante').textinput('enable');
}


$scope.reset = function() {
	desbloquear_campos();
	$('#mantenimiento').val('0');
	$('#mantenimiento').slider('refresh');
	$('#averia').val('0');
	$('#averia').slider('refresh');
	$scope.totalHoras = "00:00";
   	$('#textarea-1').val('');
	$('#time-1').val('');
	$('#time-2').val('');
	$('#firmante').val('');
	init_Sign_Canvas();
}

$scope.checkConnection = function(){
    var networkState = navigator.connection.type;

    var states = {};
    states[Connection.UNKNOWN]  = 'Unknown connection';
    states[Connection.ETHERNET] = 'Ethernet connection';
    states[Connection.WIFI]     = 'WiFi connection';
    states[Connection.CELL_2G]  = 'Cell 2G connection';
    states[Connection.CELL_3G]  = 'Cell 3G connection';
    states[Connection.CELL_4G]  = 'Cell 4G connection';
    states[Connection.CELL]     = 'Cell generic connection';
    states[Connection.NONE]     = 'No network connection';
    if(states[Connection.NONE]){
    	alert("Na hay conexión");
    }else{
    	$scope.enviar();
    }

}

recuperarUltimoParte();

});