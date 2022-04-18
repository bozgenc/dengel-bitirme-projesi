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

export default class StartTest extends Component {
    constructor(props) {
        super();
        this.state = {

        }
    }

    componentDidMount =  async () => {

        this.setState({

        })

    }

    StartTest = () => {
        var route_to =localStorage.getItem('token');
        if(route_to == "ANX")
            this.props.navigation.navigate('ANX');
        else if(route_to == "PAR")
            this.props.navigation.navigate('PAR');
        else if(route_to == "DEP")
            this.props.navigation.navigate('DEP');
        else if(route_to == "HOS")
            this.props.navigation.navigate('HOS');
        else if(route_to == "INT")
            this.props.navigation.navigate('INT');
        else if(route_to == "OKB")
            this.props.navigation.navigate('OKB');
        else if(route_to == "PHOB")
            this.props.navigation.navigate('PHOB');
        else if(route_to == "PSY")
            this.props.navigation.navigate('PSY');
        else if(route_to == "SOM")
            this.props.navigation.navigate('SOM');
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
                            Test süresince sizlere zaman zaman herkeste olabilecek yakınmaların ve sorunlar belirtilecektir.
                            Bu yakınma ve sorunların son zamanlarda sizi ne derece rahatsız ettiğini 0 en düşük, 4 en yüksek
                            derece belirteci olacak şekilde butonları kullanarak oylayınız.
                        </Text>
                        <Text style={styles.textStyle}>
                            Soruları dikkatlice okuyunuz.
                        </Text>
                    </View>
                </View>

                <TouchableOpacity onPress={() => this.StartTest()}>
                    <View style={styles.buttonStart}>
                        <Text style={styles.textStyleButton}>
                            Teste Başla
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
    textStyle: {
        fontSize: 20,
        marginTop: '5%',
        color: 'red',
        textAlign: 'center',
        paddingTop: 0,
        fontFamily: "sans-serif",
        fontWeight: 'bold'
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
    buttonStart: {
        alignItems: 'center',
        justifyContent: 'center',
        width: '90%',
        borderWidth: 2,
        borderColor: '#e36e7e',
        borderRadius: 100,
        height: 35,
        marginLeft: '5%',
        marginTop: '70%',
        backgroundColor: '#e36e7e',
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
