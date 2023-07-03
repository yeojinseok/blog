'use client'

import Link from 'next/link'

export default function Header() {
  return (
    <div className="w-screen  items-center flex h-12 px-4 border-b-2 border-gray-200  justify-center">
      <div className="flex max-w-1520 w-full justify-between">
        <Logo />
      </div>
    </div>
  )
}

function Logo() {
  return (
    <Link href={'/'}>
      <div className="item-center text-lg text-center font-bold text-blue-500 flex">
        JINDOLOG
      </div>
    </Link>
  )
}
