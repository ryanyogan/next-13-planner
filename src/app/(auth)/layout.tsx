import { GlassPane } from "@/components/glass-pane";
import { Inter } from "@next/font/google";

import "@/styles/global.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export default function AuthRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <head />
      <body className="h-screen w-screen rainbow-mesh p-6 font-sans">
        <GlassPane className="w-full h-full flex items-center justify-center">
          {children}
        </GlassPane>
      </body>
    </html>
  );
}
