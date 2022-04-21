import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Dimensions,
    ScrollView,
    TextInput,
    Button,
    TouchableOpacity,
    Image,
    Alert,
    FlatList
} from 'react-native';
import {Header, Left, Right} from "native-base"
import AsyncStorage from "@react-native-async-storage/async-storage";
import DeviceInfo from "react-native-device-info";

var screen = Dimensions.get('window');
var url = "http://localhost:5000/"

export default class Patients extends Component {
    constructor() {
        super();
        this.state = {
            PATIENTS: [],
            numOfPatients: 0,
            index: 0,
            startIndex: 0,
            endIndex: 0,
        }
    }

    componentDidMount =  async () => {
        let NumPatients = 0;
        let patients = [
            {
                id: 0,
                name: 'Vitali',
                SurName: 'MOZ',
                ANX: '0.00',
                PAR: '0.02',
                PHOB: '0.03',
                DEP: '0.02',
                OKB: '0.00',
                INT: '0.00',
                PSY: '0.6',
                SOM: '0.12',
                HOS: '0.199',
                LastMeetingDate: '10.10.2010'
            },
            {
                id: 1,
                name: 'Derev',
                SurName: 'TARKAN',
                ANX: '0.00',
                PAR: '0.1',
                PHOB: '0.54',
                DEP: '0.45',
                OKB: '0.87',
                INT: '0.9',
                PSY: '0.12',
                SOM: '0.5',
                HOS: '0.9',
                LastMeetingDate: '10.10.2010'
            }
        ];

        let ind = this.state.index;

        this.setState({
            PATIENTS: patients,
            index: ind,
            numOfPatients: NumPatients
        })

        try {
            const response = await fetch("http://localhost:5000/records");
            const jsonData = await response.json();
            console.log(jsonData);
        }
        catch (e) {
            console.log(e.message);
        }
    }

    NextPage = () => {
        let newIndex = this.state.index + 1;
        let patients = this.state.PATIENTS;
        let nop = this.state.numOfPatients;
        let strt = newIndex;
        let end = 0;
        if((newIndex * 3 + 3) < this.state.numOfPatients){
            end = newIndex * 3 + 2;
        }
        else{
            end = this.state.numOfPatients - 1;
        }
        if(newIndex == 0){
            patients =  [
                {
                    id: 0,
                    name: 'Vitali',
                    SurName: 'MOZ',
                    ANX: '0.00',
                    PAR: '0.02',
                    PHOB: '0.03',
                    DEP: '0.02',
                    OKB: '0.00',
                    INT: '0.00',
                    PSY: '0.6',
                    SOM: '0.12',
                    HOS: '0.199',
                    LastMeetingDate: '10.10.2010'
                },
                {
                    id: 1,
                    name: 'Derev',
                    SurName: 'TARKAN',
                    ANX: '0.00',
                    PAR: '0.1',
                    PHOB: '0.54',
                    DEP: '0.45',
                    OKB: '0.87',
                    INT: '0.9',
                    PSY: '0.12',
                    SOM: '0.5',
                    HOS: '0.9',
                    LastMeetingDate: '10.10.2010'
                }
            ]
        }
        else if(newIndex == 1){
            patients = [
                {
                    id: 2,
                    name: 'Alek',
                    SurName: 'TUNCEL',
                    ANX: '0.3',
                    PAR: '0.08',
                    PHOB: '0.99',
                    DEP: '0.21',
                    OKB: '0.98',
                    INT: '0.16666',
                    PSY: '0.7',
                    SOM: '0.0',
                    HOS: '0.5',
                    LastMeetingDate: '10.10.2010'
                }
            ];
        }
        this.setState({
            PATIENTS: patients,
            numOfPatients: nop,
            index: newIndex,
            startIndex: strt,
            endIndex: end
        })
    }

    PrevPage = () => {
        let newIndex = this.state.index - 1;
        let patients = this.state.PATIENTS;
        let nop = this.state.numOfPatients;
        let strt = newIndex;
        let end = 0;
        if((newIndex * 3 + 3) < this.state.numOfPatients){
            end = newIndex * 3 + 2;
        }
        else{
            end = this.state.numOfPatients - 1;
        }
        if(newIndex == 0){
            patients =  [
                {
                    id: 0,
                    name: 'Vitali',
                    SurName: 'MOZ',
                    ANX: '0.00',
                    PAR: '0.02',
                    PHOB: '0.03',
                    DEP: '0.02',
                    OKB: '0.00',
                    INT: '0.00',
                    PSY: '0.6',
                    SOM: '0.12',
                    HOS: '0.199',
                    LastMeetingDate: '10.10.2010'
                },
                {
                    id: 1,
                    name: 'Derev',
                    SurName: 'TARKAN',
                    ANX: '0.00',
                    PAR: '0.1',
                    PHOB: '0.54',
                    DEP: '0.45',
                    OKB: '0.87',
                    INT: '0.9',
                    PSY: '0.12',
                    SOM: '0.5',
                    HOS: '0.9',
                    LastMeetingDate: '10.10.2010'
                }
            ]
        }
        else if(newIndex == 1){
            patients = [
                {
                    id: 2,
                    name: 'Alek',
                    SurName: 'TUNCEL',
                    ANX: '0.3',
                    PAR: '0.08',
                    PHOB: '0.99',
                    DEP: '0.21',
                    OKB: '0.98',
                    INT: '0.16666',
                    PSY: '0.7',
                    SOM: '0.0',
                    HOS: '0.5',
                    LastMeetingDate: '10.10.2010'
                }
            ];
        }
        this.setState({
            PATIENTS: patients,
            numOfPatients: nop,
            index: newIndex,
            startIndex: strt,
            endIndex: end
        })
    }

    BackToMP = () => {
        this.props.navigation.navigate('Anasayfa  ');
    }

    render() {
        let btn_next;
        if(true){
            btn_next =
            <View style={{flex:1}}>
                <TouchableOpacity onPress={() => this.NextPage()}>
                    <View style={styles.buttonPrev}>
                        <Text style={styles.textStyle2}>
                            Sonraki sayfa
                        </Text>
                    </View>
                </TouchableOpacity>
            </View>
        }

        let btn_prev;
        if(this.state.index!=0){
            btn_prev =
            <View style={{flex:1}}>
                <TouchableOpacity onPress={() => this.PrevPage()}>
                    <View style={styles.buttonPrev}>
                        <Text style={styles.textStyle2}>
                            Önceki sayfa
                        </Text>
                    </View>
                </TouchableOpacity>
            </View>
        }

        let btn_backToMenu;
        if(true){
            btn_backToMenu =
            <View style={{flex:1}}>
                <TouchableOpacity onPress={() => this.BackToMP()}>
                    <View style={styles.buttonMenu}>
                        <Text style={styles.textStyle2}>
                            Ana Menü
                        </Text>
                    </View>
                </TouchableOpacity>
            </View>
        }

        return (
            <View style={{flex: 1, backgroundColor: "#faf8f8"}}>
                <View>
                    <Header style={{backgroundColor: 'white', borderBottomWidth: 2, borderBottomColor: '#f18a21'}}>
                        <Left>
                            <TouchableOpacity
                                onPress={() => this.props.navigation.goBack()}
                                style={{color: "black"}}
                            >
                                <Text style={{marginLeft: 10, fontSize: 30, color: '#B00D23'}}>
                                    {"<"}
                                </Text>
                            </TouchableOpacity>
                        </Left>

                        <Text style={{marginTop: 10, fontSize: 20, fontFamily: "Helvetica-Bold"}}>Danışan Skorları</Text>

                        <Right>
                        </Right>
                    </Header>
                </View>

                <View style={{marginTop: 30, height: 20, marginBottom: 20}}>
                    <Text style={{fontSize: 18, color: '#B00D23', textAlign: 'center', fontWeight: 'bold'}}>
                        ABONELER
                    </Text>
                </View>

                <View style={{
                    flex: 1,
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'flex-start',
                    marginLeft: 4.3,
                    marginRight: 10,
                    backgroundColor: '#faf8f8'
                }}>
                    <FlatList
                        style = {{flex: 0}}
                        initialNumToRender={2}
                        directionalLockEnabled={true}
                        showsVerticalScrollIndicator={true}
                        showsHorizontalScrollIndicator={false}
                        keyExtractor={(item) => item.id}
                        data={this.state.PATIENTS}
                        renderItem={({item}) => (
                            <TouchableOpacity
                                onPress={() => {
                                    console.log("Fill up if you need");
                                    //this.props.navigation.navigate('Live Meeting');
                                }}
                            >
                                <View style={styles.arrayItem}>
                                    <Text style={styles.textStyle2ListRed}>{item.name}, {item.SurName} </Text>
                                    <Text style={styles.textStyle2List}>ANX: {item.ANX} </Text>
                                    <Text style={styles.textStyle2List}>DEP: {item.DEP} </Text>
                                    <Text style={styles.textStyle2List}>OKB: {item.OKB} </Text>
                                    <Text style={styles.textStyle2List}>PAR: {item.PAR} </Text>
                                    <Text style={styles.textStyle2List}>SOM: {item.SOM} </Text>
                                    <Text style={styles.textStyle2List}>HOS: {item.HOS} </Text>
                                    <Text style={styles.textStyle2List}>PHOB: {item.PHOB} </Text>
                                    <Text style={styles.textStyle2List}>PSY: {item.PSY} </Text>
                                    <Text style={styles.textStyle2List}>INT: {item.INT} </Text>
                                    <Text style={styles.textStyle2List}>Last Meeting Date: {item.LastMeetingDate}</Text>
                                    <Text style={styles.textStyle2List}>Upcoming Meeting Date: {item.PSY} </Text>
                                </View>
                            </TouchableOpacity>
                        )}/>
                </View>

                <View>
                    <View style={{ marginBottom: 10, marginLeft: '5%', flexDirection:"row", alignContent: 'center'}}>

                        {btn_prev}
                        {btn_next}

                    </View>
                </View>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container2: {
        flex: 2,
        flexDirection: "column",
        backgroundColor: '#fff0f5',
        marginTop: 10,
        paddingVertical : 2,
        paddingHorizontal : 20
    },
    textStyle: {
        marginTop: 10,
        marginLeft: 2,
        fontSize: 20,
        fontWeight: "bold",
    },
    textStyle2: {
        marginTop: 10,
        marginLeft: 2,
        fontSize: 14,
    },
    arrayItem: {
        marginTop: 5,
        paddingVertical: 2,
        paddingHorizontal: 15,
        backgroundColor: '#efebeb',
        borderRadius: 10,
        width: screen.width * 96.6 / 100,
    },
    textStyleList: {
        marginTop: 5,
        marginLeft: 4,
        fontSize: 12,
        fontWeight: 'bold'
    },
    textStyle2List: {
        marginTop: 5,
        marginLeft: 4,
        fontSize: 12,
        color: 'black'
    },
    textStyle2ListRed: {
        marginTop: 5,
        marginLeft: 4,
        fontSize: 12,
        color: 'red'
    },
    textStyle2ListBlue: {
        marginTop: 5,
        fontWeight: 'bold',
        fontSize: 18,
        color: '#B00D23',
        textAlign: 'center'
        },
    buttonNext: {
        justifyContent: 'flex-end',
        alignItems: 'center',
        width: '90%',
        borderWidth: 2,
        borderColor: '#7cfc00',
        borderRadius: 100,
        height: 35,
        backgroundColor: '#7cfc00'
    },
    buttonPrev: {
        justifyContent: 'flex-start',
        alignItems: 'center',
        width: '85%',
        borderWidth: 2,
        borderColor: '#ff6347',
        borderRadius: 100,
        height: 35,
        backgroundColor: '#ff6347'
    },
    buttonMenu: {
        justifyContent: 'flex-start',
        alignItems: 'center',
        width: '85%',
        borderWidth: 2,
        borderColor: '#ff6347',
        borderRadius: 100,
        height: 35,
        backgroundColor: '#ff6347'
    }
});
