var gamePattern = [];
var userClickedPattern = [];
var level = 1;
var buttonColours = ["red", "blue", "green", "yellow"];
var started = true;

//detect the keyboard, if the keyboard is pressed at the first time, trigger the nextSequence.

$(document).on("keydown", function(){
    if (started){

        nextSequence();
        started = false;
    }
});


//each time generate a new button, if the new one is clicked, flash that button.
function nextSequence(){
    //clear the clicked patterns. So for the next round, user has to click from beginnng
    userClickedPattern = [];
    
    $("h1").text("Level "+level);
    level++;

    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    //show the user which button is just randomly generated
    $("#"+randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    makeSounds(randomChosenColour);
    //if the corrected button is clicked, flash the correct one.
    
    // $("#"+randomChosenColour).on("click",function(){
    //     $("#"+randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    //     makeSounds(randomChosenColour);
    // });
    console.log("gamePattern   " +gamePattern);
     
}


//Any buttons clicked by user will flash the button and buzz
$(".btn").on("click", function(){
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    console.log("userClickedPattern   " +userClickedPattern);
    animatePress("#"+userChosenColour);
    makeSounds(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
   
})

//reset the parameters
function startOver(){
    level = 1;
    gamePattern = [];
    this.started = true;
}




//check if the user clicked sequence mathches the buttons sequence generated randomly
//if all the sequence matches, start generating a new one
function checkAnswer(currentLevel){
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]){
        console.log("success");
        if (currentLevel == (gamePattern.length-1 )){
            setTimeout(function(){
                nextSequence();
            }, 1500);
        }   
    }
    else {
        console.log("success");
        $("h1").text("Game Over, Press Any Key to Restart");
        makeSounds("wrong");
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        }, 250);
        startOver();
    }
}


function animatePress(currentColour){
    $(currentColour).addClass("pressed");
    setTimeout(function(){ $(currentColour).removeClass("pressed")} ,100);
}

function makeSounds(rChosenColour){  //playSound()
    var color = "sounds/"+rChosenColour+".mp3";
    var audio = new Audio(color);
    audio.play();
}

