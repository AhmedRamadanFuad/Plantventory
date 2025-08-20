import Link from "next/link";
import { Button } from "./ui/button";
import { HomeIcon, Sprout } from "lucide-react";
import ModeToggle from "./ModeTogggle";
import { auth } from "@/lib/auth";
import { SignIn, SignOut } from "./AuthButtons";

async function Navbar() {
  const session = await auth();

  return (
    <nav className="sticky top-0 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center h-16 justify-between">
          {/*Logo */}
          <div className="flex items-center">
            <Link
              href="/"
              className="text-xl font-bold font-mono tracking-wider"
            >
              🌱 Plantventory
            </Link>
          </div>

          {/*Navbar components*/}
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="ghost" className="flex items-center gap-2" asChild>
              <Link href="/">
                <HomeIcon className="w-4 h-4" />
                <span className="hidden lg:inline">Home</span>
              </Link>
            </Button>
            <Button variant="ghost" className="flex items-center gap-2" asChild>
              <Link href="/plants">
                <Sprout className="w-4 h-4" />
                <span className="hidden lg:inline">Plants</span>
              </Link>
            </Button>

            <ModeToggle />

            {session?.user ? <SignOut /> : <SignIn />}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
