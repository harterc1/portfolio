import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Nav from '@/components/Nav'

import data from "../data.json"

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: data.title,
  description: data.description,
  robots: {
    index: false,
    follow: false,
    noarchive: true,
    noimageindex: true,
    notranslate: true,
    nositelinkssearchbox: true,
    nosnippet: true,
    indexifembedded: false,
    nocache: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Nav />
        <main>
          {children}
        </main>
      </body>
    </html>
  )
}
