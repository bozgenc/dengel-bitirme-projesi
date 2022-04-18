import React, { Component, useEffect, useState } from 'react';
import {StyleSheet, Text, View, Dimensions, ScrollView, TextInput, Button, TouchableOpacity, Image, Alert} from 'react-native';
import DeviceInfo from 'react-native-device-info';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { GoogleSignin, statusCodes } from 'react-native-google-signin';

var screen = Dimensions.get('window');
//https://enappd.com/blog/google-login-in-react-native-android-apps-with-firebase/90/

export default class Logout extends Component {
    constructor() {
        super();
        this.state = {
        };
    }

    componentDidMount = async () => {
        if (DeviceInfo.getSystemName() == 'Android') {
            GoogleSignin.configure({
                webClientId: '50768797639-balvndqlqktdtks061taihf6dq34mc3n.apps.googleusercontent.com',
            });
        }
    }

    logOut = async () => {
        if (DeviceInfo.getSystemName == "Android") {
            try {
                await GoogleSignin.revokeAccess();
                await GoogleSignin.signOut();
                this.setState({user: null, loggedIn: false}); // Remember to remove the user from your app's state as well
            } catch (error) {
                console.error(error);
            } finally {
                if (this.state.loggedIn == false)
                    AsyncStorage.setItem("isLoggedIn", "false").then(this.props.navigation.navigate('Login'));
            }
        } else {
             AsyncStorage.setItem("isLoggedIn", "false").then(this.props.navigation.navigate('Login'));
        }
    }

    cancelLogOut = async() => {
        this.props.navigation.navigate('Anasayfa  ');
    }

    render() {
        return (
            <View>
                {
                    Alert.alert(
                        'Emin misiniz? ',
                        'Oturum kapatılacaktır.',
                        [
                            {text: 'Evet', onPress: () => this.logOut()}, {
                            text: 'Hayır',
                            onPress: () => this.cancelLogOut()
                        },
                        ],
                        {cancelable: true},
                    )
                }
            </View>
        );
    }
}

const styles = StyleSheet.create({
   alertStyle: {
   }
});



