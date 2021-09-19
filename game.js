
// set up initial var/const

const question = document.querySelector("#question")
const choices = Array.from(document.querySelectorAll(".choice-text"))
const progressText = document.querySelector("#progressText")
const scoreText = document.querySelector("#score")
var timerEl = document.querySelector("#timer");

let currentQuestion ={}
let acceptingAnswers = true
let score = 0
let questionCounter = 0
let availableQuestions =[]

// timer variables
let time = 60;
var timerId;
timerEl.textContent = time;

// Set quiz up questions

let questions =[
    {
        question: "String values must be enclosed within ____ when being assigned to varliables", 
        choice1: "commas",
        choice2: "curly brackets",
        choice3: "quotes",
        choice4: "parenthesis",
        answer: 3,
    },

     {
        question: "Arrays in JavaScript can be used to store ___?", 
        choice1: "numbers and strings",
        choice2: "other arrays",
        choice3: "booleans",
        choice4: "all of the above",
        answer: 4,
    },

    {
        question: "A development tool for debugging by printing content to the debugger is ", 
        choice1: "JavaScript",
        choice2: "terminal",
        choice3: "Bash",
        choice4: "console log",
        answer: 4,
    },

    {
        question: "The conditions set by an if/else statement are enclosed by: ", 
        choice1: "quotes",
        choice2: "curly brackets",
        choice3: "parenthesis",
        choice4: "square brackets",
        answer: 3,
    },

    {
        question: "What is JavaScript", 
        choice1: "evil",
        choice2: "helpful",
        choice3: "annoying",
        choice4: "basic",
        answer: 1,
    }
]

const SCORE_POINTS = 100
const MAX_QUESTIONS = 5

// set starting values
function startGame() {
  questionCounter = 0;
  score = 0;
  availableQuestions = [...questions];
  getNewQuestion();
  //  start timer
  timerId = setInterval(clockTick, 1000);
  
}


// pull up new questions
function getNewQuestion() {
//    end game if questions are done
    if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
        localStorage.setItem("mostRecentScore", score)

        return window.location.assign("end.html")
    }
// count for how far along you are in the quiz
    questionCounter++
    progressText.innerText = "Question " + questionCounter + " of " + MAX_QUESTIONS
    // randomize questions
    const questionsIndex = Math.floor(Math.random()* availableQuestions.length)
    currentQuestion = availableQuestions [questionsIndex]
    question.innerText =  currentQuestion.question

    choices.forEach(choice => {
        const number = choice.dataset["number"]
        choice.innerText = currentQuestion["choice" + number]
    })

    availableQuestions.splice(questionsIndex, 1)

    acceptingAnswers = true
}   


// update time
function clockTick() {
  time--;
  timerEl.textContent = time;
  // check if user ran out of time
  if (time <= 0) {
    TimeStop();
  }
}

choices.forEach(choice => {
    choice.addEventListener("click", e => {
        if(!acceptingAnswers) return

        acceptingAnswers =false
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset["number"]
        
        let classToApply = selectedAnswer == currentQuestion.answer ? "correct" : "incorrect"

        if (classToApply === "correct"){
            incrementScore(SCORE_POINTS)
        }
        
        else if (classToApply === "incorrect") {
            time -= 10;
        }

        selectedChoice.parentElement.classList.add(classToApply)

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion()
        }, 1000)
        
    })

})


function TimeStop() {
  // stop timer
  clearInterval(timerId);
}

// add points to score
incrementScore = num => {
    score+=num
    scoreText.innerText = score
}


startGame()