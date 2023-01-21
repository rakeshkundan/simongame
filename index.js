var buttonColors=["green","red","yellow","blue"];
var randomChosenColor=[];
var gamePattern=[];
var userclickedpattern=[];
var level=0;
var started=false;
// var currentlevel=0;
$(document).keypress(function(){
    if(!started)
    {
        level++;
        nextSequence();
        started=true;
        
    }
});
function nextSequence(){
    $("#level-title").text("level "+level);
    level=level+1;
    var randNum=Math.ceil((Math.random()*4))-1;
    gamePattern.push(buttonColors[randNum]);
    $("#"+buttonColors[randNum]).fadeIn(100).fadeOut(100).fadeIn(100);
    var audio=new Audio("sounds/"+buttonColors[randNum]+".mp3");
    console.log(audio);
    audio.play();
}

// nextSequence();

$(".btn").click(function (){
    var clicked=$(this).attr("id");
    userclickedpattern.push(clicked);
    new Audio("sounds/"+clicked+".mp3").play();
    pressed(clicked);
    checkAnswer(userclickedpattern.length-1);
    
       
});
function checkAnswer(currentlevel)
{
    if(gamePattern[currentlevel]===userclickedpattern[currentlevel])
    {
        // console.log("success");

        if(gamePattern.length===userclickedpattern.length)
        {
            setTimeout(function(){
                userclickedpattern=[];
                nextSequence();
            },1000);
        }
    }
    else{
        userclickedpattern=[];
        gamePattern=[];
        gameover();
       
        
    }

}
function pressed(currentColor)
{
    $("#"+currentColor).addClass("pressed");
    setTimeout(function(){
        $("#"+currentColor).removeClass("pressed");
    },100);
}
function gameover()
{
new Audio("sounds/wrong.mp3").play();
$("body").addClass("game-over");
setTimeout(function(){
    $("body").removeClass("game-over");
    location.reload();
},1000);

}