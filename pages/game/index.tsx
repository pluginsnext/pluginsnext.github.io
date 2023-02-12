import Link from "next/link";
import styles from "./game.module.css";

export default function Game() {
  return (
    <div>
      <div className={styles.bgGreen}>About</div>
      <div>
        Back to <Link href="/">Home</Link>
      </div>
    </div>
  );
}
