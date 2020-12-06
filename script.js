$(document).ready(function () {
  var playerScore = 0;
  var currentQuestion = 0;
  var gameTime = 75;
  var highScores = [];
  var intervalId;

  //Stores the Quiz
  var questions = [
    {
      questionText: "Which of these is a function declaration in Javascript?",
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
        "To store an <input>'s string as a number, use the ____ method.",
      answers: [
        "1. Floater",
        "2. Math.floor",
        "3. parseInt{}",
        "4. saveToNum()",
      ],
      isCorrect: 2,
    },
    {
      questionText: "Which statement about Javascript Objects is false?",
      answers: [
        "1. Can be put into local storage with JSON",
        "2. Can be stored in Arrays",
        "3. Can contain strings",
        "4. Are called using myObject()",
      ],
      isCorrect: 3,
    },
    {
      questionText: "JS Libraries Include:",
      answers: ["1. SASS", "2. Materialize", "3. React", "4. JQuerySelector"],
      isCorrect: 2,
    },
  ];

  //Timer
  var startTimer = function () {
    intervalId = setInterval(function () {
      if (gameTime === 0 && $("#quiz").is(":visible")) {
        clearInterval(intervalId);
        endGame();
        return;
      }
      gameTime--;
      $("#timer").text(gameTime);
    }, 1000);
  };

  //A function that hides the quiz and reveals the Get Initials screen
  function endGame() {
    clearInterval(intervalId);
    playerScore = gameTime;
    $("#initials").val("");
    $("#highScore").text(playerScore);
    $("nav span").hide();
    $("#quiz").hide();
    $("#getInitials").show();
  }

  // Loop through the highscores object and create a line to display each stored player
  function renderHighScores() {
    highScores.sort(function (a, b) {
      if (a.score < b.score) {
        return 1;
      } else {
        return -1;
      }
    });
    $("#highScorePage ul").empty();
    $.each(highScores, function (i, person) {
      listItem = $("<div>");
      listSpan = $("<span />");
      listItem.addClass("row");
      listSpan.addClass("badge-pill badge-primary mb-1");
      listSpan.text(
        `${i + 1}. ${person.initial.toUpperCase()} with ${person.score} points`
      );
      listItem.append(listSpan);
      $("#highScorePage ul").append(listItem);
    });
  }

  //Hide the alerts after 2 seconds
  function hideAlert() {
    setTimeout(function () {
      $("#passFail").hide();
    }, 2000);
  }

  // Switch to the next question
  function nextQuestion() {
    if (currentQuestion < questions.length) {
      $("#question").text(questions[currentQuestion].questionText);
      $("#answer1").text(questions[currentQuestion].answers[0]);
      $("#answer2").text(questions[currentQuestion].answers[1]);
      $("#answer3").text(questions[currentQuestion].answers[2]);
      $("#answer4").text(questions[currentQuestion].answers[3]);
    } else endGame();
  }

  //Check if question is correct. If wrong, subtract time.
  $("#quiz").on("click", function (event) {
    if (event.target.matches("button")) {
      if (
        parseInt(event.target.dataset["answer"]) ===
        questions[currentQuestion].isCorrect
      ) {
        currentQuestion++;
        $("#passFail p").text("Correct!");
        $("#passFail").show();
        hideAlert();
        nextQuestion();
      } else {
        gameTime = gameTime - 15;
        currentQuestion++;
        $("#passFail p").text("Wrong!");
        $("#passFail").show();
        hideAlert();
        nextQuestion();
      }
    }
  });

  //Start the quiz
  $("#startQuiz").on("click", function () {
    nextQuestion();
    $("#startScreen").hide();
    $("#quiz").show();
    $("#timer").parent().show();
    $("#timer").show();
    startTimer();
  });

  //Go to high score screen after Get Initials screen
  $("#getInitials button").on("click", function (event) {
    event.preventDefault();
    $("#getInitials").hide();
    $("#highScorePage").show();
    var person = {
      initial: $("#initials").val(),
      score: playerScore,
    };
    highScores.push(person);
    renderHighScores();
  });

  //Clear the high scores
  $("#clear").on("click", function () {
    highScores = [];
    renderHighScores();
  });

  //When the Go Back button is clicked, start the quiz over
  $("#goBack").on("click", function () {
    currentQuestion = 0;
    gameTime = 75;
    $("#highScorePage").hide();
    $("#startScreen").show();
  });

  //Go to High Scores page when View High Scores button is clicked
  $("#viewHighscores").on("click", function () {
    $("#startScreen, #getInitials, #quiz").hide();
    renderHighScores();
    $("#highScorePage").show();
  });
});
