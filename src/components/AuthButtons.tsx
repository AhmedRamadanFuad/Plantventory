import { auth, signIn, signOut } from "@/lib/auth";
import { Button } from "./ui/button";
import { LogIn, LogOut } from "lucide-react";
import Image from "next/image";

async function SignOut() {
  const session = await auth();
  const image = session?.user?.image;

  return (
    <div className="flex items-center">
      <form
        action={async () => {
          "use server";
          await signOut();
        }}
      >
        <Button
          variant="ghost"
          type="submit"
          className="flex items-center gap-2 cursor-pointer"
        >
          <LogOut className="w-4 h-4" />
          <span className="hidden lg:inline">Sign Out</span>
        </Button>
      </form>
      <div>
        {image && (
          <Image
            src={image}
            alt="profile"
            width={30}
            height={30}
            className="rounded-full"
          />
        )}
      </div>
    </div>
  );
}

function SignIn() {
  return (
    <form
      action={async () => {
        "use server";
        await signIn("google", { redirectTo: "/" });
      }}
    >
      <Button
        variant="ghost"
        type="submit"
        className="flex items-center gap-2 cursor-pointer"
      >
        <LogIn className="w-4 h-4" />
        <span className="hidden lg:inline">Sign In</span>
      </Button>
    </form>
  );
}

export { SignOut, SignIn };
