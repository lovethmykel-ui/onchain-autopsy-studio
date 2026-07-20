import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: "OnChain Autopsy Studio | AI Documentary Production OS",
  description:
    "Enterprise-grade AI Documentary Production Operating System. Create Netflix-quality crypto, finance, technology, crime, and blockchain documentary content from a single topic prompt.",
  keywords: [
    "AI documentary",
    "crypto documentary",
    "blockchain investigation",
    "AI video production",
    "documentary maker",
    "OnChain Autopsy",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="min-h-screen bg-background text-text-primary antialiased font-body">
        {children}
        <Toaster
          theme="dark"
          position="bottom-right"
          toastOptions={{
            style: {
              background: '#161616',
              border: '1px solid rgba(255,255,255,0.06)',
              color: '#F0F0F0',
              fontSize: '13px',
            },
          }}
        />
      </body>
    </html>
  );
}
