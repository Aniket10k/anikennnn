export type Board = number[][];

// Function to check if there are any empty spots
function isMovesLeft(board: Board): boolean {
  for (let row = 0; row < 3; row++) {
    for (let col = 0; col < 3; col++) {
      if (board[row][col] === 0) {
        return true;
      }
    }
  }
  return false;
}

// Function to evaluate the board and check the winner
function evaluate(board: Board): number {
  // Check rows for victory
  for (let row = 0; row < 3; row++) {
    if (board[row][0] === board[row][1] && board[row][1] === board[row][2]) {
      if (board[row][0] === -1) {
        return 10; // Computer wins
      } else if (board[row][0] === 1) {
        return -10; // Opponent wins
      }
    }
  }

  // Check columns for victory
  for (let col = 0; col < 3; col++) {
    if (board[0][col] === board[1][col] && board[1][col] === board[2][col]) {
      if (board[0][col] === -1) {
        return 10; // Computer wins
      } else if (board[0][col] === 1) {
        return -10; // Opponent wins
      }
    }
  }

  // Check diagonals for victory
  if (board[0][0] === board[1][1] && board[1][1] === board[2][2]) {
    if (board[0][0] === -1) {
      return 10; // Computer wins
    } else if (board[0][0] === 1) {
      return -10; // Opponent wins
    }
  }

  if (board[0][2] === board[1][1] && board[1][1] === board[2][0]) {
    if (board[0][2] === -1) {
      return 10; // Computer wins
    } else if (board[0][2] === 1) {
      return -10; // Opponent wins
    }
  }

  // No winner
  return 0;
}

// Minimax function to choose the best move
function minimax(board: Board, depth: number, isMax: boolean): number {
  let score = evaluate(board);

  // If the computer has won, return the score
  if (score === 10) {
    return score - depth; // Favor faster wins
  }

  // If the opponent has won, return the score
  if (score === -10) {
    return score + depth; // Favor slower losses
  }

  // If there are no more moves and no winner, it's a tie
  if (!isMovesLeft(board)) {
    return 0;
  }

  // Maximizing player (computer's turn)
  if (isMax) {
    let best = -Infinity;

    // Traverse all cells
    for (let row = 0; row < 3; row++) {
      for (let col = 0; col < 3; col++) {
        // Check if the cell is empty
        if (board[row][col] === 0) {
          // Make the move
          board[row][col] = -1;

          // Call minimax recursively and choose the maximum value
          best = Math.max(best, minimax(board, depth + 1, false));

          // Undo the move
          board[row][col] = 0;
        }
      }
    }
    return best;
  }

  // Minimizing player (opponent's turn)
  else {
    let best = Infinity;

    // Traverse all cells
    for (let row = 0; row < 3; row++) {
      for (let col = 0; col < 3; col++) {
        // Check if the cell is empty
        if (board[row][col] === 0) {
          // Make the move
          board[row][col] = 1;

          // Call minimax recursively and choose the minimum value
          best = Math.min(best, minimax(board, depth + 1, true));

          // Undo the move
          board[row][col] = 0;
        }
      }
    }
    return best;
  }
}

export function checkWinner(board: Board) {
  // Check rows for winner
  for (let i = 0; i < 3; i++) {
    if (
      board[i][0] === board[i][1] &&
      board[i][1] === board[i][2] &&
      board[i][0] !== 0
    ) {
      return board[i][0];
    }
  }

  // Check columns for winner
  for (let i = 0; i < 3; i++) {
    if (
      board[0][i] === board[1][i] &&
      board[1][i] === board[2][i] &&
      board[0][i] !== 0
    ) {
      return board[0][i];
    }
  }

  // Check diagonals for winner
  if (
    board[0][0] === board[1][1] &&
    board[1][1] === board[2][2] &&
    board[0][0] !== 0
  ) {
    return board[0][0];
  }
  if (
    board[0][2] === board[1][1] &&
    board[1][1] === board[2][0] &&
    board[0][2] !== 0
  ) {
    return board[0][2];
  }

  // No winner found
  return null;
}

// Function to find the best possible move for the computer
export function findBestMove(
  board: Board
): { row: number; col: number } | null {
  let bestVal = -Infinity;
  let bestMove: { row: number; col: number } | null = null;

  // Traverse all cells, evaluate minimax function for all empty cells
  for (let row = 0; row < 3; row++) {
    for (let col = 0; col < 3; col++) {
      // Check if the cell is empty
      if (board[row][col] === 0) {
        // Make the move
        board[row][col] = -1;

        // Compute the evaluation function for this move
        let moveVal = minimax(board, 0, false);

        // Undo the move
        board[row][col] = 0;

        // If the value of the current move is more than the best value, update best move
        if (moveVal > bestVal) {
          bestMove = { row, col };
          bestVal = moveVal;
        }
      }
    }
  }
  console.log(bestMove);
  return bestMove;
}
