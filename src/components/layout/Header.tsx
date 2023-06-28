"use client";

import Link from "next/link";

export default function Header() {
  return (
    <div className="w-screen justify-between items-center flex h-12 px-4 border-b-2 border-gray-200 ">
      <Logo />
    </div>
  );
}

function Logo() {
  return (
    <Link href={"/"}>
      <div className="item-center text-lg text-center font-bold text-blue-500 flex">
        JINDOLOG
      </div>
    </Link>
  );
}
