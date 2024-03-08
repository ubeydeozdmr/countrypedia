import { Card, Heading, ListItem, UnorderedList } from '@chakra-ui/react';
import React from 'react';

interface CountryInformationCardProps {
  title: string;
  data: string[] | number[] | undefined;
  postfix?: string;
}

export default function CountryInformationCard(
  props: CountryInformationCardProps,
): React.ReactElement {
  const { title, data, postfix } = props;

  if (!data || data.length === 0 || !data[0]) {
    return <></>;
  }

  return (
    <Card px={8} py={4} mb={4} w="100%">
      <Heading as="h2" size="md">
        {title}
      </Heading>
      <UnorderedList>
        {data.map((item) => (
          <ListItem key={item}>
            {item}
            {postfix && ` ${postfix}`}
          </ListItem>
        ))}
      </UnorderedList>
    </Card>
  );
}
