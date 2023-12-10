import { PasienEmailProps, Record } from './interface'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { Center, Spinner, Text } from '@chakra-ui/react'
import { RecordCard } from './RecordCard'
import { useAuth, useLocalStorage } from '@hooks'
import { useRouter } from 'next/navigation'

export const ListDaftarRecordPasien: React.FC<PasienEmailProps> = ({
  email,
}) => {
  const [loading, setLoading] = useState(true)
  const currEmail = email
  const [records, setRecords] = useState<Record[]>([])
  const [token, setToken] = useState<string>()
  const { getItem } = useLocalStorage()
  const { user } = useAuth()
  const router = useRouter()
  const [emailDokter, setEmailDokter] = useState('')

  const fetchAllRecords = async () => {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
    const getAllRecords = axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/record/pasien?email=${currEmail}`
    )

    setLoading(true)
    await getAllRecords
      .then((res) => {
        const tempRecords = res.data.medicalRecords.map(
          (rec: any) => rec as Record
        )
        tempRecords.sort((a: Record, b: Record) => b.id - a.id)
        setRecords(tempRecords)
      })
      .catch((err) => {
        console.log(err)
      })
    setLoading(false)
  }

  useEffect(() => {
    if (user) {
      if (user.role == 'DOCTOR') {
        setToken(user.token)
        setEmailDokter(user.email)
      } else {
        router.push('/')
      }
    }
  }, [user])

  useEffect(() => {
    if (token && currEmail != null && emailDokter != '') {
      fetchAllRecords()
    }
  }, [currEmail, token, emailDokter])

  useEffect(() => {
    const tokenFromStorage = getItem('user')
    if (!tokenFromStorage) {
      router.push('/')
    }
  }, [])

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
              dokterEmail={record.dokterEmail}
              pasienId={record.pasienId}
              isVerified={record.isVerified}
              description={record.description}
              penyakit={record.penyakit}
              createdAt={record.createdAt}
              resepObat={record.resepObat}
              currentEmail={emailDokter}
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
