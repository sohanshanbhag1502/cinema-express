import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/app/globals.css";
import { NavBar, FootBar } from "@/components/Bars";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    icons:"/favicon.png",
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
