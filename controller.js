//main functions new feature add
$(document).ready(function () {	

var questionBank=new Array();
var stage="#game1";
var stage2=new Object;
var questionLock=false;
var numberOfQuestions;
var score=0;
var point;
var right;
var level;
var store=[];
var current =0;

chooseLevel();

$("#home_icon").hide();

function chooseLevel(){
	$("#navContent").css("background-image","url(img/homescreen.jpg)");
	$("#navContent").append('<div id="ui"></div>');
	
	
	// $("#ui").append('<button class="round-button" id="btn_play">Play</button>');
	$("#btn_play").click(levelPage());
	
	// $("#ui").append('<button class="round-button" id="e">Easy</button>');
	// $("#ui").append('<button class="round-button" id="m">Medium</button>');
	// $("#ui").append('<button class="round-button" id="d">Difficult</button>');	

}
function levelPage(){
		$("#navContent").css("background-image","url(img/level.jpg)");
		$("#btn_play").hide();
		$("#ui").append('<button  id="e">Easy</button>');
		$("#ui").append('<button id="m">Medium</button>');
		$("#ui").append('<button  id="d">Difficult</button>');	

		$("#e").click(function(){level = "easy"; stagePage();});
		$("#m").click(function(){level= "medium"; stagePage();});
		$("#d").click(function(){level = "difficult"; stagePage();});
		
				
		}



function stagePage(){
			$("button").hide();
			$("#navContent").css("background-image","url(img/stage.jpg)");
			$("#ui").append('<button  class = "stage_nr1" id="stage_1" >One</button>');
			$("#ui").append('<button class = "stage_nr1" id="stage_2" >Two</button>');
			$("#ui").append('<button  class = "stage_nr1" id="stage_3" >Three</button>');
			
			$("#stage_1").click(function(){
				current=0;
				start(level);});
			$("#stage_2").click(function(){
				current= 10;
				start(level);});
			$("#stage_3").click(function(){
				current= 20;
				start(level)});
		
		}


function start(level){
$("button").hide();
$.getJSON(level, function(data) {
for(i=0;i<data.questions._quiz.length;i++){ 
	questionBank[i]=new Array;
	questionBank[i][0]=data.questions._quiz[i].question;
	questionBank[i][1]=data.questions._quiz[i].option1;
	questionBank[i][2]=data.questions._quiz[i].option2;
	questionBank[i][3]=data.questions._quiz[i].option3;
	questionBank[i][4]=data.questions._quiz[i].option4;
	questionBank[i][5]=data.questions._quiz[i].description;
}



var max = data.questions._quiz.length;
console.log(max);
var rand, i;


for (i=0;store.length != max;i++){
	// console.log("hi");
	rand = Math.floor(Math.random() * max);
	
	if($.inArray( rand, store ) == -1){
		console.log(rand);
		store.push(rand);
	}	
}
numberOfQuestions=questionBank.length; 
displayQuestion();
})
}



function displayQuestion(){
	$("#info").html("#" + (current+1) + " ");
	 
	
	$(".stage_nr").hide();
	//$("#home_icon").show();
	questionNumber = store[current];
	
	console.log("----");
	console.log(current);

	
$("#navContent").css("background-image","url(img/bg.png)");

var rnd=Math.random()*4;
rnd=Math.ceil(rnd);
 var q1;
 var q2;
 var q3;
 var q4;
 var rightAudio = $("#mysoundclip")[0];
    console.log(rightAudio);
  var wrongAudio = $("#myWrongSoundClip")[0];
  console.log(wrongAudio);

if(rnd==1){
	q1=questionBank[questionNumber][1];
	q2=questionBank[questionNumber][2];
	q3=questionBank[questionNumber][3];
	q4=questionBank[questionNumber][4];
}
if(rnd==2){
	q2=questionBank[questionNumber][1];
	q3=questionBank[questionNumber][2];
	q1=questionBank[questionNumber][3];
	q4=questionBank[questionNumber][4];
}
if(rnd==3){
	q3=questionBank[questionNumber][1];
	q1=questionBank[questionNumber][2];
	q2=questionBank[questionNumber][3];
	q4=questionBank[questionNumber][4];
}
if(rnd==4){
	q4=questionBank[questionNumber][1];
	q1=questionBank[questionNumber][2];
	q2=questionBank[questionNumber][3];
	q3=questionBank[questionNumber][4];
}




$(stage).append('<div class="questionText">'+questionBank[questionNumber][0]+'</div><div id="1" class="option">'+q1+'</div><div id="2" class="option">'+q2+'</div><div id="3" class="option">'+q3+'</div><div id="4" class="option">'+q4+'</div>');
// $(stage).append('<div id="scoreBar"></div>');
$('.option').click(function(){
  if(questionLock==false){
  	questionLock=true;	
  //correct answer
  
  if(this.id==rnd){
	 var rand;
  var image;
  
  var happy = ["happy.png","happy1.png"];
  rand = Math.floor(Math.random()*2);  
   image = happy[rand];
   console.log(image);
  // $(stage).append('<div class="avatar" >  <img  src="img/images/'+image+'"  " > </div>');

    rightAudio.play();
    score++;
	
   point = ((score/numberOfQuestions)*100);
   point = Math.ceil( point ); 
   

    //document.getElementById("score").innerHTML= "Pisteet:" +score*10+ "";
} 
  //wrong answer	
  if(this.id!=rnd){
   //$(stage).append('<div class="feedback2">Not Correct, The answer is:</div>');
   
  var rand;
  var image;
  
  var sad = ["sad.png","sad1.png"];
  rand = Math.floor(Math.random()*2);
 
  image = sad[rand];
   console.log(image);
   //$(stage).append('<div  class="avatar">  <img  src="img/images/'+image+'"  "> </div>');

   wrongAudio.play();
   
   point = ((score/numberOfQuestions)*100);
   point = Math.ceil( point ); 
   document.getElementById("score").innerHTML= "Pisteet:" +score*10+ "";
   right = [q1,q2,q3,q4];
   $(stage).append('<div class="feedback_line">'+'Oikea vastaus :'+right[rnd-1]+'</div>');
   $(stage).append('<div><a class="feedback_line colored" id="show_more" href="#">Laajentaa...</a> </div>');
   $('#show_more').click(function() {
    $('#description').toggleClass('small big');
});


   $(stage).append('<div id="description"  class="small feedback_line">'+'Palaute: '+questionBank[questionNumber][5]+'</div>');
   
//   setTimeout(function(){  },2000);	//display explanation for some seconds
  } 
$(stage).append('<button id="nextQuest">Next</button>');
$("#nextQuest").insertAfter("#4");

$("#nextQuest").click(function(){changeQuestion(store, current)});

//  setTimeout(function(){changeQuestion()},2000);
  
 }})
}


function changeQuestion(){
current++;

	if(stage=="#game1"){
		stage2="#game1";
		stage="#game2";
	}
		else{
			stage2="#game2";
			stage="#game1";
		}

	if([10, 20, 30, 40].indexOf(current) == -1)
	{
		displayQuestion();
		console.log(current);
	}
	else{
		displayFinalSlide();
	}

	 $(stage2).animate({"right": "+=800px"},"slow", function() {$(stage2).css('right','-800px');$(stage2).empty();});
	 $(stage).animate({"right": "+=800px"},"slow", function() {questionLock=false;});
	//change question
}

	
	
function displayFinalSlide(){
	

	var msg1 = "Erinomainen!";
	var msg2 = "Oikein hyvä!";
	var msg3 = "Voit tehdä paremmin !";
	var msg4 = ".....";

	var grade;
	var please = "";
	
	if ((point >= 75) && (point<100)) {
		grade = "A"; 
		$(stage).append('<div class="stars"><img src="img/3stars.png"></div>');
		$(stage).append('<div class="questionText"><p id="congrats"></p> '+msg1+'</div>');
		};
	if ((point>=50) && (point<75)) {
		grade = "B"; 
		$(stage).append('<div class="stars"><img src="img/2stars.png"></div>');
		$(stage).append('<div class="questionText"><p id="congrats"></p> '+msg2+'</div>');
		};
	
	if ((point>=0) && (point<50)){ grade = "C";
		$(stage).append('<div class="stars"><img src="img/1stars.png"></div>');
		$(stage).append('<div class="questionText"><p id="tryPlease"> ' +please+ '</p> '+msg3+' </div>'); 
		};
			if(numberOfQuestions==score)
	{
	

	$(stage).append('<div class="questionText"><p id="congrats"></p> '+msg4+'</div><br><br>');
	
	}
	else{
		$(stage).append('<div class="questionText"><p id="tryPlease"> ' +msg4+ '</p> </div><br><br>');
	}
	
	
	
	
	}//display final slide
	

});//doc ready
