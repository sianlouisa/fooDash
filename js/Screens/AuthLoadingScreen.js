import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import {
  ActivityIndicator, AsyncStorage, StatusBar, View
} from 'react-native';

class AuthLoadingScreen extends Component {
  componentDidMount() {
    this.checkAuth();
  }

  checkAuth = async () => {
    const {
      navigation: { navigate }
    } = this.props;
    const currentPlayer = await AsyncStorage.getItem('currentPlayer');
    navigate(currentPlayer ? 'StartScreen' : 'Login');
  };

  render() {
    return (
      <View>
        <ActivityIndicator size="large" color="#00b5ec" style={{ marginTop: 250 }} />
        <StatusBar barStyle="default" />
      </View>
    );
  }
}

AuthLoadingScreen.propTypes = {};

export default AuthLoadingScreen;
