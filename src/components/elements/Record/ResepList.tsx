import { ObatRecord } from 'src/components/utils/interface'
import { RecordObat } from '../../modules/Record/DaftarRecordPasien/interface'
import { Text, UnorderedList, ListItem, Box } from '@chakra-ui/react'

export const ResepList = ({ resep }: { resep: ObatRecord[] }) => {
  return (
    resep.length > 0 && (
      <Box>
        <Text fontSize="small" color="gray">
          Resep:
        </Text>
        <UnorderedList fontSize="small" color="gray">
          {resep.map((item, index) => (
            <ListItem key={index}>
              <Text fontSize="small" color="gray">
                Obat <span className="font-bold">{item.obat.name}</span>
                {` (${item.obat.kategori.name})`}:{' '}
                <span className="font-bold">{item.dosis}</span>
              </Text>
            </ListItem>
          ))}
        </UnorderedList>
      </Box>
    )
  )
}
