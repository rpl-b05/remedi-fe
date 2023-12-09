import { RecordObat } from '../../modules/Record/DaftarRecordPasien/interface';
import {Text, UnorderedList, ListItem, Box} from '@chakra-ui/react';

export const ResepList = ({resep} : {resep: RecordObat[]}) => {
   return (
    resep.length > 0 && 
    (
      <Box>
        <Text fontSize="small" color="gray">
          Resep:
        </Text>
        <UnorderedList fontSize="small" color="gray">
          {resep.map((item, index) => (
            <ListItem key={index}>
              <Text fontSize="small" color="gray">
                Obat {item.obat}
                {` (${item.kategoriObatName})`}: {item.dosis}
              </Text>
            </ListItem>
          ))}
        </UnorderedList>
      </Box>
    )
   )
}