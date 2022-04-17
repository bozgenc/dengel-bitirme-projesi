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
var url = "http://192.168.1.23:5000/"

export default class MainScreenUser extends Component {
    constructor() {
        super();
        this.state = {
            userName: "",
            userId: -1,
            userSurname: "",
            userType: "",
            meetingsIncoming: [],
            PAR: 0.0,
            SOM: 0.0,
            HOS: 0.0,
            ANX: 0.0,
            DEP: 0.0,
            OKB: 0.0,
            PSY: 0.0,
            I_NT: 0.0
        }
    }

    componentDidMount =  async () => {
        let tckn = await AsyncStorage.getItem("userTckn") + "";
        let user = {};
        try {
            const response = await fetch(url +'getUser/' + tckn).then()
            const userObject = await response.json();
            user = userObject[0];

            await AsyncStorage.setItem("userId", user.id.toString() + "").then(console.log("user id set"));
            console.log(user);
            this.setState({
                    userName: user.first_name,
                    userSurname: user.last_name,
                    userType: user.user_type,
                    userId: user.id
                })
        }
            catch (e) {
            console.log(e.message)
        }
        try {
            if(this.state.userType == 'user') {
                const response2 = await fetch (url + 'getPatientScores/' + user.id)
                const responseObj = await response2.json();
                let scores = responseObj[0];

                this.setState({
                    PAR: scores.par,
                    SOM: scores.som,
                    HOS: scores.hos,
                    ANX: scores.anx,
                    DEP: scores.dep,
                    OKB: scores.okb,
                    PSY: scores.psy,
                    I_NT: scores.int,
                })
            }
        } catch (e) {
            console.log(e.message)
        }

        if(this.state.userType == 'user') {
            let check = await AsyncStorage.getItem("patientFirst");
            if(check) {
                try {
                    const body = user
                    const response = await fetch( url + "savePatient", {
                        method: 'POST',
                        headers: {'Content-Type' : 'application/json' },
                        body: JSON.stringify(body)
                    })

                    console.log('main screen id save patient ');
                    console.log(response)
                } catch (e) {
                    console.log(e.message);
                }
                AsyncStorage.setItem("patientFirst", "false").then(console.log("..."));
            }

            let meetings = [];
            try {
                const response = await fetch(url +'getRequestById/' + this.state.userId).then()
                const requests = await response.json();

                for(let i = 0; i < requests.length; i++) {
                    let request = requests[i];

                    const responseX = await fetch(url +'getUserById/' + request.expert_id).then()
                    const userX = await responseX.json();
                    let userObjX = userX[0];

                    const response2 = await fetch(url +'getSessionById/' + request.session_id).then()
                    const session = await response2.json();
                    let sessionObj = session[0];

                    let temp = {
                        id: sessionObj.session_id,
                        meetingTitle: sessionObj.session_title,
                        time: sessionObj.session_time,
                        expertName: userObjX.first_name,
                        expertLastName: userObjX.last_name,
                        link: sessionObj.clink,
                        expertIdForRating: request.expert_id
                    }
                    meetings.push(temp)
                }

                this.setState({
                    meetingsIncoming: meetings
                })

            } catch (e) {
                console.log(e.message)
            }
        }
        else {
            let meetings = [];
            try {
                const response = await fetch(url +'getRequestByExpertId/' + this.state.userId).then()
                const requests = await response.json();

                for(let i = 0; i < requests.length; i++) {
                    let request = requests[i];

                    const responseX = await fetch(url +'getUserById/' + request.expert_id).then()
                    const userX = await responseX.json();
                    let userObjX = userX[0];

                    const response2 = await fetch(url +'getSessionById/' + request.session_id).then()
                    const session = await response2.json();
                    let sessionObj = session[0];


                    let temp = {
                        id: sessionObj.session_id,
                        meetingTitle: sessionObj.session_title,
                        time: sessionObj.session_time,
                        expertName: userObjX.first_name,
                        expertLastName: userObjX.last_name
                    }
                    meetings.push(temp)
                }

                this.setState({
                    meetingsIncoming: meetings
                })

            } catch (e) {
                console.log(e.message)
            }
        }
    }

    render() {
        let scores;
        if(this.state.userType == 'user'){
            scores =
            <View style = {styles.container2}>
                <Text style = {styles.textStyle2ListBlue}>Puanlarım</Text>
                <TouchableOpacity
                 onPress={() => {
                     Alert.alert(
                         'Bilgilendirme ',
                         '0-1 arası iyidir. 1-2 eh işte',
                         [
                             {text: 'OK', onPress: () => console.log("closed dialog")},
                         ],
                         {cancelable: false},
                     );
                 }}
                >
                    <Text style = {styles.textStyle2ListRed}>Anksiyete: {this.state.ANX}</Text>

                </TouchableOpacity>
                <Text style = {styles.textStyle2ListRed}>Paranoya: {this.state.PAR}</Text>
                <Text style = {styles.textStyle2ListRed}>Psikotizm: {this.state.PSY}</Text>
                <Text style = {styles.textStyle2ListRed}>Öfke ve Düşmanlık: {this.state.HOS}</Text>
                <Text style = {styles.textStyle2ListRed}>Depresyon: {this.state.DEP}</Text>
                <Text style = {styles.textStyle2ListRed}>Obsesif Bozukluk: {this.state.OKB}</Text>
                <Text style = {styles.textStyle2ListRed}>Kişiler Arası Duyarlık: {this.state.I_NT}</Text>
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

                        <Text style={{marginTop: 10, fontSize: 30, fontFamily: "Helvetica-Bold"}}>Anasayfa</Text>

                        <Right>
                            {
                                this.state.userType != 'user' &&
                                <TouchableOpacity
                                    onPress={() => this.props.navigation.navigate("Terapi Oluştur")}
                                    style={{color: "black"}}
                                >
                                    <Text style={{marginLeft: 5, fontSize: 18, color: '#B00D23'}}>
                                        Oluştur
                                    </Text>
                                </TouchableOpacity>
                            }
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
                        {this.state.userType == 'user' ? "Katıldığım Terapiler" : "Oluşturduğum Terapilerim"}
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
                                onPress={ () => {
                                    AsyncStorage.setItem("expertIdForMeeting", item.expertIdForRating + "").then(
                                        this.props.navigation.navigate('Live Meeting')
                                )
                                }}
                            >
                                <View style={styles.arrayItem}>
                                    <Text style={styles.textStyleList}>{item.meetingTitle} </Text>
                                    <Text style={styles.textStyle2List}>{item.expertName} {item.expertLastName} , {item.time} </Text>
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
