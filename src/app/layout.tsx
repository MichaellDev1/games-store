import { Inter } from 'next/font/google'
import Header from '@/components/Header'
import Menu from '@/components/Menu'
import Footer from '@/components/Footer'
import GradientRounded from '@/components/GradientRounded'
import './globals.css'
import ContentContext from '@/components/ContentContext'
const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Store Game',
  description: 'Game store',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <main className='flex w-full'>
          <ContentContext>
            <GradientRounded />
            <Menu menuHidden={true} />
            <div className='lg:pl-[calc(100% / 208px)] w-full flex flex-col lg:ml-52 px-10 overflow-hidden relative z-20'>
              <Header />
              {children}
              <Footer />
            </div>
          </ContentContext>
        </main>
      </body>
    </html>
  )
}
