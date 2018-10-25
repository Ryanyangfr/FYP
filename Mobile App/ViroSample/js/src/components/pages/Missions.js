import React, { Component } from 'react';
import { StyleSheet,Text, View, ActivityIndicator,ScrollView} from 'react-native';
export default class Missions extends Component {

  constructor(props){
    super(props);
    this.state = {
      isLoading: true,
      dataSource: null,
    }
  }

  componentDidMount(){
    return fetch('http://54.255.245.23:3000/user/retrieveAllUser')
      .then((response) => response.json())
      .then((responseJson) => {

        this.setState({
          isLoading: false,
          dataSource: responseJson
        })
      })
 
      .catch((error) =>{
        console.log(error)
      });
  }
  render(){
    if(this.state.isLoading){

      return (
        <View style={styles.container}>
          <ActivityIndicator/>
        </View>
      )
    } else {
        let users = this.state.dataSource.map((val, key) => {
          return <View key={key} style={styles.item}>
            <Text>{val.username}</Text>
          </View>
        })
      return(
        <ScrollView >
          {users}
        </ScrollView>
      )
    }
  }

}

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'#fff',
    alignItems:'center',
    justifyContent: 'center',
  },
  item:{
    flex: 1,
    alignSelf:'stretch',
    margin:10,
    alignItems:'center',
    justifyContent:'center',
    borderBottomWidth:1,
    borderBottomColor:'#eee'  
  }
});