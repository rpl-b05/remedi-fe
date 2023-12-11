import 'src/styles/globals.css'
import type { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'
import { AuthContextProvider } from '@contexts'
import { Toaster } from 'react-hot-toast'
import { Navbar, Footer } from '@elements'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <AuthContextProvider>
        <Toaster />
        <Navbar />
        <main className="bg-neutral-20 min-h-screen w-full">
          <Component {...pageProps} />
        </main>
        <Footer />
      </AuthContextProvider>
    </ChakraProvider>
  )
}
