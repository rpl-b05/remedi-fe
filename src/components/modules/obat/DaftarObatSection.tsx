import {
  Box,
  Button,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Select,
  useDisclosure,
} from '@chakra-ui/react'
import { FormObat } from './FormObat'
import { useEffect, useState } from 'react'
import { useAuth, useLocalStorage } from '@hooks'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import { Obat } from './interface'
import { api } from 'src/components/utils/api'
import { FormKategoriObat } from './FormKategoriObat'
export const DaftarObatSection = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { user } = useAuth()
  const router = useRouter()
  const { getItem } = useLocalStorage()
  const [obats, setObats] = useState<Obat[]>()
  const [filter, setFilter] = useState<string>('')
  const [search, setSearch] = useState<string>('')
  const [isCreateKategori, setIsCreateKategori] = useState<boolean>(false)
  const handleClick = () => setIsCreateKategori((prev) => !prev)
  useEffect(() => {
    const tokenFromStorage = getItem('user')
    if (!tokenFromStorage) {
      router.push('/')
      toast.error('Unauthorized')
    }
  }, [])

  useEffect(() => {
    if (user) {
      if (user.role == 'DOCTOR') {
        if (filter != '' && search != '') {
          fetch()
        }
      } else {
        router.push('/')
        toast.error('This page is available for doctor only')
      }
    }
  }, [user])

  const handleChange = (event: any) => {
    setFilter(event.target.value)
  }

  const handleSearch = (event: any) => setSearch(event.target.value)

  useEffect(() => {
    fetch()
  }, [search, filter])

  const fetch = () => {
    if (filter == 'kategori') {
      api
        .get(
          `${process.env.NEXT_PUBLIC_API_URL}/obat${
            search == '' ? '' : `?category=${search}`
          }`
        )
        .then((res) => setObats(res.data.data))
    } else {
      api
        .get(
          `${process.env.NEXT_PUBLIC_API_URL}/obat${
            search == '' ? '' : `?name=${search}`
          }`
        )
        .then((res) => setObats(res.data.data))
    }
  }

  return (
    <div className="px-20 mt-10 w-full">
      <div className="text-3xl text-center font-bold">Daftar Obat</div>
      <div className="flex justify-end">
        <Button onClick={onOpen}>Tambah Obat</Button>
      </div>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            {isCreateKategori ? 'Tambah Kategori Obat' : 'Tambah Obat'}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {!isCreateKategori && (
              <FormObat onClose={onClose} onSuccess={fetch} />
            )}
            {isCreateKategori && (
              <FormKategoriObat
                onClose={onClose}
                setIsCreateKategori={setIsCreateKategori}
              />
            )}
            <span className="text-center text-sm">
              {!isCreateKategori
                ? 'Tidak menemukan Kategori Obat?'
                : 'Kembali ke menambahkan Obat'}{' '}
              <button
                className="underline text-teal-500 font-semibold"
                onClick={handleClick}
              >
                {!isCreateKategori ? 'Tambah Kategori Obat' : 'Kembali'}
              </button>
            </span>
          </ModalBody>
        </ModalContent>
      </Modal>
      <div className="mt-5">
        <Select
          placeholder="Filter by"
          onChange={handleChange}
          defaultValue={'nama'}
        >
          <option value="nama">Nama</option>
          <option value="kategori">Kategori</option>
        </Select>
      </div>

      <Input type="text" placeholder="Enter search" onKeyUp={handleSearch} />
      {obats &&
        (obats?.length > 0 ? (
          <div className="grid grid-cols-4">
            {obats?.map((obat) => (
              <Box
                key={obat.id}
                borderWidth="1px"
                borderRadius="lg"
                overflow="hidden"
                paddingX={5}
                paddingY={3}
                marginTop={3}
                style={{ cursor: 'pointer' }}
                _hover={{
                  transform: 'scale(1.01)',
                  transition: 'transform 0.3s ease-in-out',
                }}
              >
                <div className="font-bold text-2xl capitalize text-green-500">
                  {obat.name}
                </div>
                <div className=" text-xl capitalize ">{obat.kategori.name}</div>
              </Box>
            ))}
          </div>
        ) : (
          <div className="mt-10 text-2xl text-center font-bold text-green-500">
            Obat yang dicari tidak ada
          </div>
        ))}
    </div>
  )
}
