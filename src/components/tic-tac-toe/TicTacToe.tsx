import { useState } from "react";
import Grid from "@mui/material/Grid2";
import { styled } from "@mui/material/styles";
import Button, { ButtonProps } from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { Board, findBestMove, checkWinner } from "./tic-tac-toe";
import "./tic-tac-toe.css";

function TicTacToe() {
  const [matrix, setMatrix] = useState([
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
  ]);

  const [userToken, setUserToken] = useState<string>("O");
  const [disableGame, setDisableGame] = useState<boolean>(false);
  const [winner, setWinner] = useState<number | undefined>(undefined);

  const ColorButton = styled(Button)<ButtonProps>(() => ({
    width: "100px",
    height: "100px",
    backgroundColor: "skyblue",
    border: "2px solid black",
  }));

  const RetryButton = styled(Button)<ButtonProps>(() => ({
    width: "100px",
    height: "50px",
    border: "2px solid skyblue",
  }));

  function displayMatrix(matrixValue: number) {
    if (matrixValue === 1) {
      return userToken === "O" ? "O" : "X";
    } else if (matrixValue === -1) {
      return userToken === "O" ? "X" : "O";
    } else if (matrixValue === 0) {
      return "";
    }
    console.log("Invalid matrix value!");
  }

  function isGameFinished(grid: Board) {
    let countZeros = 0;
    grid.forEach((row) => {
      row.forEach((cell) => {
        if (cell === 0) {
          countZeros += 1;
        }
      });
    });

    return countZeros === 0;
  }

  function handleOnClick(row: number, col: number) {
    const matrixValue = [...matrix];
    matrixValue[row][col] = 1;

    const bestMove = findBestMove(matrix);
    if (bestMove == null) {
      setDisableGame(true);
      setWinner(0);
      return;
    }

    matrixValue[bestMove["row"]][bestMove["col"]] = -1;
    const winner = checkWinner(matrixValue);

    if (winner === 1) {
      setDisableGame(true);
      setWinner(1);
    } else if (winner === -1) {
      setDisableGame(true);
      setWinner(-1);
    } else {
      if (isGameFinished(matrixValue)) {
        setDisableGame(true);
        setWinner(0);
      } else {
        setDisableGame(false);
        setWinner(undefined);
      }
    }

    setMatrix(matrixValue);
  }

  function resetMatrix() {
    setMatrix([
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
    ]);
    setWinner(undefined);
    setDisableGame(false);
  }

  return (
    <div>
      <div className="background center">
        <Stack>
          <div className="container">
            <Typography variant={"h2"}>
              <b>Unbeatable Tic Tac Toe</b>
            </Typography>
            <Typography variant={"h5"}>
              You can never win in this game. Wanna try?
            </Typography>
          </div>
          <div>
            <RetryButton onClick={() => resetMatrix()}>Retry</RetryButton>
          </div>
          <div className="container">
            <div className={"row"}>
              <Grid>
                <ColorButton
                  variant="text"
                  size={"huge"}
                  disabled={disableGame || matrix[0][0] !== 0}
                  onClick={() => handleOnClick(0, 0)}
                >
                  <p className="cell">{displayMatrix(matrix[0][0])}</p>
                </ColorButton>
                <ColorButton
                  variant="text"
                  size={"huge"}
                  disabled={disableGame || matrix[0][1] !== 0}
                  onClick={() => handleOnClick(0, 1)}
                >
                  <p className="cell">{displayMatrix(matrix[0][1])}</p>
                </ColorButton>
                <ColorButton
                  variant="text"
                  size={"huge"}
                  disabled={disableGame || matrix[0][2] !== 0}
                  onClick={() => handleOnClick(0, 2)}
                >
                  <p className="cell">{displayMatrix(matrix[0][2])}</p>
                </ColorButton>
              </Grid>
              <Grid>
                <ColorButton
                  variant="text"
                  size={"huge"}
                  disabled={disableGame || matrix[1][0] !== 0}
                  onClick={() => handleOnClick(1, 0)}
                >
                  <p className="cell">{displayMatrix(matrix[1][0])}</p>
                </ColorButton>
                <ColorButton
                  variant="text"
                  size={"huge"}
                  disabled={disableGame || matrix[1][1] !== 0}
                  onClick={() => handleOnClick(1, 1)}
                >
                  <p className="cell">{displayMatrix(matrix[1][1])}</p>
                </ColorButton>
                <ColorButton
                  variant="text"
                  size={"huge"}
                  disabled={disableGame || matrix[1][2] !== 0}
                  onClick={() => handleOnClick(1, 2)}
                >
                  <p className="cell">{displayMatrix(matrix[1][2])}</p>
                </ColorButton>
              </Grid>
              <Grid>
                <ColorButton
                  variant="text"
                  size={"huge"}
                  disabled={disableGame || matrix[2][0] !== 0}
                  onClick={() => handleOnClick(2, 0)}
                >
                  <p className="cell">{displayMatrix(matrix[2][0])}</p>
                </ColorButton>
                <ColorButton
                  variant="text"
                  size={"huge"}
                  disabled={disableGame || matrix[2][1] !== 0}
                  onClick={() => handleOnClick(2, 1)}
                >
                  <p className="cell">{displayMatrix(matrix[2][1])}</p>
                </ColorButton>
                <ColorButton
                  variant="text"
                  size={"huge"}
                  disabled={disableGame || matrix[2][2] !== 0}
                  onClick={() => handleOnClick(2, 2)}
                >
                  <p className="cell">{displayMatrix(matrix[2][2])}</p>
                </ColorButton>
              </Grid>
            </div>
          </div>
          <Typography variant={"h4"}>
            {winner != null &&
              (winner === 1
                ? "OMG You won the game!!"
                : winner === -1
                ? "You lost. I told you this is an unbetable game!!"
                : "That is tie. Why don't you retry!!")}
          </Typography>
        </Stack>
      </div>
      <div
        style={{
          position: "absolute",
          left: 0,
          bottom: 0,
          width: "100%",
          height: "30px",
          backgroundColor: "black",
          textAlign: "center",
          color: "white",
        }}
      >
        All rights reserved! Created with love and passion!
      </div>
    </div>
  );
}

export default TicTacToe;
