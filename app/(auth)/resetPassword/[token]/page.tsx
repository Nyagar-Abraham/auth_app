import { AuthForm } from "@/components/AuthForm";

export default function Page() {
  return (
    <div className="w-full  bg-transparent backdrop-blur-md max-w-sm z-20 bg-radial-[at_25%_25%] from-white to-zinc-900 to-75%">
      <AuthForm isResetPassword />
    </div>
  );
}
