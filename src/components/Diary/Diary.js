import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Dimensions,
    ScrollView,
    TextInput,
    TouchableOpacity,
    Image,
    Alert,
    FlatList,
    Animated
} from 'react-native';
import { Card, Icon, Avatar, Button } from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';

var screen = Dimensions.get('window');

export default class Diary extends Component {
    
    constructor() {
        super();
        this.state = {
            iAm: "",
            iAmSometimesToo: "",
            othersDesribeMeAs: "",
            iMostValue: "",
            myBiggestWeaknessIs: ""
        }
    }

    componentDidMount =  async () => {
        const ans1 = await AsyncStorage.getItem('iAm');
        const ans2 = await AsyncStorage.getItem('iAmSometimesToo');
        const ans3 = await AsyncStorage.getItem('othersDesribeMeAs');
        const ans4 = await AsyncStorage.getItem('iMostValue');
        const ans5 = await AsyncStorage.getItem('myBiggestWeaknessIs');

        if(ans1 != null && ans2 != null && ans3 != null && ans4 != null && ans5 != null){
            this.setState({
                iAm: ans1,
                iAmSometimesToo: ans2,
                othersDesribeMeAs: ans3,
                iMostValue: ans4,
                myBiggestWeaknessIs: ans5
            })
        }
    }

    onSubmit() {
        
        console.log("i am: ", this.state.iAm)
        console.log('\n');
        console.log("i Am Sometimes Too: ", this.state.iAmSometimesToo)
        console.log('\n');
        console.log("others Desribe Me As: ", this.state.othersDesribeMeAs)
        console.log('\n');
        console.log("my biggest weakness is: ", this.state.myBiggestWeaknessIs)
        console.log('\n');
        AsyncStorage.setItem("iAm", this.state.iAm);
        AsyncStorage.setItem("iAmSometimesToo", this.state.iAmSometimesToo);
        AsyncStorage.setItem("othersDesribeMeAs", this.state.othersDesribeMeAs);
        AsyncStorage.setItem("iMostValue", this.state.iMostValue);
        AsyncStorage.setItem("myBiggestWeaknessIs", this.state.myBiggestWeaknessIs);

        this.props.navigation.navigate('Home');
    }

    render() {
        
        let area;
        if(true){       
            area = <View>
                
                <Card style={styles.gCard}>
                <Avatar
                        size={64}
                        rounded
                        icon={{
                        name: 'human-greeting-variant',
                        type: 'material-community',
                        color: '#cdde20'
                        }}
                        containerStyle={{
                        borderColor: '#cdde20',
                        borderStyle: 'solid',
                        borderWidth: 1,
                        alignSelf: "center"
                        }}
                    />
                    <Text style={styles.textStyle}>
                        I am ...
                    </Text>
                    <TextInput
                        style={styles.input}
                        placeholder={this.state.iAm != null ? this.state.iAm : "describe yourself"}
                        textAlign='center'
                        maxLength={300}
                        autoCorrect={false}
                        returnKeyType={'done'}
                        onChangeText={(text) => {
                            this.setState({iAm: text});
                        }}
                    />
                </Card>

                <Card style={styles.gCard}>
                    <Text style={styles.textStyle}>
                        Others Describe me as ... 
                    </Text>
                    <TextInput
                        style={styles.input}
                        placeholder={this.state.othersDesribeMeAs != null ? this.state.othersDesribeMeAs : "what others think about you"}
                        textAlign='center'
                        maxLength={300}
                        autoCorrect={false}
                        returnKeyType={'done'}
                        onChangeText={(text) => {
                            this.setState({othersDesribeMeAs: text});
                        }}
                    />
                </Card>

                <Card style={styles.gCard}>
                    <Text style={styles.textStyle}>
                        I am sometimes too… 
                    </Text>
                    <TextInput
                        style={styles.input}
                        placeholder={this.state.iAmSometimesToo != null ? this.state.iAmSometimesToo : "..."}
                        textAlign='center'
                        maxLength={300}
                        autoCorrect={false}
                        returnKeyType={'done'}
                        onChangeText={(text) => {
                            this.setState({iAmSometimesToo: text});
                        }}
                    />
                </Card>

                <Card style={styles.gCard}>
                    <Text style={styles.textStyle}>
                        I most value… 
                    </Text>
                    <TextInput
                        style={styles.input}
                        placeholder={this.state.iMostValue != null ? this.state.iMostValue : "What is valuable for you"}
                        textAlign='center'
                        maxLength={300}
                        autoCorrect={false}
                        returnKeyType={'done'}
                        onChangeText={(text) => {
                            this.setState({iMostValue: text});
                        }}
                    />
                </Card>

                <Card style={styles.gCard}>
                    <Text style={styles.textStyle}>
                        My biggest weakness is… 
                    </Text>
                    <TextInput
                        style={styles.input}
                        placeholder={this.state.myBiggestWeaknessIs != null ? this.state.myBiggestWeaknessIs : "..."}
                        textAlign='center'
                        maxLength={300}
                        autoCorrect={false}
                        returnKeyType={'done'}
                        onChangeText={(text) => {
                            this.setState({myBiggestWeaknessIs: text});
                        }}
                    />
                </Card>
            </View>
        }
        return (
            <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
                {area}
                <TouchableOpacity
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
                            Submit
                        </Text>
                    </View>
                </TouchableOpacity>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
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
        marginTop : 10,
        text_align: 'center'
    },
    input: {
        alignItems: 'center',
        fontFamily: 'Helvetica-Bold',
        borderWidth: 2,
        borderColor: '#383838',
        borderRadius: 10,
        height: 80,
        marginTop: 5,
        marginLeft: '10%',
        width: '90%',
        textAlign: 'left',
    },
    textStyle: {
        marginTop: 10,
        marginLeft: 2,
        fontSize: 20,
        fontWeight: "bold"
    },
    textStyle2: {
        marginTop: 10,
        marginLeft: 2,
        fontSize: 14,
    },
    textStyle3: {
        fontSize: 15,
        color: 'black',
        textAlign: 'center',
        paddingTop: 0
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        width: '80%',
        borderWidth: 2,
        borderColor: '#ff6347',
        borderRadius: 10,
        height: 35,
        backgroundColor: '#ff6347',
        marginBottom: 10,
        marginTop: 10,
        marginLeft: '10%',
        fontFamily: 'Helvetica-Bold',
    },
    buttonUnclicked: {
        alignItems: 'center',
        justifyContent: 'center',
        width: '80%',
        borderWidth: 2,
        borderColor: '#c0c0c0',
        borderRadius: 100,
        height: 35,
        backgroundColor: '#c0c0c0',
        marginTop: 10,
        marginLeft: '10%',
        fontFamily: 'Helvetica-Bold',
    },
    buttonClicked: {
        alignItems: 'center',
        justifyContent: 'center',
        width: '80%',
        borderWidth: 2,
        borderColor: '#87ceeb',
        borderRadius: 100,
        height: 35,
        backgroundColor: '#87ceeb',
        marginTop: 10,
        marginLeft: '10%',
        fontFamily: 'Helvetica-Bold'
    }
});
