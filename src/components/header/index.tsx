"use client";

import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";

import { FiUser, FiList, FiLogOut, FiLoader, FiLock } from "react-icons/fi";

export function Header() {
  const { status, data } = useSession();

  async function handleLogin() {
    await signIn();
  }

  async function handleLogout() {
    await signOut();
  }

  return (
    <header className="w-full flex items-center px-2 py-4 bg-white h-20 shadow">
      <div className="w-full flex items-center justify-between max-w-7xl mx-auto">
        <Link href="/">
          <h1 className="font-bold text-2xl pl-1 hover:tracking-widest duration-300">
            <span className="text-blue-500">HELP</span> CONTROL
          </h1>
        </Link>

        {status === "loading" && (
          <button className="animate-spin">
            <FiLoader size={26} color="#3f84e6" />
          </button>
        )}

        {status === "unauthenticated" && (
          <button onClick={handleLogin}>
            <FiLock size={26} color="#3f84e6" />
          </button>
        )}

        {status === "authenticated" && (
          <div className="flex items-baseline gap-4 ">
            <Link href="/dashboard">
              <FiList size={26} color="#3f84e6" />
            </Link>

            <button onClick={handleLogout}>
              <FiLogOut size={26} color="#fd594a" />
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
