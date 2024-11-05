import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/app/globals.css";
import { NavBar } from "@/components/NavBar";
import { FootBar } from "@/components/FootBar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    icons:"/logo.png",
    title: "Cinema Express",
    description: "Your Ticket to Seamless Cinema Experiences - Manage, Book, Enjoy!",
};

export default function RootLayout({children}: Readonly<{children: React.ReactNode}>) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <div className="w-full flex flex-col">
                    <NavBar />
                    {children}
                    <FootBar />
                </div>
            </body>
        </html>
    );
}
