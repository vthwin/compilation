const DEFAULT_FONT_SIZE = "90px";
const DEFAULT_COLOR = "#f94f6d";

let homeScore = 0;
let guestScore = 0;

// Select scores elements
let homeScoreDisplay = document.getElementById("home-score");
let guestScoreDisplay = document.getElementById("guest-score");

function homeAdd(pts) {
    homeScore += pts;
    highlightHigherScore();
    homeScoreDisplay.textContent = homeScore;
}

function guestAdd(pts) {
    guestScore += pts;
    highlightHigherScore();
    guestScoreDisplay.textContent = guestScore;
}

function highlightHigherScore() {
    if (homeScore > guestScore) {
        homeScoreDisplay.style.fontSize = "110px";
        homeScoreDisplay.style.color = "orange";
        guestScoreDisplay.style.fontSize = DEFAULT_FONT_SIZE;
        guestScoreDisplay.style.color = DEFAULT_COLOR;
    } else if (homeScore < guestScore) {
        homeScoreDisplay.style.fontSize = DEFAULT_FONT_SIZE;
        homeScoreDisplay.style.color = DEFAULT_COLOR;
        guestScoreDisplay.style.fontSize = "110px";
        guestScoreDisplay.style.color = "orange";
    } else {
        homeScoreDisplay.style.fontSize = DEFAULT_FONT_SIZE;
        homeScoreDisplay.style.color = DEFAULT_COLOR;
        guestScoreDisplay.style.fontSize = DEFAULT_FONT_SIZE;
        guestScoreDisplay.style.color = DEFAULT_COLOR;
    }
}

// Reset button
let resetBtn = document.getElementById("reset");

function reset() {
    homeScore = 0;
    guestScore = 0;
    homeScoreDisplay.textContent = homeScore;
    homeScoreDisplay.style.fontSize = DEFAULT_FONT_SIZE;
    homeScoreDisplay.style.color = DEFAULT_COLOR;
    guestScoreDisplay.textContent = guestScore;
    guestScoreDisplay.style.fontSize = DEFAULT_FONT_SIZE;
    guestScoreDisplay.style.color = DEFAULT_COLOR;
}
