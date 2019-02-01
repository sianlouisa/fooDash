import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { AsyncStorage, View, StyleSheet } from 'react-native';
import InstructionsBtn from '../Components/InstructionsBtn';
import LogoutBtn from '../Components/LogoutBtn';
import LeaderboardBtn from '../Components/LeaderboardBtn';
import StartButton from '../Components/StartButton';

class StartScreen extends Component {
  state = {};

  logout = async () => {
    const {
      navigation: { navigate }
    } = this.props;
    await AsyncStorage.clear();
    navigate('AuthLoadingScreen');
  };

  render() {
    const {
      navigation: { navigate }
    } = this.props;
    return (
      <>
        <View style={styles.container}>
          <StartButton navigateToPlay={() => navigate('InitialiseAR')} buttonStyle={styles} />
          <InstructionsBtn
            navigateToInstructions={() => navigate('Instructions')}
            buttonStyle={styles}
          />
          <LeaderboardBtn
            navigateToLeaderboard={() => navigate('Leaderboard')}
            buttonStyle={styles}
          />
          <LogoutBtn logout={this.logout} buttonStyle={styles} />
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
  buttonContainer: {
    height: 45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    width: 250,
    borderRadius: 30,
    backgroundColor: '#00b5ec'
  },
  text: {
    color: '#FFFFFF'
  }
});

StartScreen.propTypes = {};

export default StartScreen;
