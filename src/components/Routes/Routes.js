import React, { Component } from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {createDrawerNavigator} from "@react-navigation/drawer";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();

import Login from "../Login/Login";
import MainScreenUser from "../MainScreenUser/MainScreenUser";
import MeetingSearch from "../MeetingSearch/MeetingSearch";
import Settings from "../Settings/Settings";
import Profile from "../Profile/Profile";
import Logout from "../Logout/Logout";
import Notifications from "../Notifications/Notifications";
import NotificationDetail from "../Notifications/NotificationDetail"
import FirstLoginTest from "../FirstLoginTest/FirstLoginTest";
import OKB from "../OKB/OKB";

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
            <Drawer.Screen name="Home" component={MainScreenTabs} options={{unmountOnBlur:true}}/>
            <Drawer.Screen name="Profile" component={Profile} options={{unmountOnBlur:true}}/>
            <Drawer.Screen name="Search For Meetings" component={MeetingSearch} options={{unmountOnBlur:true}}/>
            <Drawer.Screen name="Settings" component={Settings} options={{unmountOnBlur:true}}/>
            <Drawer.Screen name="Log out" component={Logout} options={{unmountOnBlur:true}}/>
            <Drawer.Screen name="First Login Test" component={FirstLoginTest} options={{unmountOnBlur:true}}/>
            <Drawer.Screen name="OKB" component={OKB} options={{unmountOnBlur:true}}/>
        </Drawer.Navigator>
    );
}

function MainScreenTabs() {
    return(
      <Tab.Navigator
          screenOptions={({ route }) => ({
              headerShown: false,
              tabBarIcon: ({ focused, color, size }) => {
                  let iconName;
                  if (route.name === 'Anasayfa') {
                      iconName = focused
                          ? 'home'
                          : 'home';
                  } else if (route.name === 'Bildirimler') {
                      iconName = focused ? 'notifications' : 'notifications';
                  }
                  return <Ionicons name={iconName} size={size} color={color} />;
              },
              tabBarActiveTintColor: '#B00D23',
              tabBarInactiveTintColor: 'gray',
          })}
      >
          <Tab.Screen name='Anasayfa' component={MainScreenUser}/>
          <Tab.Screen name='Bildirimler' component={NotificationTab}/>
      </Tab.Navigator>
    );
}

function NotificationTab() {
    return (
        <Stack.Navigator
            lazy = {true}
            screenOptions={{
                headerShown: false,
                presentation: 'modal'
            }}
        >
            <Stack.Screen name='Notification' component={Notifications}/>
            <Stack.Screen name='BildirimDetayi' component={NotificationDetail} />
        </Stack.Navigator>
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
                    <Stack.Screen name="Login" component={Login} options={{unmountOnBlur:true}}/>
                    <Stack.Screen name="Anasayfa" component={Home} options={{unmountOnBlur:true}}/>
                </Stack.Navigator>
            </NavigationContainer>
        );
    }
}
