import React, { Component } from 'react';
import {StyleSheet, Text, View, Dimensions, ScrollView, TextInput, Button, TouchableOpacity, Image, Alert} from 'react-native';
import {Header, Left, Right} from "native-base"
import DeviceInfo from 'react-native-device-info';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MainScreenUser from "../MainScreenUser/MainScreenUser";

var screen = Dimensions.get('window');
var deviceModel = DeviceInfo.getModel();
var url = "http://localhost:5000/"

export default class ExpertInformationLogin extends Component {
    constructor() {
        super();
        this.state = {
            expertId: -1,
            userTckn: '',
            schoolName: '',
            description: 'X',
            uzmanlikAlani: '',
            religion: 'E',
            gender: 'X',
            specialties: [],
            user: {},
        };
    }

    componentDidMount = async() => {
        let tckn = await AsyncStorage.getItem("userTckn") + "";
        console.log("inside login:: " + tckn);
        let userObj = {};
        try {
            const response = await fetch(url +'getUser/' + tckn).then()
            const userObject = await response.json();
            userObj = userObject[0];
            console.log(userObj)
            this.setState({
                expertId: userObj.id,
                userTckn: tckn
            })
        }
        catch (e) {
            console.log(e.message)
        }
        Alert.alert(
            'Bilgilendirme ',
            'Bu sayfada sorulan sorular, sadece kullanıcılarımızın bir uzman tercihi yaparken aradığı kriterle ulaşımını kolaylaştırmak içindir.' +
            'Dengel ailesi olarak sizin kimliğiniz, ırkınız, cinsiyetiniz ile ilgilenmiyoruz. Cevap vermemeyi dilerseniz boş bırakabilirsiniz.  ',
            [
                {text: 'OK', onPress: () => console.log("closed dialog")},
            ],
            {cancelable: false},
        );
    }


    onSubmit = async () => {
        if(this.state.schoolName == '' || this.state.schoolName.length == 0) {
            Alert.alert(
                'Hata ',
                'Mezun olduğunuz okul bölümü boş olamaz.',
                [
                    {text: 'OK', onPress: () => console.log('dialog closed')},
                ],
                {cancelable: false},
            );
        }
        else if(this.state.uzmanlikAlani == ''|| this.state.uzmanlikAlani.length == 0) {
            Alert.alert(
                'Hata ',
                'Uzmanlık Alanlarınız boş bırakılamaz.',
                [
                    {text: 'OK', onPress: () => console.log('dialog closed')},
                ],
                {cancelable: false},
            );
        }
        else {
            let temp = [];
            if(this.state.uzmanlikAlani.includes(","))
                temp = this.state.uzmanlikAlani.split(/[ ,]+/);
            else
                temp = this.state.uzmanlikAlani.split(/(\s+)/).filter( function(e) { return e.trim().length > 0; } );

            console.log(temp);
            this.setState({
                specialties: temp
            });

            let expertObj = {
                religion: this.state.religion == 'H' ? false : true,
                expert_id: this.state.expertId,
                //specialties: temp,
                graduateSchool: this.state.schoolName,
                description:this.state.description,
                tckn: this.state.userTckn,
            };

            try {
                const body = expertObj
                const response = fetch( url + "saveExpert", {
                    method: 'POST',
                    headers: {'Content-Type' : 'application/json' },
                    body: JSON.stringify(body)
                })
                console.log('expert detail login screen');
                console.log(response)

                this.props.navigation.navigate('Anasayfa');
            } catch (e) {
                console.log(e.message);
            }
        }
    }

    render() {
            return (
                <View style={styles.container}>
                    <Header style={{
                        height:(screen.height * 70) / 100,
                        backgroundColor: 'white',
                        borderBottomWidth: 7,
                        borderBottomColor: '#292929',
                    }}>
                        <View style={{flexDirection: 'column', marginTop: 125}}>
                            <View style={{
                                justifyContent: 'flex-start',
                                alignItems: 'center',
                                //marginTop: 50,
                            }}>
                                <Image source={require('../images/yeniBekleme.jpg')}
                                       style={
                                           deviceModel == 'iPhone 11' || deviceModel == 'iPhone 11 Pro Max' || deviceModel == 'iPhone 12' || deviceModel == 'iPhone 12 Pro' ||
                                           deviceModel == 'iPhone XS Max' || deviceModel == 'iPhone 12 Pro Max' || deviceModel == 'iPhone 7 Plus' || deviceModel == 'iPhone XR' ||
                                           deviceModel == 'iPhone 8 Plus' || deviceModel == 'iPhone 6S Plus' || deviceModel == 'iPhone 6 Plus' ? styles.imageForBiggerDevices :
                                               deviceModel == 'iPhone SE' || deviceModel == 'iPhone 5' || deviceModel == 'iPhone 5S' ? styles.imageForSmallDevices : styles.image}
                                />
                            </View>
                            <View>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Mezun Olduğunuz Okul"
                                    placeholderTextColor="grey"
                                    textAlign='center'
                                    maxLength={40}
                                    autoCorrect={false}
                                    returnKeyType={'done'}
                                    onChangeText={(text) => {
                                        this.setState({schoolName: text});
                                    }}
                                />
                            </View>

                            <View>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Uzmanlık Alanlarınız"
                                    placeholderTextColor="grey"
                                    textAlign='center'
                                    maxLength={40}
                                    autoCorrect={false}
                                    returnKeyType={'done'}
                                    onChangeText={(text) => {
                                        this.setState({uzmanlikAlani: text});
                                    }}
                                />
                            </View>

                            <View>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Birkaç kelime ile kendinizi açıklayın"
                                    placeholderTextColor="grey"
                                    textAlign='center'
                                    maxLength={40}
                                    autoCorrect={false}
                                    returnKeyType={'done'}
                                    onChangeText={(text) => {
                                        this.setState({description: text});
                                    }}
                                />
                            </View>

                            <View>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Dindar mısınız? (E/H)"
                                    placeholderTextColor="grey"
                                    textAlign='center'
                                    maxLength={1}
                                    autoCorrect={false}
                                    returnKeyType={'done'}
                                    onChangeText={(text) => {
                                        this.setState({religion: text});
                                    }}
                                />
                            </View>

                            <View>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Cinsiyetiniz(E/K/X)"
                                    placeholderTextColor="grey"
                                    textAlign='center'
                                    maxLength={1}
                                    autoCorrect={false}
                                    returnKeyType={'done'}
                                    onChangeText={(text) => {
                                        this.setState({gender: text});
                                    }}
                                />
                            </View>


                            <TouchableOpacity
                                disabled={this.state.signUpButtonDisabled}
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
                                        Kaydı Tamamla
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
    inputError: {
        alignItems: 'center',
        fontFamily: 'Helvetica-Bold',
        borderWidth: 2,
        borderColor: '#B00D23',
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
    buttonUserType: {
        alignItems: 'center',
        justifyContent: 'center',
        width: '140%',
        borderWidth: 2,
        borderColor: '#383838',
        borderRadius: 10,
        height: 35,
        backgroundColor: '#92a4b0',
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
    imageForSmallDevices: { // SE icin falan
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

