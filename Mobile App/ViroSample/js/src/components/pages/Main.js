import React from 'react';
import MapView from 'react-native-maps';
// declare this outside of render
  var region = {
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };
// add this to render

export default class Main extends React.Component {
  render() {
    return (
      <MapView
      initialRegion={region}
    />
    );
  }
}