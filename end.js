const usernameEl = document.querySelector("#username");
const saveScoreBtn = document.querySelector("#saveScoreBtn");
const finalScore = document.querySelector("#finalScore");
const mostRecentScore = localStorage.getItem("mostRecentScore");

const highScores = JSON.parse(localStorage.getItem("highScores")) || [];

const MAX_HIGH_SCORES = 5

finalScore.innerText = mostRecentScore

// doesn't let user save without entering initials

usernameEl.addEventListener("keyup", () => {
    saveScoreBtn.disabled = !usernameEl.value
})

// saving high score to local storage
function saveHighScore() {
e.preventDefault()

let username = usernameEl.value.trim();

const newScore ={
    score: mostRecentScore,
    name: username.value
}

// append highscores list with current score
highScores.push(newScore)

// sorts scores

highScores.sort((a,b) => {
 return b.newscore - a.newScore
})

highScores.splice(5)


localStorage.setItem("highScores", JSON.stringify(highScores));
window.location.assign ("/");
};

//clears the highscore in local storage.
function clearHighscores() {
  window.localStorage.removeItem("highscores");
  window.location.reload();
}

document.getElementById("clear").onclick = clearHighscores;