import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { View, TextInput } from 'react-native'

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
            </View>
        );
    }
}

Signup.propTypes = {

};

export default Signup;