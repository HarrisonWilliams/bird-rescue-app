import "./globals.css";
import Link from "next/link";

export const metadata = {
  title: "Bird Rescue UK",
  description: "Community, resources, and dispatch for bird rescue in the UK",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-50 text-gray-900">
        <header className="border-b bg-white">
          <nav className="mx-auto max-w-6xl px-4 h-14 flex items-center gap-6">
            <Link href="/">Bird Rescue</Link>
            <Link href="/resources">Resources</Link>
            <Link href="/dispatch">Dispatch</Link>
            <Link href="/volunteers">Volunteers</Link>
            <Link href="/premium">Premium</Link>
          </nav>
        </header>
        <main className="mx-auto max-w-6xl px-4 py-8">{children}</main>
      </body>
    </html>
  );
}
