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
import SignInList from "../SignInList/SignInList";
import ViewList from "../ViewList/ViewList";
import Settings from "../Settings/Settings";
import Profile from "../Profile/Profile";
import Logout from "../Logout/Logout";
import Notifications from "../Notifications/Notifications";
import NotificationDetail from "../Notifications/NotificationDetail"
import LiveMeeting from "../Meetings/LiveMeeting";
import FirstLoginTest from "../FirstLoginTest/FirstLoginTest";
import Details from "../DetailPage/Detailpage";
import OKB from "../BeckTests/OKB/OKB";
import SOM from "../BeckTests/SOM/SOM";
import DEP from "../BeckTests/DEP/DEP";
import INT from "../BeckTests/INT/INT";
import PSY from "../BeckTests/PSY/PSY";
import PAR from "../BeckTests/PAR/PAR";
import ANX from "../BeckTests/ANX/ANX";
import HOS from "../BeckTests/HOS/HOS";
import PHOB from "../BeckTests/PHOB/PHOB";
import StartTest from "../BeckTests/StartTest";
import Definition from "../BeckTests/Definitions";
import Suggestions from "../BeckTests/Suggestions";
import Diary from "../Diary/Diary";
import EndTest from "../BeckTests/EndTest";
import Patients from "../ExpertPages/Patients/Patients";

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
            <Drawer.Screen name="Expert Meeting Create" component={SignInList} options={{unmountOnBlur:true}}/>
            <Drawer.Screen name="Professional Meetings" component={ViewList} options={{unmountOnBlur:true}}/>
            <Drawer.Screen name="Log out" component={Logout} options={{unmountOnBlur:true}}/>
            <Drawer.Screen name="First Login Test" component={FirstLoginTest} options={{unmountOnBlur:true}}/>
            <Drawer.Screen name="Details" component={Details} options={{unmountOnBlur:true, drawerItemStyle: { height: 0 }}}/>
            <Drawer.Screen name="Suggestions" component={TestTabs} options={{unmountOnBlur:true}}/>
            <Drawer.Screen name="Definition" component={Definition} options={{unmountOnBlur:true}}/>
            <Drawer.Screen name="Patients" component={Patients} options={{unmountOnBlur:true}}/>
        </Drawer.Navigator>
    );
}

function TestTabs(){
    return(
        <Drawer.Navigator
            screenOptions={{
                headerShown: false,
                lazy: true,
                inactiveTintColor: 'black',
                activeTintColor: '#d0c6c6'
            }}
        >
        <Drawer.Screen name="Suggestions_" component={Suggestions} options={{unmountOnBlur:true}}/>
        <Drawer.Screen name="StartTest_" component={StartTest} options={{unmountOnBlur:true}}/>
        <Drawer.Screen name="Anx_" component={ANX} options={{unmountOnBlur:true}}/>
        <Drawer.Screen name="Dep_" component={DEP} options={{unmountOnBlur:true}}/>
        <Drawer.Screen name="Som_" component={SOM} options={{unmountOnBlur:true}}/>
        <Drawer.Screen name="Psy_" component={PSY} options={{unmountOnBlur:true}}/>
        <Drawer.Screen name="Hos_" component={HOS} options={{unmountOnBlur:true}}/>
        <Drawer.Screen name="Par_" component={PAR} options={{unmountOnBlur:true}}/>
        <Drawer.Screen name="Okb_" component={OKB} options={{unmountOnBlur:true}}/>
        <Drawer.Screen name="Phob_" component={PHOB} options={{unmountOnBlur:true}}/>
        <Drawer.Screen name="Int_" component={INT} options={{unmountOnBlur:true}}/>
        <Drawer.Screen name="EndTest" component={EndTest} options={{unmountOnBlur:true}}/>
        <Drawer.Screen name="Home_" component={Home} options={{unmountOnBlur:true}}/>
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
          <Tab.Screen name='Anasayfa' component={MainScreenStack}/>
          <Tab.Screen name='Bildirimler' component={NotificationTab}/>
      </Tab.Navigator>
    );
}

function MainScreenStack() {
    return (
        <Stack.Navigator
            lazy = {true}
            screenOptions={{
                headerShown: false
            }}
        >
            <Stack.Screen name='Ana sayfa' component={MainScreenUser}/>
            <Stack.Screen name='Live Meeting' component={LiveMeeting}/>
        </Stack.Navigator>
    )
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
