import { useEffect } from 'react'
import { useUser, User } from './useUser'
import { useLocalStorage } from './useLocalStorage'
import axios from 'axios'
import toast from 'react-hot-toast'
import { capitalizeString } from '@utils'

export const useAuth = () => {
  const { user, addUser, removeUser, setUser } = useUser()
  const { getItem, setItem } = useLocalStorage()

  useEffect(() => {
    const userLS = getItem('user')
    if (userLS) {
      addUser(JSON.parse(userLS))
    } else {
      setUser(null)
    }
  }, [])

  const login = async (
    {
      email,
      password,
    }: {
      email: string
      password: string
    },
    onClose: () => void
  ) => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
        {
          email,
          password,
        }
      )

      const { data } = response
      const { id, name, email: userEmail, role } = data.userWithoutPassword
      const token = data.token

      const user: User = {
        id,
        name,
        email: userEmail,
        role,
        token,
      }

      addUser(user)
      setItem('user', JSON.stringify(user))
      toast.success('Login Success')
      onClose()
    } catch (error: any) {
      console.log(error)
      toast.error(capitalizeString(error.response.data.responseMessage))
    }
  }

  const register = async (
    {
      email,
      password,
      name,
      role,
    }: {
      email: string
      password: string
      name: string
      role: 'DOCTOR' | 'PATIENT'
    },
    onClose: () => void
  ) => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/register`,
        {
          email,
          password,
          name,
          role,
        }
      )

      const { data } = response
      toast.success(data.responseMessage)
      onClose()
    } catch (error: any) {
      console.log(error)
      if (error.response.data.responseMessage instanceof Array) {
        error.response.data.responseMessage.map((err: string) =>
          toast.error(capitalizeString(err))
        )
      } else {
        toast.error(capitalizeString(error.response.data.responseMessage))
      }
    }
  }

  const logout = () => {
    removeUser()
  }

  return { user, login, logout, setUser: addUser, register }
}
