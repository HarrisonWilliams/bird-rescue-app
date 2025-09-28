export default async function RegionPage(
  { params }: { params: Promise<Record<string, string>> }
) {
  const { region } = await params;
  return (
    <div>
      <h1 className="text-2xl font-semibold mb-2">Dispatch: {region}</h1>
      <p>Open requests will show here.</p>
    </div>
  );
}
