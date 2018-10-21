import { createStackNavigator } from 'react-navigation';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Welcome from '../pages/Welcome';
import Loading from '../pages/Loading';
import ViroMain from '../pages/ViroMain';

const AppNavigator = createStackNavigator({
    Loading: { 
        screen: Loading, 
        },
    Login: { 
    screen: Login,
    navigationOptions: {
        title: 'Login', 
    }, 
    },
  Welcome: { 
      screen: Welcome,
    navigationOptions:{
        title:'Welcome',
    } },
  Register: { 
      screen: Register,
    navigationOptions:{
        title:'Register'
    } },
    ViroMain: {
        screen: ViroMain,
    navigationOptions:{
        title:'ViroMain',
    } 
},  
},
{

});

export default AppNavigator;