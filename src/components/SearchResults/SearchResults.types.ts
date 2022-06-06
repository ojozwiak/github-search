import { UsersAndReposList } from '../../api/Github/Github.types';

export interface SearchResultsHandle {
  highlightResult: (direction: 'up' | 'down') => void;
  selectResult: () => void;
}

export interface SearchResultsProps {
  searchResults?: UsersAndReposList;
  isLoading: boolean;
  isError: boolean;
  errorMessage?: string;
}
