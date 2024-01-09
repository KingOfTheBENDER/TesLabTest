import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {useHeaderHeight} from '@react-navigation/elements';
import {FULL_HEIGHT} from '../../utils';

export const ListEmptyComponent: React.FC = () => {
  const headerHeight = useHeaderHeight();
  return (
    <View style={[styles.container, {minHeight: FULL_HEIGHT - headerHeight}]}>
      <Text>Список пуст...</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
