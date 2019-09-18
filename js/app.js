$(document).ready(function()
{
  setTimeout(animateTitle,4000);
  generarTablero();
  pintarTablero();
  //procesarCiclo();
});


// Maneja el boton de inicio
// Inicia el contador 
// Cambia el texto
// Inicia el bucle del juego
$(".btn-reinicio").click(function() {
  setTimeout(esconderTablero,120000);
  procesarCiclo();
  setInterval(contarTiempo, 1000);
  $(".btn-reinicio").html('Reiniciar');
});

// Encuentra aciertos y renueva el tablero
function procesarCiclo(){
  var aciertos = encontrarAciertos();
  if(aciertos.length === 0){
    return
  }
  
  pintarAciertos(aciertos);
  setTimeout(function(){
    tablero = renovarTablero(aciertos);
    pintarTablero();
    puntaje = puntaje + aciertos.length;
    $("#score-text").html(puntaje);
    procesarCiclo();
  }, 3500)
}


// Animar titulo
function animateTitle()
{
  var div = $('h1');
  var color1 = '#DCFF0E';
  var color2 = '#C300F4';
  
  div.animate({color: color1}, 500, function()
  {
    div.animate({color: color2}, 500, function()
    {
      
    });
    div.animate({color: color1}, 200, function()
    {
      
    });
    div.animate({color: color2}, 200, function()
    {
      animateTitle();
    });
  });
}

// generar dulces aleatorimente 
var DULCES_POR_COL = 7;
var tablero = [];
var puntaje = 0;
var tiempoRestante = 120;

// retorna un numero aleatorio entre 1 y 4
function genCaramelo() {
  var numero = Math.floor((Math.random()*(5 - 1)) + 1);
  return numero;
}

function generarTablero(){
  for (var i = 0; i < 7; i++) {
    tablero[i] = [];
      for (var j = 0; j < 7; j++) {
        tablero[i][j] = genCaramelo();
      }
  }
}

function pintarTablero(){
  for (var i = 0; i < 7; i++) {
    $(".col-"+(i+1)).empty()
    for (var j = 0 ; j < 7; j++) {
      var numero = tablero[i][j];
      var ruta = "image/"+numero+".png";
      var imgElement = $("<img>", {
          'src': ruta,
          'id': 'caramelo-'+i+'-'+j,
          'style': 'width: 97px; height: 97px'
          })
      $(".col-"+(i+1)).append(imgElement)
    }
  }
}

//Encontrar aciertos

function encontrarAciertos(){
  var aciertos = [];
  for (var i = 0; i < 7; i++){
    var contador = 0;
    for (var j = 0 ; j < 7; j++){
      if (tablero[i][j] === tablero[i][j-1]) {
        contador+=1;
      }
      else {
        if (contador >= 2) {
          agregarAciertos(null, i, j - 1, contador + 1, aciertos)
        }
        contador = 0;
      }
    }
    if (contador >= 2) {
      agregarAciertos(null, i, 6, contador + 1, aciertos)
    }
  }
  for (var j = 0; j < 7; j++){
    var contador = 0;
    for (var i = 1 ; i < 7; i++){
      if (tablero[i][j] === tablero[i-1][j]) {
        contador+=1;
      }
      else {
        if (contador >= 2) {
          agregarAciertos(j, null, i - 1, contador + 1, aciertos)
        }
        contador = 0;
      }
    }
    if (contador >= 2) {
       agregarAciertos(j, null, 6, contador + 1, aciertos)
    }
  }
  //console.log(aciertos)
  return aciertos;
}


function agregarAciertos(fila, columna, posFinal, longitud, aciertos){
  for(var i=0; i<longitud; i++){
    var x
    var y
    if(fila !== null){
      y = fila
      x = posFinal - i
    }else{
      x = columna
      y = posFinal - i
    }
    aciertos.push([x, y])
  }
}

/* Pinta en el tablero los caramelos que son parte de un acierto 
parametros: aciertos (lista)
returna: null

*/
function pintarAciertos(aciertos){
  //console.log(aciertos, aciertos.length)
  for (var i = 0; i < aciertos.length; i++) {
    var x = aciertos[i][0]
    var y = aciertos[i][1]
    $("#caramelo-"+x+"-"+y).fadeOut(3000, 'linear');
  }  
}



/* Filtra el tablero quitando los aciertos y agrega nuevos caramelos en el tope de cada fila
parametros: aciertos(lista)
retorna: el nuevo estado del tablero. */

function renovarTablero(aciertos){
  var nuevoTablero = [];
  for (var i= 0; i < 7; i++) {
    var columnaFiltrada = []
    for(var j = 0; j < 7; j++){
      var encontrado = false
      for (var k = 0; k < aciertos.length; k++) {
        var acierto = aciertos[k]
        if (acierto[0] === i & acierto[1] === j) {
          encontrado = true;
        }
      }
      if (encontrado === false) {
        columnaFiltrada.push(tablero[i][j])
      }
    }
    var diff = 7 - columnaFiltrada.length
    for(var j = 0; j < diff; j++){
      columnaFiltrada.unshift(genCaramelo())
    }
    nuevoTablero.push(columnaFiltrada);
  }
  return nuevoTablero;
}


//Esconde el tablero y el panel de tiempo

function esconderTablero(){
  //$('.panel-tablero').fadeOut(1000);
  $('.panel-tablero').animate({
    width: 0,
    height: 0,
    opacity: 0,
  }, 1000);

  $('.panel-score').animate({
    width: '100%'
  }, 1000, crearTitulo);
   $('.time').fadeOut(1000);

}

function crearTitulo(){
  var titleElement = $("<h2>", {
    'class':'main-titulo',
    'style':'text-align: center'
  })
  titleElement.html('Juego Terminado');
  $('.panel-score').prepend(titleElement)
}


// Cuenta el tiempo y actualiza el reloj

function contarTiempo(){
  
  tiempoRestante = tiempoRestante - 1;
  var minutos = Math.floor(tiempoRestante/60)
  var segundos = tiempoRestante%60
  if (segundos < 10 ) {
    segundos = '0' + segundos
  }
  $("#timer").html(minutos + ':' + segundos);
  

}