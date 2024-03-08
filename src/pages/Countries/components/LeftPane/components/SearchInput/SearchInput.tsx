import { Search2Icon } from '@chakra-ui/icons';
import {
  Button,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
} from '@chakra-ui/react';
import React from 'react';
import { HiFunnel } from 'react-icons/hi2';

interface SearchInputProps {
  searchInputHandler: (event: React.ChangeEvent<HTMLInputElement>) => void;
  filteringPanelOpenHandler: () => void;
}

export default function SearchInput(
  props: SearchInputProps,
): React.ReactElement {
  const { searchInputHandler, filteringPanelOpenHandler } = props;

  return (
    <InputGroup>
      <InputLeftElement pointerEvents="none">
        <Search2Icon color="gray.500" />
      </InputLeftElement>
      <Input
        name="search"
        placeholder="Search for a country"
        onChange={searchInputHandler}
      />
      <InputRightElement>
        <Button p={0} variant="ghost" onClick={filteringPanelOpenHandler}>
          <HiFunnel />
        </Button>
      </InputRightElement>
    </InputGroup>
  );
}
