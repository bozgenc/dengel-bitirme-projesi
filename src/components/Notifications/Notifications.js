import React, { Component } from 'react';
import {StyleSheet, Text, View, Dimensions, ScrollView, TextInput, Button, TouchableOpacity, Image, Alert, FlatList} from 'react-native';
import {Header, Left, Right} from "native-base"
import AsyncStorage from "@react-native-async-storage/async-storage";

var screen = Dimensions.get('window');

export default class Notifications extends  Component {
    constructor() {
        super();
        this.state = {
            notifications: []
        }
    }

    componentDidMount =  async () => {
        let notifications = [
            {
                id: 0,
                name: '1 Yeni Bildirim',
                details: 'Depresyon',
                time: '01.01.2021',
                date: '20.30',
            },
            {
                id: 1,
                name: '1 Yeni Bildirim',
                details: 'Yas',
                time: '01.01.2021',
                date: '20.30',
            },
            {
                id: 2,
                name: '1 Yeni Bildirim',
                details: 'Korku',
                time: '01.01.2021',
                date: '20.30',
            }
        ];
        this.setState({
            notifications: notifications
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

                        <Text style = {{marginTop: 10, fontSize: 30, fontFamily: "Helvetica-Bold"}}>Notifications</Text>

                        <Right>
                        </Right>
                    </Header>
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
                    <FlatList
                        style = {{flex: 0}}
                        initialNumToRender={3}
                        directionalLockEnabled={true}
                        showsVerticalScrollIndicator={true}
                        showsHorizontalScrollIndicator={false}
                        keyExtractor={(item) => item.id}
                        data={this.state.notifications}
                        renderItem={({item}) => (
                            <TouchableOpacity
                                onPress={() => {
                                    AsyncStorage.setItem("notificationId", item.id + "").then(this.props.navigation.navigate('BildirimDetayi'))
                                }}
                            >
                                <View style={styles.arrayItem}>
                                    <Text style={styles.textStyleList}>{item.details}, {item.name} </Text>
                                    <Text style={styles.textStyle2List}>{item.time} , {item.date} </Text>
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
    textStyleList: {
        marginTop: 5,
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
});
