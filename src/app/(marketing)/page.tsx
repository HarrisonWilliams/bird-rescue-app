import Link from "next/link";

export default function Page() {
  return (
    <section className="space-y-4">
      <h1 className="text-3xl font-bold">Welcome to Bird Rescue UK</h1>
      <p>Learn, connect, and coordinate rescues across the UK.</p>
      <div className="grid md:grid-cols-3 gap-4">
        <Link className="p-4 rounded-lg border bg-white" href="/how-to-get-started">
          How to get started
        </Link>
        <Link className="p-4 rounded-lg border bg-white" href="/resources">
          First aid &amp; ID guides
        </Link>
        <Link className="p-4 rounded-lg border bg-white" href="/dispatch">
          See rescue requests
        </Link>
      </div>
    </section>
  );
}
