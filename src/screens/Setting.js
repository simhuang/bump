import React from 'react';

import { View, Text } from 'react-native';
import { Header } from 'react-native-elements';

class Setting extends React.Component {
  render() {
    return (
      <View style={{backgroundColor: 'white', flex:1}}>
        <Header
          centerComponent={{ text: 'Setting', style: { color: '#fff' } }}
        />
        <Text>Setting</Text>
      </View>
    )
  }
}

export default Setting
