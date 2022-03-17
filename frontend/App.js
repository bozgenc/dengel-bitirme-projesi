import 'react-native-gesture-handler';
import React, {Component} from 'react';
import Routes from './src/components/Routes/Routes'
import {Header} from 'native-base'
import {StyleSheet, Text, View, Dimensions, ScrollView, TextInput, Button, TouchableOpacity, Image, Alert} from 'react-native';
import { LogBox } from 'react-native';

LogBox.ignoreLogs([
    "[react-native-gesture-handler] Seems like you\'re using an old API with gesture components, check out new Gestures system!",
]);

export default class App extends Component {
    render () {
        return (
          <Routes>

          </Routes>
        );
    }
}
