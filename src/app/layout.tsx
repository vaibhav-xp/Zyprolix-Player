import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ReactNode } from 'react'
import './index.css'
import { GlobalContextProvider } from './context/gloablConext'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Ziprolix Player',
  description: 'Ziprolix Video Player is a versatile and feature-rich platform that brings a diverse range of video content to its users. This innovative player is designed to offer an immersive and entertaining experience, catering to a wide audience with its extensive variety of video categories.',
}

export default function RootLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <GlobalContextProvider>
          {children}
        </GlobalContextProvider>
      </body>
    </html >
  )
}
