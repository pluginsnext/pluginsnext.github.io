import Link from "next/link";

export default function Home() {
  return (
    <>
      utsav
      <div>
        <Link href="/about">About</Link>
      </div>
      <div>
        <Link href="/about">Contact us</Link>
      </div>
      <div>
        <Link href="/game">Game</Link>
      </div>
    </>
  );
}
