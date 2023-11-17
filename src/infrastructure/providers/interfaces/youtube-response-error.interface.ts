export interface YoutubeResponseError {
  error: {
    code: number;
    message: string;
    errors: any;
    status: string;
    details: any;
  };
}
