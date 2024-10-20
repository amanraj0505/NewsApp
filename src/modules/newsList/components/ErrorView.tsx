import {StyleSheet} from 'react-native';
import React from 'react';
import LottieView from 'lottie-react-native';

const ErrorView = () => {
  return (
    <LottieView
      source={require('../../../assets/animations/error.json')}
      style={styles.animationStyle}
      autoPlay
      loop
    />
  );
};
const styles = StyleSheet.create({
  animationStyle: {
    flex: 1,
  },
});
export default ErrorView;
