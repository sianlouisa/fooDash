import React, { Component } from 'react';
import {
  View, TextInput, TouchableOpacity, Text, StyleSheet, Image, ImageBackground
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
        .then(uid => navigation.navigate('InitialiseAR', { uid }))
        .catch(() => {
          this.setState({
            err: true,
            password: ''
          });
        });
    }
  }

  render() {
    const { email, password, err } = this.state;
    const { navigation } = this.props;
    const emailIcon = 'https://png.icons8.com/message/ultraviolet/50/3498db';
    const passwordIcon = 'https://png.icons8.com/key-2/ultraviolet/50/3498db';

    return (
      <View style={styles.container}>
        {/* <ImageBackground
        style={styles.imgBackground}
        resizeMode='cover'
        source={require('../res/res/randomObjs.jpg')}
      > */}
        <View style={styles.loginInputs}>
          <Image style={styles.inputIcon} source={{ uri: emailIcon }} />
          <TextInput
            style={styles.inputs}
            keyboardType="email-address"
            textContentType="emailAddress"
            underlineColorAndroid='transparent'
            onChangeText={text => this.setState({ email: text })}
            value={email}
            placeholder="Enter Email"
          />
        </View>
        <View style={Styles.loginInputs}>
          <Image style={styles.inputIcon} source={{ uri: passwordIcon }} />
          <TextInput
            style={Styles.inputs}
            textContentType="password"
            underlineColorAndroid='transparent'
            onChangeText={text => this.setState({ password: text })}
            value={password}
            secureTextEntry
            placeholder="Enter Password"
          />
        </View>
        <TouchableOpacity
          onPress={this.handleAuth}
          style={[styles.buttonContainer, styles.button]}
        >
          <Text style={styles.loginText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('Signup')}
          style={[styles.buttonContainer, styles.button]}
        >
          <Text style={styles.loginText}>Sign up</Text>
        </TouchableOpacity>
        {err && <Text style={styles.error}>Error</Text>}
        {/* </ImageBackground> */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#DCDCDC',
  },
  // imgBackground: {
  //   width: '100%',
  //   height: '100%',
  // },
  text: {
    fontFamily: "UnreadableSans",
    fontSize: 20,
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
    alignItems: 'center'
  },
  loginIcon: {
    width: 30,
    height: 30,
    marginLeft: 15,
    justifyContent: 'center'
  },
  inputs: {
    height: 45,
    marginLeft: 16,
    borderBottomColor: '#FFFFFF',
    flex: 1,
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
    borderRadius: 30,
  },
  button: {
    backgroundColor: "#00b5ec",
  },
  loginText: {
    color: '#FFFFFF',
  },
  error: {
    color: '#ff0000',
  },
});

Login.propTypes = {

};

export default Login;
