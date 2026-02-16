import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Chaos Emerald Clan",
  description: "The premier OSRS clan portal.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.cdnfonts.com/css/runescape-uf"
          rel="stylesheet"
        />
      </head>
      <body
        className="bg-[#1e140a] text-[#dcdcdc] min-h-screen font-sans antialiased overflow-x-hidden"
        suppressHydrationWarning
      >
        <main className="min-h-screen flex flex-col items-center">
          <div className="w-full max-w-7xl p-2 md:p-8 flex-1">{children}</div>
        </main>
      </body>
    </html>
  );
}
