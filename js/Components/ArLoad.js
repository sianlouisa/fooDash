import React, { Component } from 'react';
import {
  View, StyleSheet, Text, AsyncStorage
} from 'react-native';

class ArLoad extends Component {
  state = { username: null }

  componentDidMount() {
    this.getUsername();
  }

  getUsername = async () => {
    const currentPlayer = await AsyncStorage.getItem('currentPlayer');
    const { username } = JSON.parse(currentPlayer);
    this.setState({ username });
  }

  render() {
    const { username } = this.state;
    return (
      <View style={styles.container}>
        <Text style={styles.headerText}>{`Hey, ${username}!`}</Text>
        <Text style={styles.text}>Get ready...the food is landing</Text>
      </View>
    );
  }
}

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

export default ArLoad;
