import React, {Component} from 'react';
import {
    Dimensions, FlatList, StyleSheet,
    Text, TouchableOpacity, View
} from 'react-native';
import {Header, Left, Right} from "native-base"
import { useNavigation } from '@react-navigation/native';
import { Button } from 'react-native-elements';
const Details = ({ route }) => {
    const navigate = useNavigation();
    const data = route.params;
    return (
        <View style = {{flex: 1, backgroundColor: "#faf8f8"}}>
            <View>
                <Header style = {{backgroundColor: 'white', borderBottomWidth: 2, borderBottomColor: '#f18a21'}} >
                    <Left>
                        <TouchableOpacity
                            onPress={() => navigate.openDrawer()}
                            style={{color: "black" }}
                        >
                            <Text style = {{marginLeft: 10, fontSize: 30, color: '#B00D23'}}>
                                ≡
                            </Text>
                        </TouchableOpacity>
                    </Left>

                    <Text style = {{marginTop: 10, fontSize: 30, fontFamily: "Helvetica-Bold"}}>Detaylar</Text>
                    
                    <Right>
                        <TouchableOpacity
                            onPress={() => navigate.navigate("View List")}
                            style={{color: "black" }}
                        >
                            <Text style = {{marginRight: 10, fontSize: 30, color: '#B00D23'}}>
                                {'<'}
                            </Text>
                        </TouchableOpacity>
                    </Right>
                </Header>
            </View>

            <View style={{
                    flex: 1,
                    justifyContent: 'flex-start',
                    alignItems: 'flex-start',
                    marginLeft:20
                    }}>
                    <Text style={{textAlign: 'center', fontSize: 20, marginTop: 20 }}>
                        İsim: {data.name}
                    </Text>
                    <Text style={{textAlign: 'center', fontSize: 20, marginTop: 20 }}>
                        Ücret: {data.price}
                    </Text>
                    <Text style={{textAlign: 'center', fontSize: 20, marginTop: 20 }}>
                        Uzmanlık: {data.profession}
                    </Text>
            </View>
      </View>
    );
 }

 export default Details