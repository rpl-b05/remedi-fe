import { ReactElement } from "react";
import { useUser } from "../hooks/useUser";

interface ProtectedRouteProps {
    doctorPage?: ReactElement,
    patientPage?: ReactElement
}

export const ProtectedRoute = ({doctorPage, patientPage}: ProtectedRouteProps) => {
    const {user} = useUser()
    if (!user) {
        return <div>Login dlu bos</div>
    }
    if (user.role == 'DOCTOR') {
        return doctorPage
    }
    return patientPage
}