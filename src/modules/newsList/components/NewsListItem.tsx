import {View, StyleSheet, Image, Text} from 'react-native';
import React from 'react';
import {NewsItemType} from '../NewsList.types';
import moment from 'moment';
import {HEADER_SMALL} from '../../../constants/ColorConstants';
type ListItemType = {
  newsItem: NewsItemType;
};
const NewsListItem: React.FC<ListItemType> = ({newsItem}) => {
  return (
    <View style={styles.itemContainer}>
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
    </View>
  );
};
const styles = StyleSheet.create({
  itemContainer: {
    paddingVertical: 14,
    paddingHorizontal: 20,
  },
  itemTopView: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
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
    color: HEADER_SMALL,
  },
});
export default NewsListItem;
