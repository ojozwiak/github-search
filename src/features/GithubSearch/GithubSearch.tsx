import { FC, useRef } from 'react';
import { Container, Flex, Heading, VStack } from '@chakra-ui/react';

import { SearchInput } from '../../components/SearchInput';
import { SearchResults } from '../../components/SearchResults';
import { useGetGithubUsersAndRepos } from '../../api/Github';
import { SearchResultsHandle } from '../../components/SearchResults/SearchResults.types';

export const GithubSearch: FC = function GithubSearch() {
  const {
    mutate: search,
    data: searchResults,
    isLoading: isSearchLoading,
    isError: isSearchError,
    error: searchError,
  } = useGetGithubUsersAndRepos();

  const searchResultsRef = useRef<SearchResultsHandle>(null);

  const handleInputChange = (data: any) => {
    if (data.length >= 3) {
      search(data);
    }
  };

  return (
    <Container maxW="xl" p={0}>
      <Flex h="100vh" py={[5, 10, 20]} px="3" w="full" direction="column">
        <VStack spacing={{ base: 5, lg: 10 }} h="full" flexShrink="1">
          <Heading w="full" textAlign="center" flex="0 0 auto">
            Github Search
          </Heading>
          <VStack
            spacing={{ base: 3, lg: 5 }}
            w="full"
            height="full"
            overflow="hidden"
          >
            <SearchInput
              onChange={handleInputChange}
              onArrowDown={(direction) => {
                searchResultsRef?.current?.highlightResult(direction);
              }}
              onEnterDown={() => {
                searchResultsRef?.current?.selectResult();
              }}
            />
            <SearchResults
              ref={searchResultsRef}
              isLoading={isSearchLoading}
              isError={isSearchError}
              errorMessage={(searchError?.response?.data as any)?.message}
              searchResults={searchResults}
            />
          </VStack>
        </VStack>
      </Flex>
    </Container>
  );
};
