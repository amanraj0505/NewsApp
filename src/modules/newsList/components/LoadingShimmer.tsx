import {StyleSheet, View} from 'react-native';
import React from 'react';
import {createShimmerPlaceholder} from 'react-native-shimmer-placeholder';
import LinearGradient from 'react-native-linear-gradient';
const LoadingShimmer = () => {
  const Shimmer = createShimmerPlaceholder(LinearGradient);
  return (
    <View style={styles.itemContainer}>
      <View style={styles.itemTopView}>
        <View style={styles.startView}>
          <Shimmer style={styles.topViewIcon} />
          <Shimmer style={styles.sourceNameText} />
        </View>
        <Shimmer style={styles.time} />
      </View>
      <View style={styles.secondRow}>
        <View>
          <Shimmer style={styles.newsTitleStyle} />
          <Shimmer style={styles.newsTitleStyle1} />
          <Shimmer style={styles.newsTitleStyle2} />
        </View>
        <Shimmer style={styles.newsImage} />
      </View>
      <View style={styles.thirdRow}>
        <Shimmer style={styles.authorName} />
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
    borderRadius: 5,
  },
  sourceNameText: {
    height: 20,
    width: 70,
    borderRadius: 5,
  },
  time: {
    borderRadius: 5,
    height: 16.2,
    width: 50,
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
    borderRadius: 5,
    width: '100%',
    height: 20,
  },
  newsTitleStyle1: {
    borderRadius: 5,
    width: '80%',
    marginTop: 4,
    height: 20,
  },
  newsTitleStyle2: {
    borderRadius: 5,
    width: '50%',
    marginTop: 4,
    height: 20,
  },
  thirdRow: {
    marginTop: 10,
  },
  authorName: {
    width: '20%',
    borderRadius: 5,
    height: 16.2,
  },
});
export default LoadingShimmer;
