//currently disfunct
import React from 'react';
import {createStackNavigator, createBottomTabNavigator} from 'react-navigation';
//import Icon from 'react-native-vector-icons/Ionicons'

import Login from '../pages/Login';
import Username from '../pages/Username';
import UserHelp from '../pages/UserHelp';
import ViroMain from '../pages/ViroMain';
import Missions from '../pages/Missions';
import Submissions from '../pages/Submissions';
import ActivityFeed from '../pages/ActivityFeed';
import Leaderboard from '../pages/Leaderboard';
import Main from '../pages/Main';
 

export default class BottomNavigator extends React.Component {
    render() {
      return <BottomNav/>;
    }
}

let headerDefaultNavigationConfig = {
    title: 'Engaging U',
    headerStyle: {
     backgroundColor: "black"
    },
    headerTitleStyle: {
      fontWeight: "bold",
      color: "#fff",
      zIndex: 1,
      fontSize: 18,
      lineHeight: 23
    },
    headerTintColor: "#fff"
  };

  const LoginStack = createStackNavigator({
    Login: {
        screen: Login,
        navigationOptions:{
            ...headerDefaultNavigationConfig,
            
        },
    }
});
LoginStack.navigationOptions = {
    header:null,
    tabBarVisible:false,
};
const UserNameStack = createStackNavigator({
    Username:{
        tabBarVisible:false,
        screen:Username,
        title:"Username"
    }
});
UserNameStack.navigationOptions = {
    tabBarVisible:false,
    title:'Username',
    tabBarLabel: 'Username',

};

const UserHelpStack = createStackNavigator({
    UserHelp: {
        screen: UserHelp,
        navigationOptions:{
            ...headerDefaultNavigationConfig
        },
    }
});
UserHelpStack.navigationOptions = {
    title: 'Help',
    tabBarLabel:"UserHelp",
    header:null

};
const ActivityFeedStack = createStackNavigator({
    ActivityFeed: {
        screen: ActivityFeed,
        navigationOptions:{
            ...headerDefaultNavigationConfig
        },
    }
});
ActivityFeedStack.navigationOptions = {
    title: 'Feed',
    tabBarLabel:"Feed",
    header:null

};
const MissionsStack = createStackNavigator({
    Missions: {
        screen: Missions,
        navigationOptions:{
            ...headerDefaultNavigationConfig
        },
    }
});
MissionsStack.navigationOptions = {
    title: 'Missions',
    tabBarLabel:"Missions",
    header:null

};
const SubmissionsStack = createStackNavigator({
    Submissions: {
        screen: Submissions,
        navigationOptions:{
            ...headerDefaultNavigationConfig
        },
    }
});
Submissions.navigationOptions = {
    title: 'Submission',
    tabBarLabel:"Submission",
    

};
const LeaderboardStack = createStackNavigator({
    Leaderboard: {
        screen: Leaderboard,
        navigationOptions:{
            ...headerDefaultNavigationConfig
        },
    }
});
LeaderboardStack.navigationOptions = {
    title: 'LeaderBoard',
    tabBarLabel:"LeaderBoard",
    header:null

};
const ViroStack = createStackNavigator({
     ViroMain: {
         screen:ViroMain,
         navigationOptions:{
            ...headerDefaultNavigationConfig
        },
     },

});
ViroStack.navigationOptions = {
    //title: 'Viro',
    tabBarLabel: 'Viro',


};
const MainStack = createStackNavigator({
    VMain: {
        screen:Main,
        navigationOptions:{
           ...headerDefaultNavigationConfig
       },
    },

});
MainStack.navigationOptions = {
   //title: 'Viro',
   tabBarLabel: 'Main',


};


const BottomNav = createBottomTabNavigator({
    ViroStack,
    MainStack,
    UserHelpStack,
    ActivityFeedStack,
    SubmissionsStack,
    MissionsStack,
    LeaderboardStack,

});

  