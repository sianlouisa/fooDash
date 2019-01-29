/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import {
  View, StyleSheet, Text, TouchableOpacity
} from 'react-native';

const Instructions = (props) => {
  const { navigation } = props;
  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>How to Play:</Text>
      <View style={styles.container}>
        <Text style={styles.text}>
          Find a flat surface to play on. Point the camera towards it until a grey box appears.
          (Tip: Move the camera around slowly to help the game find a suitable surface.) Tap the
          grey box to select your game space.
        </Text>
        <Text style={styles.text}>Tap the ball in the direction you want to go.</Text>
        <Text style={styles.text}>Collect as many gems as you can and then get to the goal!</Text>
        <Text style={styles.text}>Be sure to avoid falling obstacles and don't fall off!</Text>
      </View>
      <TouchableOpacity
        style={[styles.buttonContainer, styles.button]}
        onPress={() => navigation.navigate('InitialiseAR')}
      >
        <Text style={styles.buttonText}>LET'S GO!</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#111111',
    padding: 10
  },
  text: {
    fontFamily: 'Arial',
    color: '#FFFFFF',
    fontSize: 20,
    textAlign: 'center'
  },
  headerText: {
    fontFamily: 'Arial',
    color: '#FFFFFF',
    fontSize: 50
  },
  buttonContainer: {
    height: 45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    width: 250,
    borderRadius: 30,
    backgroundColor: '#00b5ec'
  },
  buttonText: {
    fontFamily: 'Arial',
    fontSize: 30,
    color: '#000000'
  }
});

export default Instructions;
