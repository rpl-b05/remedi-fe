import { Input, Box, Text, VStack, Divider, Button } from '@chakra-ui/react'
import { useAuth } from '@hooks'
import axios from 'axios'
import { ChangeEvent, useEffect, useRef, useState } from 'react'
import toast from 'react-hot-toast'
import { GetKategoriObat, KategoriObat } from './interface'
import { useDebounce } from 'use-debounce'
import { MdArrowDropDown } from 'react-icons/md'

export const FormObat = ({
  onClose,
  onSuccess,
}: {
  onClose: () => void
  onSuccess: () => void
}) => {
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

  const dropdownRef = useRef<HTMLDivElement>(null)

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setShowDropdown(false)
    }
  }

  const handleSubmit = async () => {
    if (
      name != '' &&
      debouncedSearch != '' &&
      listKategori.some((kategori) => kategori.name.includes(debouncedSearch))
    ) {
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
      await toast.promise(newObat, {
        loading: `Creating obat...`,
        success: `Berhasil membuat obat baru`,
        error: (err) => err.response.data.responseMessage,
      })

      await newObat
        .then((res) => {
          onSuccess()
          onClose()
        })
        .catch((err) => {
          console.log(err)
        })
    } else {
      if (!isPickKategori) {
        toast.error('Kategori Obat tidak ada')
      } else {
        toast.error('Form tidak valid')
      }
    }
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

      if (listKategoriObat.length === 0) {
        toast.error(`Kategori obat tidak ditemukan`)
      }
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

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <div className="flex flex-col gap-3 mb-5">
      <div className="flex flex-col gap-1">
        <span>Nama Obat</span>
        <Input type="text" placeholder="Nama Obat" onKeyUp={handleName} />
      </div>
      <Box position="relative">
        <div className="flex flex-col gap-1">
          <span>Nama Kategori Obat</span>
          <div className="relative">
            <Input
              placeholder="Select..."
              value={searchQuery}
              onChange={handleSearchQuery}
              onClick={() => setShowDropdown(true)}
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <MdArrowDropDown className="h-5 w-5 text-gray-400" />
            </div>
          </div>
        </div>
        {showDropdown && (
          <Box
            ref={dropdownRef}
            position="absolute"
            top="100%"
            left={0}
            right={0}
            zIndex="1"
            bg="white"
            border="1px solid #E2E8F0"
            borderRadius="md"
            maxHeight="170px"
            overflowY="auto"
          >
            <VStack align="stretch" p={3}>
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
        Tambah
      </Button>
    </div>
  )
}
