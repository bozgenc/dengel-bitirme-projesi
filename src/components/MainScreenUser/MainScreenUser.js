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
            meetingsIncoming: []
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

        this.setState({
            userName: 'Baran',
            userSurname: 'Özgenç',
            meetingsIncoming: meetings
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
                            <TouchableOpacity
                                onPress={() => console.log(this.state.meetingsIncoming)}
                                style={{color: "black"}}
                            >
                                <Text style={{marginLeft: 10, fontSize: 33, color: '#B00D23', marginRight: 6}}>
                                    +
                                </Text>
                            </TouchableOpacity>
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
                    <Text style={{fontSize: 18, color: '#B00D23', textAlign: 'center'}}>
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
                                    console.log("Clicked to meeting"); // burada meetinge gidecek
                                }}
                            >
                                <View style={styles.arrayItem}>
                                    <Text style={styles.textStyleList}>{item.name}, {item.details} </Text>
                                    <Text style={styles.textStyle2List}>{item.time} , {item.date} </Text>
                                </View>
                            </TouchableOpacity>
                        )}/>
                </View>
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
    }
});
