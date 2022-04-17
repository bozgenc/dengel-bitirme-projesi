import React, { Component } from 'react';
import {StyleSheet, Text, View, Dimensions, ScrollView, TextInput, Button, TouchableOpacity, Image, Alert} from 'react-native';
import {Header, Left, Right} from "native-base"
import AsyncStorage from "@react-native-async-storage/async-storage";

var screen = Dimensions.get('window');
var url = "http://localhost:5000/"

export default class Suggestions extends  Component {

    constructor(){
        super();
        this.state={
            anxiety: false,
            depression: false,
            obsessive: false,
            somatic: false,
            phobia: false,
            social: false,
            paranoid: false,
            psyco: false,
            hostilite: false,
            userID:0
        }
    }

    componentDidMount =  async () => {
        let id = await AsyncStorage.getItem('userId');
        console.log("in suggestions");
        console.log(id);
        try {
            const response2 = await fetch (url + 'getPatientScores/' + id)
            const responseObj = await response2.json();

            console.log(responseObj);
            let scores = responseObj[0];
            let btn_anx = (scores.anx > 0.75 ) ? true : false;
            let btn_dep = (scores.dep > 0.9 ) ? true : false;
            let btn_okb = (scores.okb > 1.02 ) ? true : false;
            let btn_hos = (scores.hos > 0.97 ) ? true : false;
            let btn_int = (scores.int > 0.85 ) ? true : false;
            let btn_par = (scores.par > 1.0 ) ? true : false;
            let btn_phob = (scores.phob > 0.48 ) ? true : false;
            let btn_psy = (scores.psy > 0.72 ) ? true : false;
            let btn_som = (scores.som > 0.55 ) ? true : false;

            this.setState({
                paranoid: btn_par,
                somatic: btn_som,
                hostilite: btn_hos,
                anxiety: btn_anx,
                depression: btn_dep,
                obsessive: btn_okb,
                psyco: btn_psy,
                social: btn_int,
                phobia: btn_phob,
                userID: id
            })
        } catch (e) {
            console.log(e.message)
        }
    }

    ANX = () => {
        this.props.navigation.navigate('Anksiyete');
    }
    DEP = () => {
        this.props.navigation.navigate('Depresyon');
    }
    SOM = () => {
        this.props.navigation.navigate('Somatizm');
    }
    PHOB = () => {
        this.props.navigation.navigate('Fobik Anksiyete');
    }
    OKB = () => {
        this.props.navigation.navigate('Obsesif Kompulsif Bozukluk');
    }
    PSY = () => {
        this.props.navigation.navigate('Psikotizm');
    }
    INT = () => {
        this.props.navigation.navigate('Kisiler Arasi');
    }
    HOS = () => {
        this.props.navigation.navigate('Hostilite');
    }
    PAR = () => {
        this.props.navigation.navigate('Paranoya');
    }
    render() {
        return (
            <View>
                <Header style={{backgroundColor: 'white', borderBottomWidth: 2, borderBottomColor: '#f18a21'}}>
                    <Left>
                        <TouchableOpacity
                            onPress={() => this.props.navigation.openDrawer()}
                            style={{color: "black"}}
                        >
                            <Text style={{marginLeft: 10, fontSize: 30, color: '#B00D23'}}>
                                ≡
                            </Text>
                        </TouchableOpacity>
                    </Left>

                    <Text style={{marginTop: 16, fontSize: 20, fontFamily: "Helvetica-Bold"}}>Öneriler</Text>

                    <Right>
                    </Right>
                </Header>

                <View style = {{backgroundColor: "#faf8f8"}}>
                <TouchableOpacity onPress={() => this.ANX()} >
                    <View style={this.state.anxiety ? styles.buttonImportant : styles.buttonNotImportant}>
                        <Text style={styles.textStyle2}>
                            Anksiyete Testi
                        </Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.DEP()} >
                    <View style={this.state.depression ? styles.buttonImportant : styles.buttonNotImportant}>
                        <Text style={styles.textStyle2}>
                            Depresyon Testi
                        </Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.INT()} >
                    <View style={this.state.depression ? styles.buttonImportant : styles.buttonNotImportant}>
                        <Text style={styles.textStyle2}>
                            Kişiler Arası İlişkiler Testi
                        </Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.SOM()} >
                    <View style={this.state.somatic ? styles.buttonImportant : styles.buttonNotImportant}>
                        <Text style={styles.textStyle2}>
                            Somatizm Testi
                        </Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.PHOB()} >
                    <View style={this.state.phobia ? styles.buttonImportant : styles.buttonNotImportant}>
                        <Text style={styles.textStyle2}>
                            Fobik Anksiyete Testi
                        </Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.PAR()} >
                    <View style={this.state.paranoid ? styles.buttonImportant : styles.buttonNotImportant}>
                        <Text style={styles.textStyle2}>
                            Paranoya Testi
                        </Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.HOS()} >
                    <View style={this.state.hostilite ? styles.buttonImportant : styles.buttonNotImportant}>
                        <Text style={styles.textStyle2}>
                            Hostilite Testi
                        </Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.OKB()} >
                    <View style={this.state.obsessive ? styles.buttonImportant : styles.buttonNotImportant}>
                        <Text style={styles.textStyle2}>
                            Obsesif Kompülsif Bozukluk Testi
                        </Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.PSY()} >
                    <View style={this.state.psyco ? styles.buttonImportant : styles.buttonNotImportant}>
                        <Text style={styles.textStyle2}>
                            Psikotizm Testi
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
        backgroundColor: '#faf8f8',
        alignItems: 'center',
    },
    container3: {
        flex: 2,
        flexDirection: 'column',
        backgroundColor: 'transparent',
        paddingVertical : 2,
        paddingHorizontal : 20,
        text_align: 'center'
    },
    gCard: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical : 2,
        paddingHorizontal : 20,
        backgroundColor : '#efebeb',
        borderRadius : 30,
        shadowColor : 'black',
        shadowOpacity : .2,
        shadowRadius : 5,
        marginBottom : '90%',
        text_align: 'center'
    },
    textStyleRed: {
        fontSize: 20,
        marginTop: '5%',
        color: 'red',
        textAlign: 'center',
        paddingTop: 0,
        fontWeight: 'bold'
    },
    textStyle: {
        marginTop: 10,
        marginLeft: 2,
        fontSize: 20,
        fontWeight: "bold",
    },
    textStyle2: {
        marginTop: 2,
        marginLeft: 2,
        fontSize: 14,
        fontWeight: "bold"
    },
    textStyle3: {
        fontSize: 15,
        color: 'black',
        textAlign: 'center',
        paddingTop: 0
    },
    textStyleButton: {
        marginTop: 2,
        marginLeft: 2,
        fontSize: 14,
        fontWeight: 'bold'
    },
    buttonNotImportant: {
        justifyContent: 'flex-start',
        alignItems: 'center',
        width: '90%',
        borderWidth: 2,
        marginTop: 10,
        marginLeft: '5%',
        borderColor: '#7cfc00',
        borderRadius: 100,
        height: 35,
        backgroundColor: '#7cfc00'
    },
    buttonImportant: {
        justifyContent: 'flex-start',
        alignItems: 'center',
        width: '90%',
        borderWidth: 2,
        marginTop: 10,
        marginLeft: '5%',
        borderColor: '#ff6347',
        borderRadius: 100,
        height: 35,
        backgroundColor: '#ff6347'
    },
    image: {
        marginTop: '5%',
        marginLeft: '27%',
        width: '45%',
        height: '45%',
        resizeMode: 'contain',
    },
    imageForBiggerDevices: {
        marginTop: '5%',
        marginLeft: '27%',
        width: '45%',
        height: '45%',
        resizeMode: 'contain',
    },
    imageForSmallDevices: {
        marginLeft: '27%',
        marginTop: '5%',
        width: '45%',
        height: '45%',
        resizeMode: 'contain',
    }
});
