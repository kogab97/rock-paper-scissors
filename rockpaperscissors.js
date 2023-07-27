const computerOptions = ["rock", "paper", "scissors"];

let roundsLeft = 10;

function updateRounds() {
  const roundsLeftSpan = document.getElementById("rounds-left");
  roundsLeftSpan.textContent = roundsLeft;
}

updateRounds();

let playersScore = 0;
let computersScore = 0;

function updateScores() {
  const playerScoreDisplay = document.getElementById("player-score");
  playerScoreDisplay.textContent = playersScore;

  const computerScoreDisplay = document.getElementById("computer-score");
  computerScoreDisplay.textContent = computersScore;
}

function handleWinner(winner) {
  const roundResult = document.getElementById("round-result");

  if (winner == "computer") {
    roundResult.textContent = "Computer won";
    computersScore++;
  } else if (winner == "player") {
    roundResult.textContent = "Player won";
    playersScore++;
  }

  updateScores();
}

const playerOptionButtons = document.querySelectorAll(".player-option-button");

playerOptionButtons.forEach((button) => {
  button.addEventListener("click", () => {
    roundsLeft--;
    updateRounds();

    const computerChoiceIndex = Math.floor(Math.random() * 3);
    const computerChoice = computerOptions[computerChoiceIndex];

    const playersChoice = button.dataset.choice;

    displayChoices(playersChoice, computerChoice);

    chooseWinner(playersChoice, computerChoice);

    if (roundsLeft == 0) {
      handleGameOver();
    }
  });
});

function displayChoices(playersChoice, computerChoice) {
  const choicesContainer = document.getElementById("round-choices");
  choicesContainer.textContent = `Player: ${playersChoice} - Computer: ${computerChoice}`;
}

function chooseWinner(playersChoice, computerChoice) {
  if (playersChoice == computerChoice) {
    const roundResult = document.getElementById("round-result");
    roundResult.textContent = "It's a tie";
  } else if (playersChoice == "rock") {
    if (computerChoice == "paper") {
      handleWinner("computer");
    } else {
      handleWinner("player");
    }
  } else if (playersChoice == "paper") {
    if (computerChoice == "scissors") {
      handleWinner("computer");
    } else {
      handleWinner("player");
    }
  } else if (playersChoice == "scissors") {
    if (computerChoice == "rock") {
      handleWinner("computer");
    } else {
      handleWinner("player");
    }
  }
}

function determineWinner() {
  if (playersScore > computersScore) {
    return "player";
  } else if (playersScore < computersScore) {
    return "computer";
  } else {
    return "tie";
  }
}

function getScore() {
  const winner = determineWinner();
  const scoreBoard = document.getElementsByTagName("tbody")[0];
  scoreBoard.insertAdjacentHTML(
    "beforeend",
    `
            <tr>
                <td>${playersScore}</td>
                <td>${computersScore}</td>
                <td>${winner}</td>
                </tr>
                `
  );
}

function handleGameOver() {
  const buttonsContainer = document.getElementById("buttons-container");
  buttonsContainer.style.display = "none";
  const gameInfoContainer = document.getElementById("game-info-container");
  gameInfoContainer.style.display = "none";
  const gameResult = document.getElementById("game-result");

  const winner = determineWinner();
  if (winner == "player") {
    gameResult.innerHTML = "<h1>You Won!</h1>";
  } else if (winner == "computer") {
    gameResult.innerHTML = "<h1>Computer Won :(</h1>";
  } else {
    gameResult.innerHTML = "<h1>It's a tie 🤷‍♀️</h1>";
  }

  getScore();

  //   const scoreBoard = document.getElementsByTagName("tbody")[0];

  //   scoreBoard.insertAdjacentHTML(
  //     "beforeend",
  //     `
  //           <tr>
  //               <td>${playersScore}</td>
  //               <td>${computersScore}</td>
  //               <td>${winner}</td>
  //           </tr>
  //       `
  //   );
}

const restartButton = document.getElementById("restart-button");

restartButton.addEventListener("click", () => {
  if (roundsLeft == 0) {
    const buttonsContainer = document.getElementById("buttons-container");
    buttonsContainer.style.display = "block";
    const gameInfoContainer = document.getElementById("game-info-container");
    gameInfoContainer.style.display = "block";
    const gameResult = document.getElementById("game-result");
    gameResult.innerHTML = "";
  }

  roundsLeft = 10;
  updateRounds();

  playersScore = 0;
  computersScore = 0;
  updateScores();

  const choicesContainer = document.getElementById("round-choices");
  choicesContainer.textContent = "";

  const roundResult = document.getElementById("round-result");
  roundResult.textContent = "";
});

function getData() {
  fetch("http://localhost:3000/results")
    .then((response) => response.json())
    .then((scores) => scores.forEach(scores));
  // .then((data) => scoreBoard.insertAdjacentHTML(data));
}
