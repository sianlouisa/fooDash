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
    err: null,
  }

  handleAuth = () => {
    const { email, password } = this.state;
    const { navigation } = this.props;
    if (email && password) {
      api
        .signin(email, password)
        .then(() => navigation.navigate('StartScreen'))
        .catch(() => {
          this.setState({ err: true });
        });
    }
  }

  render() {
    const { email, password, err } = this.state;
    const { navigation } = this.props;
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
        <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
          <Text>Sign up</Text>
        </TouchableOpacity>
        {err && <Text>Error</Text>}
      </View>
    );
  }
}

Login.propTypes = {

};

export default Login;
