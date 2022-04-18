import React, { Component } from 'react';
import {StyleSheet, Text, View, Dimensions, ScrollView, TextInput, Button, TouchableOpacity, Image, Alert, FlatList} from 'react-native';
import {Header, Left, Right} from "native-base"
import {SearchBar} from "react-native-elements";

import AsyncStorage from "@react-native-async-storage/async-storage";

var screen = Dimensions.get('window');
var url = "http://192.168.1.23:5000/"


export default class FreeMeetingSearch extends  Component {
    constructor() {
        super();
        this.state = {
            sessionsRaw: [],
            sessionRawBackup: [],
            searchingFor: ''
        };
    }

    componentDidMount = async () => {
        try {
            const response = await fetch(url +'getFreeSessions/').then()
            const sessions = await response.json();

            let temp = [];
            for(let i = 0; i < sessions.length; i++) {
                console.log(sessions[i].expert_id)

                const response2 = await fetch(url +'getUserById/' + parseInt(sessions[i].expert_id)).then()
                const user = await response2.json();

                console.log(user);
                let session = {
                    sessionId: sessions[i].session_id,
                    expertId: sessions[i].expert_id,
                    sessionTitle: sessions[i].session_title,
                    sessionTime: sessions[i].session_time,
                    expertName: user[0].first_name,
                    expertSurname: user[0].last_name,
                }
                console.log(session);
                temp.push(session);
            }

            this.setState({
                sessionsRaw: temp,
                sessionsRawBackup: temp
            })

        }
        catch (e) {
            console.log(e.message)
        }
    }


    onFilter = (text) => {
        this.setState({searchingFor: text})
        text = text.toLocaleUpperCase("TR");
        var textTurkceKarakter = text.replace(/s/g, "ş").replace(/i/g, "ı").replace(/c/g, "ç").replace(/u/g, "ü").replace(/g/g, "ğ").replace(/o/g, "ö");

        let updatedList = this.state.sessionsRawBackup.filter(function(item) {
            return item.sessionTitle.replace("İ", "I").toLocaleUpperCase().includes(text) || item.expertName.toLocaleUpperCase().includes(textTurkceKarakter)
                || item.expertName.toLocaleUpperCase().includes(text) || item.expertSurname.toLocaleUpperCase().includes(textTurkceKarakter)
                || item.expertSurname.toLocaleUpperCase().includes(text)
        })

        this.setState({
            sessionsRaw: updatedList
        })
    }

    setData() {

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

                        <Text style = {{marginTop: 10, fontSize: 20, fontFamily: "Helvetica-Bold"}}>Ücretsiz Terapi</Text>

                        <Right>
                        </Right>
                    </Header>
                </View>

                <SearchBar placeholder=" Terapi Ara... " lightTheme round
                           containerStyle={{backgroundColor: '#faf8f8', width: screen.width, marginRight: 20}}
                           inputContainerStyle={{backgroundColor: '#e3dddd',}}
                           value={this.state.searchingFor}
                           onChangeText={(text) => {
                               this.onFilter(text);
                           }}
                           autoCorrect={false}
                />

                <View style = {{
                    flex: 1,
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'flex-start',
                    marginLeft: 4.3,
                    marginRight: 10,
                    height: screen.height,
                    backgroundColor: '#faf8f8'
                }}>
                    <FlatList
                        style = {{flex: 0}}
                        initialNumToRender={50}
                        directionalLockEnabled={true}
                        showsVerticalScrollIndicator={true}
                        showsHorizontalScrollIndicator={false}
                        keyExtractor={(item) => item.expertId + " " + item.sessionId}
                        data={this.state.sessionsRaw}
                        renderItem={({item}) =>  (
                            <TouchableOpacity
                                onPress={() => {
                                    AsyncStorage.setItem("expertIdForSessionDetail", item.expertId + "").then()
                                    AsyncStorage.setItem("sessionIdForSessionDetail", item.sessionId + "").then(
                                        this.props.navigation.navigate('ÜcretsizTerapiDetails')
                                    )
                                }}
                            >
                                <View style={styles.arrayItem}>
                                    <Text style={styles.textStyle}>{item.sessionTitle} </Text>
                                    <Text style={styles.textStyle2}>{item.expertName } {item.expertSurname} </Text>
                                </View>
                            </TouchableOpacity>
                        )}/>
                </View>


            </View>
        );
    }
}

const styles = StyleSheet.create({
    arrayItem: {
        marginTop: 5,
        paddingVertical: 2,
        paddingHorizontal: 15,
        backgroundColor: '#efebeb',
        borderRadius: 10,
        height: 50,
        width: screen.width * 96.6 / 100,
    },
    textStyle: {
        marginTop: 5,
        marginLeft: 4,
        fontSize: 12,
        fontFamily: 'HelveticaNeue-Medium'
    },
    textStyle2: {
        marginTop: 5,
        marginLeft: 4,
        fontSize: 12,
        fontFamily: 'HelveticaNeue-Thin',
        color: 'black'
    }
});

