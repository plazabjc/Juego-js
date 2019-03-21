$(document).ready(function()
{
  setTimeout(animateTitle,4000);
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