import Header from '@/components/layout/\bHeader'
import './globals.css'
import { Inter } from 'next/font/google'
import { VStack } from '@/components/design-system/Stack'
import Divider from '@/components/design-system/Divider'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="h-screen max-w-full overflow-hidden min-w-375 bg-bgColor-main">
          <Header />
          <Divider />
          <VStack className="h-full p-16">{children}</VStack>
        </div>
      </body>
    </html>
  )
}
