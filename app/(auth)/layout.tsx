import type { Metadata } from "next";
import Image from "next/image";
import logo from "@/public/logo.jpg";

export const metadata: Metadata = {
  title: "password reset",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex relative min-h-svh w-full items-center justify-center p-6 md:p-10">
      {children}
      <Image
        fill
        src={logo}
        className="object-cover bg-radial-[at_25%_25%] from-white to-zinc-900 to-75%"
        alt="Logo image"
      />
    </div>
  );
}
