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


export default class MainScreenUser extends Component {
    constructor() {
        super();
        this.state = {
            userName: "",
            userSurname: "",
            meetingsIncoming: [],
            PAR: 0.0,
            SOM: 0.0,
            HOS: 0.0,
            PHOB: 0.0,
            ANX: 0.0,
            DEP: 0.0,
            OKB: 0.0,
            PSY: 0.0,
            I_NT: 0.0
        }
    }

    componentDidMount =  async () => {
        let meetings = [
            {
                id: 0,
                name: 'Depresyon',
                details: 'Week 1',
                time: '01.01.2021',
                date: '20.30'
            },
            {
                id: 1,
                name: 'Yas',
                details: 'Week 2',
                time: '01.01.2021',
                date: '20.30'
            },
            {
                id: 2,
                name: 'Korku',
                details: 'Week 1',
                time: '01.01.2021',
                date: '20.30'
            }
        ];

        let par = await AsyncStorage.getItem('PAR');
        let okb = await AsyncStorage.getItem('OKB');
        let anx = await AsyncStorage.getItem('ANX');
        let phob = await AsyncStorage.getItem('PHOB');
        let hos = await AsyncStorage.getItem('HOS');
        let i_nt = await AsyncStorage.getItem('INT');
        let dep = await AsyncStorage.getItem('DEP');
        let som = await AsyncStorage.getItem('SOM');
        let psy = await AsyncStorage.getItem('PSY');

        this.setState({
            userName: 'Baran',
            userSurname: 'Özgenç',
            meetingsIncoming: meetings,
            PAR: par,
            PSY: psy,
            I_NT: i_nt,
            DEP: dep,
            PHOB: phob,
            OKB: okb,
            SOM: som,
            HOS: hos,
            ANX: anx
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

    render() {
        let scores;
        if(true){
            scores =
            <View style = {styles.container2}>
                <Text style = {styles.textStyle2ListBlue}>Puanlar</Text>
                <Text style = {styles.textStyle2ListRed}>Anksiyete: {this.state.ANX}</Text>
                <Text style = {styles.textStyle2ListRed}>Paranoya: {this.state.PAR}</Text>
                <Text style = {styles.textStyle2ListRed}>Psikotizm: {this.state.PSY}</Text>
                <Text style = {styles.textStyle2ListRed}>Öfke ve Düşmanlık: {this.state.HOS}</Text>
                <Text style = {styles.textStyle2ListRed}>Depresyon: {this.state.DEP}</Text>
                <Text style = {styles.textStyle2ListRed}>Obsesif Bozukluk: {this.state.OKB}</Text>
                <Text style = {styles.textStyle2ListRed}>Kişiler Arası Duyarlık: {this.state.I_NT}</Text>
                <Text style = {styles.textStyle2ListRed}>Fobik Anksiyete: {this.state.PHOB}</Text>
                <Text style = {styles.textStyle2ListRed}>Somatizm: {this.state.SOM}</Text>
            </View>
        }
        return (
            <View style={{flex: 1, backgroundColor: "#faf8f8"}}>
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

                        <Text style={{marginTop: 10, fontSize: 30, fontFamily: "Helvetica-Bold"}}>Home</Text>

                        <Right>

                        </Right>
                    </Header>
                </View>

                <View style={styles.welcomingCard}>
                    <Text style={styles.textStyle}>
                        Hoşgeldiniz!
                    </Text>
                    <Text style={styles.textStyle2}>
                        {this.state.userName} {this.state.userSurname}
                    </Text>
                </View>

                <View style={{marginTop: 30, height: 20, marginBottom: 20}}>
                    <Text style={{fontSize: 18, color: '#B00D23', textAlign: 'center', fontWeight: 'bold'}}>
                        Yaklaşan Toplantılar
                    </Text>
                </View>

                <View style={{
                    flex: 1,
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'flex-start',
                    marginLeft: 4.3,
                    marginRight: 10,
                    height: screen.height,
                    backgroundColor: '#faf8f8'
                }}>
                    <FlatList
                        style = {{flex: 0}}
                        initialNumToRender={3}
                        directionalLockEnabled={true}
                        showsVerticalScrollIndicator={true}
                        showsHorizontalScrollIndicator={false}
                        keyExtractor={(item) => item.id}
                        data={this.state.meetingsIncoming}
                        renderItem={({item}) => (
                            <TouchableOpacity
                                onPress={() => {
                                    console.log("Redirecting to meeting");
                                    this.props.navigation.navigate('Live Meeting');
                                }}
                            >
                                <View style={styles.arrayItem}>
                                    <Text style={styles.textStyleList}>{item.name}, {item.details} </Text>
                                    <Text style={styles.textStyle2List}>{item.time} , {item.date} </Text>
                                </View>
                            </TouchableOpacity>
                        )}/>
                </View>

                {scores}
            </View>
        );
    }
}


const styles = StyleSheet.create({
    welcomingCard: {
        paddingVertical: 2,
        paddingHorizontal: 20,
        backgroundColor: '#efebeb',
        borderRadius: 15,
        height: 100,
        width: screen.width * 96.6 / 100,
        shadowColor: 'black',
        shadowOpacity: .2,
        shadowRadius: 5,
        marginTop: 10,
        marginLeft: 6,
    },
    container2: {
        flexDirection: "column",
        backgroundColor: '#efebeb',
        paddingHorizontal : 20,
        shadowColor: 'black',
        shadowOpacity: .2,
        shadowRadius: 5,
        marginLeft: 6,
        borderRadius: 15,
        marginBottom: 10,
        height: 250
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
        height: 50,
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
        color: 'black'
    },
    textStyle2ListBlue: {
        marginTop: 5,
        fontWeight: 'bold',
        fontSize: 18,
        color: '#B00D23',
        textAlign: 'center'
    }
});
