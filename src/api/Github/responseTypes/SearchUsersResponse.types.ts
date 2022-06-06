/**
 * Generated from response schema
 */

export interface SearchUsersResponse {
  incomplete_results: boolean;
  items: UserSearchResultItem[];
  total_count: number;
}

/**
 * User Search Result Item
 */
interface UserSearchResultItem {
  avatar_url: string;
  bio?: null | string;
  blog?: null | string;
  company?: null | string;
  created_at?: Date;
  email?: null | string;
  events_url: string;
  followers?: number;
  followers_url: string;
  following?: number;
  following_url: string;
  gists_url: string;
  gravatar_id: null | string;
  hireable?: boolean | null;
  html_url: string;
  id: number;
  location?: null | string;
  login: string;
  name?: string;
  node_id: string;
  organizations_url: string;
  public_gists?: number;
  public_repos?: number;
  received_events_url: string;
  repos_url: string;
  score: number;
  site_admin: boolean;
  starred_url: string;
  subscriptions_url: string;
  suspended_at?: Date | null;
  text_matches?: SearchResultTextMatch[];
  type: string;
  updated_at?: Date;
  url: string;
}

interface SearchResultTextMatch {
  fragment?: string;
  matches?: Match[];
  object_type?: null | string;
  object_url?: string;
  property?: string;
}

interface Match {
  indices?: number[];
  text?: string;
}
