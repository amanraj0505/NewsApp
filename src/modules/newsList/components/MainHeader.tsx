import {
  Animated,
  Easing,
  GestureResponderEvent,
  Image,
  Pressable,
  StyleSheet,
  View,
} from 'react-native';
import React, {useEffect} from 'react';
import {BORDER_GREY} from '../../../constants/ColorConstants';
type MainHeaderProps = {
  loading: boolean;
  onClickRightIcon: ((event: GestureResponderEvent) => void) | null | undefined;
};
export const MainHeader: React.FC<MainHeaderProps> = ({
  loading,
  onClickRightIcon,
}) => {
  const spinValue = new Animated.Value(1);
  const animation = Animated.loop(
    Animated.timing(spinValue, {
      toValue: 0,
      duration: 1000,
      easing: Easing.linear,
      useNativeDriver: true,
    }),
  );

  useEffect(() => {
    if (loading) {
      animation.start();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading]);
  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });
  return (
    <View style={styles.headerContainer}>
      <Image
        source={require('../../../assets/images/headline_hub_logo.png')}
        resizeMode={'contain'}
        style={styles.mainImage}
      />
      <Pressable
        style={({pressed}) => [
          styles.buttonContainer,
          {backgroundColor: pressed ? BORDER_GREY : undefined},
        ]}
        onPress={onClickRightIcon}>
        <Animated.Image
          source={require('../../../assets/images/refresh.png')}
          resizeMode={'contain'}
          style={[styles.endImage, {transform: [{rotate: spin}]}]}
        />
      </Pressable>
    </View>
  );
};

export default MainHeader;
const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
    borderBottomWidth: StyleSheet.hairlineWidth * 4,
    borderBottomColor: BORDER_GREY,
  },
  mainImage: {
    height: 32,
    width: 120,
  },
  endImage: {
    height: 25,
    width: 25,
  },
  buttonContainer: {
    padding: 8,
    borderRadius: 100,
  },
});
