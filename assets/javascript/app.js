
var questions = [
    {
        question: "What is the name of the games / groundskeeper of Hogwarts?",
        options: ["Hagrid", "Hordid", "Hagar", "Hortencia"],
        answer: "Hagrid",
        img: "./assets/images/hagrid.jpg"
    },
    {
        question: "What kind of creature is Buckbeak?",
        options: ["Phoenix", "Hippogriff", "Dragon", "Owl"],
        answer: "Hippogriff",
        img: "./assets/images/buckbeak.jpg"
    },
    {
        question: "What house is supposed to be super smart?",
        options: ["Catwhisker", "Hufflepuff", "Ravenclaw", "Dogtale"],
        answer: "Ravenclaw",
        img: "./assets/images/ravenclaw.png"
    },
    {
        question: "What book did Newt Scamander write?",
        options: ["Care for Magical Creatures", "Fantastic Beasts and Where to Find Them", "Delores Umbridge & Why She’s Got to Go!", "Hogwarts A History"],
        answer: "Fantastic Beasts and Where to Find Them",
        img: "./assets/images/fantasticBeasts.jpeg"
    },
    {
        question: "At the end of the first movie, Dumbledore gets what flavor of jelly bean?",
        options: ["Barf", "Earwax", "Buttered Toffee", "Toasted Marshmallow"],
        answer: "Earwax",
        img: "./assets/images/earwax.jpg"
    },
    {
        question: "What charm do you use for levitation?",
        options: ["Windgardium Leviosa", "Accio", "Alohamora", "Lumos"],
        answer: "Windgardium Leviosa",
        img: "./assets/images/leviosa.jpg"
    },
    {
        question: "Who teaches Herbology?",
        options: ["Ferenz", "Flitwick", "Sprout", "Hooch"],
        answer: "Sprout",
        img: "./assets/images/sprout.jpg"
    },
    {
        question: "What is the name of Hagrid’s Spider?",
        options: ["Aragorn", "Arathorn", "Aragog", "Aralia"],
        answer: "Aragog",
        img: "./assets/images/aragog.jpg"
    },
    {
        question: "All of the following are a Horcurx, except?",
        options: ["Professor Quirrel", "Harry Potter", "Womping Willow", "Locket"],
        answer: "Womping Willow",
        img: "./assets/images/willow.jpg"
    },
    {
        question: "What is the creature that comes out of a young wizard not using their power?",
        options: ["Basilisk", "Thestral", "Swooping Evil", "Obscurial"],
        answer: "Obscurial",
        img: "./assets/images/obscurial.png"
    },
]
var qIndex = 0;
var timerCount = 10;
var timerId;
var correct = 0;
var wrong = 0;
//player clicks start button
//need to make start button dissapere
//find where it lives on the screan
//.empty()

$('#start').on("click", function (event) {
    event.preventDefault()
    generateQuestion()
    startTimer()
    console.log("after questions generated");
    $('#start').hide()
})
//Question and answer options appear on screen
//function for generateng one question at a time
//var to hold the index that we are at in the array
//generate some HTML to hold ourquestion
//unique id for each button
//place to put the generated html    
function generateQuestion() {
    console.log("questions gentated");
    var question = `
        <div class="col-sm-12">
            <h1>${questions[qIndex].question}</h1>
            <div class="row m-t-1">
                <div class="col-sm-12">
                    <button id="option">${questions[qIndex].options[0]}</button>
                </div>
            </div>
            <div class="row m-t-1">
                <div class="col-sm-12">
                    <button id="option">${questions[qIndex].options[1]}</button>
                </div>
            </div>
            <div class="row m-t-1">
                <div class="col-sm-12">
                    <button id="option">${questions[qIndex].options[2]}</button>
                </div>
            </div>
            <div class="row m-t-1">
                <div class="col-sm-12">
                    <button id="option">${questions[qIndex].options[3]}</button>
                </div>
            </div>
        </div>
    `;
    $('#question').append(question)
}

//timer appears above the question with 15 seconds
//need var to hold timerCount = 15;
//function to start the timer
//setinterval every seccent 1000ms
//function for the timer itself
//every second the setinterval will call this function
//decrement out timerCount
//show it on the screen
//check to see if the player has any time left timerCount == 0
//empty our question div
//show result with right answer
//qIndex++
//set interval for 10 sec/ 3sec for testing
// display image/right answer and time left = 0

function startTimer() {
    timerCount = 10
    $('#timer').text(timerCount);
    $('#results').empty();
    timerId = setInterval(timer, 1000);
}
function timer() {
    timerCount--
    $('#timer').text(timerCount);
    if (timerCount == 0) {
        $('#question').empty();
        clearInterval(timerId);
        generateResult();
        qIndex++
        setTimeout(function () {
            generateQuestion();
            startTimer();
            finalResults();
        }, 5000)
    }
}

function generateResult() {
    $('#results').append($(`<p>The Correct Answer Is: ${questions[qIndex].answer}</p>`));
    $('#results').append($(`<img src="${questions[qIndex].img}">`));
}
//player makes a guess
//if right guess page loads with image of correct answer and congratulatory message, and internal correct count goes up.
//if wrong guess, page loads with image of correct answer and internal wrong answer count goes up. 
$('#option').on("click", function (event) {

    event.preventDefault();
    if ($(this).text() == questions[qIndex].answer) {
        generateResult()
        correct++
        console.log(correct);
    } else {
        generateResult()
        wrong++
        console.log(wrong);
    }
})

//after all 10 questions have been answered, the screen will show the number of correct and wrong answers.
function finalResults() {
    if (qIndex >= questions.length - 1) {
        var results = `
        <div class="jumbotron">
            <h1 class="display-4">Great Job!</h1>
            <p class="lead">Correct: ${correct}</p>
            <p class="lead">Wrong: ${wrong}</p>
            <hr class="my-4">
            <a class="btn btn-secondary btn-lg" id="playAgain">Play Again!</a>
        </div>
        `;
        $('#results').append(results)
    }
}
//player can click button to start game over again
$('#playAgain').on('click', function reset() {
    $('#results').empty();
    correct = 0;
    wrong = 0;
    qIndex = 0;
    $('#start').show()
})



