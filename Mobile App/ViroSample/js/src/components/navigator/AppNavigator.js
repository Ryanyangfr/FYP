import { createStackNavigator } from 'react-navigation';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Loading from '../pages/Loading';
import ViroMain from '../pages/ViroMain';
import ProfilePage from '../pages/ProfilePage';
import BottomNavigator from './BottomNavigator';
import Username from '../pages/Username';
import Main from '../pages/Main';

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
    
    Username: { 
        screen: Username,
        navigationOptions:{
            title:'Username',
            headerStyle: {height: 30}
        } 
    },

    BottomNavigator:{
        screen: BottomNavigator,
        navigationOptions:{
            title:'Engaging U',
            headerStyle: {height: 30},
            header: null
        }
    }
},
{

});

export default AppNavigator;