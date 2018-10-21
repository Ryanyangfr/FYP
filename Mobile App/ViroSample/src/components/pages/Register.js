import React from 'react';
import { Text, TextInput, TouchableOpacity,StyleSheet,View, Image,KeyboardAvoidingView} from 'react-native';
import firebase from '../../../firebase';

export default class Register extends React.Component {
    state = { email: '', password: '', errorMessage: 'hello'}

    handleSignUp = () =>{
        //TODO
        firebase
        .auth()
        .createUserWithEmailAndPassword(this.state.email, this.state.password)
        .then(() => this.props.navigation.navigate('Welcome'))
        .catch(error => this.setState({ errorMessage: error.message }))
        console.log(this.state.errorMessage)
    }
  
    render() {
    return(
        <KeyboardAvoidingView behavior="padding" style={styles.container}>
            <View style={styles.container}>
            <View style={styles.loginContainer}>
            <Image resizeMode="cover" style={styles.logo} source={require('../images/mainpage.gif')} />
            </View>

            <View style={styles.formContainer}>
            <TextInput style = {styles.input} 
                        autoCapitalize="none" 
                        onSubmitEditing={() => this.passwordInput.focus()} 
                        autoCorrect={false} 
                        keyboardType='email-address' 
                        returnKeyType="next" 
                        placeholder='Username / E-mail' 
                        placeholderTextColor='rgba(225,225,225,0.7)'
                        onChangeText={email => this.setState({ email })}
                        value={this.state.email}/>
                <TextInput style = {styles.input}   
                        returnKeyType="go" 
                        ref={(input)=> this.passwordInput = input} 
                        placeholder='Password' 
                        placeholderTextColor='rgba(225,225,225,0.7)' 
                        secureTextEntry
                        onChangeText={password => this.setState({ password })}
                        value={this.state.password}/>

                <TouchableOpacity style={styles.buttonContainer} 
                    onPress={this.handleSignUp}>
                    <Text  style={styles.buttonText}>Register</Text>
                </TouchableOpacity>  
            </View>
        </View>
    </KeyboardAvoidingView>
    )
  }
}
// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0a1a1d',
    },
    loginContainer:{
        alignItems: 'center',
        flexGrow: 1,
        justifyContent: 'center'
    },
    logo: {
        position: 'absolute',
        width: "100%",
        height: "100%"
    },
    input:{
      height: 40,
      backgroundColor: 'rgba(225,225,225,0.2)',
      marginBottom: 10,
      padding: 10,
      color: '#fff'
  },
  buttonContainer:{
      backgroundColor: '#ab93c9',
      paddingVertical: 15,
      marginBottom:10
  },
  buttonText:{
      color: '#fff',
      textAlign: 'center',
      fontWeight: '700'
  }
  });