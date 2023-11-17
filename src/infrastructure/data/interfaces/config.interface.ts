export interface Config {
  serverPort: string;
  maxResults: number;
  minSearchTerm: number;
  youtube: {
    token: string;
  };
  spotify: {
    token: string;
  };
}
