//currently disfunct
import React, {Component} from 'react';
import {Platform} from 'react-native';
import {createStackNavigator, createBottomTabNavigator} from 'react-navigation';
//import Icon from 'react-native-vector-icons/Ionicons'

import Login from '../pages/Login';
import Register from '../pages/Register';
import Welcome from '../pages/Welcome';
import Loading from '../pages/Loading';
import ViroMain from '../pages/ViroMain';
import ProfilePage from '../pages/ProfilePage';
 


const ProfileStack = createStackNavigator({
  ProfilePage: {
      screen:ProfilePage,
  }
});

ProfileStack.navigationOptions = {
    title: 'Profile',
    tabBarLabel: 'Profile',

};

const ViroStack = createStackNavigator({
     ViroMain: {
         screen:ViroMain,
     }
});

ViroStack.navigationOptions = {
    title: 'Viro',
    tabBarLabel: 'Viro',


};

const tabNav = createBottomTabNavigator({
  
    ProfileStack,
    ViroStack
});
export default tabNav;