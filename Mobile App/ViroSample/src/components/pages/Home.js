//Defunct
//Merged with Login 

import React from 'react';
import { StyleSheet, KeyboardAvoidingView,View } from 'react-native';
import {Login} from './Login';
import {Welcome} from './Welcome';
export default class Home extends React.Component {
  
  render() {
    return (
        <KeyboardAvoidingView behavior="padding" style={styles.container}>
            <Login 
            onRegisterPress={() => this.props.navigation.navigate('Register')}
            onLoginPress={() => this.props.navigation.navigate('Welcome')}/>
        </KeyboardAvoidingView>
        )
    }
}
// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0a1a1d',
    }
  });
