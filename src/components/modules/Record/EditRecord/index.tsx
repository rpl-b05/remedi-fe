import {
  Button,
  Center,
  CloseButton,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Select as ChakraSelect,
  Spinner,
  Text,
  Textarea,
  VStack,
} from '@chakra-ui/react'
import { EditRecordProps, Obat, ObatPair, SelectInterface } from './interface'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import { useAuth, useLocalStorage } from '@hooks'
import Select from 'react-select'
import { PenyakitModal } from '@elements'

export const EditMedicalRecord: React.FC<EditRecordProps> = ({ id }) => {
  const [penyakitId, setPenyakitId] = useState<SelectInterface | null>()
  const [loadingPenyakit, setLoadingPenyakit] = useState(true)
  const [allPenyakit, setAllPenyakit] = useState<any>()
  const [deskripsi, setDeskripsi] = useState<string>('')
  const [allObat, setAllObat] = useState<Obat[]>([])
  const [loadingObat, setLoadingObat] = useState(true)
  const [isOpen, setIsOpen] = useState(false)
  const [obatPairs, setObatPairs] = useState<ObatPair[]>([])
  const router = useRouter()
  const { user } = useAuth()
  const [token, setToken] = useState<string>()
  const { getItem } = useLocalStorage()

  const handleAddPair = () => {
    setObatPairs([...obatPairs, { obatId: undefined, dosis: '' }])
  }

  const handleInputChange = (
    index: number,
    field: keyof ObatPair,
    value: any
  ) => {
    const updatedPairs = [...obatPairs]
    updatedPairs[index][field] = value
    setObatPairs(updatedPairs)
  }

  const handleDeletePair = (index: number) => {
    const updatedPairs = [...obatPairs]
    updatedPairs.splice(index, 1)
    setObatPairs(updatedPairs)
  }

  const fetchAllPenyakit = async () => {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
    const getAllPenyakit = axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/penyakit`
    )

    setLoadingPenyakit(true)
    await getAllPenyakit
      .then((res) => {
        const tempAllPenyakit = []
        for (const penyakit of res.data.data) {
          tempAllPenyakit.push({
            value: penyakit.id,
            label: `${penyakit.name} - ${penyakit.category}`,
          })
        }
        setAllPenyakit(tempAllPenyakit)
      })
      .catch((err) => {
        console.log(err)
      })
    setLoadingPenyakit(false)
  }

  const isObatSubmissionValid = () => {
    const chosenObat: number[] = []
    for (const obatPair of obatPairs) {
      if (obatPair.obatId == undefined || obatPair.dosis == '') {
        toast.error('Entri tidak boleh kosong')
        return false
      }
      if (chosenObat.includes(obatPair.obatId)) {
        toast.error('Obat yang sama sudah berada pada entri yang lain')
        return false
      }
      chosenObat.push(obatPair.obatId)
    }
    return true
  }

  const handleFormSubmit = async (e: any) => {
    if (!isObatSubmissionValid()) {
      return
    }
    if (!penyakitId) {
      toast.error('Penyakit tidak boleh kosong')
      return
    }
    console.log(penyakitId)
    e.preventDefault()
    const headers = {
      'Content-Type': 'application/json',
    }
    const data = JSON.stringify({
      description: deskripsi,
      penyakitId: Number(penyakitId?.value),
      daftarRecordObat: obatPairs,
    })

    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
    const postData = axios.patch(
      `${process.env.NEXT_PUBLIC_API_URL}/record/update/${id}`,
      data,
      { headers }
    )
    toast.promise(postData, {
      loading: `Mengupdate medical record ${id}...`,
      success: 'Sukses mengupdate medical record',
      error: (err) => err.response.data.responseMessage,
    })

    await postData
      .then((res) => {
        const email = res.data.data.pasien.email
        router.push(`/record?email=${email}`)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const fetchAllObat = async () => {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
    const getAllObat = axios.get(`${process.env.NEXT_PUBLIC_API_URL}/obat`)

    setLoadingObat(true)
    await getAllObat
      .then((res) => {
        const tempAllObat = []
        for (const obat of res.data.data) {
          tempAllObat.push(obat as Obat)
        }
        setAllObat(tempAllObat)
      })
      .catch((err) => {
        console.log(err)
      })
    setLoadingObat(false)
  }

  useEffect(() => {
    if (user) {
      if (user.role == 'DOCTOR') {
        setToken(user.token)
      } else {
        router.push('/')
      }
    }
  }, [user])

  useEffect(() => {
    if (token) {
      fetchAllPenyakit()
      fetchAllObat()
    }
  }, [token])

  useEffect(() => {
    const tokenFromStorage = getItem('user')
    if (!tokenFromStorage) {
      router.push('/')
    }
  }, [])

  const displayForm = () => {
    if (loadingPenyakit || loadingObat) {
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
        <div>
          <FormControl isRequired>
            <FormLabel>Diagnosa Penyakit</FormLabel>
            <Select
              value={penyakitId}
              onChange={(e) => {
                setPenyakitId(e)
              }}
              placeholder="Pilih penyakit"
              options={allPenyakit}
            />
          </FormControl>
          <span className="text-[12px]">
            Tidak menemukan penyakit yang sesuai?{' '}
            <button
              className="text-teal-500 underline"
              onClick={() => setIsOpen(true)}
            >
              Tambah obat baru
            </button>
          </span>
          <FormControl className="mt-3">
            <FormLabel>Deskripsi</FormLabel>
            <Textarea
              placeholder="Masukkan deskripsi"
              onChange={(e) => {
                setDeskripsi(e.target.value)
              }}
            />
          </FormControl>
          <VStack spacing={4} align="start" className="mt-3">
            <Button onClick={handleAddPair}>Tambahkan Obat</Button>
            {obatPairs.map((pair, index) => (
              <FormControl key={index}>
                <FormLabel>{`Obat ${index + 1}`}</FormLabel>
                <Flex alignItems="center">
                  <ChakraSelect
                    placeholder="Pilih obat"
                    value={pair.obatId}
                    onChange={(e) =>
                      handleInputChange(index, 'obatId', +e.target.value)
                    }
                  >
                    {allObat.map((obat) => (
                      <option key={obat.id} value={obat.id}>
                        {obat.name}
                      </option>
                    ))}
                  </ChakraSelect>
                  <Input
                    className="ml-2"
                    value={pair.dosis}
                    onChange={(e: any) =>
                      handleInputChange(index, 'dosis', e.target.value)
                    }
                    placeholder={`Masukkan dosis obat ${index + 1}`}
                    isRequired
                  />
                  <CloseButton
                    className="ml-2"
                    onClick={() => handleDeletePair(index)}
                  />
                </Flex>
              </FormControl>
            ))}
          </VStack>
          <Button
            className="mt-3"
            colorScheme="teal"
            onClick={handleFormSubmit}
          >
            Submit
          </Button>
        </div>
      )
    }
  }

  return (
    <main className="flex min-h-screen flex-col bg-white p-5">
      <Center>
        <Text fontSize="xl">
          Edit Medical Record ID <span className="font-bold">{id}</span>
        </Text>
      </Center>
      {displayForm()}
      <PenyakitModal isOpen={isOpen} setIsOpen={setIsOpen} />
    </main>
  )
}
