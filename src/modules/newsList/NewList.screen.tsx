import {FlatList, SafeAreaView, StyleSheet} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import MainHeader from './components/MainHeader';
import NewsListItem from './components/NewsListItem';
import {WHITE} from '../../constants/ColorConstants';
import {fetchFiveNewResponses, getNews} from './NewsList.action';
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
    setTimeout(() => {
      setNewsList(newList);
      setIconLoading(false);
    }, 1000);
  };
  useEffect(() => {
    setListLoading(true);
    const loadNews = async () => {
      const news = await getNews();
      if (news && news?.length > 0) {
        setNewsList(news);
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
          onRightSwipePinClicked={() => {}}
        />
      );
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [newsList],
  );
  return (
    <SafeAreaView style={styles.mainContainer}>
      <MainHeader loading={iconLoading} onClickRightIcon={onClickReloadIcon} />
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
