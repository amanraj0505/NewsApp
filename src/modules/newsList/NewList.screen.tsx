import {FlatList, SafeAreaView, StyleSheet} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import MainHeader from './components/MainHeader';
import NewsListItem from './components/NewsListItem';
import {WHITE} from '../../constants/ColorConstants';
import {fetchAndStoreNewsResponse} from './NewsList.action';
import {NewsItemType} from './NewsList.types';
import LoadingShimmer from './components/LoadingShimmer';

const NewListScreen = () => {
  const [iconLoading, setIconLoading] = useState<boolean>(false);
  const [listLoading, setListLoading] = useState<boolean>(true);
  const [newsList, setNewsList] = useState<NewsItemType[]>([]);

  const onClickReloadIcon = () => {
    setIconLoading(!iconLoading);
  };
  useEffect(() => {
    setListLoading(true);
    const loadNews = async () => {
      const news = await fetchAndStoreNewsResponse('everything');
      if (news) {
        setNewsList(news);
        setListLoading(false);
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
        </>
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
