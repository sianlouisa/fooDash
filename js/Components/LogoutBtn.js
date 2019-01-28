import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import {
  TouchableOpacity, Text, AsyncStorage
} from 'react-native';

class LogoutBtn extends Component {
  logout = async () => {
    const { navigation: { navigate } } = this.props;
    await AsyncStorage.clear();
    navigate('AuthLoadingScreen');
  }

  render() {
    return (
      <TouchableOpacity
        onPress={this.logout}
      >
        <Text>Logout lkjhgfnbxdgnuyiop;/l.,mnbvfxdhrtyukilm,nbcvxfdhtyuklm,nbvcdhtuyiokljmnbvdfghtyuiojklmnbvcfxdgty</Text>
      </TouchableOpacity>
    );
  }
}

LogoutBtn.propTypes = {

};

export default LogoutBtn;
