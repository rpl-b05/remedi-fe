import {
  Box,
  Button,
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
import axios from 'axios'
import { useAuth, useLocalStorage } from '@hooks'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import { Obat } from './interface'
export const DaftarObatSection = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { user } = useAuth()
  const router = useRouter()
  const { getItem } = useLocalStorage()
  const [obats, setObats] = useState<Obat[]>()
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
        fetchAllObat()
      } else {
        router.push('/')
        toast.error('This page is available for doctor only')
      }
    }
    console.log('a')
  }, [user])

  const fetchAllObat = async () => {
    await axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/obat`, {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      })
      .then((res) => setObats(res.data.data))
  }
  console.log(obats)

  return (
    <div className="px-20 mt-10 w-full">
      <div className="text-3xl text-center font-bold">Daftar Obat</div>
      <div className="flex justify-end">
        <Button onClick={onOpen}>Create Obat</Button>
      </div>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Form Create Obat</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormObat onClose={onClose} />
          </ModalBody>
        </ModalContent>
      </Modal>
      <Select placeholder="Filter by" className="w-1/4">
        <option value="option1">Nama</option>
        <option value="option2">Kategori</option>
      </Select>
      <div className="grid grid-cols-4">
        {obats?.map((obat) => (
          <Box
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
    </div>
  )
}
