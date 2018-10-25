import React from 'react';
import { Text, TextInput, TouchableOpacity,StyleSheet,View, Image,KeyboardAvoidingView} from 'react-native';

export default class Login extends React.Component {
    
    constructor(props) {
        super(props);
     
       this.state = {
           pin: "",
          };
        }
        onPressSubmitButton() {
            this.onFetchLoginRecords();
            }
    async onFetchLoginRecords() {
        var data = {
         username: this.state.pin,
         user_id:'5',
         team_id:'1'
        };
        try {
         let response = await fetch(
          "http://54.255.245.23:3000/user/register",
          {
            method: "POST",
            headers: {
             "Accept": "application/json",
             "Content-Type": "application/json"
            },
           body: JSON.stringify(data)
         }
        );
         if (response.status >= 200 && response.status < 300) {
            //alert("authenticated successfully!!!");
            this.props.navigation.navigate("BottomNavigator")
         }
       } catch (errors) {
    
        this.props.navigation.navigate("BottomNavigator")
        } 
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
                            onChangeText={text => this.setState({ pin:text })}
                            value={this.state.pin}
                            returnKeyType="next" 
                            placeholder='Trail PIN' 
                            placeholderTextColor='rgba(225,225,225,0.7)'/>
                
                    <TouchableOpacity style={styles.buttonContainer} 
                         onPress={this.onPressSubmitButton.bind(this)}>
                        <Text  style={styles.buttonText}>Login</Text>
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
