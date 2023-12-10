import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react'
import React, { useState } from 'react'
import { PenyakitModalProps } from './interface'
import Select from 'react-select'
import { KATEGORI_PENYAKIT } from './constant'
import { SelectInterface } from 'src/components/modules/Record/EditRecord/interface'
import axios from 'axios'
import { useLocalStorage } from '@hooks'
import toast from 'react-hot-toast'

export const PenyakitModal: React.FC<PenyakitModalProps> = ({
  isOpen,
  setIsOpen,
}) => {
  const [category, setCategory] = useState<SelectInterface>()
  const [name, setName] = useState<string>('')
  const { getItem } = useLocalStorage()

  const handleSubmit = async () => {
    const data = {
      name,
      category: category?.value,
    }

    const user = getItem('user')
    if (!user) {
      toast.error('Harap login terlebih dahulu!')
      return
    }

    const { token } = JSON.parse(user)

    const promise = axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/penyakit`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )

    try {
      const response = await toast.promise(promise, {
        loading: 'Sedang memproses . . .',
        error: 'Gagal! Penyakit telah tersedia',
        success: 'Penyakit berhasil ditambahkan',
      })

      const { responseCode } = response.data
      if (responseCode === 201) {
        setCategory(undefined)
        setName('')
        setIsOpen(false)
      }
    } catch (e) {}
  }

  return (
    <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Tambah Penyakit</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <div className="flex flex-col gap-3">
            <div className="flex flex-col gap-1">
              <span>Nama Penyakit</span>
              <Input
                value={name}
                type="text"
                placeholder="Nama Penyakit"
                onChange={(e) => {
                  setName(e.target.value)
                }}
              />
            </div>
            <div className="flex flex-col gap-1">
              <span>Kategori Penyakit</span>
              <Select
                options={KATEGORI_PENYAKIT}
                onChange={(e: any) => setCategory(e)}
              />
            </div>
            <Button
              color={'white'}
              backgroundColor={'teal'}
              onClick={handleSubmit}
              className="my-5"
              isDisabled={!category || name === ''}
            >
              Tambah
            </Button>
          </div>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}
