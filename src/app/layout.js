import "./globals.css";

import Footer from "@/components/shared/Footer";
import Navbar from "@/components/shared/Navbar";
import ThemeProvider from "@/providers/ThemeProvider";
import { Toaster } from "react-hot-toast";

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-white text-slate-900 transition-colors duration-300 dark:bg-slate-950 dark:text-white">
        <ThemeProvider>
          <Toaster />
          <Navbar />
          {children}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}