import './globals.css'
import { Inter } from 'next/font/google'

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
      <body className={`${inter.className} bg-gray-100 text-gray-900`}>
        <div className="min-h-screen">
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
          <main className="container mx-auto py-8 px-4">
            {children}
          </main>
        </div>
      </body>
    </html>
  )
}

