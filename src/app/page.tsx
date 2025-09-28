/* eslint-disable @next/next/no-html-link-for-pages */
export default function Page() {
  return (
    <section className="space-y-6 p-8 rounded-xl border bg-white">
      <h1 className="text-4xl font-extrabold">🐦 Bird Rescue UK — It works!</h1>
      <p className="text-lg">Welcome. Use the nav to explore:</p>
      <ul className="list-disc pl-6">
        <li><a className="underline" href="/resources">Resources</a></li>
        <li><a className="underline" href="/dispatch">Dispatch</a></li>
        <li><a className="underline" href="/volunteers">Volunteers</a></li>
        <li><a className="underline" href="/premium">Premium</a></li>
      </ul>
    </section>
  );
}
