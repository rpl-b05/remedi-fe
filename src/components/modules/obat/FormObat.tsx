import { Input, Box, Text, VStack, Divider, Button } from '@chakra-ui/react'
import { useAuth } from '@hooks'
import axios from 'axios'
import { ChangeEvent, useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { GetKategoriObat, KategoriObat } from './interface'
import { useDebounce } from 'use-debounce'

export const FormObat = ({ onClose }: { onClose: () => void }) => {
  const DEBOUNCE_DELAY = 500
  const { user } = useAuth()

  const [name, setName] = useState<string>('')
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [debouncedSearch] = useDebounce(searchQuery, DEBOUNCE_DELAY)

  const handleName = (event: any) => setName(event.target.value)
  const handleSearchQuery = (event: ChangeEvent<HTMLInputElement>) =>
    setSearchQuery(event.target.value)

  const [listKategori, setListKategori] = useState<KategoriObat[]>([])
  const [showDropdown, setShowDropdown] = useState<boolean>(false)
  const [isPickKategori, setIsPickKategori] = useState<boolean>(false)

  const handleSubmit = async () => {
    if (!isPickKategori) {
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/kategori-obat`,
        { name: debouncedSearch },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${user?.token}`,
          },
        }
      )
    }

    const newObat = axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/obat`,
      { name, category: debouncedSearch },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user?.token}`,
        },
      }
    )
    toast.promise(newObat, {
      loading: `Creating obat...`,
      success: 'Successfully create new obat',
      error: (err) => err.response.data.responseMessage,
    })

    await newObat
      .then((res) => {
        onClose()
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const getKategoriObat = async () => {
    try {
      const response = await axios({
        method: 'GET',
        url: `${process.env.NEXT_PUBLIC_API_URL}/kategori-obat?name=${searchQuery}`,
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      })

      const { listKategoriObat }: GetKategoriObat = response?.data
      setListKategori(listKategoriObat)
    } catch (error) {
      console.log(error)
    }
  }

  const handleKategoriClick = (lategoriObat: KategoriObat) => {
    setSearchQuery(lategoriObat.name)
    setShowDropdown(false)
    setIsPickKategori(true)
  }

  useEffect(() => {
    getKategoriObat()
  }, [debouncedSearch])

  return (
    <div className="flex flex-col gap-3 mb-5">
      <Input type="text" placeholder="Enter Obat name" onKeyUp={handleName} />
      <Box position="relative">
        <Input
          placeholder="Enter Kategori Obat"
          value={searchQuery}
          onChange={handleSearchQuery}
          onClick={() => setShowDropdown(true)}
        />
        {showDropdown && (
          <Box
            position="absolute"
            top="100%"
            left={0}
            right={0}
            zIndex="1"
            bg="white"
            border="1px solid #E2E8F0"
            borderRadius="md"
          >
            <VStack align="stretch" p={2}>
              {listKategori.map((kategori) => (
                <Box
                  key={kategori.id}
                  _hover={{ bg: 'gray.100', cursor: 'pointer' }}
                >
                  <Text onClick={() => handleKategoriClick(kategori)}>
                    {kategori.name}
                  </Text>
                </Box>
              ))}
            </VStack>
            <Divider />
          </Box>
        )}
      </Box>
      <Button colorScheme="green" onClick={() => handleSubmit()}>
        Create
      </Button>
    </div>
  )
}
