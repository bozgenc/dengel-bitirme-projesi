import React, { Component } from 'react';
import {StyleSheet, Text, View, Dimensions, ScrollView, TextInput, Button, FlatList, TouchableOpacity, Image, Alert} from 'react-native';
import {Header, Left, Right} from "native-base";
import AsyncStorage from '@react-native-async-storage/async-storage';

var screen = Dimensions.get('window');

var response = [];
var jsonData = [];
export default class Detailpage extends  Component {

    constructor() {
        super();
        this.state = {
            name: "",
            last_name: "",
            skills: "",
            description: "",
            sessions: []

        }
    }
    
    componentDidMount =  async () => {
        var ans = await AsyncStorage.getItem('uzmanId');
        try {
            response = await fetch("http://192.168.1.34:5000/Get_session");
            jsonData = await response.json();
            console.log(jsonData);
        }
        catch (e) {
            console.log(e.message);
        }
        var sessionArr = [];
        for(var i = 0; i < jsonData.length; i++) {
            if (jsonData[i].expert_id == ans) {
                sessionArr.push(jsonData[i]);
            }

        }
        try {
            response = await fetch("http://192.168.1.34:5000/User_experts");
            jsonData = await response.json();
        }
        catch (e) {
            console.log(e.message);
        }
        var nameGet = "";
        var last_nameGet = "";
        var skillsGet = [];
        var descriptionGet = "";
        for(var i = 0; i < jsonData.length; i++) {
            if (jsonData[i].expert_id == ans) {
                nameGet = jsonData[i].first_name;
                last_nameGet = jsonData[i].last_name;
                skillsGet = jsonData[i].specialties;
                descriptionGet = jsonData[i].description;
            }

        }
        var skillsStr = "";
        for (var i = 0; i < skillsGet.length; i++) {
            if (i < skillsGet.length-1)
                skillsStr += skillsGet[i] + ", ";
            else
                skillsStr += skillsGet[i];
        }
        this.setState({
            name: nameGet,
            last_name: last_nameGet,
            skills: skillsStr,
            description: descriptionGet,
            sessions : sessionArr
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

                        <Text style = {{marginTop: 10, fontSize: 30, fontFamily: "Helvetica-Bold"}}>Uzman Detayı</Text>

                        <Right>
                            <TouchableOpacity
                                onPress={() => this.props.navigation.goBack()}
                                style={{color: "black"}}
                            >
                                <Text style={{marginLeft: 10, fontSize: 33, color: '#B00D23', marginRight: 6}}>
                                 {"<"}
                                </Text>
                            </TouchableOpacity>
                        </Right>
                    </Header>
                </View>

                <View style={{flex: 1}}>
                <View style =  {{flexDirection: 'column'}}>
                    <View style={{
                        alignItems: 'center'
                    }}>
                        <Text style = {styles.labelStyle}>
                            İsim
                        </Text>
                        <TextInput
                            style={styles.input}
                            editable={false}
                            placeholder={this.state.name}
                            placeholderTextColor="grey"
                            textAlign='center'
                            maxLength={20}
                            autoCorrect={false}
                            returnKeyType={'done'}
                        />
                        <Text style = {styles.labelStyle}>
                            Soyisim
                        </Text>
                        <TextInput
                            style={styles.input}
                            editable={false}
                            placeholder={this.state.last_name}
                            placeholderTextColor="grey"
                            textAlign='center'
                            maxLength={20}
                            autoCorrect={false}
                            returnKeyType={'done'}
                        />
                        <Text style = {styles.labelStyle}>
                            Alanı
                        </Text>
                        <TextInput
                            style={styles.input}
                            editable={false}
                            placeholder={this.state.skills}
                            placeholderTextColor="grey"
                            textAlign='center'
                            maxLength={20}
                            autoCorrect={false}
                            returnKeyType={'done'}
                        />
                        <Text style = {styles.labelStyle}>
                            Açıklama
                        </Text>
                        <TextInput
                            style={styles.input}
                            editable={false}
                            placeholder={this.state.description}
                            placeholderTextColor="grey"
                            textAlign='center'
                            maxLength={20}
                            autoCorrect={false}
                            returnKeyType={'done'}
                        />
                    </View>
                    
                </View>
                </View>

                <View style={{
                    flex: 1,
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'flex-start',
                    marginLeft: 4.3,
                    marginRight: 10,
                    height: screen.height,
                    backgroundColor: '#faf8f8'
                }}>
                    <Text style = {styles.labelStyle}>
                        Toplantıları
                    </Text>
                    <FlatList
                        style = {{flex: 0}}
                        initialNumToRender={3}
                        directionalLockEnabled={true}
                        showsVerticalScrollIndicator={true}
                        showsHorizontalScrollIndicator={false}
                        keyExtractor={(item) => item.session_id}
                        data={this.state.sessions}
                        renderItem={({item,index}) => (
                            <TouchableOpacity
                            key={index}
                            onPress={ async () => {}}
                            >
                                <View style={styles.arrayItem}>
                                    <Text style={styles.textStyleList}>{"Tarih: "} {item.session_date} </Text>
                                </View>
                            </TouchableOpacity>
                        )}/>
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
    arrayItem: {
        marginTop: 10,
        paddingVertical: 2,
        paddingHorizontal: 15,
        backgroundColor: '#efebeb',
        borderRadius: 10,
        height: 60,
        width: screen.width * 96.6 / 100,
    },
    textStyleList: {
        marginLeft: 4,
        fontSize: 12,
        fontWeight: 'bold'
    },
    textStyle2List: {
        marginTop: 5,
        marginLeft: 4,
        fontSize: 12,
        color: 'black'
    }
})