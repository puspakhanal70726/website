var drawingColor = "#000000";
var clickColor = new Array();
var hex;

// color picker canvas
var colorBlock = document.getElementById('color-block');
var ctx1 = colorBlock.getContext('2d');
var width1 = colorBlock.width;
var height1 = colorBlock.height;

// color changer canvas
var colorStrip = document.getElementById('color-strip');
var ctx2 = colorStrip.getContext('2d');
var width2 = colorStrip.width;
var height2 = colorStrip.height;

var x = 0;
var y = 0;
var drag = false;
var rgbaColor = 'rgba(255,0,0,1)';

// fills the picker canvas
ctx1.rect(0, 0, width1, height1);
fillGradient();

// fills the color changer canvas
ctx2.rect(0, 0, width2, height2);
var grd1 = ctx2.createLinearGradient(0, 0, 0, height1);
grd1.addColorStop(0, 'rgba(255, 0, 0, 1)');
grd1.addColorStop(0.17, 'rgba(255, 255, 0, 1)');
grd1.addColorStop(0.34, 'rgba(0, 255, 0, 1)');
grd1.addColorStop(0.51, 'rgba(0, 255, 255, 1)');
grd1.addColorStop(0.68, 'rgba(0, 0, 255, 1)');
grd1.addColorStop(0.85, 'rgba(255, 0, 255, 1)');
grd1.addColorStop(1, 'rgba(255, 0, 0, 1)');
ctx2.fillStyle = grd1;
ctx2.fill();

// when the canvas is clicked
function click(e) {
  x = e.offsetX;
  y = e.offsetY;
  var imageData = ctx2.getImageData(x, y, 1, 1).data;
  rgbaColor = 'rgb(' + imageData[0] + ',' + imageData[1] + ',' + imageData[2] + ")";
  fillGradient();
}

function fillGradient() {
  ctx1.fillStyle = rgbaColor;
  ctx1.fillRect(0, 0, width1, height1);

  var grdWhite = ctx2.createLinearGradient(0, 0, width1, 0);
  grdWhite.addColorStop(0, 'rgba(255,255,255,1)');
  grdWhite.addColorStop(1, 'rgba(255,255,255,0)');
  ctx1.fillStyle = grdWhite;
  ctx1.fillRect(0, 0, width1, height1);

  var grdBlack = ctx2.createLinearGradient(0, 0, 0, height1);
  grdBlack.addColorStop(0, 'rgba(0,0,0,0)');
  grdBlack.addColorStop(1, 'rgba(0,0,0,1)');
  ctx1.fillStyle = grdBlack;
  ctx1.fillRect(0, 0, width1, height1);
}

function mousedown(e) {
  drag = true;
  changeColor(e);
}

function mousemove(e) {
  if (drag) {
    changeColor(e);
  }
}

function mouseup(e) {
  drag = false;
}


function changePage(color){
    var colorNumber = document.querySelector('input[name = "color"]:checked').value;
    // console.log(colorNumber);
    if(colorNumber === "color1"){
      $(".sandHeader").animate({backgroundColor: hex}, 500);
      $(".sandFooter").animate({backgroundColor: hex}, 500);
    }
    else if(colorNumber === "color2"){
      $(".changeLabels").animate({color: hex}, 350);
    }
    else if(colorNumber === "color3"){
      $(".changeText").animate({color: hex}, 350);
    }
    else{
      $(".contSandbox").animate({backgroundColor: hex}, 500);
    }
  }



function rgbToHex(rgb)
{
  var hex = Number(rgb).toString(16);
  if (hex.length < 2) {
       hex = "0" + hex;
  }
  return hex;
};

function fullColorHex(r,g,b)
{
  var red = rgbToHex(r);
  var green = rgbToHex(g);
  var blue = rgbToHex(b);
  return red+green+blue;
};

// changes color and gets the color values
function changeColor(e) {
  x = e.offsetX;
  y = e.offsetY;
  var imageData = ctx1.getImageData(x, y, 1, 1).data;
  rgbaColor = 'rgb(' + imageData[0] + ',' + imageData[1] + ',' + imageData[2] + ")";
  console.log(rgbaColor);
  document.getElementById("rgb").innerHTML = rgbaColor;

  hex = "#" + fullColorHex(imageData[0], imageData[1], imageData[2])
  console.log(hex);
  drawingColor = hex;
  document.getElementById('hex').innerHTML = hex;

  changePage(rgbaColor);
}

colorStrip.addEventListener("click", click, false);

colorBlock.addEventListener("mousedown", mousedown, false);
colorBlock.addEventListener("mouseup", mouseup, false);
colorBlock.addEventListener("mousemove", mousemove, false);





context = document.getElementById('drawing').getContext("2d");

$('#drawing').mousedown(function(e){
  var mouseX = e.pageX - this.offsetLeft;
  var mouseY = e.pageY - this.offsetTop;

  paint = true;
  addClick(e.pageX - this.offsetLeft, e.pageY - this.offsetTop);
  redraw();
});


$('#drawing').mousemove(function(e){
  if(paint){
    addClick(e.pageX - this.offsetLeft, e.pageY - this.offsetTop, true);
    redraw();
  }
});


$('#drawing').mouseup(function(e){
  paint = false;
});


$('#drawing').mouseleave(function(e){
  paint = false;
});


var clickX = new Array();
var clickY = new Array();
var clickDrag = new Array();
var paint;

function addClick(x, y, dragging)
{
  clickX.push(x);
  clickY.push(y);
  clickDrag.push(dragging);
  clickColor.push(drawingColor);
}

function redraw()
{
  context.clearRect(0, 0, context.canvas.width, context.canvas.height); // Clears the canvas


  context.lineJoin = "round";
  context.lineWidth = 5;

  for(var i=0; i < clickX.length; i++) {
    context.beginPath();
    if(clickDrag[i] && i){
      context.moveTo(clickX[i-1], clickY[i-1]);
     }else{
       context.moveTo(clickX[i]-1, clickY[i]);
     }
     context.lineTo(clickX[i], clickY[i]);
     context.closePath();
     context.strokeStyle = clickColor[i];
     context.stroke();
  }
}
