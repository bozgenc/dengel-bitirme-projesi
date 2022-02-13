import React, { Component } from 'react';
import {StyleSheet, Text, View, Dimensions, ScrollView, TextInput, Button, TouchableOpacity, Image, Alert} from 'react-native';
import {Header, Left, Right} from "native-base"
import DeviceInfo from 'react-native-device-info';

var screen = Dimensions.get('window');
var deviceModel = DeviceInfo.getModel();

export default class Login extends Component {
    constructor() {
        super();
        this.state = {
            ogrenciNo: '',
            isLoading: true,
            imageChoose: 0,
        };
    }

    render() {
        return (
            <View style={styles.container}>
                <Header style={{
                    height: (screen.height * 60) / 100,
                    backgroundColor: 'white',
                    borderBottomWidth: 7,
                    borderBottomColor: '#292929',
                }}>
                    <View style={{flexDirection: 'column'}}>
                        <View style={{
                            justifyContent: 'flex-start',
                            alignItems: 'center',
                            marginTop: 50,
                        }}>
                            <Image
                                source={this.state.imageChoose == 0 ? require('../images/yeniBekleme.jpg') : this.state.imageChoose == 1 ? require('../images/yeniBir.jpg') : this.state.imageChoose == 2 ? require('../images/yeniIki.jpg') :
                                    this.state.imageChoose == 3 ? require('../images/yeniUc.jpg') : this.state.imageChoose == 4 ? require('../images/yeniDort.jpg') : this.state.imageChoose == 5 ? require('../images/yeniBes.jpg') :
                                        this.state.imageChoose == 6 ? require('../images/yeniAlti.jpg') : this.state.imageChoose == 7 ? require('../images/yeniYedi.jpg') : this.state.imageChoose == 8 ? require('../images/yeniSekiz.jpg') : this.state.imageChoose == -1 ? require('../images/password2.jpg') : this.state.imageChoose == 9 ? require('../images/yeniDokuz.jpg') : this.state.imageChoose == 10 ? require('../images/yeniOn.jpg') : require('../images/yeniOnbir.jpg')
                                } style={
                                deviceModel == 'iPhone 11' || deviceModel == 'iPhone 11 Pro Max' || deviceModel == 'iPhone 12' || deviceModel == 'iPhone 12 Pro' ||
                                deviceModel == 'iPhone XS Max' || deviceModel == 'iPhone 12 Pro Max' || deviceModel == 'iPhone 7 Plus' || deviceModel == 'iPhone XR' ||
                                deviceModel == 'iPhone 8 Plus' || deviceModel == 'iPhone 6S Plus' || deviceModel == 'iPhone 6 Plus' ? styles.imageForBiggerDevices :
                                    deviceModel == 'iPhone SE' || deviceModel == 'iPhone 5' || deviceModel == 'iPhone 5S' ? styles.imageForSmallDevices : styles.image}/>
                        </View>
                        <View>
                            <TextInput
                                style={styles.input}
                                placeholder="İsim"
                                textAlign='center'
                                maxLength={15}
                                autoCorrect={false}
                                returnKeyType={'done'}
                                onChangeText={(text) => {
                                    this.setState({imageChoose: text.length});
                                }}
                            />
                        </View>
                        <View>
                            <TextInput
                                style={styles.input}
                                placeholder="Soyisim"
                                textAlign='center'
                                maxLength={15}
                                autoCorrect={false}
                                returnKeyType={'done'}
                                onChangeText={(text) => {
                                    this.setState({imageChoose: text.length});
                                }}
                            />
                        </View>
                        <View>
                            <TextInput
                                style={styles.input}
                                placeholder="E-Mail Adresi"
                                textAlign='center'
                                maxLength={20}
                                autoCorrect={false}
                                returnKeyType={'done'}
                                onChangeText={(text) => {
                                    this.setState({imageChoose: text.length});
                                }}
                            />
                        </View>
                        <View>
                            <TextInput
                                style={styles.input}
                                placeholder="Parola"
                                secureTextEntry={true}
                                textAlign='center'
                                maxLength={15}
                                autoCorrect={false}
                                returnKeyType={'done'}
                                onChangeText={(text) => {
                                    this.setState({imageChoose: -1});
                                }}
                            />
                        </View>
                        <View>
                            <TextInput
                                style={styles.input}
                                secureTextEntry={true}
                                placeholder="Parola Onayı"
                                textAlign='center'
                                maxLength={15}
                                autoCorrect={false}
                                returnKeyType={'done'}
                                onChangeText={(text) => {
                                    this.setState({imageChoose: -1});
                                }}
                            />
                        </View>

                        <TouchableOpacity
                            onPress={() => this.onSubmit()}
                        >
                            <View style={styles.button}>
                                <Text style={{
                                    fontSize: 18,
                                    color: 'white',
                                    textAlign: 'center',
                                    paddingTop: 0,
                                    fontWeight: 'bold',
                                }}>
                                    Kaydol
                                </Text>
                            </View>
                        </TouchableOpacity>

                    </View>
                </Header>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#4d738d',
    },
    text: {
        fontSize: 40,
        fontWeight: 'bold',
        textAlign: 'left',
        marginLeft: 20,
        marginTop: 100,
        color: 'black',
        //fontFamily: 'Helvetica-Bold',
    },
    input: {
        alignItems: 'center',
        fontFamily: 'Helvetica-Bold',
        borderWidth: 2,
        borderColor: '#383838',
        borderRadius: 10,
        height: 35,
        marginTop: 5,
        marginLeft: -screen.width / 10,
        width: '140%',
        textAlign: 'left',
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        width: '140%',
        borderWidth: 2,
        borderColor: '#383838',
        borderRadius: 10,
        height: 35,
        backgroundColor: '#4d738d',
        marginTop: 10,
        marginLeft: -screen.width / 10,
        fontFamily: 'Helvetica-Bold',
    },
    image: { //iphone 6 7 8 için
        width: 185,
        height: 185,
        resizeMode: 'contain',
    },
    imageForBiggerDevices: {
        width: 200,
        height: 200,
        resizeMode: 'contain',
    },
    imageForSmallDevices: { // SE için falan
        width: 150,
        height: 150,
        resizeMode: 'contain',
    },
    imageLogo: {
        width: 75,
        height: 75,
        resizeMode: 'contain',
        marginTop: 40,
    }
});

