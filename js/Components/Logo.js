import React from 'react';
import { Image, View, StyleSheet } from 'react-native';
import logo from '../res/assets/foodDashLogo1.png';

const Logo = () => (
  <View style={styles.container}>
    <Image style={styles.logo} source={logo} />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  logo: {
    width: 90,
    height: 90,
  }

});

export default Logo;
