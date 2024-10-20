import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {HEADER_SMALL} from '../../../constants/ColorConstants';

const PinnedNewsHeading = () => {
  return (
    <View style={styles.container}>
      <Image
        source={require('../../../assets/images/pin.png')}
        style={[styles.iconStyle]}
        resizeMode={'contain'}
      />
      <Text style={styles.textStyle}>{'Pinned on top'}</Text>
    </View>
  );
};

export default PinnedNewsHeading;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginBottom: 11,
  },
  iconStyle: {
    height: 10,
    width: 10,
    marginRight: 5,
    tintColor: HEADER_SMALL,
    marginTop: 3,
  },
  textStyle: {
    fontFamily: 'Satoshi-Variable',
    fontWeight: '400',
    fontSize: 12,
    lineHeight: 16.2,
    color: HEADER_SMALL,
  },
});
