import { Button, Input, InputGroup, InputRightElement } from '@chakra-ui/react'
import { useAuth } from '@hooks'
import { useState } from 'react'

export const LoginInput = ({ onClose }: { onClose: () => void }) => {
  const [show, setShow] = useState(false)
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const handleEmail = (event: any) => setEmail(event.target.value)
  const handlePassword = (event: any) => setPassword(event.target.value)
  const handleClick = () => setShow(!show)
  const { login } = useAuth()
  return (
    <div className="flex flex-col gap-5">
      <Input type="text" placeholder="Enter Email" onKeyUp={handleEmail} />
      <InputGroup size="md">
        <Input
          pr="4.5rem"
          type={show ? 'text' : 'password'}
          placeholder="Enter password"
          onKeyUp={handlePassword}
        />
        <InputRightElement width="4.5rem">
          <Button h="1.75rem" size="sm" onClick={handleClick}>
            {show ? 'Hide' : 'Show'}
          </Button>
        </InputRightElement>
      </InputGroup>
      <div className="mt-5 flex justify-center mb-4">
        <Button onClick={() => login({ email, password }, onClose)}>
          Login
        </Button>
      </div>
    </div>
  )
}
