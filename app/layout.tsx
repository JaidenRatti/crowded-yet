import './globals.css'
import { Inter } from 'next/font/google'
import { Github } from 'lucide-react'
import { SpeedInsights } from "@vercel/speed-insights/next"
import { Analytics } from "@vercel/analytics/react"

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Crowded Yet?',
  description: 'Live building occupancy data for Universities/Colleges',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="min-h-screen flex flex-col bg-gray-100">
          <header className="bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg">
            <div className="container mx-auto py-8 px-4">
              <h1 className="text-4xl font-extrabold mb-2 tracking-tight">
                Crowded Yet?
              </h1>
              <p className="text-xl text-blue-100 font-light max-w-2xl">
                Real-time occupancy insights for university and college buildings. 
                Check dining halls, libraries, and even specific floors!
              </p>
            </div>
          </header>
          <main className="flex-grow container mx-auto py-8 px-4">
            {children}
                        <SpeedInsights />
            <Analytics />
          </main>
          <footer className="border-t mt-8 bg-white">
            <div className="container mx-auto py-4 px-4 flex justify-center">
              <a 
                href="https://github.com/JaidenRatti/crowded-yet"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-gray-900 transition-colors"
                aria-label="View source on GitHub"
              >
                <Github className="w-6 h-6" />
              </a>
            </div>
          </footer>
        </div>
      </body>
    </html>
  )
}

