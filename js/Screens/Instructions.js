/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import {
  View, StyleSheet, Text, TouchableOpacity
} from 'react-native';

const Instructions = (props) => {
  const { navigation } = props;
  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>How to play FoodDash!</Text>
      <Text style={styles.text}>
        You'll need a flat surface to play on and space to move around. Once you start, point your
        camera and wait for a grey surface to appear. Clicking this will begin the game play! The
        objective of the game is to collect as many items as possible whilst avoiding the falling
        obstacles. You can navigate your player by tapping it in the direction you want to go. Keep
        an eye on your lives as you'll lose this if you fall off the surface or if a falling
        obstacle hits you! Enjoy!
      </Text>
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
    textAlign: 'center',
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
