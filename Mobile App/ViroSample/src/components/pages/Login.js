import React from 'react';
import { Text, TextInput, TouchableOpacity,StyleSheet,View, Image,KeyboardAvoidingView} from 'react-native';
import firebase from '../../../firebase';

export default class Login extends React.Component {
    state= {email: '', password: '',errorMessage: null}
    
    handleLogin = () =>{
        const { email, password } = this.state
        firebase
          .auth()
          .signInWithEmailAndPassword(email, password)
          .then(() => this.props.navigation.navigate('Welcome'))
          .catch(error => this.setState({ errorMessage: error.message }))
          console.log(this.state.errorMessage);
    }
    constructor(props) {
        super(props);
        this.state = { text: '' };
    }

    render() {
    return(
        <KeyboardAvoidingView behavior="padding" style={styles.container}>
            <View style={styles.container}>
                <View style={styles.loginContainer}>
                <Image resizeMode="contain" style={styles.logo} source={require('../images/mainpage.png')} />
                </View>

                <View style={styles.formContainer}>
                <TextInput style = {styles.input} 
                            autoCapitalize="none" 
                            onSubmitEditing={() => this.passwordInput.focus()} 
                            autoCorrect={false} 
                            keyboardType='email-address' 
                            onChangeText={email => this.setState({ email })}
                            value={this.state.email}
                            returnKeyType="next" 
                            placeholder='Email or Mobile Num' 
                            placeholderTextColor='rgba(225,225,225,0.7)'/>

                    <TextInput style = {styles.input}   
                            returnKeyType="go" 
                            ref={(input)=> this.passwordInput = input} 
                            placeholder='Password' 
                            placeholderTextColor='rgba(225,225,225,0.7)' 
                            onChangeText={password => this.setState({ password })}
                            value={this.state.password}
                            secureTextEntry/>
                
                    <TouchableOpacity style={styles.buttonContainer} 
                        onPress={this.handleLogin}>
                        <Text  style={styles.buttonText}>Login</Text>
                    </TouchableOpacity> 

                    <TouchableOpacity style={styles.buttonContainer} 
                        onPress={() => this.props.navigation.navigate('Register')}>
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
        backgroundColor: "black",
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
      color: '#FFFFFF'
  },
  buttonContainer:{
      backgroundColor: '#c9c9c9',
      paddingVertical: 15,
      marginBottom:10
  },
  buttonText:{
      color: 'black',
      textAlign: 'center',
      fontWeight: '700'
  }
  });
