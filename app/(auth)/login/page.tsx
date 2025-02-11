import { AuthForm } from "@/components/AuthForm";
import logo from "@/public/logo.jpg";
import Image from "next/image";

export default function Page() {
  return (
    <div className="flex relative min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full  bg-transparent backdrop-blur-md max-w-sm z-20 bg-radial-[at_25%_25%] from-white to-zinc-900 to-75%">
        <AuthForm isLogIn />
      </div>

      <Image
        fill
        src={logo}
        className="object-cover bg-radial-[at_25%_25%] from-white to-zinc-900 to-75%"
        alt="Logo image"
      />
    </div>
  );
}
