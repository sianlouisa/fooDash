/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import {
  View, StyleSheet, Text, TouchableOpacity, Image
} from 'react-native';
import tokens from '../res/assets/tokens.jpg';
import obstacles from '../res/assets/obstacles.jpg';

const Instructions = (props) => {
  const { navigation } = props;
  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>How to play FooDash!</Text>

      <Text style={styles.text}>
        Point your camera at a flat surface. Make sure you have plenty of space to move around! The
        camera will create a playing surface. Tap this, wait for the food to land and then tap your
        emoji player to make them move.
      </Text>
      <Image source={obstacles} style={{ width: 300, height: 60 }} />
      <Text style={styles.text}>
        Avoid the healthy food and stay on the suface or you'll lose a life. The more good wholesome
        junk food you eat the more points you get!
      </Text>
      <Image source={tokens} style={{ width: 300, height: 60 }} />
      <Text style={styles.text}>Eat as much as you can until your lives have gone. Enjoy!</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('InitialiseAR')}>
          <Text style={styles.buttonText}>Ready to play?</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('StartScreen')}>
          <Text style={styles.buttonText}>Back to menu</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: 10
  },
  text: {
    textAlign: 'left',
    width: '85%'
  },
  headerText: {
    fontSize: 50,
    textAlign: 'center'
  },
  buttonContainer: {},
  button: {
    height: 45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    width: 175,
    borderRadius: 30,
    backgroundColor: '#00b5ec'
  },
  buttonText: {
    color: '#FFFFFF'
  }
});

export default Instructions;
