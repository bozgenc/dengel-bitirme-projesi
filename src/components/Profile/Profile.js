import React, { Component } from 'react';
import {StyleSheet, Text, View, Dimensions, ScrollView, TextInput, Button, TouchableOpacity, Image, Alert} from 'react-native';
import {Header, Left, Right} from "native-base"
import { GoogleSignin, GoogleSigninButton, statusCodes } from 'react-native-google-signin';
import AsyncStorage from '@react-native-async-storage/async-storage';


var screen = Dimensions.get('window');

export default class Profile extends  Component {
    constructor() {
        super();
        this.state = {
            name: '',
            surname: '',
            email: '',
            password: '',
            editable: false,
            newName: '',
            newSurname: '',
            newEmail: '',
            newPassword: '',
            newPasswordConfirm: '',
        }
    }

    componentDidMount =  async () => {
        let  n =  await AsyncStorage.getItem("name") ?? "Baran";
        let sur = await AsyncStorage.getItem("surname") ?? "Özgenç";
        let e =   await AsyncStorage.getItem("email") ?? "bozgenc@gmail.com";

        this.setState({
            name: n,
            surname: sur,
            email: e,
            password: 'PASSWORD'
        })
    }

    toggleEdit = () => {
        var editableOld = this.state.editable
        this.setState({
            editable: !editableOld
        })
    }

    onSubmit = async () => {
        await AsyncStorage.setItem("name", this.state.newName);
        await AsyncStorage.setItem("surname", this.state.newSurname);
        await AsyncStorage.setItem("email", this.state.newEmail);

        this.setState({
            name: this.state.newName,
            surname: this.state.newSurname,
            email: this.state.newEmail,
        }, () => {
            Alert.alert(
                'Bilgilendirme ',
                'Değişiklikler Kaydedildi.',
                [
                    {text: 'OK', onPress: () => this.props.navigation.navigate('Home')},
                ],
                {cancelable: false},
            );
        })

        // databasede değişiklikler yapılacak
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

                <View style =  {{flexDirection: 'column'}}>
                    <View style = {styles.editButton}>
                        <TouchableOpacity style={styles.buttonStyle} onPress={this.toggleEdit}>
                            <Text style={styles.textStyle}>
                                {this.state.editable ? "Vazgeç" : "Düzenle"}
                            </Text>
                        </TouchableOpacity>
                    </View>

                    <View style={{
                        alignItems: 'center'
                    }}>
                        <Text style = {styles.labelStyle}>
                            İsim
                        </Text>
                        <TextInput
                            style={styles.input}
                            editable={this.state.editable}
                            placeholder={this.state.name}
                            placeholderTextColor="grey"
                            textAlign='center'
                            maxLength={20}
                            autoCorrect={false}
                            returnKeyType={'done'}
                            onChangeText={(text) => {
                                this.setState({newName: text})
                            }}
                        />
                        <Text style = {styles.labelStyle}>
                            Soyisim
                        </Text>
                        <TextInput
                            style={styles.input}
                            editable={this.state.editable}
                            placeholder={this.state.surname}
                            placeholderTextColor="grey"
                            textAlign='center'
                            maxLength={20}
                            autoCorrect={false}
                            returnKeyType={'done'}
                            onChangeText={(text) => {
                                this.setState({newSurname: text})
                            }}
                        />
                        <Text style = {styles.labelStyle}>
                            Email
                        </Text>
                        <TextInput
                            style={styles.input}
                            editable={this.state.editable}
                            placeholder={this.state.email}
                            placeholderTextColor="grey"
                            textAlign='center'
                            maxLength={20}
                            autoCorrect={false}
                            returnKeyType={'done'}
                            onChangeText={(text) => {
                                this.setState({newEmail: text})
                            }}
                        />
                        <Text style = {styles.labelStyle}>
                            Parola
                        </Text>
                        <TextInput
                            style={styles.input}
                            editable={this.state.editable}
                            placeholder={"............"}
                            placeholderTextColor="grey"
                            secureTextEntry={true}
                            textAlign='center'
                            maxLength={20}
                            autoCorrect={false}
                            returnKeyType={'done'}
                            onChangeText={(text) => {
                                this.setState({newPassword: text})
                            }}
                        />
                        <Text style = {this.state.editable ? styles.labelStyle : styles.labelStyleHidden}>
                            Parola Onayı
                        </Text>
                    </View>
                    <View style = {{alignItems: 'center', backgroundColor: 'black', height: 0}}>
                        <TextInput
                            style={this.state.editable ? styles. input : styles.passwordConfirmHidden}
                            editable={this.state.editable}
                            placeholder={"............"}
                            placeholderTextColor="grey"
                            secureTextEntry={true}
                            textAlign='center'
                            maxLength={20}
                            autoCorrect={false}
                            returnKeyType={'done'}
                            onChangeText={(text) => {
                                this.setState({newPasswordConfirm: text})
                            }}
                        />
                        <TouchableOpacity
                            onPress={() => this.onSubmit()}
                        >
                            <View style={this.state.editable ? styles.submitButton : styles.submitButtonHidden}>
                                <Text style={{
                                    fontSize: 14,
                                    color: 'white',
                                    textAlign: 'center',
                                    paddingTop: 0,
                                    fontWeight: 'bold',
                                }}>
                                    Değişiklikleri Kaydet
                                </Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    editButton: {
        alignItems: 'flex-end',
        marginRight: 15,
        marginTop: 15,
    },
    textStyle: {
        fontWeight: 'bold',
        fontSize: 14,
        textAlign: 'center',
        paddingTop: 8,
    },
    buttonStyle: {
        backgroundColor: '#d6d6d6',
        height: 40,
        width: 100,
        borderColor: 'grey',
        borderRadius: 15,
    },
    input: {
        alignItems: 'center',
        fontFamily: 'Helvetica-Bold',
        borderWidth: 2,
        borderColor: '#383838',
        borderRadius: 10,
        height: 35,
        marginTop: 10,
        //marginLeft: -screen.width / 10,
        width: '90%',
        textAlign: 'left',
    },
    labelStyle: {
        paddingTop: 8,
        fontWeight: 'bold',
        fontSize: 14,
    },
    labelStyleHidden: {
        height: 0,
        paddingTop: 8,
        fontWeight: 'bold',
        fontSize: 14,
    },
    passwordConfirmHidden: {
        height: 0,
    },
    submitButton: {
        alignItems: 'center',
        justifyContent: 'center',
        width: screen.width * 0.5,
        borderWidth: 2,
        borderColor: '#383838',
        borderRadius: 10,
        height: 35,
        backgroundColor: '#4d738d',
        marginTop: 10,
        fontFamily: 'Helvetica-Bold',
    },
    submitButtonHidden: {
        height: 0
    }
})
