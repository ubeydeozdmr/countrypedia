import { Card, FormControl, FormLabel, Switch } from '@chakra-ui/react';
import React from 'react';

interface FilteringPanelProps {
  showOnlyFavourites: boolean;
  showOnlyFavouritesHandler: (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => void;
}

export default function FilteringPanel(
  props: FilteringPanelProps,
): React.ReactElement {
  const { showOnlyFavourites, showOnlyFavouritesHandler } = props;

  return (
    <Card mt={4} p={4} boxShadow="base" borderRadius="md">
      <FormControl display="flex" alignItems="center">
        <FormLabel htmlFor="show-all" mb="0">
          Show only favourite countries
        </FormLabel>
        <Switch
          id="show-all"
          colorScheme="blue"
          isChecked={showOnlyFavourites}
          onChange={showOnlyFavouritesHandler}
        />
      </FormControl>
    </Card>
  );
}
