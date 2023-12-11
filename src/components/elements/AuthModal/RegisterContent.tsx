import {
  Button,
  Input,
  InputGroup,
  InputRightElement,
  Radio,
  RadioGroup,
  Stack,
  useRadioGroup,
} from '@chakra-ui/react'
import { useAuth } from '@hooks'
import { useState } from 'react'

export const RegisterContent = ({ onClose }: { onClose: () => void }) => {
  const [show, setShow] = useState(false)
  const [email, setEmail] = useState<string>('')
  const [name, setName] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [role, setRole] = useState<'DOCTOR' | 'PATIENT'>('DOCTOR')
  const handleEmail = (event: any) => setEmail(event.target.value)
  const handlePassword = (event: any) => setPassword(event.target.value)
  const handleName = (event: any) => setName(event.target.value)
  const handleClick = () => setShow(!show)

  const { register } = useAuth()

  const { getRootProps, getRadioProps } = useRadioGroup({
    onChange: (value: any) => {
      setRole(value)
    },
  })

  const group = getRootProps()
  const [value, setValue] = useState('')
  console.log(value)
  return (
    <div className="flex flex-col gap-5">
      <Input type="text" placeholder="Enter name" onKeyUp={handleName} />
      <Input type="email" placeholder="Enter Email" onKeyUp={handleEmail} />
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

      <RadioGroup onChange={setValue} value={value}>
        <Stack direction="row">
          <Radio {...getRadioProps({ value: 'DOCTOR' })}>Dokter</Radio>
          <Radio {...getRadioProps({ value: 'PATIENT' })}>Pasien</Radio>
        </Stack>
      </RadioGroup>
      <Button
        className="w-full"
        backgroundColor={'teal'}
        color={'white'}
        onClick={() => register({ email, password, name, role }, onClose)}
      >
        Sign Up
      </Button>
    </div>
  )
}
