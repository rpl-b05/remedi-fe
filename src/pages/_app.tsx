import 'src/styles/globals.css'
import type { AppProps } from 'next/app'

import { ChakraProvider } from '@chakra-ui/react'
import { AuthContext } from '@contexts'
import { User } from '@hooks'
import { Toaster } from 'react-hot-toast'
import { useState } from 'react'

export default function App({ Component, pageProps }: AppProps) {
  // const { user, setUser } = useAuth()
  const [user, setUser] = useState<User>()
  return (
    <ChakraProvider>
      <AuthContext.Provider value={{ user, setUser }}>
        <Toaster />
        <div className="bg-neutral-20">
          <Component {...pageProps} />
        </div>
      </AuthContext.Provider>
    </ChakraProvider>
  )
}
