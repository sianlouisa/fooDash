import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import {
  ActivityIndicator,
  AsyncStorage,
  StatusBar,
  View,
} from 'react-native';

class AuthLoadingScreen extends Component {
  componentDidMount() {
    this.checkAuth();
  }

  checkAuth = async () => {
    const { navigation: { navigate } } = this.props;
    const currentPlayer = await AsyncStorage.getItem('currentPlayer');
    navigate(currentPlayer ? 'InitialiseAR' : 'Login');
  }

  render() {
    return (
      <View>
        <ActivityIndicator />
        <StatusBar barStyle="default" />
      </View>
    );
  }
}

AuthLoadingScreen.propTypes = {

};

export default AuthLoadingScreen;
