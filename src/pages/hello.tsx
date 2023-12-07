import { useAuth } from '@hooks'

export default function Hello() {
  const { user } = useAuth()
  console.log(user)
}
