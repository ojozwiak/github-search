import axios, { AxiosError } from 'axios';
import qs from 'qs';
import { useMutation, UseMutationOptions } from 'react-query';

import {
  SearchRepositoriesResponse,
  SearchUsersResponse,
  UsersAndReposList,
  UsersAndReposListItem,
} from './Github.types';

const GITHUB_URL = 'https://api.github.com';

const getGithubUsers = async (searchPhrase: string) => {
  const { data } = await axios.get<SearchUsersResponse>(
    `${GITHUB_URL}/search/users?${qs.stringify({ q: searchPhrase, count: 50 })}`
  );

  return data;
};

const getGithubRepos = async (searchPhrase: string) => {
  const { data } = await axios.get<SearchRepositoriesResponse>(
    `${GITHUB_URL}/search/repositories?${qs.stringify({
      q: searchPhrase,
      count: 50,
    })}`
  );

  return data;
};

const getGithubUsersAndRepos = async (
  searchPhrase: string
): Promise<UsersAndReposList> => {
  const [usersData, reposData] = await Promise.all([
    getGithubUsers(searchPhrase),
    getGithubRepos(searchPhrase),
  ]);

  return [
    ...usersData.items.map(
      (user): UsersAndReposListItem => ({
        type: 'user',
        id: user.id,
        name: user.login,
        fullName: user.name,
        githubUrl: user.html_url,
      })
    ),
    ...reposData.items.map(
      (repo): UsersAndReposListItem => ({
        type: 'repo',
        id: repo.id,
        name: repo.name,
        fullName: repo.full_name,
        githubUrl: repo.html_url,
      })
    ),
  ].sort(({ name: a }, { name: b }) => a.localeCompare(b));
};

export const useGetGithubUsersAndRepos = (
  options?: UseMutationOptions<UsersAndReposList, AxiosError, string>
) => useMutation('usersAndRepos', getGithubUsersAndRepos, options);
