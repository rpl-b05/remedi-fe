import { useEffect, useState } from 'react';
import { Button, Spinner, Flex, Box, Text, Heading} from '@chakra-ui/react'; 
import { MedicalRecord } from 'src/components/utils/interface';
import { GetRecordsResponse } from './interface';
import { api } from 'src/components/utils/api';
import { RecordCard } from './RecordCard';
import { Layout } from 'src/components/layouts/layout';
import { ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons';

export const DaftarMedicalRecord = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [records, setRecords] = useState<MedicalRecord[]>([]);
  const [sort, setSort] = useState<string>("desc");

  const changeSort = () => {
    if(sort == "desc") {
      setSort("asc")
      return
    }
    setSort("desc")
  }

  const SorterIcon = () => {
  if (sort === "asc") return <ChevronDownIcon w={8} h={8} />;
  if (sort === "desc") return <ChevronUpIcon w={8} h={8}/>;
};

  const SorterButton = () => {
  return (
    <Button
      aria-label="Sort"
      size="s"
      rightIcon={<SorterIcon />}
      onClick={() =>changeSort()}
      paddingX={4}
    > 
    {sort == 'desc' ? 'Terbaru' : 'Terlama'}
    </Button>
  );
};


  useEffect(() => {
    console.log(sort)
    const getRecords = async () => {
      try {
        const res = await api.get(`/record?sort=${sort}`);
        console.log(api.defaults.baseURL)
        const data = res.data as GetRecordsResponse;
        console.log(data)
        setRecords(data.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    getRecords();
  }, [sort]);

  return (
    <Layout>
      <Heading size="xl">Daftar Medical Record</Heading>
      {loading ? (
      <div className="flex justify-center items-center h-[70vh]">
        <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="teal"
            size="xl"
        />
      </div>
      ) : (
        <Flex
          flexDirection="column"
          gap="2"
          alignItems="center"
        >
          <Box w="full" display="flex" justifyContent="flex-end">
            <Flex gap="2" justifyContent="center" alignItems="center">
              <Text size="sm">Sort: </Text>
              <SorterButton />
            </Flex>
          </Box>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">   
            {records.map((record) => (
              <RecordCard
              key={record.id}
              id={record.id}
              dokterEmail={record.dokter.name}
              pasienId={record.pasienId}
              isVerified={record.isVerified}
              description={record.description}
              createdAt={record.createdAt}
              penyakit={record.penyakit}
              resepObat={record.recordObat}
              isPatientCard={true}
              />
            ))}
          </div>
        </Flex>
        )}

    </Layout>
  );
};
