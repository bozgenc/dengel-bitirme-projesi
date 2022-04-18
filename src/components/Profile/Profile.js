import React, { Component } from 'react';
import {StyleSheet, Text, View, Dimensions, ScrollView, TextInput, Button, TouchableOpacity, Image, Alert} from 'react-native';
import {Header, Left, Right} from "native-base"
import { GoogleSignin, GoogleSigninButton, statusCodes } from 'react-native-google-signin';
import AsyncStorage from '@react-native-async-storage/async-storage';


var screen = Dimensions.get('window');
var url = "http://localhost:5000/"

export default class Profile extends  Component {
    constructor() {
        super();
        this.state = {
            id: -1,
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
            userTckn: "",
        }
    }

    componentDidMount =  async () => {
        let id = await AsyncStorage.getItem("userId");
        let tckn = await AsyncStorage.getItem("userTckn") + "";

        try {
            const response = await fetch(url + 'getUser/' + tckn).then()
            const userObject = await response.json();
            let user = userObject[0];

            console.log(user);
            this.setState({
                name: user.first_name,
                surname: user.last_name,
                email: user.email,
                password: user.password,
                id: user.id,
                userTckn: tckn,
            })

        } catch (e) {
            console.log(e.message())
        }
    }

    toggleEdit = () => {
        var editableOld = this.state.editable
        this.setState({
            editable: !editableOld
        })
    }

    onSubmit = async () => {
        if(this.state.newName == '' || this.state.newSurname == '' ||this.state.newEmail == '') {
            Alert.alert(
                'Bilgilendirme ',
                'Eksik alanları doldurmadan kayıt yapamazsınız. Lütfen tüm kutucukları doldurun.',
                [
                    {text: 'OK', onPress: () => console.log("closed dialog")},
                ],
                {cancelable: false},
            );
        }
        else if (this.state.newPassword != this.state.newPasswordConfirm) {
            Alert.alert(
                'Bilgilendirme ',
                'Girdiğiniz parolalar eşleşmiyor.',
                [
                    {text: 'OK', onPress: () => console.log("closed dialog")},
                ],
                {cancelable: false},
            );
        }
        else {
            let userNew = {
                name: this.state.newName,
                surname: this.state.newSurname,
                email: this.state.newEmail,
                password: this.state.newPassword,
            }
            try {
                const body = userNew
                const response = fetch(url + "updateUser/" + this.state.id, {
                    method: 'PUT',
                    headers: {'Content-Type' : 'application/json' },
                    body: JSON.stringify(body)
                })
                Alert.alert(
                    'Bilgilendirme ',
                    'Değişiklikler kaydedildi.',
                    [
                        {text: 'OK', onPress: () => this.props.navigation.navigate('Anasayfa  ')},
                    ],
                    {cancelable: false},
                );

            } catch (e) {
                console.log(e.message);
            }

            // databasede değişiklikler yapılacak
        }
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

                        <Text style = {{marginTop: 10, fontSize: 30, fontFamily: "Helvetica-Bold"}}>Profil</Text>

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

                    <View style={styles.cardStyle}>
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
                    <View style = {{alignItems: 'center',  backgroundColor: '#efebeb',  borderRadius: 15, width: screen.width * 96.6 / 100,  marginLeft: 6,
                    }}>
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
    },
    cardStyle: {
        backgroundColor: '#efebeb',
        borderRadius: 15,
        //height: 400,
        width: screen.width * 96.6 / 100,
        shadowColor: 'black',
        shadowOpacity: .2,
        shadowRadius: 5,
        marginTop: 20,
        marginLeft: 6,
        alignItems: 'center'
    }
})
