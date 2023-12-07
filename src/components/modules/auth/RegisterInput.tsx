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

export const RegisterInput = ({ onClose }: { onClose: () => void }) => {
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
      <RadioGroup {...group} name="role">
        <Stack spacing={4} direction="row">
          <Radio value="DOCTOR" {...getRadioProps({ value: 'DOCTOR' })}>
            Dokter
          </Radio>
          <Radio value="PATIENT" {...getRadioProps({ value: 'PATIENT' })}>
            Pasien
          </Radio>
        </Stack>
      </RadioGroup>
      <div className="mt-5 flex justify-center mb-4">
        <Button
          onClick={() => register({ email, password, name, role }, onClose)}
        >
          Login
        </Button>
      </div>
    </div>
  )
}