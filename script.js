$(document).ready(function () {
  var score = 0;
  var currentQuestion = 0;
  var gameOver = false;
  var gameTime = 10;

  // A way to store all the questions and answers. Probably a series of objects or an array of objects.
  var questions = [
    {
      questionText: "Ways to declare functions in Javascript DO NOT include:",
      answers: [
        "1. const lanchMissiles = function(target, howMany){}",
        "2. let function amazingFunction(param){}",
        "3. var combHair = (z, x) -> {}",
        "4. functions stopEvilRobots(bySea, byAir, YoshimiYN){}",
      ],
      isCorrect: 0,
    },
    {
      questionText:
        "To store an <input> string as a number, use the ____ method.",
      answers: [
        "1. Floater",
        "2. Math.floor",
        "3. parseInt(}",
        "4. saveToNum()",
      ],
      isCorrect: 2,
    },
  ];
  //Load the first question to the page
  $("#question").text(questions[0].questionText);
  $("#answer1").text(questions[0].answers[0]);
  $("#answer2").text(questions[0].answers[1]);
  $("#answer3").text(questions[0].answers[2]);
  $("#answer4").text(questions[0].answers[3]);

  //(Version 3)When a button is clicked, highlight it so the user knows that it is selected

  //A timer in the upper right corner
  //If time runs out and game is not over, game over
  var startTimer = function () {
    var intervalId = setInterval(function () {
      if (gameTime === 0) {
        clearInterval(intervalId);
        endGame();
        return;
      }
      gameTime--;
      $("#timer").text(gameTime);
    }, 1000);
  };

  //A function that ends the game endGame()

  // Check the array to see if the answers were correct
  //If wrong, subtract seconds from timer. 5 seconds.

  //If correct, Call the function that changes to the next question
  $("#buttons").on("click", function (event) {
    if (event.target.matches("button")) {
      if (
        parseInt(event.target.dataset["answer"]) ===
        questions[currentQuestion].isCorrect
      ) {
        console.log("Correct!!");
        currentQuestion++;
        $("#passFail p").text("Correct!");
        $("#passFail").removeClass("hide");
        // debugger;

        passFailTimeout();
        nextQuestion();
      } else {
        gameTime = gameTime - 5;
        currentQuestion++;
        $("#passFail p").text("Wrong!");
        $("#passFail").removeClass("hide");
        // debugger;
        passFailTimeout();
        nextQuestion();
      }
    }
  });

  // Display correct or incorrect for 3 seconds, then hide them.
  //A timer function that displays the correct/incorrect div for 3 senconds
  function passFailTimeout() {
    setTimeout(function () {
      $("#passFail").addClass("hide");
    }, 2000);
  }

  // A Function that Replacse the question and answers with the next question based on the global var
  function nextQuestion() {
    $("#question").text(questions[currentQuestion].questionText);
    $("#answer1").text(questions[currentQuestion].answers[0]);
    $("#answer2").text(questions[currentQuestion].answers[1]);
    $("#answer3").text(questions[currentQuestion].answers[2]);
    $("#answer4").text(questions[currentQuestion].answers[3]);
  }

  //A function that starts the qu
  $("#startQuiz").on("click", function () {
    console.log("click fired");
    $("#startScreen").hide();
    $("#quiz").show();
  });
});
//A function that changes the screen to the high score screen. By hiding the quiz and revealing the high score div.
// Build a high score screen in html
// Build a start menu screen in HTML.
