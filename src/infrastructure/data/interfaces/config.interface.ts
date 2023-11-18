export interface Config {
  serverPort: string;
  maxResults: number;
  minSearchTerm: number;
  youtube: {
    url: string;
    token: string;
  };
  spotify: {
    url: string;
    tokenUrl: string;
    clientId: string;
    clientSecret: string;
  };
}
