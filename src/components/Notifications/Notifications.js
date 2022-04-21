import React, { Component } from 'react';
import {StyleSheet, Text, View, Dimensions, ScrollView, TextInput, Button, TouchableOpacity, Image, Alert, FlatList} from 'react-native';
import {Header, Left, Right} from "native-base"
import AsyncStorage from "@react-native-async-storage/async-storage";

var screen = Dimensions.get('window');
var url = "http://localhost:5000/"

export default class Notifications extends  Component {
    constructor() {
        super();
        this.state = {
            notifications: [],
            userType: '',
            noText: false,
            sessionNumCreatedByExpert: -1,
            sessions: [],
            sessionNames: [],
            index: 0,
            message: '',
            expId: -1,
            showNoText: true,
        }
    }

    componentDidMount =  async () => {
        let userId = await AsyncStorage.getItem("userId");
        let userType_ = await AsyncStorage.getItem("userType_")
        console.log("notifications: " + userType_);
        this.setState({
            expId: parseInt(userId),
            userType: userType_
        })

        if(userType_ == 'user') {
            try {
                const response = await fetch(url +'getRequestById/' + parseInt(userId)).then()
                const requests = await response.json();

                let temp = [];
                for(let i = 0; i < requests.length; i++) {
                    let meeting = {
                        sessionId: requests[i].session_id,
                        expertId: requests[i].expert_id
                    }
                    temp.push(meeting);
                }


                console.log("temp length: "+ temp.length)
                if(temp.length == 0) {
                    this.setState({
                        showNoText: true
                    })
                }
                let notifs;
                let flag = true;
                for(let i = 0; i < temp.length; i++) {
                    const response2 = await fetch(url +'getPostsBySessionId/' + temp[i].sessionId).then()
                    const posts = await response2.json();

                    if(posts.length != 0) {
                        flag = false;
                    }

                    const response3 = await fetch(url +'getSessionsByExpertId/' + temp[i].expertId).then()
                    const session = await response3.json();

                    let sessionObj = {};
                    for(let k = 0; k < session.length; k++) {
                        if(session[k].session_id == temp[i].sessionId)
                            sessionObj = session[k];
                    }

                    notifs = []
                    console.log("posts length " + posts.length)
                    for(let i = 0; i < posts.length; i++) {
                        let notification =  {
                            id: posts[i].post_id,
                            name: sessionObj.session_title,
                            time: posts[i].creation_date.substring(0, 10) + " , " + posts[i].creation_date.substring(11, 16),
                            session_id: posts[i].session_id,
                        }
                        notifs.push(notification)
                    }

                    let finalState = [...this.state.notifications]
                    for(let i = 0; i < notifs.length; i++) {
                        finalState.push(notifs[i])
                    }
                    this.setState({
                        notifications: finalState,
                    })
                }

                this.setState({
                    showNoText: flag
                })
            } catch (e) {
                console.log(e.message)
            }
        }
        else if(userType_ == 'expert') {
            try {
                const response3 = await fetch(url +'getSessionsByExpertId/' + userId).then()
                const sessions = await response3.json();

                let temp = [];
                let temp2 = [];
                let k = 0;
                for(let i = 0; i < sessions.length; i++) {
                    if(sessions[i].isprivate == false) {
                        let sessionObj = {
                            sessionId: sessions[i].session_id,
                            title: sessions[i].session_title
                        }
                        k++;
                        temp.push(sessionObj)
                        temp2.push(sessionObj.title)
                    }
                }

                this.setState({
                    sessions: temp,
                    sessionNumCreatedByExpert: k,
                    sessionNames: temp2
                }, ( ) => {
                })

            } catch (e) {
                console.log(e.message);
            }
        }
    }

    toggleSession() {
        let i = this.state.index;
        if(i + 1 == this.state.sessionNumCreatedByExpert) {
            i = 0;
        }
        else
            i++;
        this.setState({
            index: i
        })
    }

    sendNotifications() {
        let postObj = {
            message: this.state.message,
            expertId: this.state.expId,
            sessionId: this.state.sessions[this.state.index].sessionId
        }

        try {
            const body = postObj
            const response = fetch( url + "savePost", {
                method: 'POST',
                headers: {'Content-Type' : 'application/json' },
                body: JSON.stringify(body)
            })
            Alert.alert(
                'Bilgilendirme ',
                'Bildirim başarıyla gönderildi.',
                [
                    {text: 'OK', onPress: () => this.setState({
                            message: '',
                            index: 0,
                        }, () => {
                            this.textInput.clear();
                            this.props.navigation.navigate('Ana sayfa')
                        })
                    },
                ],
                {cancelable: false},
            );

        } catch (e) {
            console.log(e.message);
        }
    }

    render() {
        if(this.state.userType == 'user' &&  this.state.showNoText == false) {
            return (
                <View style = {{flex: 1, backgroundColor: "#faf8f8"}}>
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

                            <Text style = {{marginTop: 10, fontSize: 30, fontFamily: "Helvetica-Bold"}}>Bildirimler</Text>

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
                            data={this.state.notifications}
                            renderItem={({item}) => (
                                <TouchableOpacity
                                    onPress={() => {
                                        //console.log(item.session_id);
                                        AsyncStorage.setItem("postIdNotification", item.id + "").then(this.props.navigation.navigate('BildirimDetayi'))
                                    }}
                                >
                                    <View style={styles.arrayItem}>
                                        <Text style={styles.textStyleList}>{item.name} </Text>
                                        <Text style={styles.textStyle2List}>{item.time} </Text>
                                    </View>
                                </TouchableOpacity>
                            )}/>
                    </View>
                </View>
            );
        }
        else if (this.state.userType == 'user' && this.state.showNoText) {
            return (
                <View>
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

                            <Text style = {{marginTop: 10, fontSize: 30, fontFamily: "Helvetica-Bold"}}>Bildirimler</Text>

                            <Right>
                            </Right>
                        </Header>
                    </View>
                    <View style = {{marginTop: 20, alignItems: 'center', justifyContent: 'center'}}>
                        <Text style = {styles.textStyle3}>
                            {"Hiç bildiriminiz yok."}
                        </Text>
                    </View>
                </View>
            )
        }
        else {
            return(
                <View>
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

                            <Text style = {{marginTop: 10, fontSize: 30, fontFamily: "Helvetica-Bold"}}>Bildirimler</Text>

                            <Right>
                            </Right>
                        </Header>
                    </View>

                    <View>
                        <View style = {{marginTop: 20, alignItems: 'center', justifyContent: 'center'}}>
                            <Text style = {styles.textStyle3}>
                                {"Hangi terapi seansı için bildirim göndermek istiyorsunuz?"}
                            </Text>
                        </View>

                        <View style={{alignItems: 'center', }}>
                            {
                                <TouchableOpacity
                                    onPress={() => this.toggleSession()}
                                >
                                    <View style={styles.buttonSessionType}>
                                        <Text style={{
                                            fontSize: 16,
                                            color: 'white',
                                            textAlign: 'center',
                                            paddingTop: 0,
                                        }}>
                                            {this.state.index + 1} . {this.state.sessionNames[this.state.index]}
                                        </Text>
                                    </View>
                                </TouchableOpacity>
                            }
                        </View>

                        <View>
                            <View style = {{alignItems:'center',}}>
                                {
                                    <TextInput
                                        style={styles.input}
                                        placeholder="Yazmak istediğiniz mesajı girin"
                                        textAlign='center'
                                        ref={input => { this.textInput = input }}
                                        maxLength={200}
                                        autoCorrect={false}
                                        returnKeyType={'done'}
                                        onChangeText={(text) => {
                                            this.setState({message: text});
                                        }}
                                    />
                                }
                            </View>
                        </View>

                        <View style = {{alignItems: 'center'}}>
                            <TouchableOpacity
                                onPress={() => this.sendNotifications()}
                            >
                                <View style={styles.buttonSubmit}>
                                    <Text style={{
                                        fontSize: 16,
                                        color: 'white',
                                        textAlign: 'center',
                                        paddingTop: 0,
                                        fontWeight: 'bold',
                                    }}>
                                        Gönder
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        </View>

                    </View>
                </View>
            )
        }
    }
}

const styles = StyleSheet.create({
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
    textStyle3: {
        fontSize: 15,
        color: 'black',
        textAlign: 'center',
        fontWeight: "bold",
        paddingTop: 0
    },
    buttonSessionType: {
        alignItems: 'center',
        justifyContent: 'center',
        width: screen.width - 100,
        borderWidth: 1,
        borderColor: '#383838',
        borderRadius: 10,
        height: 30,
        backgroundColor: '#92a4b0',
        marginTop: 15,
        //marginLeft: -screen.width / 10,
        fontFamily: 'Helvetica',
    },
    buttonSubmit: {
        alignItems: 'center',
        justifyContent: 'center',
        width: screen.width - 100,
        borderWidth: 1,
        borderColor: '#383838',
        borderRadius: 10,
        height: 30,
        backgroundColor: '#92a4b0',
        marginTop: 15,
        //marginLeft: -screen.width / 10,
        fontFamily: 'Helvetica-Bold',
    },
    input: {
        //alignItems: 'center',
        fontFamily: 'Helvetica-Bold',
        borderWidth: 2,
        borderColor: '#383838',
        borderRadius: 10,
        height: 80,
        marginTop: 20,
        marginLeft: 1,
        width: screen.width - 100,
        textAlign: 'center'
    },
});
