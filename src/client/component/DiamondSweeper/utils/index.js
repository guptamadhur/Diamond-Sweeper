import { DIAMOND } from "../constants";

//generates random integer within range
const getRandomInt = (max) => {
  return Math.floor(Math.random() * Math.floor(max));
};

//generates diamonds at random places
export const randomizeBoard = (size) => {
  const board_size = size * size;
  const board = new Array(board_size).fill(null);
  var i = 0;
  while (i < size) {
    const randomIndex = getRandomInt(board_size);
    if (!board[randomIndex]) {
      board[randomIndex] = DIAMOND;
      i++;
    }
  }
  return board;
};
