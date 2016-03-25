/* Author: 

*/

$(function(){
	var canvasNews = $('#newsMan')[0];

	if(canvasNews.getContext){
		drawNewsMan(canvasNews);	
  }else{
    alert('Canvas is not supported in your browser.');
  }
});

/* =============================================================================
News
========================================================================== */

function drawNewsMan(canvas) {
	var PI = Math.PI;
	var ctx = canvas.getContext('2d');
	
	ctx.strokeStyle = '#000';
	ctx.lineWidth = 1;
	ctx.beginPath();
	
	//head
    ctx.moveTo(62 - 10 , 20);
    ctx.arc(42 , 20, 10, 0, 2*PI, true);
    
	//body
    ctx.moveTo(42,30);
    ctx.quadraticCurveTo(46,50,42,100);
    
    //legs
    ctx.moveTo(42,100);
    ctx.bezierCurveTo(35, 120, 35, 120, 32, 155);
    ctx.moveTo(42,100);
    ctx.bezierCurveTo(52, 120, 52, 125, 50, 155);
    
    //arms
    ctx.moveTo(44,45);
    ctx.bezierCurveTo(20, 60, 30, 60, 0 ,60);
    ctx.moveTo(44,45);
    ctx.bezierCurveTo(65, 50, 70, 50, 90, 40);
    
    ctx.stroke();
};
