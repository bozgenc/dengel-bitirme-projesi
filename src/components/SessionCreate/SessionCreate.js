import React, { Component } from 'react';
import {StyleSheet, Text, View, Dimensions, ScrollView, TextInput, Button, TouchableOpacity, Image, Alert} from 'react-native';
import {Header, Left, Right} from "native-base"
import AsyncStorage from "@react-native-async-storage/async-storage";

var screen = Dimensions.get('window');
var url = "http://localhost:5000/"


export default class SessionCreate extends  Component {
    constructor() {
        super();
        this.state = {
            title: '',
            price: 0,
            recurring: '',
            sessionType: 'toplu',
            sessionLink: '',
            priceHolder: 'Ücretsiz',
            priceDisabled: true,
            expertId: -1,
            tekrar: ["Her Hafta", "İki Haftada Bir", "Üç Haftada Bir", "Ayda bir"],
            tekrarNum: 0,
            date: "",
            time: "",
        };
    }

    componentDidMount = async () => {
        let id = await AsyncStorage.getItem("userId")
        this.setState({
            expertId: id
        })

    }

    toggleSessionType() {
        if(this.state.sessionType === 'toplu') {
            this.setState({
                sessionType: 'bireysel',
                priceHolder: 'Ücret Belirleyin',
                priceDisabled: false
            })
        }
        else {
            this.setState({
                sessionType: 'toplu',
                priceHolder: 'Ücretsiz',
                priceDisabled: true
            })
        }
    }

    setPrice(text) {
        if(this.state.priceDisabled) {
            Alert.alert(
                'Hata ',
                'Toplu terapi seansları ücretli olamaz.',
                [
                    {text: 'OK', onPress: () => console.log('price hatası')},
                ],
                {cancelable: false},
            );
        }
        else {
            this.setState({
                price: parseInt(text)
            })
        }
    }

    toggleRecurring() {
        var i = this.state.tekrarNum;
        if(i == 3)
            i = 0;
        else
            i++
        this.setState({
            tekrarNum: i
        })
    }

    createSession = async() => {
        let sessionObj = {};
        if(this.state.title != '' || this.state.title.length != 0) {
            if(this.state.sessionType == 'bireysel') {
                if(this.state.price == 0) {
                    Alert.alert(
                        'Hata ',
                        'Lütfen ücret alanını doldurun.',
                        [
                            {text: 'OK', onPress: () => console.log('session create price hatası')},
                        ],
                        {cancelable: false},
                    );
                }
                else {
                    sessionObj = {
                        title: this.state.title,
                        price: this.state.price,
                        recurring: 0,
                        expertId: this.state.expertId,
                        sessionLink: 'link',
                        isPrivateType: true,
                        timeDate: 'null'
                    };

                    console.log(sessionObj)
                    try {
                        const body = sessionObj
                        const response =  fetch( url + "postSession", {
                            method: 'POST',
                            headers: {'Content-Type' : 'application/json' },
                            body: JSON.stringify(body)
                        })

                    } catch (e) {
                        console.log(e.message);
                    }

                    Alert.alert(
                        'Bilgilendirme ',
                        'Terapi başarıyla oluşturuldu.',
                        [
                            {text: 'OK', onPress: () => this.props.navigation.goBack()},
                        ],
                        {cancelable: false},
                    );

                }
            }
            else if(this.state.sessionType == 'toplu') {
                if(this.state.time == '' || this.state.date == '' || this.state.time.length == 0 || this.state.date.length == 0) {
                    Alert.alert(
                        'Hata ',
                        'Tarih ve saat alanları boş bırakılamaz',
                        [
                            {text: 'OK', onPress: () => console.log('session create date hatası')},
                        ],
                        {cancelable: false},
                    );
                }
                else {
                    let repeatTime = (this.state.tekrarNum  + 1) * 7
                    sessionObj = {
                        title: this.state.title,
                        price: 0,
                        recurring: repeatTime,
                        expertId: this.state.expertId,
                        sessionLink: 'link',
                        isPrivateType : 'false',
                        timeDate: this.state.date + " " + this.state.time
                    };

                    console.log(sessionObj)
                    try {
                        const body = sessionObj
                        const response = fetch( url + "postSession", {
                            method: 'POST',
                            headers: {'Content-Type' : 'application/json' },
                            body: JSON.stringify(body)
                        })

                    } catch (e) {
                        console.log(e.message);
                    }
                    Alert.alert(
                        'Bilgilendirme ',
                        'Terapi başarıyla oluşturuldu.',
                        [
                            {text: 'OK', onPress: () => this.props.navigation.goBack()},
                        ],
                        {cancelable: false},
                    );
                }
            }
        }
        else {
            Alert.alert(
                'Hata ',
                'Lütfen tüm alanları doldurun.',
                [
                    {text: 'OK', onPress: () => console.log('session create hatası')},
                ],
                {cancelable: false},
            );
        }
    }

    render() {
        return (
            <View style = {{flex: 1, backgroundColor: "#faf8f8"}}>
                <View>
                    <Header style = {{backgroundColor: 'white', borderBottomWidth: 2, borderBottomColor: '#f18a21'}} >
                        <Left>
                            <TouchableOpacity
                                onPress={() => this.props.navigation.goBack()}
                                style={{color: "black" }}
                            >
                                <Text style = {{marginLeft: 10, fontSize: 30, color: '#B00D23'}}>
                                    {"<"}
                                </Text>
                            </TouchableOpacity>
                        </Left>

                        <Text style = {{marginTop: 10, fontSize: 30, fontFamily: "Helvetica-Bold"}}>Terapi Oluştur</Text>

                        <Right>
                        </Right>
                    </Header>
                </View>

                <View style = {styles.card}>
                    <View style = {{alignItems:'center',}}>
                    {
                        <TextInput
                            style={styles.input}
                            placeholder="Terapi Konusu"
                            textAlign='center'
                            maxLength={50}
                            autoCorrect={false}
                            returnKeyType={'done'}
                            onChangeText={(text) => {
                                this.setState({title: text});
                            }}
                        />
                    }
                    </View>

                    <View>
                        {
                            <TouchableOpacity
                                onPress={() => this.toggleSessionType()}
                            >
                                <View style={styles.buttonSessionType}>
                                    <Text style={{
                                        fontSize: 16,
                                        color: 'white',
                                        textAlign: 'center',
                                        paddingTop: 0,
                                    }}>
                                        Terapi Tipi : {this.state.sessionType == 'bireysel' ? 'Bireysel' : 'Toplu' }
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        }
                    </View>

                    <View>
                        {
                            this.state.sessionType == 'toplu' &&
                            <TouchableOpacity
                                onPress={() => this.toggleRecurring()}
                            >
                                <View style={styles.buttonSessionType}>
                                    <Text style={{
                                        fontSize: 16,
                                        color: 'white',
                                        textAlign: 'center',
                                        paddingTop: 0,
                                    }}>
                                        Tekrar Tipi : {this.state.tekrar[this.state.tekrarNum]}
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        }
                    </View>

                    <View style = {{alignItems: 'center'}}>
                        {
                            this.state.sessionType == 'bireysel' &&
                            <TextInput
                                style={styles.input}
                                placeholder={this.state.priceHolder}
                                textAlign='center'
                                maxLength={50}
                                autoCorrect={false}
                                returnKeyType={'done'}
                                keyboardType={'numeric'}
                                onChangeText={(text) => this.setPrice(text)}
                            />
                        }
                    </View>

                    <View style = {{alignItems:'center',}}>
                        {
                            this.state.sessionType == 'toplu' &&
                            <TextInput
                                style={styles.input}
                                placeholder="Başlangıç Tarihi (GG.AA.YYYY)"
                                textAlign='center'
                                maxLength={10}
                                autoCorrect={false}
                                returnKeyType={'done'}
                                onChangeText={(text) => {
                                    this.setState({date: text});
                                }}
                            />
                        }
                    </View>
                    <View style = {{alignItems:'center',}}>
                        {
                            this.state.sessionType == 'toplu' &&
                            <TextInput
                                style={styles.input}
                                placeholder="Saat (SS.DD)"
                                textAlign='center'
                                maxLength={5}
                                autoCorrect={false}
                                returnKeyType={'done'}
                                onChangeText={(text) => {
                                    this.setState({time: text});
                                }}
                            />
                        }
                    </View>

                    <TouchableOpacity onPress={() => this.createSession()}>
                        <View style={styles.button}>
                            <Text style={{
                                fontSize: 18,
                                color: 'white',
                                textAlign: 'center',
                                paddingTop: 0,
                                fontWeight: 'bold',
                            }}>
                                {'Oluştur'}
                            </Text>
                        </View>
                    </TouchableOpacity>
                </View>
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
        //alignItems: 'center',
        fontFamily: 'Helvetica-Bold',
        borderWidth: 2,
        borderColor: '#383838',
        borderRadius: 10,
        height: 35,
        marginTop: 20,
        marginLeft: 1,
        width: screen.width - 100,
        textAlign: 'center'
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
        width: screen.width -100,
        borderWidth: 2,
        borderColor: '#383838',
        borderRadius: 10,
        height: 35,
        backgroundColor: '#4d738d',
        marginTop: 20,
        fontFamily: 'Helvetica-Bold',
    },
    card: {
        alignItems: 'center',
        paddingVertical: 2,
        paddingHorizontal: 20,
        backgroundColor: '#efebeb',
        borderRadius: 15,
        //height: 100,
        width: screen.width * 96.6 / 100,
        shadowColor: 'black',
        shadowOpacity: .2,
        shadowRadius: 5,
        marginTop: 10,
        marginLeft: 6,
    },
    buttonSessionType: {
        alignItems: 'center',
        justifyContent: 'center',
        width: screen.width - 100,
        borderWidth: 1,
        borderColor: '#383838',
        borderRadius: 10,
        height: 30,
        backgroundColor: '#92a4b0',
        marginTop: 10,
        //marginLeft: -screen.width / 10,
        fontFamily: 'Helvetica',
    },
});
