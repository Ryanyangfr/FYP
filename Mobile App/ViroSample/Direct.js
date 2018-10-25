import React from 'react';
import BottomNavigator from './js/src/components/navigator/BottomNavigator';
export default class Direct extends React.Component {
  
  constructor(props) {
    super(props)
    this.state = {
      userName:"User1"
    }
  }
  render() {
    return (
        <BottomNavigator/>
    );
  }
}