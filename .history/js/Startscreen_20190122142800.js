import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-native';

class Startscreen extends Component {
    static navigationOptions = {
        title: 'Welcome',
    };
    render() {
        const { navigate } = this.props.navigation;
        return (
            <Button
                title="Play"
                onPress={() => navigate('AR')}
            />
        );
    }
}

Startscreen.propTypes = {

};

export default Startscreen;