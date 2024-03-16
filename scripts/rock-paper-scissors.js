function getComputerChoice() {
  rng = Math.floor(Math.random() * 3);

  let computerSelection = rng == 0 ? "rock" : rng == 1 ? "paper" : "scissors";

  return computerSelection;
}

function playRound(playerSelection) {
  playerSelection = playerSelection.toLowerCase();
  const computerSelection = getComputerChoice();

  if (playerScore == 5 || computerScore == 5) {
    return;
  }

  let results = "";

  if (
    (playerSelection == "rock" && computerSelection == "scissors") ||
    (playerSelection == "paper" && computerSelection == "rock") ||
    (playerSelection == "scissors" && computerSelection == "paper")
  ) {
    results = "w";
  } else if (
    (playerSelection == "rock" && computerSelection == "paper") ||
    (playerSelection == "paper" && computerSelection == "scissors") ||
    (playerSelection == "scissors" && computerSelection == "rock")
  ) {
    results = "l";
  } else {
    results = "t";
  }

  updateScore(results, playerSelection, computerSelection);
}

function updateScore(results, playerSelection, computerSelection) {
  const playerScoreboard = document.querySelector(".player-score h1");
  const computerScoreboard = document.querySelector(".computer-score h1");
  const playerImage = document.querySelector(".player-image");
  const computerImage = document.querySelector(".computer-image");
  const roundDisplay = document.querySelector(".round-display");
  const roundSummary = document.querySelector(".round-summary");
  const replayChildren = document.querySelectorAll(".replay *");

  let resultMessage = "";
  let summaryMessage = "";

  if (replayChildren[0].classList.contains("hidden")) {
    replayChildren.forEach((child) => {
      child.classList.remove("hidden");
    });
  }

  playerImage.setAttribute("src", `images/${playerSelection}.png`);
  computerImage.setAttribute("src", `images/${computerSelection}.png`);

  if (results == "w") {
    playerScore++;
    resultMessage = "You Win!";
    summaryMessage = `${toTitleCase(playerSelection)} beats ${toTitleCase(computerSelection)}`;
  } else if (results == "l") {
    computerScore++;
    resultMessage = "You Lose!";
    summaryMessage = `${toTitleCase(computerSelection)} beats ${toTitleCase(playerSelection)}`;
  } else {
    playerScore++;
    computerScore++;
    resultMessage = "It's a Tie!";
    summaryMessage = `Both players picked ${toTitleCase(playerSelection)}`;
  }

  roundDisplay.textContent = resultMessage;
  roundSummary.textContent = summaryMessage;
  playerScoreboard.textContent = playerScore;
  computerScoreboard.textContent = computerScore;

  if (playerScore == 5 || computerScore == 5) {
    displayWinner();
  }
}

function displayWinner() {
  const container = document.querySelector("body div");
  const display = document.createElement("div");
  const message = document.createElement("h3");
  const resetButton = document.createElement("button");

  //display.classList.add("flex-container", "flex-column");

  if (playerScore > computerScore) {
    message.textContent = "You were the first to 5 points!";
  } else if (computerScore > playerScore) {
    message.textContent = "The Computer was the first to 5 points!";
  } else {
    message.textContent = "It's a tie! Both players have reached 5 points!";
  }

  resetButton.textContent = "Play Again?";

  display.appendChild(message);
  display.appendChild(resetButton);
  container.appendChild(display);

  resetButton.addEventListener("click", resetGame);
}

function resetGame() {
  const replayChildren = document.querySelectorAll(".replay *");
  const playerScoreboard = document.querySelector(".player-score h1");
  const computerScoreboard = document.querySelector(".computer-score h1");
  const roundDisplay = document.querySelector(".round-display");
  const roundSummary = document.querySelector(".round-summary");

  replayChildren.forEach((child) => {
    child.classList.add("hidden");
  });

  roundDisplay.textContent = "";
  roundSummary.textContent = "";

  playerScore = 0;
  computerScore = 0;

  playerScoreboard.textContent = playerScore;
  computerScoreboard.textContent = computerScore;

  document.querySelector("button").parentElement.remove();
}

function toTitleCase(string) {
  return `${string.slice(0, 1).toUpperCase()}${string.slice(1)}`;
}

const playerChoices = document.querySelectorAll(".player-selection img");
const rock = playerChoices[0];
const paper = playerChoices[1];
const scissors = playerChoices[2];

let playerScore = 0;
let computerScore = 0;

rock.addEventListener("click", () => {
  playRound("rock");
});

paper.addEventListener("click", () => {
  playRound("paper");
});

scissors.addEventListener("click", () => {
  playRound("scissors");
});
