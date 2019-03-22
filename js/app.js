//titulo del juego
$(document).ready(function()
{
  setTimeout(animateTitle,4000);
  generarDulces()
});

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
var DULCES_POR_COL = 6;
function generarSrc(){
    var numero = Math.floor((Math.random()*(4 - 1)) + 1);
    var ruta = "image/"+numero+".png";
    return ruta;
}

function generarDulces(){

    for (var i = 0; i < 7; i++) {
      
      for (var j = 0 ; j < DULCES_POR_COL; j++) {
        var imgElement = $("<img>", {
          'src': generarSrc()
          })
        $(".col-"+(i+1)).append(imgElement)
      }
    }
}

function generarTimer (tiempo, callback){
  return function(){
    setTimeout(callback, tiempo)
  }
}