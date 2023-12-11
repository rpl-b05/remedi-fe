import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react'
import React, { useState } from 'react'
import { RegisterContent } from './RegisterContent'
import { LoginContent } from './LoginContent'
import { AuthModalInterface } from './interface'

export const AuthModal: React.FC<AuthModalInterface> = ({
  isOpen,
  onClose,
}) => {
  const [isLogin, setIsLogin] = useState<boolean>(true)
  const handleClick = () => setIsLogin((prev) => !prev)
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{isLogin ? 'Login' : 'Register'}</ModalHeader>
        <ModalCloseButton />
        <ModalBody className="flex flex-col gap-2">
          {!isLogin && <RegisterContent onClose={() => setIsLogin(true)} />}
          {isLogin && <LoginContent onClose={onClose} />}
          <span className="text-center text-sm">
            {isLogin
              ? "Don't have an account yet?"
              : 'Already have an account?'}{' '}
            <button
              className="underline text-teal-500 font-semibold"
              onClick={handleClick}
            >
              {isLogin ? 'Sign Up' : 'Sign In'}
            </button>
          </span>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}
