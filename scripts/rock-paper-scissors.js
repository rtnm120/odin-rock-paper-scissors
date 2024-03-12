function getComputerChoice() {
  rng = Math.floor(Math.random() * 3);

  let computerSelection = rng == 0 ? "rock" : rng == 1 ? "paper" : "scissors";

  return computerSelection;
}

function playRound(playerSelection, computerSelection) {
  playerSelection = playerSelection.toLowerCase();

  let results =
    playerSelection == computerSelection
      ? "It's a tie!"
      : playerSelection == "rock" && computerSelection == "paper"
        ? "You Lose! Paper beats Rock"
        : playerSelection == "rock" && computerSelection == "scissors"
          ? "You Win! Rock beats Scissors"
          : playerSelection == "paper" && computerSelection == "rock"
            ? "You Win! Rock beats Scissors"
            : playerSelection == "paper" && computerSelection == "scissors"
              ? "You Lose! Scissors beats Paper"
              : playerSelection == "scissors" && computerSelection == "paper"
                ? "You Win! Scissors beats Paper"
                : playerSelection == "scissors" && computerSelection == "rock"
                  ? "You Lose! Rock beats Scissors"
                  : "Please enter Rock, Paper or Scissors";
  return results;
}

function playGame() {
  let playerScore = 0;
  let computerScore = 0;

  for (i = 0; i < 5; i++) {
    let playerSelection = prompt("Rock, Paper or Scissors?\n");

    let results = playRound(playerSelection, getComputerChoice());

    if (results.slice(4, 5) == " ") {
      playerScore++;
      computerScore++;
    } else if (results.slice(4, 5) == "W") {
      playerScore++;
    } else {
      computerScore++;
    }

    console.log(`Round ${i + 1}: ${results}`);
  }

  let results =
    playerScore == computerScore
      ? `Both you and the computer scored ${playerScore} points. It's a tie!`
      : playerScore > computerScore
        ? `You win with ${playerScore} points!`
        : `You lose! The computer scored ${computerScore} points`;

  return results;
}
