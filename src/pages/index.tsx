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
import { useUser } from '@hooks'
import { LoginInput, RegisterInput } from '@modules'

export default function Home() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const {
    isOpen: regIsOpen,
    onOpen: regOnOpen,
    onClose: regOnClose,
  } = useDisclosure()
  const { removeUser } = useUser()
  return (
    <div>
      <Button onClick={onOpen}>Open Modal</Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Login</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <LoginInput onClose={onClose} />
          </ModalBody>
        </ModalContent>
      </Modal>
      <Button onClick={regOnOpen}>Open Register</Button>

      <Modal isOpen={regIsOpen} onClose={regOnClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Login</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <RegisterInput onClose={regOnClose} />
          </ModalBody>
        </ModalContent>
      </Modal>
      <Button onClick={() => removeUser()}>Log out</Button>
    </div>
  )
}
