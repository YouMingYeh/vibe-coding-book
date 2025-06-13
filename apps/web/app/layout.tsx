import { Inter, JetBrains_Mono } from "next/font/google"

import "@workspace/ui/globals.css"
import "../styles/mdx.css"
import { Providers } from "@/components/layout/providers"
import { Header } from "@/components/layout/header"

// Inter for UI elements - excellent for interfaces
const fontSans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
})

// JetBrains Mono for code - excellent readability and ligatures
const fontMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
})

export const metadata = {
  title: "Vibe Coding Book - Learn to Build Apps Fast and Beautiful",
  description: "Master modern app development with shadcn/ui. Learn to build production-ready applications with beautiful design and best practices.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${fontSans.variable} ${fontMono.variable} font-sans antialiased`}
        style={{
          fontFamily: 'et-book, Palatino, "Palatino Linotype", "Palatino LT STD", "Book Antiqua", Georgia, serif'
        }}
      >
        <Providers>
          <Header />
          <main className="pt-16 min-h-screen">{children}</main>
        </Providers>
      </body>
    </html>
  )
}
