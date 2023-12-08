import {
  Badge,
  Box,
  Button,
  ButtonGroup,
  Flex,
  ListItem,
  Text,
  UnorderedList,
} from '@chakra-ui/react'
import { Record } from './interface'
import { useRouter } from 'next/router'
import { api } from 'src/components/utils/api'
import toast from 'react-hot-toast'

interface RecordCardProps extends Record {
  isPatientCard?: boolean
}

export const RecordCard: React.FC<RecordCardProps> = ({
  id,
  dokterEmail,
  pasienId,
  isVerified,
  description,
  penyakit,
  createdAt,
  resepObat,
  isPatientCard
} : RecordCardProps) => {
  const router = useRouter()

  const formattedDateTime = (datetime: string) => {
    const originalDate = new Date(datetime)
    const gmtPlus7Offset = 7 * 60
    const localDate = new Date(originalDate.getTime() + gmtPlus7Offset)

    return localDate.toLocaleString('en-GB')
  }

  const displayVerifiedBadge = () => {
    if (isVerified) {
      return <Badge colorScheme="green">Verifikasi Diterima</Badge>
    } else if (isVerified == false) {
      return <Badge colorScheme="red">Verifikasi Ditolak</Badge>
    } else {
      return <Badge>Belum Diverifikasi</Badge>
    }
  }

  const displayDaftarResep = () => {
    if (resepObat.length != 0) {
      return (
        <div>
          <Text fontSize="small" color="gray">
            Resep:
          </Text>
          <UnorderedList fontSize="small" color="gray">
            {resepObat.map((item, index) => (
              <ListItem key={index}>
                <Text fontSize="small" color="gray">
                  Obat {item.obat}
                  {` (${item.kategoriObatName})`}: {item.dosis}
                </Text>
              </ListItem>
            ))}
          </UnorderedList>
        </div>
      )
    }
  }

  const displayDescription = () => {
    if (description) {
      return (
        <Text fontSize="small" color="gray">
          Deskripsi: {description}
        </Text>
      )
    }
  }

  const displayPenyakit = () => {
    if (penyakit) {
      return (
        <Text fontSize="small" color="gray">
          Diagnosa: {penyakit}
        </Text>
      )
    }
  }

  const handleOnClick = () => {
    router.push(`/record/edit/${id}`)
  }

  const displayEditButton = () => {
    if (isVerified && penyakit == null) {
      return (
        <Button size="xs" onClick={handleOnClick}>
          Tambahkan Detail
        </Button>
      )
    }
  }

  const onVerifyClick = (isVerified: boolean) => {
    try {
      api.patch(`/record/${id}`, {isVerified})
      toast.success(`Medical record berhasil di${isVerified? 'verifikasi':'tolak'}`)
      router.reload()
    } catch (err) {
      toast.error(`Medical record gagal di${isVerified? 'verifikasi':'tolak'}`)
    }
  }  

  return (
    <Box
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      paddingX={5}
      paddingY={3}
      marginTop={3}
    >
      <Flex alignItems="center">
        <Text className="mr-5">
          Record ID: <span className="font-bold">{id}</span>
        </Text>
        {displayVerifiedBadge()}
      </Flex>

      <Text fontSize="small" color="gray">
        Record dibuat oleh Dokter{' '}
        <span className="font-bold">{dokterEmail}</span> pada{' '}
        <span className="font-bold">{formattedDateTime(createdAt)}</span>
      </Text>
      {displayPenyakit()}
      {displayDescription()}
      {displayDaftarResep()}
      {!isPatientCard && displayEditButton()}
      {
        isPatientCard && isVerified==null &&(
          <Box w="full" display="flex" justifyContent="flex-end" mt={4}>
            <ButtonGroup>
              <Button size="sm" colorScheme="green" onClick={() => onVerifyClick(true)}>Verifikasi</Button>
              <Button size="sm" colorScheme="red" onClick={() => onVerifyClick(false)}>Tolak</Button>
            </ButtonGroup>
          </Box>
        )
      }
    </Box>
  )
}
