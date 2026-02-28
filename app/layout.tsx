import "./globals.css";
import "../styles/markdown.css";
import { ReactNode } from "react";

export const metadata = {
  title: "Keylo News Center",
  description: "Latest updates from the Keylo team"
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <header className="header">
          <div className="container header-inner">
            <h1 className="logo">Keylo</h1>
            <p className="subtitle">Latest News from the Keylo Team</p>
          </div>
        </header>

        <main className="container main">{children}</main>
      </body>
    </html>
  );
}
