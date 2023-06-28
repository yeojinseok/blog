import Header from "@/components/layout/\bHeader";
import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="min-w-375 max-w-full overflow-hidden">
          <Header />
          <div className=" w-full px-10">
            <div className="w-full max-w-1520 " style={{ margin: "0 auto" }}>
              {children}
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
