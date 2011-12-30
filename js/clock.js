var options = [
{
  index: 0, 
  name: '@font-face', 
  property: 'fontface'
},
{
  index: 1, 
  name: 'background-size', 
  property: 'backgroundsize'
},
{
  index: 2, 
  name: 'border-image', 
  property: 'borderimage'
},
{
  index: 3, 
  name: 'border-radius', 
  property: 'borderradius'
},
{
  index: 4, 
  name: 'box-shadow', 
  property: 'boxshadow'
},
{
  index: 5, 
  name: 'hsla()', 
  property: 'hsla'
},
{
  index: 6, 
  name: 'multiple backgrounds', 
  property: 'multiplebgs'
},
{
  index: 7, 
  name: 'opacity', 
  property: 'opacity'
},
{
  index: 8, 
  name: 'rgba()', 
  property: 'rgba'
},
{
  index: 9, 
  name: 'text-shadow', 
  property: 'textshadow'
},
{
  index: 10, 
  name: 'CSS animations', 
  property: 'cssanimations'
},
{
  index: 11, 
  name: 'CSS columns', 
  property: 'css columns'
},
{
  index: 12, 
  name: 'CSS gradients', 
  property: 'cssgradients'
},
{
  index: 13, 
  name: 'CSS reflections', 
  property: 'cssreflections'
},
{
  index: 14, 
  name: 'CSS 2D transforms', 
  property: 'csstransforms'
},
{
  index: 15, 
  name: 'CSS 3D transforms', 
  property: 'csstransforms3d'
},
{
  index: 16, 
  name: 'CSS transitions', 
  property: 'csstransitions'
},
{
  index: 17, 
  name: 'canvas', 
  property: 'canvas'
},
{
  index: 18, 
  name: 'canvas text', 
  property: 'canvastext'
},
{
  index: 19, 
  name: 'inline SVG', 
  property: 'inlinesvg'
},
{
  index: 20, 
  name: 'SVG', 
  property: 'svg'
},
{
  index: 21, 
  name: 'SVG clip paths', 
  property: 'svgclippaths'
},
{
  index: 22, 
  name: 'WebGL', 
  property: 'webgl'
},
{
  index: 23, 
  name: 'webkit', 
  property: 'webkit'
}
];

$(document).ready(function() {
  if(!Modernizr.csstransforms3d) {
    $('body').addClass('no3d');
  }
	
  $('#clock').css('background', '-webkit-gradient(linear, left top, right bottom, from(transparent), to(rgba(0, 0, 0, .25))), url(' + generateNoise(.3) + ') #555');
	
  checkCompatibility();
  $('.requirements-btn').click(openRequirements);
	
  setRotations();
	
  $('#second-hand').data('deg', 0);
  $('#minute-hand').data('deg', 0);
  $('#hour-hand').data('deg', 0);
  startClock();
});

function setRotations() {
  $('#minutes li').each(function(i) {
    $(this).css('-webkit-transform', 'rotate(' + i * 6 + 'deg)');
  });
}

function checkCompatibility() {
  var requirements = [0, 1, 3, 4, 6, 8, 9, 12, 14, 10, 17, 23];
  var fullyRendered = true;
	
  for(var i = 0; i < requirements.length; i++) {
    if(requirements[i] < 22) {
      if(Modernizr[options[requirements[i]].property]) {
        $('#requirements-list').append('<li class="yes">' + options[requirements[i]].name + '</li>');
      } else {
        fullyRendered = false;
        $('#requirements-list').append('<li class="no">' + options[requirements[i]].name + '</li>');
      }
    } else {
      if($.browser[options[requirements[i]].property]) {
        $('#requirements-list').append('<li class="yes">' + options[requirements[i]].name + '</li>');
      } else {
        fullyRendered = false;
        $('#requirements-list').append('<li class="no">' + options[requirements[i]].name + '</li>');
      }
    }		
  }
	
  if(!fullyRendered) {
    $('.doesnt-meet').css('display', 'block');
  } else {
    $('.meets').css('display', 'block');
  }
}

function openRequirements(e) {
  e.preventDefault();	
  $('#full-render').show();
  $('#overlay').show();
  $('#close-btn').click(closeRequirements);
}

function closeRequirements(e) {
  e.preventDefault();
  $('#full-render').hide();
  $('#overlay').hide();
}

// Big up to Jeffrey Way for this noise generator (http://net.tutsplus.com/tutorials/javascript-ajax/how-to-generate-noise-with-canvas/)

function generateNoise(opacity) {
  if (!!!document.createElement('canvas').getContext) {  
    return false;  
  }
	
  var canvas = document.createElement("canvas"),  
  ctx = canvas.getContext('2d'),  
  x, y,  
  number,  
  opacity = opacity || .2;  
	
  canvas.width = 150;
  canvas.height = 150;
	
  for(x = 0; x < canvas.width; x++) {
    for(y = 0; y < canvas.height; y++) {
      number = Math.floor(Math.random() * 40);	
      ctx.fillStyle = "rgba(" + number + "," + number + "," + number + "," + opacity + ")";
      ctx.fillRect(x, y, 1, 1);
    }  
  }
  return canvas.toDataURL("image/png");
}

function startClock() {
  var date = new Date();
  var seconds = date.getSeconds();
  var minutes = date.getMinutes();
  var hours = date.getHours() > 12 ? date.getHours() - 12 : date.getHours();
  setHand($('#second-hand'), (seconds / 60) * 360);
  setHand($('#minute-hand'), (((minutes + (seconds / 60)) / 60) * 360));
  setHand($('#hour-hand'), (((hours + (minutes / 60) + (seconds / 3600)) / 12) * 360) % 360);
		
  var ss = document.styleSheets[document.styleSheets.length - 1];
	
  ss.insertRule('@-webkit-keyframes moveSeconds {0% {-webkit-transform: rotate(' + (seconds / 60) + 'turn);}100% {-webkit-transform: rotate(' + ((seconds / 60) + 1) + 'turn);}}');
  ss.insertRule('@-webkit-keyframes moveMinutes {0% {-webkit-transform: rotate(' + ((minutes + (seconds / 60)) / 60) + 'turn);}100% {-webkit-transform: rotate(' + (((minutes + (seconds / 60)) / 60) + 1) + 'turn);}}');
  ss.insertRule('@-webkit-keyframes moveHours {0% {-webkit-transform: rotate(' + ((hours + (minutes / 60) + (seconds / 3600)) / 12) + 'turn);}100% {-webkit-transform: rotate(' + (((hours + (minutes / 60) + (seconds / 3600)) / 12) + 1) + 'turn);}}');
  $('#second-hand').css('-webkit-animation', 'moveSeconds 60s linear infinite');
  $('#minute-hand').css('-webkit-animation', 'moveMinutes 3600s linear infinite');
  $('#hour-hand').css('-webkit-animation', 'moveHours 43200s linear infinite');
}

function setHand(hand, deg) {
  var degMultiplier = Math.floor(hand.data('deg') / 360);
  var adjustedDeg = deg == 0 && hand.data('deg') > 350 && hand.data('deg') != deg + (360 * degMultiplier) ? deg + (360 * (degMultiplier + 1)) : deg + (360 * degMultiplier);
  hand.data('deg', adjustedDeg);
  hand.css('-webkit-transform', 'rotateZ(' + adjustedDeg + 'deg)');
  var xDirection = deg > 135 && deg < 315 ? -1 : 1;
  var xOffset = xDirection * Math.abs(9 * ((135 + (180 * Math.floor((deg - 45) / 180)) - deg) / 90));
  var yDirection = deg > 45 && deg < 225 ? -1 : 1;
  var yOffset = yDirection * Math.abs(15 * ((45 + (180 * Math.floor((deg + 45) / 180)) - deg) / 90));
  hand.css('-webkit-box-shadow', xOffset + 'px ' + yOffset + 'px 8px rgba(0, 0, 0, .5), 0 0 3px rgba(0, 0, 0, .35) inset');
}