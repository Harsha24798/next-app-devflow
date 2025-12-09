// app/page.tsx (or wherever your home route is)
import { auth } from "@/auth";
import { Button } from "@/components/ui/button";
import { LogOut, User } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import ROUTES from "@/constants/routes";
import Link from "next/link";
import { signOut } from "@/auth";

export default async function Home() {
  const session = await auth();

  console.log(session);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="border-b bg-white">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">DevFlow</h1>

          {session?.user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-linear-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-semibold">
                    {session.user.name?.[0] || "U"}
                  </div>
                  <span className="hidden sm:inline">
                    {session.user.name || "User"}
                  </span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium">{session.user.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {session.user.email}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/profile" className="flex items-center">
                    <User className="mr-2 h-4 w-4" />
                    Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <form
                    action={async () => {
                      "use server";
                      // This is the CORRECT way in Auth.js v5
                      // const { signOut } = await import("@auth/core")
                      await signOut({ redirectTo: ROUTES.SIGN_IN });
                    }}
                    className="w-full"
                  >
                    <button
                      type="submit"
                      className="w-full flex items-center text-red-600"
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      Log out
                    </button>
                  </form>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex gap-3">
              <Button asChild variant="ghost">
                <Link href={ROUTES.SIGN_IN}>Sign In</Link>
              </Button>
              <Button asChild>
                <Link href={ROUTES.SIGN_UP}>Sign Up</Link>
              </Button>
            </div>
          )}
        </div>
      </header>

      <main className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-5xl font-bold mb-4">Welcome to DevFlow</h2>
        <p className="text-xl text-gray-600">
          {session?.user
            ? `Hello, ${session.user.name}! You're logged in.`
            : "The next-generation Q&A platform for developers."}
        </p>
      </main>
    </div>
  );
}
