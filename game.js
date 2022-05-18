var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];

var userClickedPattern = [];

var started = false;

var level = 0;

// ===== next sequence ====

function nextSequence() {
  level++;
  $("#level-title").text("Level " + level);
  userClickedPattern = [];

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];

  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);

  playSound(randomChosenColour);
}

// ==== on button click ====

$(".btn").on("click", function () {
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length-1);
});

// ==== play sound ====

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

// ==== animate key press ====

function animatePress(currentColour) {
  $("." + currentColour).addClass("pressed");
  setTimeout(function () {
    $("." + currentColour).removeClass("pressed");
  }, 100);
}

// ===== Keypress =====

$(document).keypress(function () {
  if (!started) {
    started = true;
    nextSequence();
    $("#level-title").text("Level " + level);
  }
});

// ==== check answer ====

function checkAnswer(currentLevel) {
   if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
      console.log("success");
      if(gamePattern.length === userClickedPattern.length){
         setTimeout(function() {
            nextSequence();
         }, 1000);
      }
   }
   else{
      console.log("wrong");
      playSound("wrong");
      $("body").addClass("game-over");
      setTimeout(function() {
         $("body").removeClass("game-over");
      }, 200);
      $("#level-title").text("Game Over, Press Any Key to Restart");
      startOver();
   }
}

// ==== restart game ====

function startOver() {
   started = false;
   gamePattern = [];
   userClickedPattern = [];
   level = 0;
}