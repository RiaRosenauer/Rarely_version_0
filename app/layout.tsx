import "@/styles/globals.css"
import { UserProvider } from "@/contexts/UserContext"
import { BottomNav } from "@/components/bottom-nav"
import { Inter, Outfit } from 'next/font/google'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
})

const outfit = Outfit({ 
  subsets: ['latin'],
  variable: '--font-outfit',
})

export const metadata = {
  title: "Rarely - Health Tracking App",
  description: "Track your health habits and understand your disease better",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable}`}>
      <body className="bg-white font-sans">
        <UserProvider>
          <div className="max-w-md mx-auto min-h-screen pb-20">
            {children}
            <BottomNav />
          </div>
        </UserProvider>
      </body>
    </html>
  )
}

