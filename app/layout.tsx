import './globals.css'
import React from 'react'
import { ReduxProvider } from './providers'
import Header from '../components/Header'
import Footer from '../components/Footer'

export const metadata = {
  title: 'FoodWagen',
  description: 'Manage food items - FoodWagen assessment',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-50">
        <ReduxProvider>
          <Header />
          <main>{children}</main>
          <Footer />
        </ReduxProvider>
      </body>
    </html>
  )
}
