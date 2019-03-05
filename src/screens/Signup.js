import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import { createStackNavigator, createAppContainer } from "react-navigation";
import { Input, Button, Header } from 'react-native-elements';

import { firebaseConfig } from '../../config';
import firebase from '@firebase/app';
import '@firebase/auth'

class Signup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            "email": null,
            "firstName": null,
            "lastName": null, 
            "password": null,
            "passwordAgain": null,
            "message": null
        }

    }
    componentDidMount() {
        //firebase.initializeApp(firebaseConfig);
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                user.updateProfile({
                    firstName: this.state.firstName,
                    lastName: this.state.lastName,
                    fullName: this.state.firstName + this.state.lastName
                });

                this.props.navigation.navigate('EventFeed');
            } else {
                //not signed in implementation
            }
        });
    }

    loginOnpressHanlder(email, password) {
        console.log('go to login screen');
        this.setState({message: this.state.firstName})
    }

    createAccount() {
        if(this.validateForm()) {
            const { email, password } = this.state;
            firebase.auth().createUserWithEmailAndPassword(email, password)
            .catch((message) => {
                console.log('message' + message);
                this.setState({message: message});
            });
        }
    }

    validateForm() {
        const userInput = this.state;
        if (!userInput.email || !userInput.email.includes('@')) {
            this.setState({message: 'Please enter a valid email.'})
            return false;
        }

        if (!userInput.username || userInput.username === '') {
            this.setState({message: 'Please enter a valid username'})
            return false;
        }

        if(!userInput.firstName || userInput.firstName === '') {
            this.setState({message: 'Please enter a valid first name'});
            return false;
        }
        
        if (!userInput.lastName || userInput.lastName === '') {
            this.setState({message: 'Please enter a valid last name'})
            return false;
        }

        if (!userInput.password || userInput.password === '') {
            this.setState({message: 'Please enter a valid password'});
            return false;
        }

        if (!userInput.passwordAgain || userInput.passwordAgain === '') {
            this.setState({message: 'Password does not match.'});
            return false;
        }

        return true;
    }

    hidemessageMessage() {
        setTimeout(() => {
            this.setState({message: ''});
        }, 1000);
    }

    render() {
        return (
            <View>
                <Input
                    placeholder="Enter email"
                    value={this.state.email}
                    onChangeText={(text) => { this.setState({email: text})}}
                    name="email"
                />
                <Input
                    placeholder="Enter first name"
                    value={this.state.firstName}
                    onChangeText={text => { this.setState({firstName: text})}}
                    name="firstName"
                />
                <Input
                    placeholder="Enter last name"
                    value={this.state.lastName}
                    onChangeText={text => { this.setState({lastName: text})}}
                    name="lastName"
                />
                <Input
                    placeholder="Enter password"
                    onChangeText={text => { this.setState({password: text})}}
                    value={this.state.password}
                    name="password"
                    type="password"
                />
                <Input
                    placeholder="Enter password again"
                    onChangeText={text => { this.setState({passwordAgain: text})}}
                    value={this.state.passwordAgain}
                    name="passwordAgain"
                    type="password"
                />
                <Button 
                    title="Create Account"
                    onPress={()=> this.createAccount()}/>
                <Button 
                    title="Already have an account? Log in."
                    type="clear"
                    onPress={() => this.loginOnpressHanlder()}
                />
                <Text>{this.state.firstName}</Text>
            </View>
        )
    }
}

export default Signup