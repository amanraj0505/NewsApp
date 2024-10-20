import {FlatList, SafeAreaView, StyleSheet} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import MainHeader from './components/MainHeader';
import NewsListItem from './components/NewsListItem';
import {WHITE} from '../../constants/ColorConstants';
import {loadFreshBatch} from './NewsList.action';
import {NewsItemType} from './NewsList.types';
import LoadingShimmer from './components/LoadingShimmer';
import ErrorView from './components/ErrorView';

const NewListScreen = () => {
  const [iconLoading, setIconLoading] = useState<boolean>(false);
  const [listLoading, setListLoading] = useState<boolean>(true);
  const [newsList, setNewsList] = useState<NewsItemType[]>([]);
  const [error, setError] = useState<boolean>(false);
  const onClickReloadIcon = () => {
    setIconLoading(!iconLoading);
  };
  useEffect(() => {
    setListLoading(true);
    const loadNews = async () => {
      const news = await loadFreshBatch();
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
  const renderNewsItem = useCallback(
    //@ts-ignore
    ({item}) => {
      return <NewsListItem newsItem={item} />;
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
