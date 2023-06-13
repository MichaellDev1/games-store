import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import Menu from '@/components/Menu'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Store Game',
  description: 'Game store',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <main className='flex'>
          
          <Menu menuHidden={true} />
          <div className='lg:pl-[calc(100% / 208px)] flex flex-col lg:ml-52 px-10 overflow-hidden relative z-20'>
            <Header />
            {children}
          </div>
        </main>
      </body>
    </html>
  )
}
