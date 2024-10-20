export type NewsItemType = {
  source: {
    id?: string;
    name?: string;
  };
  author?: string;
  title?: string;
  description?: string;
  url?: string;
  urlToImage?: string;
  publishedAt?: string;
  content?: string;
  pinned?: boolean;
  shown?: boolean;
  deleted?: boolean;
};
export type NewsApiResponseType = {
  status: string;
  totalResults: number;
  articles: NewsItemType[];
};
