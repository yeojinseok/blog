'use client'

import Link from 'next/link'
import { HStack } from '../design-system/Stack'
import Typography from '../design-system/Typography'

export default function Header() {
  return (
    <HStack className="items-center w-screen px-16 py-8 ">
      <Logo />
    </HStack>
  )
}

function Logo() {
  return (
    <Link href={'/'}>
      <div className="flex text-lg font-bold text-center text-blue-500 item-center"></div>
      <Typography variants=".title_screen">JINDOLOG</Typography>
    </Link>
  )
}
