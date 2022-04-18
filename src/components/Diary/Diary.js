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
import {Header, Left, Right} from "native-base";

var screen = Dimensions.get('window');

export default class Diary extends Component {

    constructor() {
        super();
        this.state = {
            index: 0,
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

    editAnswers = async () => {
        let newIndex = this.state.index + 1;
        this.setState({
            index: newIndex
        })
    }

    exitPage() {
        this.props.navigation.navigate('Anasayfa  ');
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

        this.props.navigation.navigate('Anasayfa  ');
    }

    render() {
        let area;
        if(this.state.index==1){
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
                        Ben...
                    </Text>
                    <TextInput
                        style={styles.input}
                        placeholder={"describe yourself"}
                        textAlign='center'
                        maxLength={300}
                        multiline={true}
                        autoCorrect={false}
                        returnKeyType={'done'}
                        onChangeText={(text) => {
                            this.setState({iAm: text});
                        }}
                    />
                </Card>

                <Card style={styles.gCard}>
                    <Text style={styles.textStyle}>
                        Başkaları beni şöyle tanımlar...
                    </Text>
                    <TextInput
                        style={styles.input}
                        placeholder={ "what others think about you"}
                        textAlign='center'
                        maxLength={300}
                        multiline={true}
                        autoCorrect={false}
                        returnKeyType={'done'}
                        onChangeText={(text) => {
                            this.setState({othersDesribeMeAs: text});
                        }}
                    />
                </Card>

                <Card style={styles.gCard}>
                    <Text style={styles.textStyle}>
                        Ben Bazen...
                    </Text>
                    <TextInput
                        style={styles.input}
                        placeholder={ "..."}
                        textAlign='center'
                        maxLength={300}
                        multiline={true}
                        autoCorrect={false}
                        returnKeyType={'done'}
                        onChangeText={(text) => {
                            this.setState({iAmSometimesToo: text});
                        }}
                    />
                </Card>

                <Card style={styles.gCard}>
                    <Text style={styles.textStyle}>
                        En çok değer verdiğim...
                    </Text>
                    <TextInput
                        style={styles.input}
                        placeholder={"What is valuable for you"}
                        textAlign='center'
                        maxLength={300}
                        multiline={true}
                        autoCorrect={false}
                        returnKeyType={'done'}
                        onChangeText={(text) => {
                            this.setState({iMostValue: text});
                        }}
                    />
                </Card>

                <Card style={styles.gCard}>
                    <Text style={styles.textStyle}>
                        En büyük zayıflığım...
                    </Text>
                    <TextInput
                        style={styles.input}
                        placeholder={"..."}
                        textAlign='center'
                        maxLength={300}
                        multiline={true}
                        autoCorrect={false}
                        returnKeyType={'done'}
                        onChangeText={(text) => {
                            this.setState({myBiggestWeaknessIs: text});
                        }}
                    />
                </Card>
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
                            Tamamla
                        </Text>
                    </View>
                </TouchableOpacity>
            </View>
        }
        else {
            area = <View>
                <Card style={styles.gCard}>
                    <Avatar
                        size={48}
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
                       Ben ...
                    </Text>
                    <Text style={styles.textStyle2}>
                        {this.state.iAm}
                    </Text>
                </Card>

                <Card style={styles.gCard}>
                    <Text style={styles.textStyle}>
                       Başkaları beni şöyle tanımlar...
                    </Text>
                    <Text style={styles.textStyle2}>
                        {this.state.othersDesribeMeAs}
                    </Text>
                </Card>

                <Card style={styles.gCard}>
                    <Text style={styles.textStyle}>
                        Ben bazen...
                    </Text>
                    <Text style={styles.textStyle2}>
                        {this.state.iAmSometimesToo}
                    </Text>
                </Card>

                <Card style={styles.gCard}>
                    <Text style={styles.textStyle}>
                        En çok değer verdiğim...
                    </Text>
                    <Text style={styles.textStyle2}>
                        {this.state.iMostValue}
                    </Text>
                </Card>

                <Card style={styles.gCard}>
                    <Text style={styles.textStyle}>
                        En büyük zayıflığım...
                    </Text>
                    <Text style={styles.textStyle2}>
                        {this.state.myBiggestWeaknessIs}
                    </Text>
                </Card>
                <TouchableOpacity
                    onPress={() => this.editAnswers()}
                >
                    <View style={styles.button}>
                        <Text style={{
                            fontSize: 18,
                            color: 'white',
                            textAlign: 'center',
                            paddingTop: 0,
                            fontWeight: 'bold',
                        }}>
                            Düzenle
                        </Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => this.exitPage()}
                >
                    <View style={styles.button1}>
                        <Text style={{
                            fontSize: 18,
                            color: 'white',
                            textAlign: 'center',
                            paddingTop: 0,
                            fontWeight: 'bold',
                        }}>
                            Çıkış
                        </Text>
                    </View>
                </TouchableOpacity>
        </View>



        }

        return (
            <View>
                <Header style = {{backgroundColor: 'white', borderBottomWidth: 2, borderBottomColor: '#f18a21'}} >
                    <Left>
                        <TouchableOpacity
                            onPress={() => this.props.navigation.openDrawer()}
                            style={{color: "black" }}
                        >
                            <Text style = {{marginLeft: 10, fontSize: 30, color: '#B00D23'}}>
                                ≡
                            </Text>
                        </TouchableOpacity>
                    </Left>

                    <Text style = {{marginTop: 10, fontSize: 30, fontFamily: "Helvetica-Bold"}}>Günlük</Text>

                    <Right>
                    </Right>
                </Header>

                <ScrollView showsVerticalScrollIndicator={true}>
                    {area}
                </ScrollView>
            </View>

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
    button1: {
        alignItems: 'center',
        justifyContent: 'center',
        width: '80%',
        borderWidth: 2,
        borderColor: '#87cefa',
        borderRadius: 10,
        height: 35,
        backgroundColor: '#87cefa',
        marginTop: 10,
        marginLeft: '10%',
        fontFamily: 'Helvetica-Bold',
    }
});
