import {Badge} from '@chakra-ui/react'
export const RecordStatusBadge = ({isVerified} : {isVerified: boolean}) => {
  if (isVerified == null || isVerified == undefined) {
    return <Badge>Belum Diverifikasi</Badge>
  }
  if (isVerified) {
    return <Badge colorScheme="green">Verifikasi Diterima</Badge>
  }
  return <Badge colorScheme="red">Verifikasi Ditolak</Badge>
}