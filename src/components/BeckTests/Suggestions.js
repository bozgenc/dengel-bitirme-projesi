import React, { Component } from 'react';
import {StyleSheet, Text, View, Dimensions, ScrollView, TextInput, Button, TouchableOpacity, Image, Alert} from 'react-native';
import {Header, Left, Right} from "native-base"

export default class Suggestions extends  Component {
    ANX = () => {
        this.props.navigation.navigate('Anx_');
    }
    DEP = () => {
        this.props.navigation.navigate('Dep_');
    }
    SOM = () => {
        this.props.navigation.navigate('Som_');
    }
    PHOB = () => {
        this.props.navigation.navigate('Phob_');
    }
    OKB = () => {
        this.props.navigation.navigate('Okb_');
    }
    PSY = () => {
        this.props.navigation.navigate('Psy_');
    }
    INT = () => {
        this.props.navigation.navigate('Int_');
    }
    HOS = () => {
        this.props.navigation.navigate('Hos_');
    }
    PAR = () => {
        this.props.navigation.navigate('Par_');
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
                    <View style={styles.buttonNext}>
                        <Text style={styles.textStyle2}>
                            Anksiyete Testi
                        </Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.DEP()} >
                    <View style={styles.buttonNext}>
                        <Text style={styles.textStyle2}>
                            Depresyon Testi
                        </Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.SOM()} >
                    <View style={styles.buttonNext}>
                        <Text style={styles.textStyle2}>
                            Somatizm Testi
                        </Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.PHOB()} >
                    <View style={styles.buttonNext}>
                        <Text style={styles.textStyle2}>
                            PHOB
                        </Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.PAR()} >
                    <View style={styles.buttonNext}>
                        <Text style={styles.textStyle2}>
                            Paranoya Testi
                        </Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.HOS()} >
                    <View style={styles.buttonNext}>
                        <Text style={styles.textStyle2}>
                            HOS
                        </Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.OKB()} >
                    <View style={styles.buttonNext}>
                        <Text style={styles.textStyle2}>
                            OKB
                        </Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.PSY()} >
                    <View style={styles.buttonNext}>
                        <Text style={styles.textStyle2}>
                            PSY
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
    buttonNext: {
        justifyContent: 'center',
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
