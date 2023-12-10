import { NextPage } from 'next'
import { useSearchParams } from 'next/navigation'
import { ListDaftarRecordPasien } from 'src/components/modules/Record/DaftarRecordPasien'
import { DaftarMedicalRecord } from 'src/components/modules/Record/DaftarRecord'
import { ProtectedRoute } from 'src/components/elements/ProtectedRoute'

const DaftarRecordPasienPage: NextPage = () => {
  const searchParam = useSearchParams()
  const email = searchParam.get('email')
  return (
    <ProtectedRoute doctorPage={<ListDaftarRecordPasien email={email} />} patientPage={<DaftarMedicalRecord/>}/>
  )
}

export default DaftarRecordPasienPage
