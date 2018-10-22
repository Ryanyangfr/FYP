import React from 'react';
import { Text, TouchableOpacity,StyleSheet,View, Image} from 'react-native';
import firebase from '../../../firebase';

export  default class Welcome extends React.Component {
    state = { currentUser: null }

    componentDidMount() {
      const { currentUser } = firebase.auth()
      this.setState({ currentUser })
  }
  signOutUser = async () => {
    try {
        await firebase.auth().signOut();
        this.props.navigation.navigate('Login');
    } catch (e) {
        console.log(e);
    }
}
  
  render() {
    const { currentUser } = this.state
    return(
      <View style={styles.container}>
        <View style={styles.loginContainer}>
          <Image resizeMode="cover" style={styles.logo} source={require('../images/welcome.gif')} />
        </View>

        <View>
            <Text style = {styles.input}>
            Welcome, {currentUser && currentUser.email}
            </Text>
             <TouchableOpacity style={styles.buttonContainer}
                onPress={() => this.props.navigation.navigate('ViroMain')}>
                     <Text  style={styles.buttonText}>Start Journey</Text>
            </TouchableOpacity> 

            <TouchableOpacity style={styles.buttonContainer} 
                    onPress={() => this.props.navigation.navigate('ProfilePage')}>
                    <Text  style={styles.buttonText}>My Profile</Text>
            </TouchableOpacity> 

            <TouchableOpacity style={styles.buttonContainer} 
                      onPress={this.signOutUser}>
                     <Text  style={styles.buttonText}>Log Out </Text>
            </TouchableOpacity> 
        </View>
    </View>
    )
  }
}
// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
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
         marginBottom: 10,
         padding: 10,
         fontSize:20,
         color: '#FFFFFF'
     },
     buttonContainer:{
         backgroundColor: '#c9c9c9',
         paddingVertical: 15,
         marginBottom: 10
     },
     buttonText:{
         color: 'black',
         textAlign: 'center',
         fontWeight: '700'
     }
  });
