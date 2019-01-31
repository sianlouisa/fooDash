import React, { Component } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
  Image,
  AsyncStorage
} from 'react-native';
import * as api from '../api';

class Login extends Component {
  state = {
    email: '',
    password: '',
    err: null
  };

  handleAuth = () => {
    const { email, password } = this.state;
    const { navigation } = this.props;
    if (email && password) {
      api
        .signin(email, password)
        .then(uid => api.getUserDetails(uid))
        .then(currentPlayer => AsyncStorage.setItem('currentPlayer', JSON.stringify(currentPlayer)))
        .then(() => navigation.navigate('StartScreen'))
        .catch(() => {
          this.setState({
            err: true,
            password: ''
          });
        });
    }
  };

  render() {
    const { email, password, err } = this.state;
    const { navigation } = this.props;
    const emailIcon = 'https://png.icons8.com/message/ultraviolet/50/3498db';
    const passwordIcon = 'https://png.icons8.com/key-2/ultraviolet/50/3498db';

    return (
      <View style={styles.container}>
        <View style={styles.loginInputs}>
          <Image style={styles.inputIcon} source={{ uri: emailIcon }} />
          <TextInput
            style={styles.inputs}
            keyboardType="email-address"
            textContentType="emailAddress"
            underlineColorAndroid="transparent"
            onChangeText={text => this.setState({ email: text })}
            value={email}
            placeholder="Enter Email"
            placeholderTextColor="#00b5ec"
            autoCapitalize="none"
          />
        </View>
        <View style={styles.loginInputs}>
          <Image style={styles.inputIcon} source={{ uri: passwordIcon }} />
          <TextInput
            style={styles.inputs}
            textContentType="password"
            underlineColorAndroid="transparent"
            onChangeText={text => this.setState({ password: text })}
            value={password}
            secureTextEntry
            placeholder="Enter Password"
            placeholderTextColor="#00b5ec"
            autoCapitalize="none"
          />
        </View>
        <TouchableOpacity onPress={this.handleAuth} style={[styles.buttonContainer, styles.button]}>
          <Text style={styles.loginText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('Signup')}
          style={[styles.buttonContainer, styles.button]}
        >
          <Text style={styles.loginText}>Sign up</Text>
        </TouchableOpacity>
        {err && <Text style={styles.error}>Error</Text>}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    fontFamily: 'Arial',
    fontSize: 20
  },
  loginInputs: {
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
  loginText: {
    color: '#FFFFFF'
  },
  error: {
    color: '#ff0000'
  }
});

Login.propTypes = {};

export default Login;
