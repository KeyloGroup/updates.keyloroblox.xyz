import "./globals.css";
import "../styles/markdown.css";
import { ReactNode } from "react";

export const metadata = {
  title: "Keylo News Center",
  description: "Official updates from Keylo",
  icons: { icon: "/favicon.ico" }
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        {/* Updated Slim Hero with Background Support */}
        <header className="hero-banner">
          <div className="container hero-inner">
            <h1>Keylo News Center</h1>
            <p>Official updates and platform improvements</p>
          </div>
        </header>

        <main className="container main">
          {children}
        </main>
      </body>
    </html>
  );
}
