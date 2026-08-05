import "./globals.css";

import ThemeProvider from "@/providers/ThemeProvider";
import { Toaster } from "react-hot-toast";


export const metadata = {
  title: {
    default: "Fable",
    template: "%s | Fable",
  },
  description: "A modern ebook sharing platform",
};


export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-white text-slate-900 transition-colors duration-300 dark:bg-slate-950 dark:text-white">
        <ThemeProvider>
          <Toaster />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}

