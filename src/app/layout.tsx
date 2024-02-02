import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Nav from '@/components/Nav'

import data from "../data.json"
import buildMetaTitle from '@/utils/buildMetaTitle'
import Footer from '@/components/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: buildMetaTitle(),
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
        <main>
          {children}
        </main>
        <Nav />
        <Footer />
      </body>
    </html>
  )
}
