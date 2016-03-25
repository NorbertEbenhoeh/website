/* Author: 

*/
window.cancelRequestAnimFrame = ( function() {
    return window.cancelAnimationFrame          ||
        window.webkitCancelRequestAnimationFrame    ||
        window.mozCancelRequestAnimationFrame       ||
        window.oCancelRequestAnimationFrame     ||
        window.msCancelRequestAnimationFrame        ||
        clearTimeout;
} )();

window.requestAnimFrame = (function(callback){
    return window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.oRequestAnimationFrame ||
    window.msRequestAnimationFrame ||
    function(callback){
        window.setTimeout(callback, 1000 / 60);
    };
})();


$(function(){
	var canvasEx = $('#navExercises')[0];
	var canvasTp = $('#navTrainPlans')[0];
	var canvasCom = $('#navCommunity')[0];
	var canvasSet = $('#navSettings')[0];
	var canvasNews = $('#newsMan')[0];
	var date = new Date();
    var time = date.getTime();
    var start = 0; // Animation distance always starts with 0
    var distance; // The distance the object has to move
    var directionDown; // Animations goes in a Loop. Which direction should the animation go?
    var loop; // How many loops should the animation do?

	if(canvasEx.getContext){
		
		if (canvasNews){
			drawNewsMan(canvasNews);
		}
		
		
		// Draw NavEx
		drawNavEx(canvasEx);
		
		$('#navExercises').mouseenter(function(){
			distance = 15;
	    	directionDown = true;
	    	loop = 1000;
	    	animateNavEx(time,canvasEx,start,distance,directionDown,loop);
	    	}
		);
		$('#navExercises').mouseleave(function(){
			distance = 15;
			loop = 0;
			directionDown = false;
	    	animateNavEx(time,canvasEx,start,distance,directionDown,loop);
	    	}
	    );
		
		// Draw NavTp
		drawNavTp(canvasTp);
		
		$('#navTrainPlans').mouseenter(function(){
			distance = 80;
	    	directionDown = true;
	    	loop = 1000;
	    	animateNavTp(time,canvasTp,start,distance,directionDown,loop);
	    	}
		);
		$('#navTrainPlans').mouseleave(function(){
			distance = 80;
			loop = 0;
			directionDown = false;
	    	animateNavTp(time,canvasTp,start,distance,directionDown,loop);
	    	}
	    );
		
		// Draw NavCom
		drawNavCom(canvasCom);

		$('#navCommunity').mouseenter(function(){
			distance = 50;
	    	directionDown = true;
	    	loop = 1000;
	    	animateNavCom(time,canvasCom,start,distance,directionDown,loop);
	    	}
		);
		$('#navCommunity').mouseleave(function(){
			distance = 50;
			loop = 0;
			directionDown = false;
			start = 0;
	    	animateNavCom(time,canvasCom,start,distance,directionDown,loop);
	    	}
	    );
		
		// Draw NavSet
		drawNavSet(canvasSet);
		
		$('#navSettings').mouseenter(function(){
			$('ul .miniMenu').removeClass('visuallyhidden');
			distance = 5;
	    	directionDown = true;
	    	loop = 10000;
	    	animateNavSet(time,canvasSet,start,distance,directionDown,loop);
	    	}
		);
		$('#navSettings').mouseleave(function(){
			$('ul .miniMenu').addClass('visuallyhidden');
			distance = 5;
			loop = 0;
			directionDown = false;
	    	animateNavSet(time,canvasSet,start,distance,directionDown,loop);
	    	}
	    );
		
		$('.miniMenu').mouseenter(function(){
			$('ul .miniMenu').removeClass('visuallyhidden');
			distance = 5;
	    	directionDown = true;
	    	loop = 10000;
	    	animateNavSet(time,canvasSet,start,distance,directionDown,loop);
	    	}
		);
		$('.miniMenu').mouseleave(function(){
			$('ul .miniMenu').addClass('visuallyhidden');
			distance = 5;
			loop = 0;
			directionDown = false;
	    	animateNavSet(time,canvasSet,start,distance,directionDown,loop);
	    	drawNavSet(canvasSet);
	    	}
	    );
		
  }else{
    alert('Canvas is not supported in your browser.');
  }
});


/* =============================================================================
Exercises Navigation Animation
========================================================================== */


function drawNavEx(canvas) {
	var PI = Math.PI;
	var ctx = canvas.getContext('2d');
	
	ctx.strokeStyle = '#000';
	ctx.lineWidth = 1;

	ctx.beginPath();
	ctx.clearRect(0, 0, canvas.width, canvas.height);
    //body
    ctx.moveTo(85,30);
    ctx.quadraticCurveTo(55,40,55,70);

    //head
    ctx.moveTo(99,30);
    ctx.arc(92, 30, 7, 0, 2*PI, true);
    
    //legs
    ctx.moveTo(55,70);
    ctx.bezierCurveTo(65, 85, 90, 85, 75, 110);
    ctx.moveTo(55,70);
    ctx.bezierCurveTo(62, 85, 87, 85, 62, 115);
    
    //arms
    ctx.moveTo(73,35);
    ctx.bezierCurveTo(64, 45, 64, 70, 70, 87);
    ctx.moveTo(75,35);
    ctx.bezierCurveTo(81, 45, 81, 70, 76, 87);
    
    ctx.stroke();
};



function animateNavEx(lastTime,canvas,start,distance,directionDown,loop){
    var PI = Math.PI;
    var ctx = canvas.getContext('2d');
    
    // update stage
    var date = new Date();
    var time = date.getTime();
    var timeDiff = time - lastTime;
    var linearSpeed = 15; // pixels / second
    var linearDistEachFrame = linearSpeed * timeDiff / 1000;
    var current = start;
    var breath = false;
  
    if (loop > 0){
	    if (current + linearDistEachFrame < distance && directionDown === true  ) {
	        start = current + linearDistEachFrame * 2;
	        if (start <= distance && start >= distance * 0.1){
	    		breath = true;
	    	}
	    }else{
	    	directionDown = false;
	    	if (start < distance && start > distance - 1){
	    		loop = loop - 1;
	    		
	    	}
	    }
	    
	    if (current - linearDistEachFrame > 0 && directionDown === false  ) {
	    	start = current - linearDistEachFrame;
	    	if (start <= distance && start >= distance * 0.95){
	    		breath = true;
	    	}
	    }else{
	    	directionDown = true;
	    }
    }
    
    lastTime = time;
    // clear stage
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // draw stage
    ctx.strokeStyle = 'rgba(0,0,0,1)';
	ctx.lineWidth = 1;
	ctx.beginPath();
	
	
	
	//breath
	if (breath){
		
		// the breath should move away from the head
		ctx.save();

		ctx.translate( -6 + start * 0.3 , -5 + start * 0.5);
		ctx.scale(1 , 1 + start * 0.02);
		ctx.moveTo(96 , 43 );
		ctx.quadraticCurveTo(98 , 53 , 94, 58 );
	    ctx.moveTo(99 , 43  );
	    ctx.quadraticCurveTo(99 , 53 , 101, 60 );
	    ctx.moveTo(102 , 43 );
	    ctx.quadraticCurveTo(104 , 56 , 107, 54 );
	    
	    // the "clouds" should grow 
	    ctx.save();
	    ctx.translate(0 - (start * 0.4) * (start * 0.4) , 0 );
	    ctx.scale(1 + (start * 0.04) * (start * 0.04), 1 + start * 0.001);
		ctx.moveTo(104,57);
	    ctx.bezierCurveTo(113, 60, 113, 49, 106, 50);
	    ctx.moveTo(98, 60);
	    ctx.bezierCurveTo(96, 68, 113, 65, 104, 57);
	    ctx.moveTo(93, 55);
	    ctx.bezierCurveTo(85, 57, 93, 69, 98, 60);
	    ctx.restore();

	    ctx.restore();
	    
	}
	
    //body
    ctx.moveTo(85 + start * 0.2 , 30 + start);
    ctx.quadraticCurveTo(55,40 ,55,70 + start * 0.4);
    
    //head
    ctx.moveTo(99 + start * 0.2, 30 + start);
    ctx.arc(92 + start * 0.2, 30 + start, 7, 0, 2*PI, true);
    
    //legs
    ctx.moveTo(55,70+ start * 0.4);
    ctx.bezierCurveTo(65, 85, 90 + start * 0.1, 85 + start * 0.4, 75, 110);
    ctx.moveTo(55,70+ start * 0.4);
    ctx.bezierCurveTo(62, 85, 87+ start * 0.1, 85 + start * 0.4, 62, 115);
    
    //arms
    ctx.moveTo(73,35 + start * 0.7);
    ctx.bezierCurveTo(64 - start * 0.3, 45 + start * 0.3, 64 - start * 0.3, 70, 70, 87+ start * 0.15);
    ctx.moveTo(75,35 + start * 0.7);
    ctx.bezierCurveTo(81 + start * 0.3, 45 + start * 0.3, 81 + start * 0.3, 70, 76, 87+ start * 0.2);

    ctx.stroke();
    
    // request new frame
    requestAnimFrame(function(){
        animateNavEx(lastTime,canvas,start,distance,directionDown,loop);
    });
}

/* =============================================================================
Train plan Navigation Animation
========================================================================== */

function drawNavTp(canvas) {
	var PI = Math.PI;
	var ctx = canvas.getContext('2d');
	
	ctx.strokeStyle = '#000';
	ctx.lineWidth = 1;
	ctx.beginPath();
	
	//head
    ctx.moveTo(62 , 28);
    ctx.arc(55 , 28, 7, 0, 2*PI, true);
    
	//body
    ctx.moveTo(55,35);
    ctx.quadraticCurveTo(60,50,55,80);
    
    //legs
    ctx.moveTo(55,80);
    ctx.bezierCurveTo(60, 100, 60, 100, 55, 120);
    ctx.moveTo(55,80);
    ctx.bezierCurveTo(75, 100, 70, 100, 65, 115);
    
    //arms
    ctx.moveTo(58,45);
    ctx.bezierCurveTo(40, 60, 40, 60, 55 ,79);
    ctx.moveTo(58,45);
    ctx.bezierCurveTo(75, 55, 75, 55, 90, 40);
    
    
    // flipchart
    ctx.moveTo(80,25);
    ctx.quadraticCurveTo(95,30,125,25);
    ctx.moveTo(80,70);
    ctx.quadraticCurveTo(95,80,125,70);
    
    ctx.moveTo(80,25);
    ctx.quadraticCurveTo(73,47,80,70);
    ctx.moveTo(125,25);
    ctx.quadraticCurveTo(118,47,125,70);
    
    ctx.moveTo(90,74);
    ctx.quadraticCurveTo(85,85,90,110);
    
    ctx.moveTo(103,76);
    ctx.quadraticCurveTo(105,85,103,105);
    
    ctx.moveTo(116,73);
    ctx.quadraticCurveTo(120,90,116,115);
    
    ctx.font = "50% Calibri";
    ctx.fillText("1.Train, Train,", 80, 40);
    ctx.fillText("Train", 83, 46);
    ctx.fillText("2.Stamina", 78, 53);
    ctx.fillText("3.Speed", 80, 60);
    ctx.fillText("4.Strength", 82, 67);
    
    ctx.stroke();
};

function animateNavTp(lastTime,canvas,start,distance,directionDown,loop){
    var PI = Math.PI;
    var ctx = canvas.getContext('2d');
    
    // update stage
    var date = new Date();
    var time = date.getTime();
    var timeDiff = time - lastTime;
    var linearSpeed = 16; // pixels / second
    var linearDistEachFrame = linearSpeed * timeDiff / 1000;
    var current = start;

  
    if (loop > 0){
	    if (current + linearDistEachFrame < distance && directionDown === true  ) {
	        start = current + linearDistEachFrame *1.5;
	    }else{
	    	directionDown = false;
	    }
	    
	    if (current - linearDistEachFrame > 0 && directionDown === false  ) {
	    	start = current - linearDistEachFrame *1.5;

	    }else{
	    	directionDown = true;
	    }
    }
    
    lastTime = time;
    // clear stage
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // draw stage
    ctx.strokeStyle = 'rgba(0,0,0,1)';
	ctx.lineWidth = 1;
	ctx.beginPath();

    
    if (start <= 25) {
    	//head
    	ctx.moveTo(62 + start * 0.5 , 28);
        ctx.arc(55+ start * 0.5 , 28, 7, 0, 2*PI, true);
    	//body
        ctx.moveTo(55 + start * 0.5,35);
        ctx.quadraticCurveTo(60+ start * 0.4,50,55 + start * 0.2,80);
    	//arms
        ctx.moveTo(58 + start * 0.35,45);
        ctx.bezierCurveTo(40 + start * 0.2, 60, 40 + start * 0.2, 60, 55 + start * 0.2,79);
        ctx.moveTo(58 + start * 0.35,45);
        ctx.bezierCurveTo(75 + start * 0.2, 55, 75 + start * 0.2, 55, 90 + start*0.4, 40 + start);
        
        //legs
        ctx.moveTo(55 + start * 0.2,80);
        ctx.bezierCurveTo(60, 100, 60, 100, 55, 120);
        ctx.moveTo(55 + start * 0.2,80);
        ctx.bezierCurveTo(75, 100, 70, 100, 65, 115);
    }
    if (start > 25 && start <= 50) {
    	//head
    	ctx.moveTo(69.5 + start * 0.2 , 28);
        ctx.arc(62.5+ start * 0.2 , 28, 7, 0, 2*PI, true);
    	//body
        ctx.moveTo(62.5 + start * 0.2,35);
        ctx.quadraticCurveTo(65 + start * 0.2,50,60 ,80);
    	//arms
        ctx.moveTo(60.5 + start * 0.25,45);
        ctx.bezierCurveTo(40 + start * 0.2, 60, 40 + start * 0.2, 60, 60,79);
        ctx.moveTo(60.5 + start * 0.25,45);
        ctx.bezierCurveTo(75 + start * 0.2, 55,75 + start * 0.2, 55, 95 + start * 0.2 , 90 - start);
        
        //legs
        ctx.moveTo(60 ,80);
        ctx.bezierCurveTo(60, 100, 60, 100, 55, 120);
        ctx.moveTo(60 ,80);
        ctx.bezierCurveTo(75, 100, 70, 100, 65, 115);
    }
    if (start > 50 && start <= 80) {
    	//head
    	ctx.moveTo(114.5 - start * 0.5 - start * 0.2, 28);
        ctx.arc(107.5 - start * 0.5 - start * 0.2 , 28, 7, 0, 2*PI, true);
    	//body
        ctx.moveTo(107.5 - start * 0.5 - start * 0.2,35);
        ctx.quadraticCurveTo(105 - start * 0.2 - start * 0.4,50,70 - start * 0.2,80);
    	//arms
        ctx.moveTo(103 - start * 0.35 - start * 0.25,45);
        ctx.bezierCurveTo(70 - start * 0.2 - start * 0.2, 60, 70 - start * 0.2 - start * 0.2, 60, 70 - start * 0.2,79);
        ctx.moveTo(103 - start * 0.35 - start * 0.25,45);
        ctx.bezierCurveTo(105 - start * 0.2 - start * 0.2, 55, 105 - start * 0.2 - start * 0.2, 55, 125 - start *0.4 , 40);
        
        //legs
        ctx.moveTo(70 - start * 0.2,80);
        ctx.bezierCurveTo(60, 100, 60, 100, 55, 120);
        ctx.moveTo(70 - start * 0.2,80);
        ctx.bezierCurveTo(75, 100, 70, 100, 65, 115);
    }
    if (start > 80){
    	//head
        ctx.moveTo(62 , 28);
        ctx.arc(55 , 28, 7, 0, 2*PI, true);
        
    	//body
        ctx.moveTo(55,35);
        ctx.quadraticCurveTo(60,50,55,80);
        
        //arms
        ctx.moveTo(58,45);
        ctx.bezierCurveTo(40, 60, 40, 60, 55 ,79);
        ctx.moveTo(58,45);
        ctx.bezierCurveTo(75, 55, 75, 55, 90, 40);
        
     	//legs
        ctx.moveTo(55,80);
        ctx.bezierCurveTo(60, 100, 60, 100, 55, 120);
        ctx.moveTo(55,80);
        ctx.bezierCurveTo(75, 100, 70, 100, 65, 115);
    }
    
    
    // flipchart
    ctx.moveTo(80,25);
    ctx.quadraticCurveTo(95,30,125,25);
    ctx.moveTo(80,70);
    ctx.quadraticCurveTo(95,80,125,70);
    
    ctx.moveTo(80,25);
    ctx.quadraticCurveTo(73,47,80,70);
    ctx.moveTo(125,25);
    ctx.quadraticCurveTo(118,47,125,70);
    
    ctx.moveTo(90,74);
    ctx.quadraticCurveTo(85,85,90,110);
    
    ctx.moveTo(103,76);
    ctx.quadraticCurveTo(105,85,103,105);
    
    ctx.moveTo(116,73);
    ctx.quadraticCurveTo(120,90,116,115);
    
    ctx.font = "50% Calibri";
    ctx.fillText("1.Train, Train,", 80, 40);
    ctx.fillText("Train", 83, 46);
    ctx.fillText("2.Stamina", 78, 53);
    ctx.fillText("3.Speed", 80, 60);
    ctx.fillText("4.Strength", 82, 67);
    
    ctx.stroke();
    
    // request new frame
    requestAnimFrame(function(){
        animateNavTp(lastTime,canvas,start,distance,directionDown,loop);
    });
}



/* =============================================================================
Communication Navigation Animation
========================================================================== */

function drawNavCom(canvas) {
	var PI = Math.PI;
	var ctx = canvas.getContext('2d');
	
	ctx.strokeStyle = '#000';
	ctx.lineWidth = 1;
	ctx.beginPath();
	
	// First Person (bottom)
    ctx.save();
    ctx.translate( -5 , 70 );
	//head1
    ctx.moveTo(87 , 28);
    ctx.arc(80 , 28, 7, 0, 2*PI, true);
    
	//body1
    ctx.moveTo(80,35);
    ctx.quadraticCurveTo(82,50,80,80);

    
    //arms1
    ctx.moveTo(81,45);
    ctx.bezierCurveTo(65, 30, 65, 30, 65, 5);
    ctx.moveTo(81,45);
    ctx.bezierCurveTo(95, 30, 95, 30, 95, 5);
    ctx.restore();
    
    // Second Person (right)
    ctx.save();
    ctx.translate( 28 , 20 );
	//head2
    ctx.moveTo(87 , 28);
    ctx.arc(80 , 28, 7, 0, 2*PI, true);
    
	//body2
    ctx.moveTo(80,35);
    ctx.quadraticCurveTo(82,50,110,80);
    
    //arms2
    ctx.moveTo(83,45);
    ctx.bezierCurveTo(60, 50, 60 , 50, 50,30);
    ctx.moveTo(83,45);
    ctx.bezierCurveTo(95, 30, 95, 30, 102, 10);
    ctx.restore();
    
    // Third Person
    ctx.save();
    ctx.translate( -10 , -50 );
	//head3
    ctx.moveTo(87 , 90);
    ctx.arc(80 , 90, 7, 0, 2*PI, true);
    
	//body3
    ctx.moveTo(80,83);
    ctx.quadraticCurveTo(82,50,80,0);
    
    //arms3
    ctx.moveTo(81,73);
    ctx.bezierCurveTo(65, 60, 60, 60, 50, 90);
    ctx.moveTo(81,73);
    ctx.bezierCurveTo(95, 70, 100, 70, 115, 58);
    ctx.restore();
    
    ctx.stroke();
};

function animateNavCom(lastTime,canvas,start,distance,directionDown,loop){
    var PI = Math.PI;
    var ctx = canvas.getContext('2d');
    
    // update stage
    var date = new Date();
    var time = date.getTime();
    var timeDiff = time - lastTime;
    var linearSpeed = 30; // pixels / second
    var linearDistEachFrame = linearSpeed * timeDiff / 1000;
    var current = start;

  
    if (loop > 0){
	    if (current + linearDistEachFrame < distance && directionDown === true  ) {
	        start = current + linearDistEachFrame * 2;
	    }else{
	    	directionDown = false ;
	    }
    
	    if (current - linearDistEachFrame > 0 && directionDown === false  ) {
	    	start = current - linearDistEachFrame * 2;
	    }else{
	    	directionDown = true;
	    }

    }
    
    lastTime = time;
    // clear stage
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // draw stage
    ctx.strokeStyle = 'rgba(0,0,0,1)';
	ctx.lineWidth = 1;
	ctx.beginPath();
	
	// First Person (bottom)
    ctx.save();
    ctx.translate( -5 , 70 );
	//head1
    ctx.moveTo(87 , 28);
    ctx.arc(80 , 28, 7, 0, 2*PI, true);
    
	//body1
    ctx.moveTo(80,35);
    ctx.quadraticCurveTo(82,50,80,80);

    
    //arms1
    ctx.moveTo(81,45);
    ctx.bezierCurveTo(65 - start * 0.1, 30 + start * 0.3, 65 - start * 0.3, 30 + start * 0.2, 65 - start * 0.5, 5 + start * 0.6);
    ctx.moveTo(81,45);
    ctx.bezierCurveTo(95 + start * 0.2 , 30 + start * 0.3, 95 + start * 0.3 , 30 + start * 0.2, 95 + start * 0.5 , 5 + start * 0.6);
    ctx.restore();
    
    // Second Person (right)
    ctx.save();
    ctx.translate( 28 , 20 );
	//head2
    ctx.moveTo(87 , 28);
    ctx.arc(80 , 28, 7, 0, 2*PI, true);
    
	//body2
    ctx.moveTo(80,35);
    ctx.quadraticCurveTo(82,50,110,80);
    
    //arms2
    ctx.moveTo(83,45);
    ctx.bezierCurveTo(60, 50 - start * 0.1, 60 , 50 - start * 0.1, 50 + start * 0.3 ,30 - start * 0.2);
    ctx.moveTo(83,45);
    ctx.bezierCurveTo(95, 30, 95, 30, 102, 10);
    ctx.restore();
    
    // Third Person
    ctx.save();
    ctx.translate( -10 , -50 );
	//head3
    ctx.moveTo(87 , 90);
    ctx.arc(80 , 90, 7, 0, 2*PI, true);
    
	//body3
    ctx.moveTo(80,83);
    ctx.quadraticCurveTo(82,50,80,0);
    
    //arms3
    ctx.moveTo(81,73);
    ctx.bezierCurveTo(65 + start * 0.1, 60 + start * 0.4, 60 + start * 0.1, 60 + start * 0.4, 50 + start * 0.3 , 90 + start * 0.4);
    ctx.moveTo(81,73);
    ctx.bezierCurveTo(95, 70, 100, 70, 115, 58);
    ctx.restore();
		
    
    ctx.stroke();
    
    // request new frame
    requestAnimFrame(function(){
        animateNavCom(lastTime,canvas,start,distance,directionDown,loop);
    });
}

/*function drawNavCom(canvas) {
	var PI = Math.PI;
	var ctx = canvas.getContext('2d');
	
	ctx.strokeStyle = '#000';
	ctx.lineWidth = 1;
	ctx.beginPath();
	
	//head
    ctx.moveTo(87 , 28);
    ctx.arc(80 , 28, 7, 0, 2*PI, true);
    
	//body
    ctx.moveTo(80,35);
    ctx.quadraticCurveTo(82,50,80,80);
    
    //legs
    ctx.moveTo(80,80);
    ctx.bezierCurveTo(74, 100, 74, 100, 74, 120);
    ctx.moveTo(80,80);
    ctx.bezierCurveTo(87, 100, 87, 100, 86, 120);
    
    //arms
    ctx.moveTo(81,45);
    ctx.bezierCurveTo(77, 60, 77, 60, 70 ,90);
    ctx.moveTo(81,45);
    ctx.bezierCurveTo(87, 60, 82, 60, 102, 84);
    
    //letter
    ctx.moveTo(64,85);
    ctx.quadraticCurveTo(70,88,74,95);
    ctx.moveTo(59,94);
    ctx.quadraticCurveTo(64,97,69,104);
    ctx.moveTo(59,94);
    ctx.quadraticCurveTo(62,90,64,85);
    ctx.moveTo(69,104);
    ctx.quadraticCurveTo(72,100,74,95);
    ctx.lineTo(66,94);
    ctx.lineTo(64,85);
    ctx.moveTo(59,94);
    ctx.lineTo(66,92);
    ctx.moveTo(69,104);
    ctx.lineTo(69,94);
    
    //phone
    ctx.moveTo(97,88);
    ctx.quadraticCurveTo(100,83,106,80);
    ctx.moveTo(102,93);
    ctx.quadraticCurveTo(106,88,111,85);
    ctx.lineTo(106,80);
    ctx.moveTo(97,88);
    ctx.lineTo(102,93);
    //buttons
    ctx.moveTo(99,87);
    ctx.lineTo(101,88);
    ctx.moveTo(100,88);
    ctx.lineTo(101,89);
    ctx.moveTo(101,89);
    ctx.lineTo(102,90);
    
    ctx.moveTo(109,86);
    ctx.lineTo(116,81);
    //display
    ctx.moveTo(106,82);
    ctx.lineTo(109,85);
    ctx.quadraticCurveTo(106,86,104,89);

    ctx.lineTo(101,85);
    ctx.lineTo(106,82);
    
    ctx.stroke();
};*/

/*function animateNavCom(lastTime,canvas,start,distance,directionDown,loop){
    var PI = Math.PI;
    var ctx = canvas.getContext('2d');
    
    // update stage
    var date = new Date();
    var time = date.getTime();
    var timeDiff = time - lastTime;
    var linearSpeed = 16; // pixels / second
    var linearDistEachFrame = linearSpeed * timeDiff / 1000;
    var current = start;

  
    if (loop > 0){
	    if (current + linearDistEachFrame < distance && directionDown === true  ) {
	        start = current + linearDistEachFrame *2;
	    }else{
	    	start = 0;
	    }
    }
    
    lastTime = time;
    // clear stage
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // draw stage
    ctx.strokeStyle = 'rgba(0,0,0,1)';
	ctx.lineWidth = 1;
	ctx.beginPath();

    
    if (start <= 25) {
    	//head
    	var head1 = start * 0.2;
    	var head2 = start * 0.1;
        ctx.moveTo(87 + head1, 28 + head2);
        ctx.arc(80 + head1, 28 + head2, 7, 0, 2*PI, true);
        
    	//body
        ctx.moveTo(80,35);
        ctx.quadraticCurveTo(82,50,80,80);
        
        //arms
        //left
        ctx.moveTo(81,45);
        ctx.bezierCurveTo(77, 60, 77, 60, 70 ,90);
        //right
        var right1 = start*0.5;
        ctx.moveTo(81,45);
        ctx.bezierCurveTo(87 + right1, 60, 82 + right1, 60, 102 + right1, 84 - start*1.6);
        
        //letter
        ctx.moveTo(64,85);
        ctx.quadraticCurveTo(70,88,74,95);
        ctx.moveTo(59,94);
        ctx.quadraticCurveTo(64,97,69,104);
        ctx.moveTo(59,94);
        ctx.quadraticCurveTo(62,90,64,85);
        ctx.moveTo(69,104);
        ctx.quadraticCurveTo(72,100,74,95);
        ctx.lineTo(66,94);
        ctx.lineTo(64,85);
        ctx.moveTo(59,94);
        ctx.lineTo(66,92);
        ctx.moveTo(69,104);
        ctx.lineTo(69,94);
        
        //phone
        var phone1 = start*0.5;
        var phone2 = - start*1.6;
        ctx.moveTo(97 + phone1,88 + phone2);
        ctx.quadraticCurveTo(100 + phone1, 83 + phone2, 106 + phone1, 80 + phone2);
        ctx.moveTo(102 + phone1,93 + phone2);
        ctx.quadraticCurveTo(106 + phone1, 88 + phone2, 111 + phone1, 85 + phone2);
        ctx.lineTo(106 + phone1,80+ phone2);
        ctx.moveTo(97 + phone1,88 + phone2);
        ctx.lineTo(102 + phone1,93 + phone2);
        //buttons
        ctx.moveTo(99 + phone1,87 + phone2);
        ctx.lineTo(101 + phone1,88 + phone2);
        ctx.moveTo(100 + phone1,88 + phone2);
        ctx.lineTo(101 + phone1,89 + phone2);
        ctx.moveTo(101 + phone1,89 + phone2);
        ctx.lineTo(102 + phone1,90 + phone2);
        
        ctx.moveTo(109 + phone1,86 + phone2);
        ctx.lineTo(116 + phone1,81 + phone2);
        //display
        ctx.moveTo(106 + phone1,82 + phone2);
        ctx.lineTo(109 + phone1,85 + phone2);
        ctx.quadraticCurveTo(106 + phone1, 86 + phone2, 104 + phone1, 89 + phone2);

        ctx.lineTo(101 + phone1,85 + phone2);
        ctx.lineTo(106 + phone1,82 + phone2);
    }
    if (start > 25 && start <= 50) {

    	//head
    	var head1 = - start*0.2;
    	var head2 = - start*0.1;
        ctx.moveTo(97 + head1 , 33 + head2);
        ctx.arc(90 + head1, 33 + head2, 7, 0, 2*PI, true);
        
    	//body
        ctx.moveTo(80,35);
        ctx.quadraticCurveTo(82,50,80,80);
        
        //arms
        //left
        ctx.moveTo(81,45);
        ctx.bezierCurveTo(77, 60, 77, 60, 70 ,90);
        //right
        var right1 = - start*0.5;
        ctx.moveTo(81,45);
        ctx.bezierCurveTo(112 + right1, 60, 107 + right1, 60, 127 + right1, 4 + start*1.6);
        
      //letter
        ctx.moveTo(64,85);
        ctx.quadraticCurveTo(70,88,74,95);
        ctx.moveTo(59,94);
        ctx.quadraticCurveTo(64,97,69,104);
        ctx.moveTo(59,94);
        ctx.quadraticCurveTo(62,90,64,85);
        ctx.moveTo(69,104);
        ctx.quadraticCurveTo(72,100,74,95);
        ctx.lineTo(66,94);
        ctx.lineTo(64,85);
        ctx.moveTo(59,94);
        ctx.lineTo(66,92);
        ctx.moveTo(69,104);
        ctx.lineTo(69,94);
        
        //phone
        var phone1 = 25 - start*0.5;
        var phone2 = - 80 + start*1.6;
        
        ctx.moveTo(97 + phone1,88 + phone2);
        ctx.quadraticCurveTo(100 + phone1,83 + phone2,106 + phone1,80 + phone2);
        ctx.moveTo(102 + phone1,93 + phone2);
        ctx.quadraticCurveTo(106 + phone1,88 + phone2,111 + phone1,85 + phone2);
        ctx.lineTo(106 + phone1,80 + phone2);
        ctx.moveTo(97 + phone1,88 + phone2);
        ctx.lineTo(102 + phone1,93 + phone2);
        //buttons
        ctx.moveTo(99 + phone1,87 + phone2);
        ctx.lineTo(101 + phone1,88 + phone2);
        ctx.moveTo(100 + phone1,88 + phone2);
        ctx.lineTo(101 + phone1,89 + phone2);
        ctx.moveTo(101 + phone1,89 + phone2);
        ctx.lineTo(102 + phone1,90 + phone2);
        
        ctx.moveTo(109 + phone1,86 + phone2);
        ctx.lineTo(116 + phone1,81 + phone2);
        //display
        ctx.moveTo(106 + phone1,82 + phone2);
        ctx.lineTo(109 + phone1,85 + phone2);
        ctx.quadraticCurveTo(106 + phone1,86 + phone2,104 + phone1,89 + phone2);

        ctx.lineTo(101 + phone1,85 + phone2);
        ctx.lineTo(106 + phone1,82 + phone2);
    }
    
    if (start > 50 && start <= 75) {

    	//head
    	var head1 = - start*0.2;
    	var head2 = start*0.1;
        ctx.moveTo(97 + head1, 23 + head2);
        ctx.arc(90 + head1, 23 + head2, 7, 0, 2*PI, true);
        
    	//body
        ctx.moveTo(80,35);
        ctx.quadraticCurveTo(82,50,80,80);
        
        //arms
        //left
        var left1 = - start * 0.5;
        ctx.moveTo(81,45);
        ctx.bezierCurveTo(102 + left1 , 60, 102 + left1 , 60, 110 - start * 0.8,170 - start * 1.6);
        //right
        ctx.moveTo(81,45);
        ctx.bezierCurveTo(87, 60, 82, 60, 102, 84);
        
        //letter
        var letter1 = - start * 0.8;
        var letter2 = - start * 1.6;
        ctx.moveTo(104 + letter1,165 + letter2);
        ctx.quadraticCurveTo(110 + letter1,168 + letter2,114 + letter1,175 + letter2);
        ctx.moveTo(99 + letter1,174 + letter2);
        ctx.quadraticCurveTo(104 + letter1,177 + letter2,109 + letter1,184 + letter2);
        ctx.moveTo(99 + letter1,174 + letter2);
        ctx.quadraticCurveTo(102 + letter1,170 + letter2,104 + letter1,165 + letter2);
        ctx.moveTo(109 + letter1,184 + letter2);
        ctx.quadraticCurveTo(112 + letter1,180 + letter2,114 + letter1,175 + letter2);
        ctx.lineTo(106 + letter1,174 + letter2);
        ctx.lineTo(104 + letter1,165 + letter2);
        ctx.moveTo(99 + letter1,174 + letter2);
        ctx.lineTo(106 + letter1,172 + letter2);
        ctx.moveTo(109 + letter1,184 + letter2);
        ctx.lineTo(109 + letter1,174 + letter2);
        
        //phone
        ctx.moveTo(97,88);
        ctx.quadraticCurveTo(100,83,106,80);
        ctx.moveTo(102,93);
        ctx.quadraticCurveTo(106,88,111,85);
        ctx.lineTo(106,80);
        ctx.moveTo(97,88);
        ctx.lineTo(102,93);
        //buttons
        ctx.moveTo(99,87);
        ctx.lineTo(101,88);
        ctx.moveTo(100,88);
        ctx.lineTo(101,89);
        ctx.moveTo(101,89);
        ctx.lineTo(102,90);
        
        ctx.moveTo(109,86);
        ctx.lineTo(116,81);
        //display
        ctx.moveTo(106,82);
        ctx.lineTo(109,85);
        ctx.quadraticCurveTo(106,86,104,89);

        ctx.lineTo(101,85);
        ctx.lineTo(106,82);
    }
    if (start > 75) {
    	start = start - 25;
    	
    	//head
    	var head1 = start * 0.2;
    	var head2 = -start * 0.1;
    	ctx.moveTo(72 + head1, 35.5 + head2);
        ctx.arc(65 + head1, 35.5 + head2, 7, 0, 2*PI, true);
        
    	//body
        ctx.moveTo(80,35);
        ctx.quadraticCurveTo(82,50,80,80);
        
        //arms
        var left1 = - 62.5 + start * 0.5;
        var left2 = - 100 + start * 0.8;
        var left3 = - 200 + start * 1.6;
        //left
        ctx.moveTo(81,45);
        ctx.bezierCurveTo(102 + left1, 60, 102 + left1, 60, 110 + left2, 170 +left3);
        //right
        ctx.moveTo(81,45);
        ctx.bezierCurveTo(87, 60, 82, 60, 102, 84);
        
        var letter1 =  - 100 + start * 0.8;
        var letter2 = - 200 + start * 1.6;
        //letter
        ctx.moveTo(104 + letter1,165 + letter2);
        ctx.quadraticCurveTo(110 + letter1,168 + letter2,114 + letter1,175 + letter2);
        ctx.moveTo(99 + letter1,174 + letter2);
        ctx.quadraticCurveTo(104 + letter1,177 + letter2,109 + letter1,184 + letter2);
        ctx.moveTo(99 + letter1,174 + letter2);
        ctx.quadraticCurveTo(102 + letter1,170 + letter2,104 + letter1,165 + letter2);
        ctx.moveTo(109 + letter1,184 + letter2);
        ctx.quadraticCurveTo(112 + letter1,180 + letter2,114 + letter1,175 + letter2);
        ctx.lineTo(106 + letter1,174 + letter2);
        ctx.lineTo(104 + letter1,165 + letter2);
        ctx.moveTo(99 + letter1,174 + letter2);
        ctx.lineTo(106 + letter1,172 + letter2);
        ctx.moveTo(109 + letter1,184 + letter2);
        ctx.lineTo(109 + letter1,174 + letter2);
        
        //phone
        ctx.moveTo(97,88);
        ctx.quadraticCurveTo(100,83,106,80);
        ctx.moveTo(102,93);
        ctx.quadraticCurveTo(106,88,111,85);
        ctx.lineTo(106,80);
        ctx.moveTo(97,88);
        ctx.lineTo(102,93);
        //buttons
        ctx.moveTo(99,87);
        ctx.lineTo(101,88);
        ctx.moveTo(100,88);
        ctx.lineTo(101,89);
        ctx.moveTo(101,89);
        ctx.lineTo(102,90);
        
        ctx.moveTo(109,86);
        ctx.lineTo(116,81);
        //display
        ctx.moveTo(106,82);
        ctx.lineTo(109,85);
        ctx.quadraticCurveTo(106,86,104,89);

        ctx.lineTo(101,85);
        ctx.lineTo(106,82);
        
        start = start + 25;
    }
    
    //legs
    ctx.moveTo(80,80);
    ctx.bezierCurveTo(74, 100, 74, 100, 74, 120);
    ctx.moveTo(80,80);
    ctx.bezierCurveTo(87, 100, 87, 100, 86, 120);
    
    ctx.stroke();
    
    // request new frame
    requestAnimFrame(function(){
        animateNavCom(lastTime,canvas,start,distance,directionDown,loop);
    });
}*/

/* =============================================================================
Settings Navigation Animation
========================================================================== */

function drawNavSet(canvas) {
	var PI = Math.PI;
	var ctx = canvas.getContext('2d');
	
	ctx.strokeStyle = '#000';
	ctx.lineWidth = 1;
	ctx.beginPath();
	
	//head
    ctx.moveTo(87 , 28);
    ctx.arc(80 , 28, 7, 0, 2*PI, true);
    
	//body
    ctx.moveTo(80,35);
    ctx.quadraticCurveTo(82,50,80,80);
    
    //legs
    ctx.moveTo(80,80);
    ctx.bezierCurveTo(74, 100, 74, 100, 74, 120);
    ctx.moveTo(80,80);
    ctx.bezierCurveTo(87, 100, 87, 100, 86, 120);
    
    //arms
    //left
    ctx.moveTo(81,45);
    ctx.bezierCurveTo(45, 40, 45, 35, 75 ,23);
    //right
    ctx.moveTo(81,45);
    ctx.bezierCurveTo(90, 60, 95, 60, 90, 90);
    
    ctx.stroke();
};

function animateNavSet(lastTime,canvas,start,distance,directionDown,loop){
    var PI = Math.PI;
    var ctx = canvas.getContext('2d');
    
    // update stage
    var date = new Date();
    var time = date.getTime();
    var timeDiff = time - lastTime;
    var linearSpeed = 5; // pixels / second
    var linearDistEachFrame = linearSpeed * timeDiff / 1000;
    var current = start;

  
    if (loop > 0){
	    if (current + linearDistEachFrame < distance && directionDown === true  ) {
	        start = current + linearDistEachFrame;
	    }else{
	    	directionDown = false;
	    }
	    
	    if (current - linearDistEachFrame > 0 && directionDown === false  ) {
	    	start = current - linearDistEachFrame;

	    }else{
	    	directionDown = true;
	    }
    }
    
    lastTime = time;
    // clear stage
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // draw stage
    ctx.strokeStyle = "rgba(0,0,0,1)";
	ctx.lineWidth = 1;
	ctx.font = "80% Calibri";
    ctx.fillStyle = "rgba(0,0,0,1)"; // text color
	ctx.beginPath();

    if (start > 0 && start < 3 && directionDown === true) {
    	ctx.fillText("?", 65, 22);
    }
    if (start >= 3 && directionDown === true) {
    	ctx.fillText("?", 93, 25);
    }
    if (start > 0 && start < 3 && directionDown === false) {
    	ctx.fillText("?", 50, 28);
    }
    if (start >= 3 && directionDown === false) {
    	ctx.fillText("?", 95, 40);
    }
    
    //head
    ctx.moveTo(87 , 28);
    ctx.arc(80 , 28, 7, 0, 2*PI, true);
    
	//body
    ctx.moveTo(80,35);
    ctx.quadraticCurveTo(82,50,80,80);
    
    //legs
    ctx.moveTo(80,80);
    ctx.bezierCurveTo(74, 100, 74, 100, 74, 120);
    ctx.moveTo(80,80);
    ctx.bezierCurveTo(87, 100, 87, 100, 86, 120);
    
    //arms
    //left
    ctx.moveTo(81,45);
    ctx.bezierCurveTo(45, 40 - start, 45, 35 - start, 75 + start * 0.5 ,23 - start * 0.5);
    //right
    ctx.moveTo(81,45);
    ctx.bezierCurveTo(90, 60, 95, 60, 90, 90);
    
    ctx.stroke();
    
    // request new frame
    requestAnimFrame(function(){
        animateNavSet(lastTime,canvas,start,distance,directionDown,loop);
    });
}

function show_alert()
	{
	confirm("sometext");
}

$(document).ready(function () {
	 
    // if user clicked on button, the overlay layer or the dialogbox, close the dialog 
    $('a.btn-ok, #dialog-overlay, #dialog-box').click(function () {    
        $('#dialog-overlay, #dialog-box').hide();      
        return false;
    });
     
    // if user resize the window, call the same function again
    // to make sure the overlay fills the screen and dialogbox aligned to center   
    $(window).resize(function () {
         
        //only do it if the dialog box is not hidden
        if (!$('#dialog-box').is(':hidden')) popup();      
    });
     
     
});
 
//Popup dialog
function popup(message) {
         
    // get the screen height and width 
    var maskHeight = $(document).height(); 
    var maskWidth = $(window).width();
     
    // calculate the values for center alignment
    var dialogTop =  (maskHeight/3) - ($('#dialog-box').height()); 
    var dialogLeft = (maskWidth/2) - ($('#dialog-box').width()/2);
     
    // assign values to the overlay and dialog box
    $('#dialog-overlay').css({height:maskHeight, width:maskWidth}).show();
    $('#dialog-box').css({top:dialogTop, left:dialogLeft}).show();
     
    // display the message
    $('#dialog-message').html(message);
}