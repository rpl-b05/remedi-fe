import {
  Box,
  Button,
  Center,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spinner,
  Text,
  useDisclosure,
} from '@chakra-ui/react'
import { PasienCard } from './PasienCard'
import { useEffect, useState } from 'react'
import axios from 'axios'
import React from 'react'
import { toast } from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import { useDebounce } from 'use-debounce'
import { useAuth, useLocalStorage } from '@hooks'

export const ListDaftarPasien = () => {
  const [currQuery, setCurrQuery] = useState('')
  const [emails, setEmails] = useState<string[]>([])
  const [loading, setLoading] = useState(true)
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [email, setEmail] = useState('')
  const router = useRouter()
  const [debouncedQuery] = useDebounce(currQuery, 500)
  const { user } = useAuth()
  const [token, setToken] = useState<string>()
  const { getItem } = useLocalStorage()

  const handleFormSubmit = async (e: any) => {
    e.preventDefault()
    if (email == '') {
      toast.error('Email cannot be empty')
    } else {
      const headers = {
        'Content-Type': 'application/json',
      }
      const data = JSON.stringify({
        pasienEmail: email,
      })

      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
      const postData = axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/record`,
        data,
        {
          headers,
        }
      )

      toast.promise(postData, {
        loading: 'Creating new medical record...',
        success: (data) => {
          return `Successfully created new medical record with ID ${data.data.record.id}`
        },
        error: (err) => err.response.data.responseMessage,
      })

      await postData
        .then((_) => {
          onClose()
          router.push(`/record?email=${email}`)
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }

  const fetchAllUsers = async () => {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
    const getAllEmail = axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/record/all-pasien?email=${currQuery}`
    )

    setLoading(true)
    await getAllEmail
      .then((res) => {
        setEmails(res.data.result)
      })
      .catch((err) => {
        console.log(err)
      })
    setLoading(false)
  }

  // jika ada perubahan pada user, atau dlm hal ini user sudah berhasil diketahui
  // jika user dokter, maka set token untuk dipakai saat send request
  // jika user pasien, maka dia unauthorized, back to landing page
  useEffect(() => {
    if (user) {
      if (user.role == 'DOCTOR') {
        setToken(user.token)
      } else {
        router.push('/')
      }
    }
  }, [user])

  // jika ada perubahan pada token, atau dlm hal ini token sudah didapatkan dari hook sebelumnya
  // maka fetch all user utk ditampilkan
  useEffect(() => {
    if (token) {
      fetchAllUsers()
    }
  }, [token])

  // untuk update query setelah diupdate di field
  useEffect(() => {
    if (token) {
      fetchAllUsers()
    }
  }, [debouncedQuery])

  // untuk redirect user unauthorized ke landing page
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
      if (emails.length == 0) {
        return (
          <div className="flex flex-col items-center mt-5">
            Email tidak ditemukan pada sistem
          </div>
        )
      } else {
        return (
          <>
            {emails.map((email) => (
              <PasienCard key={email} email={email} />
            ))}
          </>
        )
      }
    }
  }

  return (
    <main className="flex min-h-screen flex-col bg-white p-5">
      <Center>
        <Text margin={5} className="font-bold text-2xl">
          Daftar Pasien dengan Medical Record
        </Text>
      </Center>
      <Flex alignItems="center">
        <Box className="mr-3">
          <Text>Email:</Text>
        </Box>
        <Box className="mr-3">
          <Input
            placeholder="Filter by Email"
            variant="outline"
            padding={3}
            value={currQuery}
            onChange={(e) => {
              setCurrQuery(e.currentTarget.value)
            }}
          />
        </Box>
        <Button colorScheme="teal" onClick={onOpen}>
          Tambah Record
        </Button>
      </Flex>
      {showContent()}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Buat Medical Record Baru</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Email Pasien:</FormLabel>
              <Input
                placeholder="Email"
                onChange={(e) => {
                  setEmail(e.currentTarget.value)
                }}
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="teal" mr={3} onClick={handleFormSubmit}>
              Create
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </main>
  )
}
