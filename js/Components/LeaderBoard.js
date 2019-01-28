import React, { Component, Fragment } from 'react';
import { Text, View, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
// import PropTypes from 'prop-types';
import * as api from '../api';
import { Col, Row, Grid } from "react-native-easy-grid";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#DCDCDC',
  },

  title: {
    fontSize: 40,
    color: 'red',
  },

  textPlayer: {
    fontSize: 20,
    color: 'blue',
    textAlign: 'right',
  },

  textScore: {
    fontSize: 20,
    color: 'blue',
    textAlign: 'left',
  },
  row: {
    flexDirection: 'row',
  }

})



class LeaderBoard extends Component {
  state = {
    snapshot: [],
  }



  componentDidMount() {
    api
      .getPlayersScores()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          this.setState(state => ({ snapshot: [...state.snapshot, doc] }));
        });
      });
  }

  render() {
    const score = this.props.getParam('score', '0');
    const { snapshot } = this.state;
    return (
      <>
        <View style={styles.container}>
          <Text>Well done, you scored: {score}</Text>
          <Text style={styles.title}>Leaderboard</Text>
          {snapshot.map(doc =>
            <Grid key={doc.id} style={styles.row}>
              <Col style={styles.textPlayer}>
                <Text> {`${doc.data().playerName}: `} </Text>
              </Col>
              <Col style={styles.textScore}>
                <Text>
                  {`${doc.data().score}`}
                </Text>
              </Col>
            </Grid>
          )}
        </View>
      </>
    );
  }
}

LeaderBoard.propTypes = {

};

export default LeaderBoard;
