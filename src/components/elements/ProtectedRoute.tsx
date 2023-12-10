import { ReactElement } from 'react'

import { useAuth } from '../hooks/useAuth'

interface ProtectedRouteProps {
  doctorPage?: ReactElement
  patientPage?: ReactElement
}

export const ProtectedRoute = ({
  doctorPage,
  patientPage,
}: ProtectedRouteProps) => {
  const { user } = useAuth()
  if (!user) {
    return <div>Login dlu bos</div>
  }
  if (user.role == 'DOCTOR') {
    return doctorPage
  }
  return patientPage
}
