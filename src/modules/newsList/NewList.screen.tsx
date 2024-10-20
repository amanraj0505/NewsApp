import {FlatList, SafeAreaView, StatusBar, StyleSheet} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import MainHeader from './components/MainHeader';
import NewsListItem from './components/NewsListItem';
import {WHITE} from '../../constants/ColorConstants';
import {
  addToPinnedNews,
  fetchFiveNewResponses,
  getNews,
  getPinnedNews,
  removeFromPinnedNews,
} from './NewsList.action';
import {NewsItemType} from './NewsList.types';
import LoadingShimmer from './components/LoadingShimmer';
import ErrorView from './components/ErrorView';

const NewListScreen = () => {
  const [iconLoading, setIconLoading] = useState<boolean>(false);
  const [listLoading, setListLoading] = useState<boolean>(true);
  const [newsList, setNewsList] = useState<NewsItemType[]>([]);
  const [error, setError] = useState<boolean>(false);
  const onClickReloadIcon = async () => {
    setIconLoading(true);
    const newList = (await fetchFiveNewResponses(newsList)) || [];
    const pinnedList = (await getPinnedNews()) || [];
    setTimeout(() => {
      setNewsList([...pinnedList, ...newList]);
      setIconLoading(false);
    }, 1000);
  };
  useEffect(() => {
    setListLoading(true);
    const loadNews = async () => {
      const news = await getNews();
      if (news && news?.length > 0) {
        const pinnedList = (await getPinnedNews()) || [];
        setNewsList([...pinnedList, ...news]);
        setListLoading(false);
      } else {
        setListLoading(false);
        setError(true);
      }
    };

    loadNews();
  }, []);
  const deleteItem = (index: number) => {
    const tempList = newsList;
    tempList.splice(index, 1);
    setNewsList([...tempList]);
  };
  const renderNewsItem = useCallback(
    ({item, index}: {item: NewsItemType; index: number}) => {
      return (
        <NewsListItem
          newsItem={item}
          onRightSwipeDeleteClicked={() => {
            deleteItem(index);
          }}
          onRightSwipePinClicked={async () => {
            await addToPinnedNews(item);
            deleteItem(index);
            setNewsList(previousList => [
              {...item, pinned: true},
              ...previousList,
            ]);
          }}
          onRightSwipeUnpinClicked={async () => {
            await removeFromPinnedNews(index);
            const pinnedList = (await getPinnedNews()) || [];
            const news = (await getNews()) || [];
            setNewsList([...pinnedList, ...news]);
          }}
        />
      );
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [newsList],
  );
  return (
    <SafeAreaView style={styles.mainContainer}>
      <MainHeader loading={iconLoading} onClickRightIcon={onClickReloadIcon} />
      <StatusBar backgroundColor={WHITE} barStyle={'dark-content'} />
      {listLoading ? (
        <>
          <LoadingShimmer />
          <LoadingShimmer />
          <LoadingShimmer />
          <LoadingShimmer />
          <LoadingShimmer />
        </>
      ) : error ? (
        <ErrorView />
      ) : (
        <FlatList
          data={newsList}
          renderItem={renderNewsItem}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item: NewsItemType, index: number) => String(index)}
        />
      )}
    </SafeAreaView>
  );
};

export default NewListScreen;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: WHITE,
  },
});
