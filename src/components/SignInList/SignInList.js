import React, { Component } from 'react';
import {StyleSheet, Text, View, Dimensions, ScrollView, TextInput, Button, TouchableOpacity, Image, Alert} from 'react-native';
import {Header, Left, Right} from "native-base"

var screen = Dimensions.get('window');

export default class SignInList extends  Component {
    constructor() {
        super();
        this.state = {
            isLoading: true,
            imageChoose: 0,
            name: '',
            surname: '',
            email: '',
            password: '',
            passwordConfirmFieldEnabled: false,
            passwordConfirm: '',
            signUpButtonDisabled: true,
            errorBorderForMail: false,
            errorBorderForPassword: false,
            passAuth1: false,
            passAuth2: false,
            renderLoading: true,
            loggedIn: false,
            userExist: false,
            payment: 0,
            profession: ''
        };
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

                        <Text style = {{marginTop: 10, fontSize: 30, fontFamily: "Helvetica-Bold"}}>Listeye Ekle</Text>

                        <Right>
                        </Right>
                    </Header>
                </View>

                <View>
                    <View style = {{alignItems:'center',}}>
                    {
                        <TextInput
                            style={styles.input}
                            placeholder="Uzmanlık Alanı"
                            textAlign='center'
                            maxLength={50}
                            autoCorrect={false}
                            returnKeyType={'done'}
                            onChangeText={(text) => {
                                this.setState({profession: text});
                            }}
                        />
                    }
                    </View>

                    <View style = {{alignItems: 'center'}}>
                    {
                        <TextInput
                            style={styles.input}
                            placeholder="Ücret"
                            textAlign='center'
                            maxLength={50}
                            autoCorrect={false}
                            returnKeyType={'done'}
                            keyboardType={'numeric'}
                            onChangeText={(text) => {
                                text = text.replace(/[^0-9]/g, ''),
                                this.setState({payment: text});
                            }}
                        />
                    }
                    </View>

                    <View style={styles.button}>
                        <Text style={{
                            fontSize: 18,
                            color: 'white',
                            textAlign: 'center',
                            paddingTop: 0,
                            fontWeight: 'bold',
                        }}>
                            {'Ekle'}
                        </Text>
                    </View>

                </View>
            </View>
        );
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
    input: {
        //alignItems: 'center',
        fontFamily: 'Helvetica-Bold',
        borderWidth: 2,
        borderColor: '#383838',
        borderRadius: 10,
        height: 50,
        marginTop: 20,
        marginLeft: 1,
        width: '90%',
        textAlign: 'center'
    },
    inputError: {
        alignItems: 'center',
        fontFamily: 'Helvetica-Bold',
        borderWidth: 2,
        borderColor: '#B00D23',
        borderRadius: 10,
        height: 35,
        marginTop: 5,
        marginLeft: -screen.width / 10,
        width: '140%',
        textAlign: 'left',
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        width: '40%',
        borderWidth: 2,
        borderColor: '#383838',
        borderRadius: 10,
        height: 35,
        backgroundColor: '#4d738d',
        marginTop: 20,
        marginLeft: (screen.width - screen.width * 0.4) / 2,
        fontFamily: 'Helvetica-Bold',
    }
});
