import { NextPage } from 'next'
import { useSearchParams } from 'next/navigation'
import { ListDaftarRecordPasien } from 'src/components/modules/Record/DaftarRecordPasien'
import { DaftarMedicalRecord } from 'src/components/modules/Record/DaftarRecord'
import { ProtectedRoute } from 'src/components/elements/ProtectedRoute'
import { useEffect } from 'react'
import { useLocalStorage } from '@hooks'
import { useRouter } from 'next/router'
import toast from 'react-hot-toast'

const DaftarRecordPasienPage: NextPage = () => {
  const searchParam = useSearchParams()
  const email = searchParam.get('email')
  const router = useRouter()
  const { getItem } = useLocalStorage()

  useEffect(() => {
    const tokenFromStorage = getItem('user')
    if (!tokenFromStorage) {
      router.push('/')
      toast.error('Unauthorized')
    }
  }, [])
  return (
    <ProtectedRoute
      doctorPage={<ListDaftarRecordPasien email={email} />}
      patientPage={<DaftarMedicalRecord />}
    />
  )
}

export default DaftarRecordPasienPage
