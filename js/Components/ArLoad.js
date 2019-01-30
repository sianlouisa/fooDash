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
        <Text style={styles.text}>When emoji lands, get playing</Text>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: 10
  },
  headerText: {
    fontSize: 20,
    textAlign: 'center'
  },
  text: {
    textAlign: 'center',
    width: '85%'
  },
});

export default ArLoad;
