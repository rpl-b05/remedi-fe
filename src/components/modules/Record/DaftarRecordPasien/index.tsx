import Cookies from 'js-cookie'
import { PasienEmailProps, Record } from './interface'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { Center, Spinner, Text } from '@chakra-ui/react'
import { RecordCard } from './RecordCard'

export const ListDaftarRecordPasien: React.FC<PasienEmailProps> = ({
  email,
}) => {
  const token = Cookies.get('token')
  const [loading, setLoading] = useState(true)
  const currEmail = email
  const [records, setRecords] = useState<Record[]>([])

  const fetchAllRecords = async () => {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
    const getAllRecords = axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/record/pasien?email=${currEmail}`
    )

    setLoading(true)
    await getAllRecords
      .then((res) => {
        const tempRecords = []
        for (const rec of res.data.medicalRecords) {
          tempRecords.push(rec as Record)
        }
        setRecords(tempRecords)
      })
      .catch((err) => {
        console.log(err)
      })
    setLoading(false)
  }

  useEffect(() => {
    if (token && currEmail != null) {
      fetchAllRecords()
    }
  }, [currEmail])

  const showContent = () => {
    if (loading) {
      return (
        <div className="flex justify-center items-center h-[70vh]">
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="teal"
            size="xl"
          />
        </div>
      )
    } else {
      return (
        <>
          {records.map((record) => (
            <RecordCard
              key={record.id}
              id={record.id}
              dokterId={record.dokterId}
              pasienId={record.pasienId}
              isVerified={record.isVerified}
              description={record.description}
              penyakitId={record.penyakitId}
              createdAt={record.createdAt}
              recordObat={record.recordObat}
            />
          ))}
        </>
      )
    }
  }

  return (
    <main className="flex min-h-screen flex-col bg-white p-5">
      <Center>
        <Text>
          Daftar Records untuk <span className="font-bold">{email}</span>
        </Text>
      </Center>
      {showContent()}
    </main>
  )
}
