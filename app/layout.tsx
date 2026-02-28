import "./globals.css";

export const metadata = {
  title: "Keylo – Latest News",
  description: "Latest updates and improvements from the Keylo team"
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-surface text-white antialiased">
        <header className="border-b border-border bg-surface">
          <div className="max-w-4xl mx-auto px-6 py-6">
            <span className="text-lg font-semibold tracking-tight">
              Keylo
            </span>
            <p className="text-sm text-muted mt-1">
              Latest News from the Keylo team
            </p>
          </div>
        </header>

        {children}
      </body>
    </html>
  );
}
