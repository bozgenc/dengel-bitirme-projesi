import React, { Component } from 'react';
import {StyleSheet, Text, View, Dimensions, ScrollView, TextInput, Button, TouchableOpacity, Image, Alert} from 'react-native';
import {Header, Left, Right} from "native-base"
import { GoogleSignin, GoogleSigninButton, statusCodes } from 'react-native-google-signin';

export default class Profile extends  Component {
    constructor() {
        super();
        this.state = {
            name: '',
            surname: '',
            email: '',
            password: '',
        }
    }

    componentDidMount =  async () => {
        this.setState({
            name: 'Baran',
            surname: 'Özgenç',
            email: 'bozgenc@gmail.com',
            password: 'PASSWORD'
        })
    }

    render() {
        return (
            <View style = {{flex: 1, backgroundColor: "#faf8f8"}}>
                <View>
                    <Header style = {{backgroundColor: 'white', borderBottomWidth: 2, borderBottomColor: '#f18a21'}} >
                        <Left>
                            <TouchableOpacity
                                onPress={() => this.props.navigation.openDrawer()}
                                style={{color: "black" }}
                            >
                                <Text style = {{marginLeft: 10, fontSize: 30, color: '#B00D23'}}>
                                    ≡
                                </Text>
                            </TouchableOpacity>
                        </Left>

                        <Text style = {{marginTop: 10, fontSize: 30, fontFamily: "Helvetica-Bold"}}>Profile</Text>

                        <Right>
                        </Right>
                    </Header>
                </View>

                <View style={{
                    flex: 1,
                    justifyContent: 'flex-start',
                    alignItems: 'flex-start',
                    marginLeft:20
                    }}>
                    <Text style={{textAlign: 'center', fontSize: 20, marginTop: 20 }}>
                        İsim: {this.state.name}
                    </Text>
                    <Text style={{textAlign: 'center', fontSize: 20, marginTop: 20 }}>
                        Soyisim: {this.state.surname}
                    </Text>
                    <Text style={{textAlign: 'center', fontSize: 20, marginTop: 20 }}>
                        E-mail: {this.state.email}
                    </Text>
                    <Text style={{textAlign: 'center', fontSize: 20, marginTop: 20 }}>
                        Password: {this.state.password}
                    </Text>
                </View>
            </View>
        );
    }
}
