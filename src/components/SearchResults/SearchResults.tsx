import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import { Text, HStack, Icon, VStack, Link, Flex } from '@chakra-ui/react';
import { GoPerson, GoRepo } from 'react-icons/go';

import { SearchResultsHandle, SearchResultsProps } from './SearchResults.types';

const iconsMap = {
  user: GoPerson,
  repo: GoRepo,
};

export const SearchResults = forwardRef<
  SearchResultsHandle,
  SearchResultsProps
>(({ searchResults, isLoading, isError, errorMessage }, ref) => {
  const [highlightedResult, setHighlightedResult] = useState<number | null>(
    null
  );
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);

  useImperativeHandle(ref, () => ({
    highlightResult: (direction: 'up' | 'down') => {
      if (!searchResults?.length) {
        return;
      }
      let highlightResult = null;

      if (highlightedResult === null) {
        highlightResult = 0;
      } else if (direction === 'up') {
        highlightResult = Math.max(0, highlightedResult - 1);
      } else {
        highlightResult = Math.min(
          searchResults.length - 1,
          highlightedResult + 1
        );
      }

      setHighlightedResult(highlightResult);

      const resultsEl = resultsRef.current;
      const scrollContainerEl = scrollContainerRef.current;
      const linkEl = resultsEl?.children[highlightResult] as
        | HTMLAnchorElement
        | undefined;

      if (!(resultsEl && linkEl && scrollContainerEl)) {
        return;
      }

      if (linkEl.offsetTop < scrollContainerEl.scrollTop) {
        // link is above frame
        scrollContainerEl.scroll({ top: linkEl.offsetTop });
      }

      if (
        linkEl.offsetTop + linkEl.offsetHeight - scrollContainerEl.scrollTop >
        resultsEl.offsetHeight
      ) {
        // link is below frame
        scrollContainerEl.scroll({
          top:
            linkEl.offsetTop +
            linkEl.offsetHeight -
            resultsEl.offsetHeight +
            20,
        });
      }
    },
    selectResult: () => {
      if (highlightedResult !== null) {
        const linkEl = resultsRef.current?.children[highlightedResult] as
          | HTMLAnchorElement
          | undefined;

        linkEl?.click?.();
      }
    },
  }));

  useEffect(() => {
    setHighlightedResult(null);
    resultsRef.current?.scroll?.({ top: 0 });
  }, [searchResults]);

  if (isError) {
    return (
      <div>
        <div>Request failed.</div>
        {errorMessage && <div>Message: {errorMessage}</div>}
      </div>
    );
  }

  if (isLoading) {
    return <div>loading...</div>;
  }

  return (
    <Flex
      ref={scrollContainerRef}
      overflowY="auto"
      flex="1 1 100%"
      width="full"
      position="relative"
      onMouseLeave={() => setHighlightedResult(null)}
    >
      <VStack ref={resultsRef} spacing={3} width="full" position="relative">
        {searchResults?.map(
          ({ id, name, fullName, githubUrl, type }, index) => (
            <Link
              key={id}
              href={githubUrl}
              isExternal
              width="full"
              backgroundColor={
                index === highlightedResult ? 'blue.100' : undefined
              }
              css={{
                transitionDuration: '0',
                _hover: {
                  backgroundColor: 'blue.100',
                },
                _active: {
                  backgroundColor: 'blue.100',
                },
              }}
              onMouseEnter={() => {
                setHighlightedResult(index);
              }}
            >
              <HStack spacing={[3, 4, 5]} p={1}>
                <Icon as={iconsMap[type]} color="green.500" />
                <VStack alignItems="flex-start" spacing={0}>
                  <Text fontSize="lg">{name}</Text>
                  <Text fontSize="sm" color="gray.500">
                    {fullName}
                  </Text>
                </VStack>
              </HStack>
            </Link>
          )
        )}
      </VStack>
    </Flex>
  );
});
