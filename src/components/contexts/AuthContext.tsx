import { createContext, Dispatch, SetStateAction } from 'react'
import { User } from '../hooks/useUser'

interface AuthContext {
  user: User | undefined
  setUser: Dispatch<SetStateAction<User | undefined>> // Make sure to import Dispatch and SetStateAction
}

export const AuthContext = createContext<AuthContext>({
  user: undefined,
  setUser: () => {},
})
