const cells = document.querySelectorAll('.cell');
const resetButton = document.getElementById('reset');
const scoreXElement = document.getElementById('scoreX');
const scoreOElement = document.getElementById('scoreO');
const notification = document.getElementById('notification');
let board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let scoreX = 0;
let scoreO = 0;
const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

cells.forEach(cell => {
    cell.addEventListener('click', handleCellClick);
});

resetButton.addEventListener('click', resetGame);

function handleCellClick(e) {
    const cell = e.target;
    const index = cell.getAttribute('data-index');
    
    if (board[index] === '') {
        board[index] = currentPlayer;
        cell.textContent = currentPlayer;
        if (checkWin(currentPlayer)) {
            updateScore(currentPlayer);
            showNotification(`${currentPlayer} gana!`);
            resetBoard();
        } else if (board.every(cell => cell !== '')) {
            showNotification('¡Empate!');
            resetBoard();
        } else {
            currentPlayer = 'O';
            computerMove();
        }
    }
}

function computerMove() {
    let emptyCells = board.map((cell, index) => cell === '' ? index : null).filter(index => index !== null);
    
    let index = emptyCells[Math.floor(Math.random() * emptyCells.length)];
    board[index] = currentPlayer;
    cells[index].textContent = currentPlayer;

    if (checkWin(currentPlayer)) {
        updateScore(currentPlayer);
        showNotification(`${currentPlayer} gana!`);
        resetBoard();
    } else if (board.every(cell => cell !== '')) {
        showNotification('¡Empate!');
        resetBoard();
    } else {
        currentPlayer = 'X';
    }
}

function checkWin(player) {
    return winningCombinations.some(combination => {
        return combination.every(index => {
            return board[index] === player;
        });
    });
}

function updateScore(player) {
    if (player === 'X') {
        scoreX++;
        scoreXElement.textContent = scoreX;
    } else if (player === 'O') {
        scoreO++;
        scoreOElement.textContent = scoreO;
    }
}

function showNotification(message) {
    notification.textContent = message;
    notification.classList.add('visible');
    setTimeout(() => {
        notification.classList.remove('visible');
    }, 3000);
}

function resetBoard() {
    board = ['', '', '', '', '', '', '', '', ''];
    cells.forEach(cell => {
        cell.textContent = '';
    });
    currentPlayer = 'X';
}

function resetGame() {
    scoreX = 0;
    scoreO = 0;
    scoreXElement.textContent = scoreX;
    scoreOElement.textContent = scoreO;
    resetBoard();
}
