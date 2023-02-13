import styles from "./game.module.css";
import { useState } from "react";

type Symbol = "X" | "O" | null;

type SquareProps = {
  value: Symbol;
  onSquareClick: () => void;
};

const Square = ({ value, onSquareClick }: SquareProps) => {
  function handleClick() {
    onSquareClick();
  }
  console.log("square triggered");

  return (
    <button className={styles.square} onClick={onSquareClick}>
      {value === "X" ? "❌" : value === "O" ? "⭕" : null}
    </button>
  );
};

const Board = () => {
  const [squares, setSquares] = useState<Symbol[]>(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);

  function handleClick(i: number) {
    if (squares[i] || calculateWinner(squares)) {
      return;
    }
    const newSquares = squares.slice();
    newSquares[i] = xIsNext ? "X" : "O";
    setSquares(newSquares);
    setXIsNext(!xIsNext);
  }

  let status;
  const winner = calculateWinner(squares);
  status = winner
    ? `the winner is ${winner}`
    : `Next player -> ${xIsNext ? "X" : "O"}`;

  return (
    <div>
      <div className={styles.status}>{status}</div>
      <div className={styles.boardRow}>
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
      </div>
      <div className={styles.boardRow}>
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
      </div>
      <div className={styles.boardRow}>
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>
    </div>
  );
};

export default function Game() {
  return (
    <div className={`${styles.game} container mt-3`}>
      <div className={styles.gameBoard}>
        <p className="h3">TIC TAC TOE</p>
        <Board />
      </div>
      <div className={styles.gameinfo}>
        <div>{/* status */}</div>
        <ol className={styles.lists}>{/* TODO */}</ol>
      </div>
    </div>
  );
}

function calculateWinner(squares: Symbol[]) {
  const winningLines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < winningLines.length; i++) {
    const [a, b, c] = winningLines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

// When you call a set function in a component, React automatically updates the child components inside of it too.
// immutablity concept -> why we copies the array and not update the old one. why immutablity is imp? -> it helps a lot in re-rendering performance issues, anf if we want to track the history of the states.
