import React, { Component } from 'react';
import {StyleSheet, Text, View, Dimensions, ScrollView, TextInput, Button, TouchableOpacity, Image, Alert} from 'react-native';
import {Header, Left, Right} from "native-base"
import DeviceInfo from 'react-native-device-info';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {BallIndicator, BarIndicator, DotIndicator, MaterialIndicator, PacmanIndicator, PulseIndicator, SkypeIndicator, UIActivityIndicator, WaveIndicator,} from 'react-native-indicators';
import MainScreenUser from "../MainScreenUser/MainScreenUser";
import { GoogleSignin, statusCodes } from 'react-native-google-signin';

var screen = Dimensions.get('window');

//https://enappd.com/blog/google-login-in-react-native-android-apps-with-firebase/90/

export default class Logout extends Component {
    constructor() {
        super();
        this.state = {
            renderLoading: true,
        };
    }

    componentDidMount = async() => {
        const isLoggedIn = await AsyncStorage.getItem('isLoggedIn');
        if(isLoggedIn == "false") {
            //error
        }
        this.setState({
            renderLoading: false,
        })
        GoogleSignin.configure({
            webClientId: '50768797639-balvndqlqktdtks061taihf6dq34mc3n.apps.googleusercontent.com',
          });
    }

    signOut = async () => {
        try {
          await GoogleSignin.revokeAccess();
          await GoogleSignin.signOut();
          this.setState({ user: null, loggedIn: false }); // Remember to remove the user from your app's state as well
        } catch (error) {
          console.error(error);
        }
        finally{
            if(this.state.loggedIn==false)
                AsyncStorage.setItem("isLoggedIn", "false").then(this.props.navigation.navigate('Login'));
        }
    };
    

    render() {
        let area;
        if(DeviceInfo.getSystemName()=="Android"){
            area =  <TouchableOpacity
                        disabled={this.state.signUpButtonDisabled}
                        onPress={() => this.signOut()}
                    >
                        <View style={styles.button}>
                            <Text style={{
                                fontSize: 18,
                                color: 'white',
                                textAlign: 'center',
                                paddingTop: 5,
                                paddingBottom: 5,
                                fontWeight: 'bold',
                            }}>
                            Log out
                            </Text>
                        </View>
                    </TouchableOpacity>
        }
        if(this.state.renderLoading) {
            return(
                <PacmanIndicator color='black'/>
            );
        }
        else {
            return (
                <View>
                {area}
                </View>
            );
        }
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#4d738d',
    },
    text: {
        fontSize: 40,
        fontWeight: 'bold',
        textAlign: 'left',
        marginLeft: 20,
        marginTop: 100,
        color: 'black',
        //fontFamily: 'Helvetica-Bold',
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        width: '70%',
        borderWidth: 2,
        borderColor: '#383838',
        borderRadius: 10,
        height: 45,
        backgroundColor: '#4d738d',
        marginTop: 10,
        marginLeft: (screen.width * 0.3) / 2,
        fontFamily: 'Helvetica-Bold',
    },
    image: { //iphone 6 7 8 için
        width: 185,
        height: 185,
        resizeMode: 'contain',
    },
    imageForBiggerDevices: {
        width: 200,
        height: 200,
        resizeMode: 'contain',
    },
    imageForSmallDevices: { // SE icin falan
        width: 150,
        height: 150,
        resizeMode: 'contain',
    },
    imageLogo: {
        width: 75,
        height: 75,
        resizeMode: 'contain',
        marginTop: 40,
    }
});

