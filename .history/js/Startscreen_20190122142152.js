import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text } from 'react-native';

class Startscreen extends Component {
    static navigationOptions = {
        title: 'Welcome',
    };
    render() {
        const { navigate } = this.props.navigation;
        return (
            <Button
                title="Go to Jane's profile"
                onPress={() => navigate('Profile', { name: 'Jane' })}
            />
        );
    }
}

Startscreen.propTypes = {

};

export default Startscreen;