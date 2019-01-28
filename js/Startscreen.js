import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { Button } from 'react-native';

class Startscreen extends Component {
  static navigationOptions = {
    title: 'Welcome',
  };

  render() {
    const { navigation: { navigate } } = this.props;
    return (
      <Button
        title="Play"
        onPress={() => navigate('AR')}
      />
    );
  }
}

Startscreen.propTypes = {

};

export default Startscreen;
