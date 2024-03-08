import { Flex } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { CountryType } from '../../types/Country';
import LeftPane from './components/LeftPane/LeftPane';
import RightPane from './components/RightPane/RightPane';
import { useQuery } from '../../hooks/useQuery';
import { formatData } from './utils/formatData';

export default function Countries(): React.ReactElement {
  const [data, setData] = useState<CountryType[]>([]);

  const query = useQuery();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://restcountries.com/v3.1/all');
        const rawData = await response.json();

        // Veriyi düzenleyen fonksiyonu kullanarak veriyi formatla
        const formattedData = formatData(rawData);

        // Düzenlenmiş veriyi state'e set et
        setData(formattedData);
      } catch (error) {
        console.error('Veri alınamadı', error);
      }
    };

    fetchData();
  }, []);

  return (
    <React.Fragment>
      <Flex>
        <LeftPane data={data} />
        <RightPane data={data} code={query.get('code')} />
      </Flex>
    </React.Fragment>
  );
}
