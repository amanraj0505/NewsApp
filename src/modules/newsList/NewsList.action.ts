import {REMOVED_SYMBOL} from '../../constants/Constants';
import {getGlobalNewsUsingQuery} from '../../network';
import {NewsApiResponseType, NewsItemType} from './NewsList.types';

export const fetchAndStoreNewsResponse = async (query: string) => {
  try {
    const response = await getGlobalNewsUsingQuery(query);
    return filterInvalidResponses(response?.data);
  } catch (error) {
    console.error(error);
  }
};
const filterInvalidResponses = (response: NewsApiResponseType) => {
  const validArticle = response?.articles.filter((item: NewsItemType) => {
    return !(
      item?.title === REMOVED_SYMBOL ||
      item?.description === REMOVED_SYMBOL ||
      item?.content === REMOVED_SYMBOL
    );
  });
  return validArticle;
};
