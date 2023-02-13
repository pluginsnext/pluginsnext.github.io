import { useState } from "react";

export default function Count() {
  const [count, setCount] = useState<number>(0);

  return (
    <div className="container">
      <div className="mb-5">count: {count}</div>
      <button
        className="btn btn-outline-dark"
        onClick={() => setCount(count + 1)}
      >
        count ++
      </button>
    </div>
  );
}
