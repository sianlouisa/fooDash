import React from 'react';
import {
  View, StyleSheet, Text
} from 'react-native';

const PickPlane = () => (
  <View style={styles.container}>
    <Text style={styles.text}>Point the camera at a flat surface then click!</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    width: '100%',
    padding: 10,
    position: 'absolute',
    top: 200,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  headerText: {
    fontSize: 50,
    textAlign: 'center',
    color: 'white'
  },
  text: {
    fontSize: 30,
    textAlign: 'center',
    width: '85%',
    color: 'white'
  },
});

export default PickPlane;
