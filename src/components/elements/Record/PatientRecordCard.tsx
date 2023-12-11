import { Box, Button, ButtonGroup, Flex, Text } from '@chakra-ui/react'
import { MedicalRecord } from 'src/components/utils/interface'
import { RecordStatusBadge } from './RecordStatusBadge'
import { ResepList } from './ResepList'
import { formattedDateTime } from '@utils'
import { api } from 'src/components/utils/api'
import toast from 'react-hot-toast'
import { useRouter } from 'next/router'

export const PatientRecordCard = ({
  medicalRecord,
}: {
  medicalRecord: MedicalRecord
}) => {
  const Router = useRouter()
  const {
    id,
    isVerified,
    description,
    dokter,
    penyakit,
    createdAt,
    recordObat,
  } = medicalRecord
  const onVerifyClick = (isVerified: boolean) => {
    try {
      const patchRecord = async () => {
        await api.patch(`/record/${id}`, { isVerified })
        toast.success(
          `Medical record berhasil di${isVerified ? 'verifikasi' : 'tolak'}`
        )
        Router.reload()
      }
      patchRecord()
    } catch (err) {
      toast.error(
        `Medical record gagal di${isVerified ? 'verifikasi' : 'tolak'}`
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
        <RecordStatusBadge isVerified={isVerified} />
      </Flex>

      <Text fontSize="small" color="gray">
        Record dibuat oleh Dokter{' '}
        <span className="font-bold">{dokter.name}</span> pada{' '}
        <span className="font-bold">{formattedDateTime(createdAt)}</span>
      </Text>
      <ResepList resep={recordObat} />
      {isVerified == null && (
        <Box w="full" display="flex" justifyContent="flex-end" mt={4}>
          <ButtonGroup>
            <Button
              size="sm"
              colorScheme="green"
              onClick={() => onVerifyClick(true)}
            >
              Verifikasi
            </Button>
            <Button
              size="sm"
              colorScheme="red"
              onClick={() => onVerifyClick(false)}
            >
              Tolak
            </Button>
          </ButtonGroup>
        </Box>
      )}
    </Box>
  )
}
