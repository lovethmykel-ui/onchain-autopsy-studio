import type { Metadata } from "next";
import { Fira_Code, Fira_Sans } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";

// Load Fira Sans for body text
const firaSans = Fira_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-fira-sans",
});

// Load Fira Code for headings, stats, and numbers
const firaCode = Fira_Code({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-fira-code",
});

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
      <body className={`${firaSans.variable} ${firaCode.variable} font-sans min-h-screen bg-background text-text-primary antialiased`}>
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
              fontFamily: 'var(--font-fira-sans), sans-serif',
            },
          }}
        />
      </body>
    </html>
  );
}
