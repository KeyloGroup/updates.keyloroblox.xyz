import "./globals.css";
import "../styles/markdown.css";
import { ReactNode } from "react";

export const metadata = {
  title: "Keylo News Center",
  description: "Official updates from Keylo",
  icons: {
    icon: "/favicon.ico"
  }
};

export default function RootLayout({
  children
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {/* Hero Header - Controlled by .hero in globals.css */}
        <header className="hero">
          <div className="container hero-inner">
            <h1>Keylo News Center</h1>
            <p>
              Official updates, deployments, and
              platform improvements
            </p>
          </div>
        </header>

        <main className="container main">
          {children}
        </main>
      </body>
    </html>
  );
}
