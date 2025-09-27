import Link from "next/link";

const regions = [
  { slug: "london", name: "London" },
  { slug: "midlands", name: "Midlands" },
  { slug: "north", name: "North" },
];

export default function Page() {
  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">Regional Dispatch</h1>
      <ul className="grid md:grid-cols-3 gap-3">
        {regions.map((r) => (
          <li key={r.slug}>
            <Link className="block p-4 rounded-lg border bg-white" href={`/dispatch/${r.slug}`}>
              {r.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
