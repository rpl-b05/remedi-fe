import { ReactElement, useEffect, useState } from 'react'

import { useAuth } from '../hooks/useAuth'

import {redirect} from 'next/navigation'
import { useRouter } from 'next/navigation'

interface ProtectedRouteProps {
  doctorPage?: ReactElement
  patientPage?: ReactElement
}

export const ProtectedRoute = ({
  doctorPage,
  patientPage,
}: ProtectedRouteProps) => {
  const router = useRouter()
  const { user } = useAuth()
  const [isLoading, setIsLoading] = useState<boolean>(true)
  useEffect(() => {
    if(user != undefined){
      setIsLoading(false)
    }
  },[user])
  if (! isLoading)
  {
    if (!user) {
      router.push('/')
      return
    }
    if (user.role == 'DOCTOR') {
      return doctorPage
    }
    return patientPage  
  }
}
