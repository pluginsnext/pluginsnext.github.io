import styles from "./game.module.css";
import { useState } from "react";

type Symbol = "X" | "O" | null;

type SquareProps = {
  value: Symbol;
  onSquareClick: () => void;
};
type BoardProps = {
  xIsNext: Boolean;
  squares: any;
  onPlay: (nextSquares: Symbol[]) => void;
};

function Square({ value, onSquareClick }: SquareProps) {
  function handleClick() {
    onSquareClick();
  }

  const symbolMap = {
    X: "❌",
    O: "⭕",
  };

  return (
    <button className={styles.square} onClick={onSquareClick}>
      {value ? symbolMap[value] : value}
    </button>
  );
}

const Board = ({ xIsNext, squares, onPlay }: BoardProps) => {
  function handleClick(i: number) {
    if (squares[i] || calculateWinner(squares)) {
      return;
    }
    const newSquares = squares.slice();
    newSquares[i] = xIsNext ? "X" : "O";
    onPlay(newSquares);
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
  const [history, setHistory] = useState([Array(9).fill(null)]);
  // const [xIsNext, setXIsNext] = useState(true);
  const [currentMove, setCurrentMove] = useState(0);
  const xIsNext = currentMove % 2 == 0;
  const currentSquares = history[currentMove];

  function handlePlay(nextSquares: Symbol[]) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function resetGame() {
    setHistory([Array(9).fill(null)]);
    setCurrentMove(0);
  }

  function jumpTo(nextMove: number) {
    setCurrentMove(nextMove);
  }

  let moves = history.map((squares, move) => {
    let description = move ? `Go to move #${move}` : "Go to Game start";

    return (
      <li
        className="list-group-item"
        onClick={() => jumpTo(move)}
        onMouseEnter={() => jumpTo(move)}
        key={move}
      >
        {description}
      </li>
    );
  });

  return (
    <div className={`${styles.game} container mt-3`}>
      <div className={styles.gameBoard}>
        <p className="h3">TIC TAC TOE</p>
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
        <button
          type="button"
          className="btn btn-primary mt-3"
          onClick={resetGame}
        >
          Reset Game
        </button>
      </div>
      <div className={styles.gameinfo}>
        <div>{/* status */}</div>
        <ol className={`${styles.lists} list-group`}>{moves}</ol>
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
