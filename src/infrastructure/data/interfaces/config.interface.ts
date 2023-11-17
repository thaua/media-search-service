export interface Config {
  serverPort: string;
  maxResults: number;
  minSearchTerm: number;
  youtube: {
    url: string;
    token: string;
  };
  spotify: {
    token: string;
  };
}
