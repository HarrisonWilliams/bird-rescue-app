export default function RegionPage({ params }: { params: { region: string } }) {
  return (
    <div>
      <h1 className="text-2xl font-semibold mb-2">Dispatch: {params.region}</h1>
      <p>Open requests will show here.</p>
    </div>
  );
}