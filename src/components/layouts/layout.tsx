import { Center } from "@chakra-ui/react"
import { ReactNode } from "react"

export const Layout = ({children}: {children:ReactNode}) => {
  return (<main className="flex min-h-screen flex-col bg-white p-5">
    <Center flexDirection="column">
      {children}
    </Center>
  </main>)
}