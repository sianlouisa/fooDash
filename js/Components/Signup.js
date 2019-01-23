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
    err: null,
  }


  handleAuth = () => {
    if (this.validateEmail && this.validatePassword) {
      const { email, password } = this.state;
      const { navigation } = this.props;
      api
        .signup(email, password)
        .then(() => navigation.navigate('StartScreen'))
        .catch(() => {
          this.setState({ err: true });
        });
    } else {
      this.setState({ err: true });
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
      email, confirmEmail, password, confirmPassword, err
    } = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.signupInputs}>
          <TextInput
            style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
            onChangeText={text => this.setState({ email: text })}
            value={email}
            placeholder="Enter Email"
          />
        </View>
        <View style={styles.signupInputs}>
          <TextInput
            style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
            onChangeText={text => this.setState({ confirmEmail: text })}
            value={confirmEmail}
            placeholder="Re-enter Email"
          />
        </View>
        <View style={styles.signupInputs}>
          <TextInput
            style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
            onChangeText={text => this.setState({ password: text })}
            value={password}
            secureTextEntry
            placeholder="Enter Password"
          />
        </View>
        <View style={styles.signupInputs}>
          <TextInput
            style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
            onChangeText={text => this.setState({ confirmPassword: text })}
            value={confirmPassword}
            secureTextEntry
            placeholder="Re-enter Password"
          />
        </View>
        <TouchableOpacity onPress={this.handleAuth}>
          <Text>Hello Me Again</Text>
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
