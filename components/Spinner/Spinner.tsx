import React from 'react';
import {View, ActivityIndicator, StyleSheet} from 'react-native';

export const Spinner: React.FC = () => (
  <View style={styles.container}>
    <ActivityIndicator size="large" />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
});
