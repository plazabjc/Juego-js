
$(document).ready(function()
{
  setTimeout(animateTitle,4000);
  generarTablero();
  pintarTablero();
  encontrarAciertos();
  console.log(tablero);
  console.log(encontrarAciertos())
});

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
    for (var j = 0 ; j < 7; j++) {
      var numero = tablero[i][j];
      var ruta = "image/"+numero+".png";
      var imgElement = $("<img>", {
          'src': ruta,
          'style': 'width: 97px; height: 97px;'
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
          aciertos.push({
            columna: i,
            posFinal: j - 1,
            longitud: contador + 1,
          })
        }
        contador = 0;
      }
    }
    if (contador >= 2) {
      aciertos.push({
        columna: i,
        posFinal: 6,
        longitud: contador + 1,
      })
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
          aciertos.push({
            fila: j,
            posFinal: i - 1,
            longitud: contador + 1,
          })
        }
        contador = 0;
      }
    }
    if (contador >= 2) {
      aciertos.push({
        fila: j,
        posFinal: 6,
        longitud: contador + 1,
      })
    }
  }
  return aciertos;
}



