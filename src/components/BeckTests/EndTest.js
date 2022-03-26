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

var deviceModel = DeviceInfo.getModel();
var screen = Dimensions.get('window');

export default class EndTest extends Component {
    constructor(props) {
        super();
        this.state = {
            
        }
    }

    componentDidMount =  async () => {
        this.setState({
            
        })
    }

    Exit = () => {
        this.props.navigation.navigate('Home_');
    }


    render() {
        return (
            <View style={{flex: 1, backgroundColor: '#ffffff'}}>
                <View>
                <Image
                    source={  require('../images/yeniBekleme.jpg') } style={
                    deviceModel == 'iPhone 11' || deviceModel == 'iPhone 11 Pro Max' || deviceModel == 'iPhone 12' || deviceModel == 'iPhone 12 Pro' ||
                    deviceModel == 'iPhone XS Max' || deviceModel == 'iPhone 12 Pro Max' || deviceModel == 'iPhone 7 Plus' || deviceModel == 'iPhone XR' ||
                    deviceModel == 'iPhone 8 Plus' || deviceModel == 'iPhone 6S Plus' || deviceModel == 'iPhone 6 Plus' ? styles.imageForBiggerDevices :
                        deviceModel == 'iPhone SE' || deviceModel == 'iPhone 5' || deviceModel == 'iPhone 5S' ? styles.imageForSmallDevices : styles.image}/>

                    <View style={styles.container3}>
                        <Text style={styles.textStyle3}>
                            Tüm soruları cevapladınız
                        </Text>
                    </View>
                </View>
                
                <TouchableOpacity onPress={() => this.Exit()}>
                    <View style={styles.buttonExit}>
                        <Text style={styles.textStyleButton}>
                            Ana Menüye Dön
                        </Text>
                    </View>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container3: {
        flex: 2,
        flexDirection: 'column',
        backgroundColor: 'transparent',
        paddingVertical : 2,
        paddingHorizontal : 20,
        text_align: 'center'
    },
    textStyleButton: {
        marginTop: 2,
        marginLeft: 2,
        fontSize: 14,
        fontFamily: "sans-serif-light",
        fontWeight: 'bold'
    },
    textStyle3: {
        fontSize: 20,
        color: 'black',
        textAlign: 'center',
        marginTop: '5%',
        fontFamily: "sans-serif",
        fontWeight: 'bold'
    },
    buttonExit: {
        alignItems: 'center',
        justifyContent: 'center',
        width: '90%',
        borderWidth: 2,
        borderColor: '#ff6347',
        borderRadius: 100,
        height: 35,
        marginLeft: '5%',
        marginTop: '70%',
        backgroundColor: '#ff6347',
        fontFamily: 'Helvetica-Bold',
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

