import { createStackNavigator } from 'react-navigation';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Welcome from '../pages/Welcome';
import Loading from '../pages/Loading';
import ViroMain from '../pages/ViroMain';
import ProfilePage from '../pages/ProfilePage';

const AppNavigator = createStackNavigator({
    Loading: { 
        screen: Loading, 
    },

    Login: { 
        screen: Login,
        navigationOptions: {
            title: 'Login', 
            headerStyle: {height: 30}
        }, 
    },

    Welcome: { 
        screen: Welcome,
        navigationOptions:{
            title:'Welcome',
            headerStyle: {height: 30}
       } 
    },
    
    Register: { 
        screen: Register,
        navigationOptions:{
            title:'Register',
            headerStyle: {height: 30}
        } 
    },
    
    ViroMain: {
        screen: ViroMain,
        navigationOptions:{
            title:'ViroMain',
            headerStyle: {height: 30}
        } 
    },

    ProfilePage:{
        screen: ProfilePage,
        navigationOptions:{
            title:'Profile',
            headerStyle: {height: 30}
        }
    },
},
{

});

export default AppNavigator;