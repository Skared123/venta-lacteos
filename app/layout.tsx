"use client";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import useUser from "@/hooks/useUser";
import { redirect, usePathname } from "next/navigation";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = useUser();
  const pathName = usePathname();

  const authRoutes = ["/", "sign-up", "forgot-password"];
  const isInAuthRoutes = authRoutes.includes(pathName);

  if (user && isInAuthRoutes) return redirect("/dashboard/products");

  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
