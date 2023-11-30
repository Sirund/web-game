//game logic
let playerText = document.getElementById('playerText');
let startAgainBtn = document.getElementById('startAgainBtn');
let box_score = document.getElementById('boxScore');
let boxes = Array.from(document.getElementsByClassName('box'));
let nextBtn = document.getElementById('nextBtn');

let winnerIndicator = getComputedStyle(document.body).getPropertyValue('--winning-blocks');

const O_TEXT = "O";
const X_TEXT = "X";
let currentPlayer = X_TEXT;
let click_by = Array(9).fill(null);
let score = 0;

const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

const startGame = () => {
    nextBtn.style.display = 'none';
    boxes.forEach(box => box.addEventListener('click', boxClicked));
};


function playerHasWon() {
    for (const condition of winningCombos) {
        let [a, b, c] = condition;

        if (click_by[a] && (click_by[a] == click_by[b] && click_by[a] == click_by[c])) {
            return click_by[a];
        }
    }
    return false;
}

function restart(poin) {

    click_by.fill(null);

    boxes.forEach(box => {
        box.innerText = '';
        box.style.backgroundColor = '';
    });

    playerText.innerHTML = 'Tic Tac Toe';
    box_score.innerHTML = `score: ${poin}`;
    nextBtn.style.display = 'none';
}

function next() {
    restart(score);
}

function startAgain() {
    score = 0;
    restart(score);
}

function boxClicked(e) {
    const id = e.target.id;

    if (!click_by[id]) {
        click_by[id] = currentPlayer;
        e.target.innerText = currentPlayer;

        if (playerHasWon()) {
            score += 100;
            playerText.innerHTML = `You won!`;
            let winningBlocks = playerHasWon();

            box_score.innerHTML = `score: ${score}`;
            nextBtn.style.display = 'inline-block';
            winningBlocks.map(box => boxes[box].style.backgroundColor = winnerIndicator);
            return;
        }

        if (!isBoardFull()) {
            currentPlayer = currentPlayer === X_TEXT ? O_TEXT : X_TEXT;
            botMove();
        } else {
            score += 50;
            playerText.innerHTML = 'It\'s a tie!';
            box_score.innerHTML = `score: ${score}`;
            nextBtn.style.display = 'block';
        }
    }
}

function isBoardFull() {
    return click_by.every(cell => cell !== null);
}

function botMove() {
    // Simple bot: randomly choose an empty cell
    let emptyCells = click_by.reduce((acc, cell, index) => {
        if (cell === null) {
            acc.push(index);
        }
        return acc;
    }, []);

    let randomIndex = Math.floor(Math.random() * emptyCells.length);
    let botMoveIndex = emptyCells[randomIndex];

    click_by[botMoveIndex] = currentPlayer;
    boxes[botMoveIndex].innerText = currentPlayer;

    if (playerHasWon() !== false) {
        score += 0;
        playerText.innerHTML = `You Lose!`;
        let winningBlocks = playerHasWon();

        winningBlocks.map(box => boxes[box].style.backgroundColor = winnerIndicator);
    }

    currentPlayer = currentPlayer === X_TEXT ? O_TEXT : X_TEXT;
}

startAgainBtn.addEventListener('click', startAgain);
nextBtn.addEventListener('click', next);

startGame();

//login-register logic 
function login() {
    // Add your login logic here
    alert("Login functionality not implemented in this example.");
}

function register() {
    // Add your register logic here
    alert("Register functionality not implemented in this example.");
}

function toggleForm(formType) {
    if (formType === 'register') {
        document.getElementById('loginForm').style.display = 'none';
        document.getElementById('registerForm').style.display = 'flex';
    } else {
        document.getElementById('loginForm').style.display = 'flex';
        document.getElementById('registerForm').style.display = 'none';
    }
}