import React, { Component } from 'react';
import {StyleSheet, Text, View, Dimensions, ScrollView, TextInput, Button, TouchableOpacity, Image, Alert} from 'react-native';
import {Header, Left, Right} from "native-base"
import AsyncStorage from "@react-native-async-storage/async-storage";

export default class MainScreenUser extends  Component {

    componentDidMount = async () => {
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

                      <Text style = {{marginTop: 10, fontSize: 30, fontFamily: "Helvetica-Bold"}}>Home</Text>

                      <Right>
                      </Right>
                  </Header>
              </View>

              <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                  <Text style={{textAlign: 'center', fontSize: 40,}}>
                      Main Screen
                  </Text>
              </View>
          </View>
        );
    }
}
