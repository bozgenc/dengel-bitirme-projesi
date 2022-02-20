import React, { Component } from 'react';
import {StyleSheet, Text, View, Dimensions, ScrollView, TextInput, Button, TouchableOpacity, Image, Alert} from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {createDrawerNavigator} from "@react-navigation/drawer";


const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

import Login from "../Login/Login";
import MainScreenUser from "../MainScreenUser/MainScreenUser";
import MeetingSearch from "../MeetingSearch/MeetingSearch";
import Settings from "../Settings/Settings";
import Profile from "../Profile/Profile";
import Logout from "../Logout/Logout";

function Home() {
    return (
        <Drawer.Navigator
            screenOptions={{
                headerShown: false,
                lazy: true,
                inactiveTintColor: 'black',
                activeTintColor: '#d0c6c6'
            }}
        >
            <Drawer.Screen name="Home" component={MainScreenUser}/>
            <Drawer.Screen name="Profile" component={Profile}/>
            <Drawer.Screen name="Search For Meetings" component={MeetingSearch}/>
            <Drawer.Screen name="Settings" component={Settings}/>
            <Drawer.Screen name="Log out" component={Logout}/>

        </Drawer.Navigator>
    );
}
export default class Routes extends Component {

    render() {
        return (
            <NavigationContainer>
                <Stack.Navigator
                    lazy = {true}
                    screenOptions={{
                        headerShown: false
                    }} >
                    <Stack.Screen name="Login" component={Login}/>
                    <Stack.Screen name="Anasayfa" component={Home}/>
                </Stack.Navigator>
            </NavigationContainer>
        );
    }
}
