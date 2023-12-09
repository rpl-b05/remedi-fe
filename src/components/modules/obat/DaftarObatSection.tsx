import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from '@chakra-ui/react'
import { FormObat } from './FormObat'

export const DaftarObatSection = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <div className="px-20 mt-10">
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
    </div>
  )
}
