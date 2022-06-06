export type { SearchRepositoriesResponse } from './responseTypes/SearchRepositioriesResponse.types';
export type { SearchUsersResponse } from './responseTypes/SearchUsersResponse.types';

export interface UsersAndReposListItem {
  id: number;
  type: 'user' | 'repo';
  name: string;
  fullName?: string;
  githubUrl: string;
}

export type UsersAndReposList = UsersAndReposListItem[];
