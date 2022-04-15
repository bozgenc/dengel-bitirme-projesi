import { Header, Left, Right } from "native-base";
import React, { Component } from 'react';
import {
    Dimensions, FlatList, StyleSheet,
    Text, TouchableOpacity, View
} from 'react-native';

var screen = Dimensions.get('window');
var response = [];
var jsonData = [];

export default class ViewList extends Component {
    constructor() {
        super();
        this.state = {
            users: []
        }
    }

    componentDidMount =  async () => {

        try {
            response = await fetch("http://10.2.40.148:5000/User_experts");
            jsonData = await response.json();
            console.log(jsonData);
        }
        catch (e) {
            console.log(e.message);
        }

        this.setState({
            users : jsonData
        })

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

                        <Text style={{marginTop: 10, fontSize: 30, fontFamily: "Helvetica-Bold"}}>Liste</Text>

                        <Right>
                        </Right>
                    </Header>
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
                        data={this.state.users}
                        renderItem={({item,index}) => (
                            <TouchableOpacity
                            key={index}
                                onPress={() => {
                                    this.props.navigation.navigate(
                                        'Details',
                                         item 
                                      );
                                }}
                            >
                                <View style={styles.arrayItem}>
                                    <Text style={styles.textStyleList}>{"İsim: "} {item.first_name} {" "} {item.last_name} </Text>
                                    <Text style={styles.textStyleList}>{"Alanı: "} {item.specialties[0]} </Text>
                                    <Text style={styles.textStyleList}>{"Açıklama: "} {item.description} </Text>
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
        marginTop: 10,
        paddingVertical: 2,
        paddingHorizontal: 15,
        backgroundColor: '#efebeb',
        borderRadius: 10,
        height: 60,
        width: screen.width * 96.6 / 100,
    },
    textStyleList: {
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
