/* eslint-disable react-native/no-inline-styles */
import {
  GestureResponderEvent,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';
import {WHITE} from '../../../constants/ColorConstants';
type SwipeButtonProps = {
  onDeleteButtonClicked:
    | ((event: GestureResponderEvent) => void)
    | null
    | undefined;
  onPinButtonClicked:
    | ((event: GestureResponderEvent) => void)
    | null
    | undefined;
  pinned: boolean | undefined;
  onUnPinnedButtonClick:
    | ((event: GestureResponderEvent) => void)
    | null
    | undefined;
};
const SwipeButtons: React.FC<SwipeButtonProps> = ({
  onDeleteButtonClicked,
  onPinButtonClicked,
  onUnPinnedButtonClick,
  pinned,
}) => {
  return (
    <View style={styles.buttonContainer}>
      <View style={styles.innerButtonContainer}>
        <Pressable style={styles.buttonStyle} onPress={onDeleteButtonClicked}>
          <Image
            source={require('../../../assets/images/delete.png')}
            style={styles.iconStyle}
            resizeMode={'contain'}
          />
          <Text style={styles.buttonText}>{'Delete'}</Text>
        </Pressable>
        <Pressable
          style={styles.buttonStyle}
          onPress={pinned ? onUnPinnedButtonClick : onPinButtonClicked}>
          <Image
            source={require('../../../assets/images/pin.png')}
            style={[styles.iconStyle, {marginBottom: 4}]}
            resizeMode={'contain'}
          />
          <Text style={styles.buttonText}>{pinned ? 'Unpin' : 'Pin'}</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default SwipeButtons;

const styles = StyleSheet.create({
  buttonContainer: {
    flex: 1,
  },
  innerButtonContainer: {
    flex: 1,
    backgroundColor: '#4BBDFC',
    marginVertical: 18,
    borderTopLeftRadius: 12,
    borderBottomLeftRadius: 12,
  },
  buttonStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconStyle: {
    width: 26,
    height: 26,
  },
  buttonText: {
    fontFamily: 'Satoshi-Variable',
    fontWeight: '400',
    fontSize: 12,
    lineHeight: 16.2,
    color: WHITE,
  },
});
