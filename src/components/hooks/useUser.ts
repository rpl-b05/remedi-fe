import { useContext, useEffect } from 'react'
import { AuthContext } from '@contexts'
import { useLocalStorage } from './useLocalStorage'

export interface User {
  id: number
  name: string
  email: string
  role: 'DOCTOR' | 'PATIENT'
  token: string
}

export const useUser = () => {
  const { user, setUser } = useContext(AuthContext)
  const { setItem, getItem } = useLocalStorage()

  useEffect(() => {
    const user = getItem('user')
    if (!!user) {
      setUser(JSON.parse(user))
    }
  }, [])
  
  const addUser = (user: User | undefined) => {
    setUser(user)
    setItem('user', JSON.stringify(user))
  }

  const removeUser = () => {
    setUser(undefined)
    setItem('user', '')
  }


  return { user, addUser, removeUser }
}
