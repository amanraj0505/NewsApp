import {View, StyleSheet, Image, Text} from 'react-native';
import React, {useCallback} from 'react';
import {NewsItemType} from '../NewsList.types';
import moment from 'moment';
import {
  BLACK,
  HEADER_SMALL,
  SUB_TEXT_COLOR,
} from '../../../constants/ColorConstants';
import {ListItem} from '@rneui/themed';
import SwipeButtons from './SwipeButtons';
import PinnedNewsHeading from './PinnedNewsHeading';
type ListItemType = {
  newsItem: NewsItemType;
  onRightSwipeDeleteClicked: Function;
  onRightSwipePinClicked: Function;
  onRightSwipeUnpinClicked: Function;
};
const NewsListItem: React.FC<ListItemType> = ({
  newsItem,
  onRightSwipeDeleteClicked,
  onRightSwipePinClicked,
  onRightSwipeUnpinClicked,
}) => {
  const rightContent = useCallback(
    (reset: any, pinned: boolean | undefined) => {
      return (
        <SwipeButtons
          onDeleteButtonClicked={() => {
            reset();
            onRightSwipeDeleteClicked();
          }}
          onPinButtonClicked={() => {
            reset();
            onRightSwipePinClicked();
          }}
          pinned={pinned}
          onUnPinnedButtonClick={() => {
            reset();
            onRightSwipeUnpinClicked();
          }}
        />
      );
    },
    [
      onRightSwipeDeleteClicked,
      onRightSwipePinClicked,
      onRightSwipeUnpinClicked,
    ],
  );
  return (
    <ListItem.Swipeable
      containerStyle={styles.itemContainer}
      rightContent={reset => rightContent(reset, newsItem?.pinned)}
      rightWidth={95}>
      <ListItem.Content>
        {newsItem?.pinned && <PinnedNewsHeading />}
        <View style={styles.itemTopView}>
          <View style={styles.startView}>
            <Image
              source={require('../../../assets/images//megaphone.png')}
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
          <Text style={styles.newsTitleStyle}>{newsItem.title}</Text>
          <Image
            source={
              newsItem?.urlToImage
                ? {uri: newsItem.urlToImage}
                : require('../../../assets/images/newspaper.png')
            }
            style={styles.newsImage}
            resizeMode={newsItem.urlToImage ? 'cover' : 'contain'}
          />
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
    fontFamily: 'Satoshi-Variable',
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 18.9,
    color: HEADER_SMALL,
  },
  time: {
    fontFamily: 'Satoshi-Variable',
    fontSize: 12,
    fontWeight: '400',
    lineHeight: 16.2,
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
    fontFamily: 'Satoshi-Variable',
    fontWeight: '700',
    fontSize: 18,
    lineHeight: 24.3,
    color: BLACK,
  },
  thirdRow: {
    marginTop: 10,
  },
  authorName: {
    fontFamily: 'Satoshi-Variable',
    fontWeight: '500',
    fontSize: 12,
    lineHeight: 16.2,
    color: SUB_TEXT_COLOR,
  },
});
export default NewsListItem;
