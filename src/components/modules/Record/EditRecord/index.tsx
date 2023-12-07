import {
  Button,
  Center,
  CloseButton,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Select,
  Spinner,
  Text,
  Textarea,
  VStack,
} from '@chakra-ui/react'
import { EditRecordProps, Obat, ObatPair, Penyakit } from './interface'
import { useEffect, useState } from 'react'
import axios from 'axios'
import Cookies from 'js-cookie'
import { toast } from 'react-hot-toast'
import { useRouter } from 'next/navigation'

export const EditMedicalRecord: React.FC<EditRecordProps> = ({ id }) => {
  const [penyakitId, setPenyakitId] = useState<string>()
  const token = Cookies.get('token')
  const [loadingPenyakit, setLoadingPenyakit] = useState(true)
  const [allPenyakit, setAllPenyakit] = useState<Penyakit[]>([])
  const [deskripsi, setDeskripsi] = useState<string>('')
  const [allObat, setAllObat] = useState<Obat[]>([])
  const [loadingObat, setLoadingObat] = useState(true)
  const [obatPairs, setObatPairs] = useState<ObatPair[]>([])
  const router = useRouter()

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
          tempAllPenyakit.push(penyakit as Penyakit)
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
    e.preventDefault()
    const headers = {
      'Content-Type': 'application/json',
    }
    const data = JSON.stringify({
      description: deskripsi,
      penyakitId: Number(penyakitId),
      daftarRecordObat: obatPairs,
    })

    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
    const postData = axios.patch(
      `${process.env.NEXT_PUBLIC_API_URL}/record/update/${id}`,
      data,
      { headers }
    )
    toast.promise(postData, {
      loading: `Updating medical record ${id}...`,
      success: 'Successfully updated new medical record',
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
    fetchAllPenyakit()
    fetchAllObat()
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
                setPenyakitId(e.target.value)
              }}
              placeholder="Pilih penyakit"
            >
              {allPenyakit.map((penyakit, index) => (
                <option value={penyakit.id} key={index}>
                  {penyakit.name} - {penyakit.category}
                </option>
              ))}
            </Select>
          </FormControl>
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
                  <Select
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
                  </Select>
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
    </main>
  )
}
