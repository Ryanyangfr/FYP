import React from 'react';
import AppNavigator from './js/src/components/navigator/AppNavigator';

export default class App extends React.Component {
  
  constructor(props) {
    super(props)
    this.state = {
      userName:"User1"
    }
  }
  render() {
    return (
      <AppNavigator
        screenProps={ {
          userName: this.state.userName
        } }/>
    );
  }
}