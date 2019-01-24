import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import {
  View, TextInput, TouchableOpacity, Text, StyleSheet
} from 'react-native';
import * as api from '../api';

class Signup extends Component {
  state = {
    email: '',
    confirmEmail: '',
    password: '',
    confirmPassword: '',
    username: '',
    err: null,
  }


  handleAuth = () => {
    const { email, password, username } = this.state;
    if (this.validateEmail && this.validatePassword && username) {
      const { navigation } = this.props;
      api
        .signup(email, password)
        .then(uid => api.addUser(uid, username))
        .then(uid => navigation.navigate('InitialiseAR', { uid }))
        .catch(() => {
          this.setState({
            err: true,
            password: '',
            confirmPassword: ''
          });
        });
    } else {
      this.setState({
        err: true,
        password: '',
        confirmPassword: ''
      });
    }
  }

  validateEmail = () => {
    const { email, confirmEmail } = this.state;
    if (email && email === confirmEmail) {
      return true;
    }
    return false;
  }

  validatePassword = () => {
    const { password, confirmPassword } = this.state;
    if (password && password === confirmPassword) {
      return true;
    }
    return false;
  }

  render() {
    const {
      email, confirmEmail, password, confirmPassword, username, err
    } = this.state;
    const { navigation } = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.signupInputs}>
          <TextInput
            style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
            onChangeText={text => this.setState({ username: text })}
            value={username}
            placeholder="Enter Username"
            textContentType="username"
          />
        </View>
        <View style={styles.signupInputs}>
          <TextInput
            style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
            onChangeText={text => this.setState({ email: text })}
            value={email}
            placeholder="Enter Email"
            keyboardType="email-address"
            textContentType="emailAddress"
          />
        </View>
        <View style={styles.signupInputs}>
          <TextInput
            style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
            onChangeText={text => this.setState({ confirmEmail: text })}
            value={confirmEmail}
            placeholder="Re-enter Email"
            keyboardType="email-address"
            textContentType="emailAddress"
          />
        </View>
        <View style={styles.signupInputs}>
          <TextInput
            style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
            onChangeText={text => this.setState({ password: text })}
            value={password}
            secureTextEntry
            placeholder="Enter Password"
            textContentType="password"
          />
        </View>
        <View style={styles.signupInputs}>
          <TextInput
            style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
            onChangeText={text => this.setState({ confirmPassword: text })}
            value={confirmPassword}
            secureTextEntry
            placeholder="Re-enter Password"
            textContentType="password"
          />
        </View>
        <TouchableOpacity onPress={this.handleAuth}>
          <Text>Hello Me Again</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text>Back To Login</Text>
        </TouchableOpacity>
        {err && <Text>Ooops</Text>}
      </View>
    );
  }
}

Signup.propTypes = {

};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'blue',
    borderColor: 'white',
    borderWidth: 50,
    // alignItems: 'center',
    // justifyContent: 'center',
    // flexGrow: 1
  },
  signupInputs: {
    // alignItems: 'center',
    justifyContent: 'center',
    flexGrow: 1
  }
});

export default Signup;
