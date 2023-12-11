import React, {
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useMemo,
  useState,
} from 'react'
import { AuthModal } from '@elements'
import { User } from '../hooks/useUser'

export interface AuthContextProviderProps {
  children: ReactNode
}

export interface AuthContextInterface {
  setIsAuthModalOpen: React.Dispatch<SetStateAction<boolean>>
  user: User | undefined | null
  setUser: React.Dispatch<SetStateAction<User | undefined | null>>
}

const AuthContext = createContext({} as AuthContextInterface)

export const useAuthContext = () => useContext(AuthContext)

export const AuthContextProvider: React.FC<AuthContextProviderProps> = ({
  children,
}) => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false)
  const [user, setUser] = useState<User | null>()

  const contextValue = useMemo(() => {
    return {
      setIsAuthModalOpen,
      user,
      setUser,
    }
  }, [setIsAuthModalOpen, user, setUser])

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />
    </AuthContext.Provider>
  )
}
