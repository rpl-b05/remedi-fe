import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { EditMedicalRecord } from 'src/components/modules/Record/EditRecord'

const EditMedicalRecordPage: NextPage = () => {
  const router = useRouter()
  const recordId = Number(router.query.id)
  return (
    <>
      <EditMedicalRecord id={recordId} />
    </>
  )
}

export default EditMedicalRecordPage
