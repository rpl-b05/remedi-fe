import {
  Badge,
  Box,
  Button,
  Flex,
  ListItem,
  Text,
  UnorderedList,
} from '@chakra-ui/react'
import { Record } from './interface'
import { useRouter } from 'next/navigation'

export const RecordCard: React.FC<Record> = ({
  id,
  dokterId,
  pasienId,
  isVerified,
  description,
  penyakitId,
  createdAt,
  recordObat,
}) => {
  const router = useRouter()

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
    if (recordObat.length != 0) {
      return (
        <div>
          <Text fontSize="small" color="gray">
            Resep:
          </Text>
          <UnorderedList fontSize="small" color="gray">
            {recordObat.map((item, index) => (
              <ListItem key={index}>
                <Text fontSize="small" color="gray">
                  Obat {item.obatId}: {item.dosis}
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
    if (penyakitId) {
      return (
        <Text fontSize="small" color="gray">
          Diagnosa: {penyakitId}
        </Text>
      )
    }
  }

  const handleOnClick = () => {
    router.push(`/record/edit/${id}`)
  }

  const displayEditButton = () => {
    if (isVerified && penyakitId == null) {
      return (
        <Button size="xs" onClick={handleOnClick}>
          Tambahkan Detail
        </Button>
      )
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
        Record dibuat oleh dokter <span className="font-bold">{dokterId}</span>{' '}
        pada <span className="font-bold">{createdAt}</span>
      </Text>
      {displayPenyakit()}
      {displayDescription()}
      {displayDaftarResep()}
      {displayEditButton()}
    </Box>
  )
}
