import { Button, Input } from '@chakra-ui/react'
import { useAuth } from '@hooks'
import axios from 'axios'

import { useState } from 'react'
import toast from 'react-hot-toast'

export const FormObat = ({ onClose }: { onClose: () => void }) => {
  const [name, setName] = useState<string>('')
  const [kategori, setKategori] = useState<string>('')
  const { user } = useAuth()

  const handleName = (event: any) => setName(event.target.value)
  const handleKategori = (event: any) => setKategori(event.target.value)
  const handleSubmit = async () => {
    // handle check if kategori in system??

    // if not then add kategori in system

    // ahmadhi just save the kategori in new variable ya

    // lu kerjain sampe gua dapet variabel kategori siap pake aja

    const newObat = axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/obat`,
      { name, kategori },
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

  return (
    <div className="flex flex-col gap-3 mb-5">
      <Input type="text" placeholder="Enter Obat name" onKeyUp={handleName} />
      <Input
        type="text"
        placeholder="Enter Kategori Obat"
        onKeyUp={handleKategori}
      />
      <Button colorScheme="green" onClick={() => handleSubmit()}>
        Create
      </Button>
    </div>
  )
}
