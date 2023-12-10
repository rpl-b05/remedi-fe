import 'src/styles/globals.css'
import type { AppProps } from 'next/app'

import { ChakraProvider } from '@chakra-ui/react'
import { AuthContext } from '@contexts'
import { User } from '@hooks'
import { Toaster } from 'react-hot-toast'
import { useState } from 'react'
import { Navbar, Footer } from '@elements'

export default function App({ Component, pageProps }: AppProps) {
  // const { user, setUser } = useAuth()
  const [user, setUser] = useState<User>()
  return (
    <ChakraProvider>
      <AuthContext.Provider value={{ user, setUser }}>
        <Toaster />
        <Navbar />
        <main className="bg-neutral-20 min-h-screen w-full">
          <Component {...pageProps} />
        </main>
        <Footer />
      </AuthContext.Provider>
    </ChakraProvider>
  )
}
