import { NextPage } from 'next'
import { useSearchParams } from 'next/navigation'
import { ListDaftarRecordPasien } from 'src/components/modules/Record/DaftarRecordPasien'

const DaftarRecordPasienPage: NextPage = () => {
  const searchParam = useSearchParams()
  const email = searchParam.get('email')

  return (
    <>
      <ListDaftarRecordPasien email={email} />
    </>
  )
}

export default DaftarRecordPasienPage
