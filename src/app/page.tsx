import Link from "next/link";

export default function Page() {
  return (
    <section className="space-y-6 p-8 rounded-xl border bg-white">
      <h1 className="text-4xl font-extrabold">🐦 Bird Rescue UK — It works!</h1>
      <p className="text-lg">Welcome. Use the nav to explore:</p>
      <ul className="list-disc pl-6">
        <li><Link className="underline" href="/resources">Resources</Link></li>
        <li><Link className="underline" href="/dispatch">Dispatch</Link></li>
        <li><Link className="underline" href="/volunteers">Volunteers</Link></li>
        <li><Link className="underline" href="/premium">Premium</Link></li>
      </ul>
    </section>
  );
}
