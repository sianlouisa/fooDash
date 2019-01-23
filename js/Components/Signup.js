import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { View, TextInput, TouchableOpacity, Text } from 'react-native'
import * as api from '../api';

class Signup extends Component {
    state = {
        email: '',
        confirmEmail: '',
        password: '',
        confirmPassword: ''
    }
    render() {
        const { email, confirmEmail, password, confirmPassword } = this.state;
        return (
            <View>
                <TextInput style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                    onChangeText={email => this.setState({ email })}
                    value={email} placeholder='Enter Email' />
                <TextInput style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                    onChangeText={confirmEmail => this.setState({ confirmEmail })}
                    value={confirmEmail} placeholder='Re-enter Email' />
                <TextInput style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                    onChangeText={password => this.setState({ password })}
                    value={password} secureTextEntry={true} placeholder='Enter Password' />
                <TextInput style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                    onChangeText={confirmPassword => this.setState({ confirmPassword })}
                    value={confirmPassword} secureTextEntry={true} placeholder='Re-enter Password' />
                <TouchableOpacity onPress={this.handleAuth}>
                    <Text>Hello</Text>
                </TouchableOpacity>
            </View>
        );
    }

    handleAuth = () => {
        if (this.validateEmail && this.validatePassword) {
            const { email, password } = this.state
            api.signup(email, password)
        }
    }

    validateEmail = () => {
        const { email, confirmEmail } = this.state;
        if (email && email === confirmEmail) {
            return true
        }
        return false
    }

    validatePassword = () => {
        const { password, confirmPassword } = this.state;
        if (password && password === confirmPassword) {
            return true
        }
        return false
    }

}

Signup.propTypes = {

};

export default Signup;