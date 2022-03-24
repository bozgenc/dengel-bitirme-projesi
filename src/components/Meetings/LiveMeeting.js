import React, {Component} from 'react';
import {Header, Left, Right} from "native-base"
import {
    StyleSheet,
    Platform,
    ScrollView,
    Text,
    TouchableOpacity,
    View, Alert, Dimensions,
} from 'react-native';
import RtcEngine, {
    RtcLocalView,
    RtcRemoteView,
    VideoRenderMode,
    ClientRole,
    ChannelProfile,
} from 'react-native-agora';

import requestCameraAndAudioPermission from './Permissions';
import {check, PERMISSIONS, request, RESULTS} from 'react-native-permissions';
var screen = Dimensions.get('window');

const token = "0060aef85eb049745c994888624682d07d4IACPP8LpycjeOrLLXjRdAeB7aE8QjcnPjrcIaRoGHc8IjLNR+IYAAAAAEAAhqfJEM8w9YgEAAQAyzD1i";
const appId = '0aef85eb049745c994888624682d07d4';
const channelName = 'dengelCh2';

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isHost: true,
            joinSucceed: false,
            peerIds: [],
            cameraOpen: true,
            micOpen: true,
            myId: 0,
            camTextWhenClosed: 'Kamerayı Aç',
            camTextWhenOpen: 'Kamerayı Kapat',
            micTextWhenClosed: 'Mikrofonu Aç',
            micTextWhenOpen: 'Mikrofonu Kapat',
        };

        if (Platform.OS === 'android') {
            // android için kamera ve mikrofon izni
            requestCameraAndAudioPermission().then(() => {
                console.log('requested!');
            });
        }
        else { // ios için gereken izinler
            check(PERMISSIONS.IOS.CAMERA)
                .then((result) => {
                    console.log(result);
                    switch (result) {
                        case RESULTS.UNAVAILABLE:
                            console.log('This feature is not available (on this device / in this context)');
                            break;
                        case RESULTS.DENIED:
                            console.log('The permission has not been requested / is denied but requestable');
                            request(PERMISSIONS.IOS.CAMERA)
                            break;
                        case RESULTS.LIMITED:
                            console.log('The permission is limited: some actions are possible');
                            break;
                        case RESULTS.GRANTED:
                            console.log('The permission is granted');
                            break;
                        case RESULTS.BLOCKED:
                            console.log('The permission is denied and not requestable anymore');
                            break;
                    }
                })
                .catch((error) => {
                    // …
                });

            check(PERMISSIONS.IOS.MICROPHONE)
                .then((result) => {
                    console.log(result);
                    switch (result) {
                        case RESULTS.UNAVAILABLE:
                            console.log('This feature is not available (on this device / in this context)');
                            break;
                        case RESULTS.DENIED:
                            console.log('The permission has not been requested / is denied but requestable');
                            request(PERMISSIONS.IOS.MICROPHONE)
                            break;
                        case RESULTS.LIMITED:
                            console.log('The permission is limited: some actions are possible');
                            break;
                        case RESULTS.GRANTED:
                            console.log('The permission is granted');
                            break;
                        case RESULTS.BLOCKED:
                            console.log('The permission is denied and not requestable anymore');
                            break;
                    }
                })
                .catch((error) => {
                    // …
                });
        }
    }

    componentDidMount() {
        this.init().then();
    }


    init = async () => {
        this._engine = await RtcEngine.create(appId);
        await this._engine.enableVideo();
        await this._engine?.setChannelProfile(ChannelProfile.Communication);
        //await this._engine?.setClientRole(
       // this.state.isHost ? ClientRole.Broadcaster : ClientRole.Audience
        //);

        this._engine.addListener('Warning', (warn) => {
            console.log('Warning', warn);
        });

        this._engine.addListener('Error', (err) => {
            console.log('Error', err);
        });

        this._engine.addListener('UserJoined', (uid, elapsed) => {
            console.log('UserJoined', uid, elapsed);
            const { peerIds } = this.state;
            if (peerIds.indexOf(uid) === -1) {
                this.setState({
                    peerIds: [...peerIds, uid],
                });
            }
        });

        this._engine.addListener('UserOffline', (uid, reason) => {
            console.log('UserOffline', uid, reason);
            const { peerIds } = this.state;
            this.setState({
                peerIds: peerIds.filter((id) => id !== uid),
            });
        });

        this._engine.addListener('JoinChannelSuccess', (channel, uid, elapsed) => {
            console.log('JoinChannelSuccess', channel, uid, elapsed);
            this.setState({
                joinSucceed: true,
                myId: uid
            });
        });
    };


    startCall = async () => {
        // Join Channel using null token and channel name
        console.log("meeting başladı");
        await this._engine?.joinChannel(token, channelName, null, 0);
        this.setState({
            meetingStarted: true
        })
    };


    endCall = async () => {
        await this._engine?.leaveChannel();
        this.setState({ peerIds: [], joinSucceed: false });
    };


    toggleCamera = async () => {
        if(this.state.cameraOpen) {
            await this._engine.muteLocalVideoStream(true);
            this.setState({
                cameraOpen: false,
            })
        }
        else {
            await this._engine.muteLocalVideoStream(false);
            this.setState({
                cameraOpen: true,
            })
        }
    }

    toggleMicrophone = async () => {
        if(this.state.micOpen) {
            await this._engine.muteLocalAudioStream(true);
            this.setState({
                micOpen: false,
            })
        }
        else {
            await this._engine.muteLocalAudioStream(false);
            this.setState({
                micOpen: true,
            })
        }
    }

    leaveMeeting =  () => {
        Alert.alert(
            'Görüşme Sonlandırılıyor',
            'Emin misiniz?',
            [
                {text: 'Ayrıl', onPress: async () => {
                        await this.endCall();
                        this.props.navigation.goBack();
                    }},
                {text: 'Vazgeç', onPress: () => console.log('Stayed on meeting')},
            ],
            {cancelable: false},
        );
    }

    render() {
        return (
            <View style={{flex: 1, backgroundColor: '#faf8f8'}}>
                <Header style={{backgroundColor: 'white', borderBottomWidth: 2, borderBottomColor: '#f18a21'}}>
                    <Left>
                        <TouchableOpacity
                            onPress={() => this.leaveMeeting()}
                            style={{color: "black"}}
                        >
                            <Text style={{marginLeft: 10, fontSize: 30, color: '#B00D23'}}>
                                {"<"}
                            </Text>
                        </TouchableOpacity>
                    </Left>

                    <Text style={{marginTop: 10, fontSize: 20, fontFamily: "Helvetica-Bold"}}>Meeting In Progress</Text>

                    <Right>
                        <TouchableOpacity
                            onPress={this.leaveMeeting}
                            style={{color: "black"}}
                        >
                            <Text style={{marginLeft: 10, fontSize: 20, color: '#B00D23', marginRight: 6}}>
                                Ayrıl
                            </Text>
                        </TouchableOpacity>
                    </Right>
                </Header>

                <View>
                    <TouchableOpacity style={{marginLeft: 10, marginTop: 10}} onPress={this.startCall}>
                        <Text>
                            Start Call
                        </Text>
                    </TouchableOpacity>
                </View>

                <View>
                    <RtcLocalView.SurfaceView
                        style={{ marginLeft: 10, marginTop: 10, height: 250, width: (screen.width / 2 )-10}}
                        channelId={channelName}
                        renderMode={VideoRenderMode.Hidden}
                    />
                </View>

                <View style = {{marginTop: 10}}>
                    {this._renderRemoteVideos()}
                </View>


            </View>

        );
    }

    _renderVideos = () => {
        const { joinSucceed } = this.state;
        return joinSucceed ? (
            <View style={styles.fullView}>
                {this.state.isHost ? (
                    <RtcLocalView.SurfaceView
                        style={styles.max}
                        channelId={channelName}
                        renderMode={VideoRenderMode.Hidden}
                    />
                ) : (
                    <></>
                )}
                {this._renderRemoteVideos()}
            </View>
        ) : null;
    };

    _renderBlack() {
        return (
            <View style = {styles.max}>
                <Text style = {{color: 'red'}}>
                    User User
                </Text>
            </View>
        );
    }

    _renderRemoteVideos = () => {
        const { peerIds } = this.state;
        return (
            <ScrollView
                style={styles.remoteContainer}
                contentContainerStyle={styles.remoteContainerContent}
                horizontal={true}
            >
                {peerIds.map((value) => {
                    console.log("VALUE:" + value)
                    return (
                        <RtcRemoteView.SurfaceView
                            style={styles.remote}
                            uid={value}
                            channelId={channelName}
                            renderMode={VideoRenderMode.Hidden}
                            zOrderMediaOverlay={true}
                        />
                    );
                })}
            </ScrollView>
        );
    };
}

const styles = StyleSheet.create({
    fullView: {
        width: screen.width,
        height: screen.height - 10 ,
    },
    remoteContainer: {
        width: '100%',
        height: 150,
        position: 'absolute',
        top: 5,
    },
    remoteContainerContent: {
        paddingHorizontal: 2.5,
    },
    remote: {
        width: 150,
        height: 150,
        marginHorizontal: 2.5,
    }
});

