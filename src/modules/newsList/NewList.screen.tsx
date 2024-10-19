import {SafeAreaView, StyleSheet} from 'react-native';
import React, {useState} from 'react';
import MainHeader from './components/MainHeader';

const NewListScreen = () => {
  const [iconLoading, setIconLoading] = useState<boolean>(false);
  const onClickReloadIcon = () => {
    setIconLoading(!iconLoading);
  };
  return (
    <SafeAreaView style={styles.mainContainer}>
      <MainHeader loading={iconLoading} onClickRightIcon={onClickReloadIcon} />
    </SafeAreaView>
  );
};

export default NewListScreen;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
});
