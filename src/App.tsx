import { ChakraProvider } from '@chakra-ui/react';
import { QueryClient, QueryClientProvider } from 'react-query';

import { GithubSearch } from './features/GithubSearch';

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider>
        <GithubSearch />
      </ChakraProvider>
    </QueryClientProvider>
  );
}

export default App;
