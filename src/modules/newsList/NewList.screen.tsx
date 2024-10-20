import {FlatList, SafeAreaView, StyleSheet} from 'react-native';
import React, {useCallback, useState} from 'react';
import MainHeader from './components/MainHeader';
import NewsListItem from './components/NewsListItem';
import {WHITE} from '../../constants/ColorConstants';

const NewListScreen = () => {
  const [iconLoading, setIconLoading] = useState<boolean>(false);
  const onClickReloadIcon = () => {
    setIconLoading(!iconLoading);
  };
  const data = [
    {
      source: {
        id: 'wired',
        name: 'Wired',
      },
      author: 'Louryn Strampe',
      title: "The 11 Best Meal Kit Delivery Services We've Tested (2024)",
      description:
        "From Blue Apron to Dinnerly, I've spent years cooking with boxed ingredients shipped to my door.",
      url: 'https://www.wired.com/gallery/best-meal-kit-services/',
      urlToImage:
        'https://media.wired.com/photos/65f4d46d86b734f02b246089/191:100/w_2580,c_limit/hello-fresh-collage.jpg',
      publishedAt: '2024-09-21T15:04:00Z',
      content:
        "Meal kit delivery services are supposed to make your life easier. And they do, once you pick one. But with the field of services expanding rapidly in recent years it's easy to feel overwhelmed by all… [+3340 chars]",
    },
    {
      source: {
        id: 'wired',
        name: 'Wired',
      },
      author: 'Louryn Strampe',
      title: "The 11 Best Meal Kit Delivery Services We've Tested (2024)",
      description:
        "From Blue Apron to Dinnerly, I've spent years cooking with boxed ingredients shipped to my door.",
      url: 'https://www.wired.com/gallery/best-meal-kit-services/',
      urlToImage:
        'https://media.wired.com/photos/65f4d46d86b734f02b246089/191:100/w_2580,c_limit/hello-fresh-collage.jpg',
      publishedAt: '2024-09-21T15:04:00Z',
      content:
        "Meal kit delivery services are supposed to make your life easier. And they do, once you pick one. But with the field of services expanding rapidly in recent years it's easy to feel overwhelmed by all… [+3340 chars]",
    },
  ];
  const renderNewsItem = useCallback(
    //@ts-ignore
    ({item}) => {
      return <NewsListItem newsItem={item} />;
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [data],
  );
  return (
    <SafeAreaView style={styles.mainContainer}>
      <MainHeader loading={iconLoading} onClickRightIcon={onClickReloadIcon} />
      <FlatList data={data} renderItem={renderNewsItem} />
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
