import Link from "next/link";

export default function Home() {
  return (
    <>
      <div>
        <Link href="/about">About</Link>
      </div>
      <div>
        <Link href="/about">Contact</Link>
      </div>
    </>
  );
}
