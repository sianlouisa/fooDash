import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
  Image,
  AsyncStorage,
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
    usernames: []
  };

  componentDidMount() {
    api.getPlayersUsernames().then((snapshot) => {
      snapshot.forEach((doc) => {
        this.setState(state => ({ usernames: [...state.usernames, doc.data().playerName] }));
      });
    });
  }

  handleAuth = () => {
    const { email, password, username } = this.state;
    if (this.validateEmail() && this.validatePassword() && this.validateUsername()) {
      const { navigation } = this.props;
      api
        .signup(email, password)
        .then(uid => api.addUser(uid, username))
        .then(uid => AsyncStorage.setItem('currentPlayer', JSON.stringify({ uid, username, score: 0 })))
        .then(() => navigation.navigate('StartScreen'))
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
  };

  validateEmail = () => {
    const { email, confirmEmail } = this.state;
    if (email && email === confirmEmail) {
      return true;
    }
    return false;
  };

  validatePassword = () => {
    const { password, confirmPassword } = this.state;
    if (password && password === confirmPassword) {
      return true;
    }
    return false;
  };

  validateUsername = () => {
    const { username, usernames } = this.state;
    if (username && !usernames.includes(username)) {
      return true;
    }
    return false;
  };

  render() {
    const {
      email, confirmEmail, password, confirmPassword, username, err
    } = this.state;
    const { navigation } = this.props;
    const emailIcon = 'https://png.icons8.com/message/ultraviolet/50/3498db';
    const passwordIcon = 'https://png.icons8.com/key-2/ultraviolet/50/3498db';

    return (
      <>
        <View style={styles.container}>
          <View style={styles.signupInputs}>
            <TextInput
              style={styles.inputs}
              onChangeText={text => this.setState({ username: text })}
              value={username}
              placeholder="Enter Username"
              placeholderTextColor="#00b5ec"
              textContentType="username"
              autoCapitalize="none"
            />
          </View>
          <View style={styles.signupInputs}>
            <Image style={styles.inputIcon} source={{ uri: emailIcon }} />
            <TextInput
              style={styles.inputs}
              onChangeText={text => this.setState({ email: text })}
              value={email}
              placeholder="Enter Email"
              placeholderTextColor="#00b5ec"
              keyboardType="email-address"
              textContentType="emailAddress"
              underlineColorAndroid="transparent"
              autoCapitalize="none"
            />
          </View>
          <View style={styles.signupInputs}>
            <TextInput
              style={styles.inputs}
              onChangeText={text => this.setState({ confirmEmail: text })}
              value={confirmEmail}
              placeholder="Re-enter Email"
              placeholderTextColor="#00b5ec"
              keyboardType="email-address"
              textContentType="emailAddress"
              autoCapitalize="none"
            />
          </View>
          <View style={styles.signupInputs}>
            <Image style={styles.inputIcon} source={{ uri: passwordIcon }} />
            <TextInput
              style={styles.inputs}
              onChangeText={text => this.setState({ password: text })}
              value={password}
              secureTextEntry
              placeholder="Enter Password"
              placeholderTextColor="#00b5ec"
              textContentType="password"
              underlineColorAndroid="transparent"
              autoCapitalize="none"
            />
          </View>
          <View style={styles.signupInputs}>
            <TextInput
              style={styles.inputs}
              onChangeText={text => this.setState({ confirmPassword: text })}
              value={confirmPassword}
              secureTextEntry
              placeholder="Re-enter Password"
              placeholderTextColor="#00b5ec"
              textContentType="password"
              underlineColorAndroid="transparent"
              autoCapitalize="none"
            />
          </View>
          <TouchableOpacity
            onPress={this.handleAuth}
            style={[styles.buttonContainer, styles.button]}
          >
            <Text style={styles.signupText}>Sign Up</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate('Login')}
            style={[styles.buttonContainer, styles.button]}
          >
            <Text style={styles.signupText}>Back To Login</Text>
          </TouchableOpacity>
          {err && <Text style={styles.error}>Ooops</Text>}
        </View>
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  // imgBackground: {
  //   width: '100%',
  //   height: '100%',
  // },
  text: {
    fontFamily: 'Arial',
    fontSize: 20
  },
  signupInputs: {
    borderBottomColor: '#F5FCFF',
    backgroundColor: '#FFFFFF',
    borderRadius: 30,
    borderBottomWidth: 1,
    width: 250,
    height: 45,
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
    opacity: 0.8
  },
  inputs: {
    height: 45,
    marginLeft: 16,
    borderBottomColor: '#FFFFFF',
    flex: 1
  },
  inputIcon: {
    width: 30,
    height: 30,
    marginLeft: 15,
    justifyContent: 'center'
  },
  buttonContainer: {
    height: 45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    width: 250,
    borderRadius: 30
  },
  button: {
    backgroundColor: '#00b5ec'
  },
  signupText: {
    color: '#FFFFFF'
  },
  error: {
    color: '#ff0000'
  }
});

Signup.propTypes = {};

export default Signup;
