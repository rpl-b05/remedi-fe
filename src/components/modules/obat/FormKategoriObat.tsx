import { Input, Button } from '@chakra-ui/react'
import { useAuth } from '@hooks'
import axios from 'axios'
import { useState } from 'react'
import toast from 'react-hot-toast'

export const FormKategoriObat = ({
  onClose,
  setIsCreateKategori,
}: {
  onClose: () => void
  setIsCreateKategori: (isCreateKategori: boolean) => void
}) => {
  const { user } = useAuth()

  const [name, setName] = useState<string>('')
  const handleName = (event: any) => setName(event.target.value)

  const handleSubmit = async () => {
    if (name != '') {
      try {
        await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/kategori-obat`,
          { name },
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${user?.token}`,
            },
          }
        )
        toast.success('Berhasil membuat kategori obat baru')
        setIsCreateKategori(false)
        onClose()
      } catch (error: any) {
        toast.error(error.response.data.responseMessage)
      }
    } else {
      toast.error('Form tidak valid')
    }
  }

  return (
    <div className="flex flex-col gap-3 mb-5">
      <div className="flex flex-col gap-1">
        <span>Nama Kategori Obat</span>
        <Input
          type="text"
          placeholder="Nama Kategori Obat"
          onKeyUp={handleName}
        />
      </div>
      <Button colorScheme="green" onClick={() => handleSubmit()}>
        Tambah
      </Button>
    </div>
  )
}
