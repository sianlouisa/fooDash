import React, { Component, Fragment } from 'react';
import { Text } from 'react-native';
// import PropTypes from 'prop-types';
import * as api from '../api';

class LeadershipBoard extends Component {
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
    const { snapshot } = this.state;
    return (
      <Fragment>
        {snapshot.map(doc => <Text key={doc.id}>{`${doc.data().playerName}: ${doc.data().score}`}</Text>)}
      </Fragment>
    );
  }
}

LeadershipBoard.propTypes = {

};

export default LeadershipBoard;
