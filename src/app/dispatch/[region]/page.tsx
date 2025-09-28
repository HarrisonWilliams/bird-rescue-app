const regions = ["london", "midlands", "north"] as const;

export function generateStaticParams() {
  return regions.map((region) => ({ region }));
}

export default async function RegionPage({ params }: { params: Promise<{ region: string }> }) {
  const { region } = await params;
  return (
    <div>
      <h1 className="text-2xl font-semibold mb-2">Dispatch: {region}</h1>
      <p>Open requests will show here.</p>
    </div>
  );
}
