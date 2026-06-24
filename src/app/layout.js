
import "./globals.css";
import Navbar from "@/components/NavBar";
import Footer from "@/components/Footer";

import { Poppins } from "next/font/google";
import { ToastContainer } from "react-toastify";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});



export const metadata = {
  title: "ArtHub",
  description: "AI Powered Marketplace",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${poppins.className} min-h-full flex flex-col`}>
        <Navbar />
        {children}
        <Footer />
        <ToastContainer />
      </body>
    </html>
  );
}