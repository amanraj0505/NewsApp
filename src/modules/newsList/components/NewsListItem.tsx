import {View, StyleSheet, Image, Text} from 'react-native';
import React from 'react';
import {NewsItemType} from '../NewsList.types';
import moment from 'moment';
import {
  BLACK,
  HEADER_SMALL,
  SUB_TEXT_COLOR,
} from '../../../constants/ColorConstants';
import {ListItem} from '@rneui/themed';
type ListItemType = {
  newsItem: NewsItemType;
};
const NewsListItem: React.FC<ListItemType> = ({newsItem}) => {
  return (
    <ListItem.Swipeable containerStyle={styles.itemContainer}>
      <ListItem.Content>
        <View style={styles.itemTopView}>
          <View style={styles.startView}>
            <Image
              source={require('../../../assets/images/refresh.png')}
              style={styles.topViewIcon}
              resizeMode={'contain'}
            />
            <Text style={styles.sourceNameText}>{newsItem.source?.name}</Text>
          </View>
          <Text style={styles.time}>
            {moment(newsItem.publishedAt).isValid()
              ? `${moment(newsItem.publishedAt).format('hh:mm A')}`
              : ''}
          </Text>
        </View>
        <View style={styles.secondRow}>
          <Text style={styles.newsTitleStyle}>{newsItem.description}</Text>
          <Image source={{uri: newsItem.urlToImage}} style={styles.newsImage} />
        </View>
        <View style={styles.thirdRow}>
          <Text style={styles.authorName}> {newsItem.author}</Text>
        </View>
      </ListItem.Content>
    </ListItem.Swipeable>
  );
};
const styles = StyleSheet.create({
  itemContainer: {
    paddingVertical: 14,
    paddingHorizontal: 20,
  },
  itemTopView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  startView: {
    flexDirection: 'row',
  },
  topViewIcon: {
    height: 20,
    width: 20,
    marginRight: 6,
  },
  sourceNameText: {
    fontFamily: 'Satoshi',
    fontSize: 14,
    fontWeight: '400',
    color: HEADER_SMALL,
  },
  time: {
    fontFamily: 'Satoshi',
    fontSize: 12,
    fontWeight: '400',
    color: BLACK,
  },
  secondRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 14,
  },
  newsImage: {
    width: 77,
    height: 77,
    borderRadius: 13.39,
  },
  newsTitleStyle: {
    flex: 1,
    fontFamily: 'Satoshi',
    fontWeight: '700',
    fontSize: 18,
    lineHeight: 24.3,
    color: BLACK,
  },
  thirdRow: {
    marginTop: 10,
  },
  authorName: {
    fontFamily: 'Satoshi',
    fontWeight: '500',
    fontSize: 12,
    lineHeight: 16.2,
    color: SUB_TEXT_COLOR,
  },
});
export default NewsListItem;
