import React, { Component } from 'react';
import PlayButton from '../Components/PlayButton';
import LeaderBoard from '../Components/LeaderBoard';
// import PropTypes from 'prop-types';

class PlayAgain extends Component {
  state = {}

  navigateToPlay = () => {
    const { navigation } = this.props;
    navigation.navigate('InitialiseAR');
  }

  render() {
    return (
      <>
        <LeaderBoard getParam={this.props.navigation.getParam} />
        <PlayButton buttonText="Play Again" navigateToPlay={this.navigateToPlay} />
      </>
    );
  }
}

PlayAgain.propTypes = {

};

export default PlayAgain;
