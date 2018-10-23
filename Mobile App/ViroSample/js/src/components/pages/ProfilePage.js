import React from 'react';
import {StyleSheet, View, Text, Image, Platform} from 'react-native';
//import Icon from "react-native-vector-icons/Ionicons";

export default class ProfilePage extends React.Component{
    render(){
        return(
            <View style={styles.wrapper}>
                <View style = {styles.profileDetailsWrapper}>
                    <View style = {styles.CircleShapeView}></View>
                    <View style = {styles.profileNameWrapper}>
                        <Text style = {styles.profileName}> Ryan Yang</Text>
                        <View style={styles.editProfileIconWrapper}>
                            
                            {/*<Icon
                                name={Platform.OS === "ios" ? "ios-create" : "md-create"}
                                color="#ccc"
                                size={20}
                            />*/}
                            
                        </View>
                    </View>

                    <View style = {styles.profileEmailWrapper}>
                        <Text style = {styles.profileEmail}>ryan.yang@smu.edu.sg</Text>
                    </View>
                    
                </View>

                <View style = {styles.teamNameAndScoreWrapper}>
                    <View style={styles.teamNameAndScoreHeaderWrapper}>
                        <Text style={styles.teamNameAndScoreHeader}> Team Name and Score </Text> 
                    </View>       
                    <View style={styles.teamNameAndScore}>
                        <Text style={styles.teamName}>Team 2</Text>
                        <Text style={styles.score}>42 points</Text> 
                    </View> 
                </View> 
            </View>
        );
    }
}

const styles = StyleSheet.create({
    wrapper: {
        backgroundColor: '#eceff1',
        flex: 1
        
    },

    profileDetailsWrapper:{
        flex:1,
        backgroundColor:'#fff',
        padding: 0,
        height:250,
        borderBottomWidth: 1,
        borderBottomColor: '#ededed',
        alignItems: 'center',
    },

    teamNameAndScoreWrapper:{
        height:90,
        borderBottomWidth: 1,
        borderBottomColor: '#ededed',
        flex: 1,
        flexDirection: 'column',
    },

    CircleShapeView:{
        width: 150,
        height: 150,
        borderRadius: 150/2,
        backgroundColor: '#ededed',
    },

    profileNameWrapper:{
        paddingTop:10,
        flex:1,
        flexDirection:'row'

    },

    profileName:{
        fontWeight: 'bold',
        color:'#757575'
    },

    profileEmailWrapper:{
        paddingTop: 0
    },

    profileEmail:{
        fontWeight:'100',
        color:'#757575'
    },

    teamNameAndScoreHeaderWrapper:{
        paddingTop: 10,
        paddingLeft: 7,
        paddingBottom:5,
        borderBottomWidth: 1,
        borderBottomColor: '#ededed',
        opacity: 0.9
    },

    teamNameAndScoreHeader:{
        fontWeight: 'bold',
        color:'#b0bec5',
        fontSize: 10
    },

    teamNameAndScore:{
        flex:1,
        height: 50,
        flexDirection: 'row',
        padding: 10,  
        justifyContent: 'space-evenly',
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#ededed',
    },

    teamName:{
        paddingRight:10,
        color:'#757575'
    },

    score:{
        paddingLeft:10,
        color:'#757575'
    },

    editProfileIconWrapper:{
        paddingLeft:8
    }
});