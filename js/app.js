$(document).ready(function()
{
  setTimeout(animateTitle,4000);
  generarTablero();
  pintarTablero();
  procesarCiclo();
});

function procesarCiclo(){
  var aciertos = encontrarAciertos();
  if(aciertos.length === 0){
    return
  }
  pintarAciertos(aciertos);
  setTimeout(function(){
    tablero = renovarTablero(aciertos);
    pintarTablero();
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
  console.log(aciertos, aciertos.length)
  for (var i = 0; i < aciertos.length; i++) {
    aciertos[i]
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
