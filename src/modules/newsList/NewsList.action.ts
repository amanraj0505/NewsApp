import AsyncStorage from '@react-native-async-storage/async-storage';
import {NEWS_STORE, REMOVED_SYMBOL} from '../../constants/Constants';
import {getGlobalNewsUsingQuery} from '../../network';
import {NewsApiResponseType, NewsItemType} from './NewsList.types';

export const getNews = async () => {
  try {
    if (await AsyncStorage.getItem(NEWS_STORE)) {
      return await loadFromStorage();
    } else {
      return await loadFreshBatchFromApi();
    }
  } catch (error) {
    console.error(error);
  }
};
export const loadFreshBatchFromApi = async () => {
  await fetchAndStoreNewsResponse('everything');
  const news = await fetchFirstTenResponses();
  return news;
};
export const loadFromStorage = async () => {
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
export const fetchFirstTenResponses = async (): Promise<
  NewsItemType[] | undefined
> => {
  try {
    let wholeResponse = (await fetchResponseLocally()) as NewsItemType[];
    let tenNews: NewsItemType[] = [];
    let fetchedNotShownNewsIndexes: number[] = [];
    if (wholeResponse) {
      wholeResponse.forEach((item: NewsItemType, index: number) => {
        if (!item?.pinned && !item?.deleted && !item?.shown) {
          fetchedNotShownNewsIndexes.push(index);
        }
      });
      fetchedNotShownNewsIndexes.forEach((item: number) => {
        if (tenNews.length < 10) {
          tenNews.push(wholeResponse[item]);
          wholeResponse[item] = {...wholeResponse[item], shown: true};
        }
      });
      console.log(tenNews.length);
      if (tenNews.length < 10) {
        return await loadFreshBatchFromApi();
      } else {
        storeResponseLocally(wholeResponse);
        return tenNews;
      }
    }
  } catch (error) {
    console.error('Error storing News Response');
    return [];
  }
};
export const fetchFiveNewResponses = async (previousNews: NewsItemType[]) => {
  try {
    let wholeResponse = (await fetchResponseLocally()) as NewsItemType[];
    let fiveNews: NewsItemType[] = [];
    let fetchedNotShownNewsIndexes: number[] = [];
    if (wholeResponse) {
      wholeResponse.forEach((item: NewsItemType, index: number) => {
        if (!item?.pinned && !item?.deleted && !item?.shown) {
          fetchedNotShownNewsIndexes.push(index);
        }
      });
      fetchedNotShownNewsIndexes.forEach((item: number) => {
        if (fiveNews.length < 5) {
          fiveNews.push(wholeResponse[item]);
          wholeResponse[item] = {...wholeResponse[item], shown: true};
        }
      });
      console.log(fiveNews.length);
      if (fiveNews.length < 5) {
        return await loadFreshBatchFromApi();
      } else {
        storeResponseLocally(wholeResponse);
        let modifiedArray = previousNews;
        modifiedArray = [...fiveNews, ...modifiedArray];
        modifiedArray.splice(-5);
        return modifiedArray;
      }
    }
  } catch (error) {
    console.error('Error storing News Response');
    return [];
  }
};
