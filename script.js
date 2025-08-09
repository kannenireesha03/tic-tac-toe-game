const cells = document.querySelectorAll('[data-cell]');
const message = document.getElementById('message');
const restartBtn = document.getElementById('restartBtn');

let currentPlayer = 'X';
let gameActive = true;
const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
];

function handleClick(e) {
    const cell = e.target;
    if (!gameActive || cell.classList.contains('taken')) return;
    
    cell.textContent = currentPlayer;
    cell.classList.add('taken');

    if (checkWin(currentPlayer)) {
        message.textContent = `${currentPlayer} Wins! 🎉`;
        highlightWinningCells(currentPlayer);
        gameActive = false;
        return;
    }

    if ([...cells].every(cell => cell.classList.contains('taken'))) {
        message.textContent = "It's a Draw! 🤝";
        gameActive = false;
        return;
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    message.textContent = `Player ${currentPlayer}'s Turn`;
}

function checkWin(player) {
    return winningCombinations.some(combination => {
        return combination.every(index => cells[index].textContent === player);
    });
}

function highlightWinningCells(player) {
    winningCombinations.forEach(combination => {
        if (combination.every(index => cells[index].textContent === player)) {
            combination.forEach(index => cells[index].classList.add('winner'));
        }
    });
}

function restartGame() {
    cells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('taken', 'winner');
    });
    currentPlayer = 'X';
    gameActive = true;
    message.textContent = `Player X's Turn`;
}

cells.forEach(cell => cell.addEventListener('click', handleClick));
restartBtn.addEventListener('click', restartGame);

message.textContent = `Player X's Turn`;
