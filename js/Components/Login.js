import React, { Component } from 'react';
import {
  View, TextInput, TouchableOpacity, Text
} from 'react-native';
import * as api from '../api';
// import PropTypes from 'prop-types';

class Login extends Component {
  state = {
    email: '',
    password: '',
  }

  handleAuth = () => {
    const { email, password } = this.state;
    if (email && password) {
      api
        .signin(email, password);
    }
  }

  render() {
    const { email, password } = this.state;
    return (
      <View>
        <TextInput
          style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
          onChangeText={text => this.setState({ email: text })}
          value={email}
          placeholder="Enter Email"
        />
        <TextInput
          style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
          onChangeText={text => this.setState({ password: text })}
          value={password}
          secureTextEntry
          placeholder="Enter Password"
        />
        <TouchableOpacity onPress={this.handleAuth}>
          <Text>Login</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

Login.propTypes = {

};

export default Login;
