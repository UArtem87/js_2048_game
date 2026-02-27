'use strict';

const Game = require('../modules/Game.class');
// const initialBoard = [
//   [1024, 1024, 2, 4],
//   [4, 2, 4, 2],
//   [2, 4, 2, 4],
//   [4, 2, 0, 0],
// ];
const game = new Game();

const score = document.querySelector('.game-score');
const cells = document.querySelectorAll('.field-cell');
const btnStart = document.querySelector('.button');
const msgStart = document.querySelector('.message-start');
const msgWin = document.querySelector('.message-win');
const msgLose = document.querySelector('.message-lose');

btnStart.addEventListener('click', () => {
  if (btnStart.classList.contains('restart')) {
    msgLose.classList.add('hidden');
    msgWin.classList.add('hidden');
    game.restart();
  } else {
    game.start();
    msgStart.classList.add('hidden');
  }

  render();
});

document.addEventListener('keydown', (e) => {
  btnStart.classList.remove('start');
  btnStart.classList.add('restart');
  btnStart.textContent = 'Restart';

  const gameStatus = game.getStatus();

  if (gameStatus === 'win' || gameStatus === 'lose') {
    return;
  }

  switch (e.key) {
    case 'ArrowLeft':
      game.moveLeft();
      render();
      break;

    case 'ArrowRight':
      game.moveRight();
      render();
      break;

    case 'ArrowUp':
      game.moveUp();
      render();
      break;

    case 'ArrowDown':
      game.moveDown();
      render();
      break;
  }
});

function render() {
  const gameStatus = game.getStatus();

  if (gameStatus === 'win') {
    msgWin.classList.remove('hidden');
  }

  if (gameStatus === 'lose') {
    msgLose.classList.remove('hidden');
  }

  score.textContent = game.getScore();

  const board = game.getState();

  for (let row = 0; row < board.length; row++) {
    for (let col = 0; col < board.length; col++) {
      const index = row * 4 + col;
      const cell = cells[index];

      cell.textContent = board[row][col] > 0 ? `${board[row][col]}` : '';
      cell.className = 'field-cell';
      cell.classList.add('field-cell--' + board[row][col]);
    }
  }
}
