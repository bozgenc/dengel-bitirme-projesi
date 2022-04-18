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
import FreeMeetingSearch from "../FreeMeetingSearch/FreeMeetingSearch";
import SessionCreate from "../SessionCreate/SessionCreate";
import Profile from "../Profile/Profile";
import Logout from "../Logout/Logout";
import Notifications from "../Notifications/Notifications";
import NotificationDetail from "../Notifications/NotificationDetail"
import LiveMeeting from "../Meetings/LiveMeeting";
import RatingTest from "../Rating/Rating";
import FirstLoginTest from "../FirstLoginTest/FirstLoginTest";
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
import ExpertInformationLogin from "../ExpertInformationLogin/ExpertInformationLogin";
import PrivateMeetingSearch from "../PrivateMeetingSearch/PrivateMeetingSearch";
import SessionDetails from "../SessionDetails/SessionDetails";

function Home() {
    return (
        <Drawer.Navigator
            screenOptions={{
                headerShown: false,
                lazy: true,
                inactiveTintColor: 'black',
                activeTintColor: '#d0cfcf'
            }}
        >
            <Drawer.Screen name="Home" component={MainScreenTabs} options={{unmountOnBlur:true}}/>
            <Drawer.Screen name="Profile" component={Profile} options={{unmountOnBlur:true}}/>
            <Drawer.Screen name="Ücretsiz Terapi" component={FreeMeetingStack} options={{unmountOnBlur:true}}/>
            <Drawer.Screen name="Birebir Terapi" component={PrivateMeetingStack} options={{unmountOnBlur:true}}/>
            <Drawer.Screen name="Test Önerileri" component={TestTabs} options={{unmountOnBlur:true}}/>
            <Drawer.Screen name="Günlük" component={Diary} options={{unmountOnBlur:true}}/>
            <Drawer.Screen name="Mental Rahatsızlık Bilgileri" component={Definition} options={{unmountOnBlur:true}}/>
            <Drawer.Screen name="Patients" component={Patients} options={{unmountOnBlur:true}}/>
            <Drawer.Screen name="Rating" component={RatingTest} options={{unmountOnBlur:true}}/>
            <Drawer.Screen name="Log out" component={Logout} options={{unmountOnBlur:true}}/>
        </Drawer.Navigator>
    );
}

function FreeMeetingStack() {
    return (
        <Stack.Navigator
            lazy = {true}
            screenOptions={{
                headerShown: false
            }}
        >
            <Stack.Screen name='Ücretsiz Terapi_' component={FreeMeetingSearch}/>
            <Stack.Screen name='ÜcretsizTerapiDetails' component={SessionDetails}/>
        </Stack.Navigator>
    )
}

function PrivateMeetingStack() {
    return (
        <Stack.Navigator
            lazy = {true}
            screenOptions={{
                headerShown: false
            }}
        >
            <Stack.Screen name='Ücretli Terapi_' component={PrivateMeetingSearch}/>
            <Stack.Screen name='ÜcretliTerapiDetails' component={SessionDetails}/>
        </Stack.Navigator>
    )
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
        <Drawer.Screen name="Anksiyete" component={ANX} options={{unmountOnBlur:true}}/>
        <Drawer.Screen name="Depresyon" component={DEP} options={{unmountOnBlur:true}}/>
        <Drawer.Screen name="Somatizm" component={SOM} options={{unmountOnBlur:true}}/>
        <Drawer.Screen name="Psikotizm" component={PSY} options={{unmountOnBlur:true}}/>
        <Drawer.Screen name="Hostilite" component={HOS} options={{unmountOnBlur:true}}/>
        <Drawer.Screen name="Paranoya" component={PAR} options={{unmountOnBlur:true}}/>
        <Drawer.Screen name="Obsesif Kompulsif Bozukluk" component={OKB} options={{unmountOnBlur:true}}/>
        <Drawer.Screen name="Fobik Anksiyete" component={PHOB} options={{unmountOnBlur:true}}/>
        <Drawer.Screen name="Kisiler Arasi" component={INT} options={{unmountOnBlur:true}}/>
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
                headerShown: false,
            }}
        >
            <Stack.Screen name='Ana sayfa' component={MainScreenUser}/>
            <Drawer.Screen name="Terapi Oluştur" component={SessionCreate} options={{unmountOnBlur:true}} />
            <Stack.Screen name='Live Meeting' component={LiveMeeting}/>
            <Stack.Screen name='Rating Meeting' component={RatingTest}/>
            <Stack.Screen name='Ana Sayfa_x' component={MainScreenUser}/>
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
                    <Stack.Screen name="FirstTest" component={FirstLoginTest} options={{unmountOnBlur:true}}/>
                    <Stack.Screen name="ExpertDetails" component={ExpertInformationLogin} options={{unmountOnBlur:true}}/>
                    <Stack.Screen name="Anasayfa" component={Home} options={{unmountOnBlur:true}}/>
                </Stack.Navigator>
            </NavigationContainer>
        );
    }
}
