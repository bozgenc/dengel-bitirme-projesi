import React, { Component } from 'react';
import {StyleSheet, Text, View, Dimensions, ScrollView, TextInput, Button, TouchableOpacity, Image, Alert} from 'react-native';
import {Header, Left, Right} from "native-base"
import AsyncStorage from "@react-native-async-storage/async-storage";
import {exp} from "react-native-reanimated";
import {parse} from "react-native-svg";

var screen = Dimensions.get('window');
var url = "http://localhost:5000/"

export default class SessionDetails extends  Component {
    constructor() {
        super();
        this.state = {
            sessionName: '',
            sessionDate: '',
            sessionRecurrence: '',
            expName: '',
            expSurname: '',
            expDescription :'',
            expSpecialties: '',
            expSchool: '',
            frequency: '',
            userId: -1,
            sessionId: -1,
            expertId: -1,
        };
    }

    componentDidMount = async () => {
        let expertId = await AsyncStorage.getItem("expertIdForSessionDetail")
        let sessionId = await AsyncStorage.getItem("sessionIdForSessionDetail")
        let idOfUser = await AsyncStorage.getItem("userId");

        try {
            const response = await fetch(url +'getUserById/' + parseInt(expertId)).then()
            const user = await response.json();
            let userObj = user[0];

            const responseX = await fetch(url +'getExpertById/' + parseInt(expertId)).then()
            const userX = await responseX.json();
            let userObjX = userX[0];

            const response2 = await fetch(url +'getSessionById/' + parseInt(sessionId)).then()
            const session = await response2.json();
            let sessionObj = session[0];

            let temp = '';
            if(sessionObj.re_interval == 0)
                temp = 'Özel Görüşme (Randevu)'
            if(sessionObj.re_interval == 7)
                temp = 'Haftada Bir'
            if(sessionObj.re_interval == 14)
                temp = 'İki Haftada Bir'
            if(sessionObj.re_interval == 21)
                temp = 'Üç Haftada Bir'
            if(sessionObj.re_interval == 28)
                temp = 'Ayda Bir'

            this.setState({
                sessionName: sessionObj.session_title,
                sessionDate: sessionObj.session_time == 'null' ? 'Randevu' : sessionObj.session_time,
                sessionRecurrence: sessionObj.re_interval,
                expName: userObj.first_name,
                expSurname: userObj.last_name,
                expDescription : userObjX.description,
                expSpecialties: userObjX.specialties,
                expSchool:  userObjX.graduate_school,
                frequency: temp,
                userId: parseInt(idOfUser),
                expertId: parseInt(expertId),
                sessionId: parseInt(sessionId)
            })

        } catch (e) {
            console.log(e.message)
        }
    }

    enroll = async () => {
        Alert.alert(
            'Bilgilendirme ',
            'Terapiye katılımınız gerçekleşecektir. Onaylıyor musunuz?',
            [
                {text: 'Evet', onPress: () => this.enrollSession()},
                {text: 'Hayır', onPress: () => console.log("dialog closed")},

            ],
            {cancelable: false},
        );
    }

    enrollSession = async () => {
        if(this.state.userId == this.state.expertId) {
            Alert.alert(
                'Hata ',
                'Kendi oluşturduğunuz terapiye katılamazsınız!',
                [
                    {text: 'OK', onPress: () => console.log("close dialog")},
                ],
                {cancelable: false},
            );
        }
        else {
            let obj = {
                patientId: this.state.userId,
                expertId:  this.state.expertId,
                sessionId: this.state.sessionId,
                isApproved: true,
            }

            try {
                const body = obj
                const response = fetch( url + "saveRequest", {
                    method: 'POST',
                    headers: {'Content-Type' : 'application/json' },
                    body: JSON.stringify(body)
                })
                Alert.alert(
                    'Bilgilendirme ',
                    'Terapiye katılımınız başarıyla gerçekleşmiştir.',
                    [
                        {text: 'OK', onPress: () => this.props.navigation.goBack()},
                    ],
                    {cancelable: false},
                );
            } catch (e) {
                console.log(e.message);
            }
        }
    }

    render() {
        return (
            <View  style = {{flex: 1, backgroundColor: "#faf8f8"}}>
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

                        <Text style = {{marginTop: 12, fontSize: 20, fontFamily: "Helvetica-Bold"}}>Terapi Detayları</Text>

                        <Right>
                        </Right>
                    </Header>
                </View>

                <View>
                    <View style={{
                        justifyContent: 'flex-start',
                        alignItems: 'flex-start',
                        marginLeft: 4.3,
                        marginTop: 10,
                        marginRight: 10,
                        backgroundColor: '#faf8f8',
                        height: 200,
                    }}>
                        <View flexDirection="column" style={styles.viewStylePrimal}>
                            <Text style={styles.textStyle2}>
                                İsim
                            </Text>
                            <Text style={styles.textStyle}>
                                {this.state.sessionName} {"\n"}
                            </Text>
                            <Text style={styles.textStyle2}>
                                Başlangıç Zamanı
                            </Text>
                            <Text style={styles.textStyle}>
                                {this.state.sessionDate} {"\n"}
                            </Text>
                            <Text style={styles.textStyle2}>
                                Tekrar Etme Sıklığı
                            </Text>
                            <Text style={styles.textStyle}>
                                {this.state.frequency}
                            </Text>
                        </View>
                    </View>
                    <View>
                        <Text style={{marginTop: 80, fontSize: 20, fontFamily: "Helvetica", textAlign: 'center', color: '#B00D23'}}>
                            Uzman Detayları
                        </Text>
                    </View>
                    <View style={{
                        justifyContent: 'flex-start',
                        alignItems: 'flex-start',
                        marginLeft: 4.3,
                        marginTop: 20,
                        marginRight: 10,
                        backgroundColor: '#faf8f8',
                        height: 250,
                    }}>
                        <View flexDirection="column" style={styles.viewStylePrimal}>
                            <Text style={styles.textStyle2}>
                                İsim
                            </Text>
                            <Text style={styles.textStyle}>
                                {this.state.expName} {"\n"}
                                {this.state.expSurname}
                            </Text>
                            <Text style={styles.textStyle2}>
                                Mezun Olduğu Okul
                            </Text>
                            <Text style={styles.textStyle}>
                                {this.state.expSchool}
                            </Text>
                            <Text style={styles.textStyle2}>
                                Kişisel Açıklamalar
                            </Text>
                            <Text style={styles.textStyle}>
                                {this.state.expDescription}
                            </Text>
                            <Text style={styles.textStyle2}>
                                Uzmanlık Alanları
                            </Text>
                            <Text style={styles.textStyle}>
                                {this.state.expSpecialties}
                            </Text>
                        </View>
                    </View>

                    <View style = {{alignItems: 'center', marginTop: 10}}>
                        <TouchableOpacity onPress={() => this.enroll()}>
                            <View style={styles.enrollButton}>
                                <Text style={{
                                    fontSize: 18,
                                    color: 'white',
                                    textAlign: 'center',
                                    paddingTop: 0,
                                    fontWeight: 'bold',
                                }}>
                                    {'Katıl'}
                                </Text>
                            </View>
                        </TouchableOpacity>
                    </View>

                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    viewStyle: {
        marginTop: 5,
        paddingVertical: 2,
        paddingHorizontal: 20,
        backgroundColor: '#efebeb',
        borderRadius: 10,
        height: 50,
        width: screen.width * 96.6 / 100,
    },
    viewStylePrimal: {
        paddingVertical: 2,
        paddingHorizontal: 20,
        backgroundColor: '#efebeb',
        borderRadius: 15,
        height: 250,
        width: screen.width * 96.6 / 100,
        shadowColor: 'black',
        shadowOpacity: .2,
        shadowRadius: 5,
    },
    textStyle: {
        marginTop: 5,
        marginLeft: 2,
        fontSize: 14,
        fontFamily: 'HelveticaNeue-Medium'
    },
    textStyle2: {
        paddingTop: 5,
        marginTop: 5,
        marginLeft: 2,
        fontSize: 12,
        fontFamily: 'HelveticaNeue',
        color: 'black',
    },
    textStyleListe: {
        marginTop: 5,
        marginLeft: 2,
        fontSize: 12,
        fontFamily: 'HelveticaNeue-Medium'
    },
    textStyleListe2: {
        marginTop: 5,
        marginLeft: 2,
        fontSize: 12,
        fontFamily: 'HelveticaNeue',
        color: 'black',
    },
    enrollButton: {
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
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        width: screen.width -100,
        borderWidth: 2,
        borderColor: '#383838',
        borderRadius: 10,
        height: 35,
        backgroundColor: '#4d738d',
        marginTop: 25,
        fontFamily: 'Helvetica-Bold',
    },
});
