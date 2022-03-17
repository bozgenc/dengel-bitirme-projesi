import React, { Component } from 'react';
import {StyleSheet, Text, View, Dimensions, ScrollView, TextInput, Button, TouchableOpacity, Image, Alert} from 'react-native';
import {Header, Left, Right} from "native-base"
import AsyncStorage from "@react-native-async-storage/async-storage";

export default class NotificationDetails extends Component {
    constructor() {
        super();
        this.state = {
           notificationDetail: ""
        }
    }

    componentDidMount = async () => {
        let id = await AsyncStorage.getItem("notificationId").then();
        let message = "";

        if(id == "0")
            message = "Depresyon meetinginden gelen mesaj...";
        if(id == "1")
            message = "Yas meetinginden gelen mesaj...";
        if(id == "2")
            message = "Korku meetinginden gelen mesaj...";

        this.setState({
            notificationDetail: message
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

                                </Text>
                            </TouchableOpacity>
                        </Left>

                        <Text style = {{marginTop: 10, fontSize: 30}}> </Text>

                        <Right>
                        </Right>
                    </Header>
                </View>

                <View style={{flex: 1}}>
                    <Text style={{textAlign: 'left', fontSize: 16, marginTop: 10, marginLeft: 10 }}>
                        {this.state.notificationDetail}
                    </Text>
                </View>
            </View>
        );
    }
}
