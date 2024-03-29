import React from 'react';

import { View, StyleSheet } from 'react-native';
import { Header, Button } from 'react-native-elements';
import { Content, Form, Picker, Icon, Toast, Text } from 'native-base';

import firebase from '@firebase/app';
import { firebaseConfig } from '../../config';

import GlobalContext, { EventContext } from '../context/GlobalContext';

class Setting extends React.Component {
  state = {
    selectedFilter: ''
  }

  //database reference
  database = firebase.database();

  componentDidMount() {
    let value = this.context;
    const userID = firebase.auth().currentUser.uid;
    this.setState({selectedFilter: value.filter});

    this.database.ref('/users/' + userID).once('value')
            .then(snapshot => {
                this.setState({selectedFilter: snapshot.val().filter});
                // value.setCurrentEvents(snapshot.val());
            });
  }

  logout() {
    firebase.auth().signOut().then(() => {
      this.props.navigation.navigate('LoginNavigator');
    });
  }

  onValueChange(selectedFilter) {
    this.setState({selectedFilter});
    this.writeFilterToFirebase(selectedFilter);
  }

  writeFilterToFirebase(filter) {
    const userID = firebase.auth().currentUser.uid;
    let updates = {};
    updates['/users/' + userID + '/filter'] = filter;
    this.database.ref().update(updates);
  }

  render() {
    return (
      <View style={{backgroundColor: 'white', flex:1}}>
        <Header
          containerStyle={styles.header}
          centerComponent={{ text: 'Setting', style: { color: '#fff' } }}
        />
        <EventContext.Consumer>
          {(value) => {
            return (
              <Content>
                <Form>
                  <Text style={styles.label}>Category Preference</Text>
                  <Picker
                    iosIcon={<Icon name="arrow-down" />}
                    mode='dropdown'
                    placeholder='Filter by Event Category'
                    placeholderStyle={{ color: "#1e9e88" }}
                    note={false}
                    selectedValue={this.state.selectedFilter}
                    onValueChange={this.onValueChange.bind(this)}
                    >
                    <Picker.Item label="None" value="None" />
                    <Picker.Item label="Sports" value="Sports" />
                    <Picker.Item label="Food" value="Food" />
                    <Picker.Item label="Party" value="Party" />
                  </Picker>
                </Form>
              </Content>
            )
          }}
        </EventContext.Consumer>
        <View
          style={{
            flex: 1
          }}
        >
          <Button 
            containerStyle={styles.logoutBtn}
            title="Log Out"
            onPress={() => this.logout()}/>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#1e9e88'
  },

  label: {
    marginLeft: 18,
    marginTop: 10
  },

  logoutBtn: {
    flex: 1,
    justifyContent: 'flex-end',
    margin: 10,
    color: '#1e9e88',
  }
});

Setting.contextType = EventContext;

export default Setting
