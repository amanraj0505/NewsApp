import AsyncStorage from '@react-native-async-storage/async-storage';
import {NEWS_STORE, REMOVED_SYMBOL} from '../../constants/Constants';
import {getGlobalNewsUsingQuery} from '../../network';
import {NewsApiResponseType, NewsItemType} from './NewsList.types';

export const loadFreshBatch = async () => {
  await fetchAndStoreNewsResponse('everything');
  const news = await fetchFirstTenResponses();
  return news;
};

export const fetchAndStoreNewsResponse = async (query: string) => {
  try {
    const response = await getGlobalNewsUsingQuery(query);
    storeResponseLocally(
      filterInvalidResponses(
        response?.data || {status: 500, totalResults: 0, articles: []},
      ),
    );
  } catch (error) {
    console.error(error);
  }
};

const filterInvalidResponses = (response: NewsApiResponseType) => {
  if (response?.articles) {
    const validArticle = response?.articles
      .filter((item: NewsItemType) => {
        return !(
          item?.title === REMOVED_SYMBOL ||
          item?.description === REMOVED_SYMBOL ||
          item?.content === REMOVED_SYMBOL
        );
      })
      .map((item: NewsItemType) => {
        return {
          ...item,
          shown: false,
          pinned: false,
          deleted: false,
        };
      });
    return validArticle;
  } else {
    return [];
  }
};

const storeResponseLocally = (response: any) => {
  try {
    AsyncStorage.setItem(NEWS_STORE, JSON.stringify(response));
  } catch (error) {
    console.error('Error storing News Response');
  }
};

export const fetchResponseLocally = async () => {
  try {
    const storedResponseString = await AsyncStorage.getItem(NEWS_STORE);
    if (storedResponseString) {
      const storedResponse = JSON.parse(storedResponseString || '{}');
      return storedResponse;
    }
  } catch (error) {
    console.error('Error storing News Response');
  }
};
export const fetchFirstTenResponses = async () => {
  try {
    const wholeResponse = (await fetchResponseLocally()) as NewsItemType[];
    if (wholeResponse) {
      const fetchedNews = wholeResponse
        .filter((item: NewsItemType) => {
          return !item?.pinned && !item?.deleted && !item?.shown;
        })
        .slice(0, 10)
        .map((item: NewsItemType) => {
          return {...item, shown: true};
        });
      return fetchedNews;
    }
  } catch (error) {
    console.error('Error storing News Response');
    return [];
  }
};
export const fetchFiveNewResponses = async (
  previousResponse: NewsItemType[],
) => {
  try {
    if (previousResponse) {
      const fetchedNews = previousResponse
        .filter((item: NewsItemType) => {
          return !item?.pinned && !item?.deleted && !item?.shown;
        })
        .slice(0, 5)
        .map((item: NewsItemType) => {
          return {...item, shown: true};
        });
      return fetchedNews;
    }
  } catch (error) {
    console.error('Error storing News Response');
    return [];
  }
};
