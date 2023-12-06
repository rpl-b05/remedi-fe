import { Box, Text } from '@chakra-ui/react'
import { PasienCardProps } from './interface'
import { useRouter } from 'next/navigation'

export const PasienCard: React.FC<PasienCardProps> = ({ email }) => {
  const router = useRouter()
  return (
    <Box
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      paddingX={5}
      paddingY={3}
      marginTop={3}
      style={{ cursor: 'pointer' }}
      _hover={{
        transform: 'scale(1.01)',
        transition: 'transform 0.3s ease-in-out',
      }}
      onClick={(_) => {
        router.push(`/record?email=${email}`)
      }}
    >
      <Text>{email}</Text>
    </Box>
  )
}
