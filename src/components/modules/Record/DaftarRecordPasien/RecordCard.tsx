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
    dokterEmail,
    pasienId,
    isVerified,
    description,
    penyakit,
    createdAt,
    resepObat,
    currentEmail,
  }) => {
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
                    Obat <span className="font-bold">{item.obat}</span>
                    {` (${item.kategoriObatName})`}:{' '}
                    <span className="font-bold">{item.dosis}</span>
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
            Deskripsi: <span className="font-bold">{description}</span>
          </Text>
        )
      }
    }
  
    const displayPenyakit = () => {
      if (penyakit) {
        return (
          <Text fontSize="small" color="gray">
            Diagnosa: <span className="font-bold">{penyakit}</span>
          </Text>
        )
      }
    }
  
    const handleOnClick = () => {
      router.push(`/record/edit/${id}`)
    }
  
    const displayEditButton = () => {
      if (isVerified && penyakit == null && currentEmail == dokterEmail) {
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
        _hover={{
          transform: 'scale(1.01)',
          transition: 'transform 0.3s ease-in-out',
        }}
      >
        <Flex alignItems="center">
          <Text className="mr-5">
            Record ID: <span className="font-bold">{id}</span>
          </Text>
          {displayVerifiedBadge()}
        </Flex>
  
        <Text fontSize="small" color="gray">
          Record dibuat oleh dokter{' '}
          <span className="font-bold">{dokterEmail}</span> pada{' '}
          <span className="font-bold">{formattedDateTime(createdAt)}</span>
        </Text>
        {displayPenyakit()}
        {displayDescription()}
        {displayDaftarResep()}
        {displayEditButton()}
      </Box>
    )
  }