import React, { Component } from 'react';
import {StyleSheet, Text, View, Dimensions, ScrollView, TextInput, Button, TouchableOpacity, Image, Alert} from 'react-native';
import {Header, Left, Right} from "native-base"
import DeviceInfo from 'react-native-device-info';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {BallIndicator, BarIndicator, DotIndicator, MaterialIndicator, PacmanIndicator, PulseIndicator, SkypeIndicator, UIActivityIndicator, WaveIndicator,} from 'react-native-indicators';
import MainScreenUser from "../MainScreenUser/MainScreenUser";
import { GoogleSignin, GoogleSigninButton, statusCodes } from 'react-native-google-signin';

var screen = Dimensions.get('window');
var deviceModel = DeviceInfo.getModel();
var url = "http://192.168.1.23:5000/"


export default class Login extends Component {
    constructor() {
        super();
        this.state = {
            isLoading: true,
            imageChoose: 0,
            name: '',
            surname: '',
            email: '',
            password: '',
            passwordConfirmFieldEnabled: false,
            passwordConfirm: '',
            age: 0,
            userType: 'user',
            signUpButtonDisabled: true,
            errorBorderForMail: false,
            errorBorderForPassword: false,
            passAuth1: false,
            passAuth2: false,
            renderLoading: true,
            loggedIn: false,
            userExist: false,
            userTckn: '',
        };
    }

    componentDidMount = async() => {
        const isLoggedIn = await AsyncStorage.getItem('isLoggedIn');
        if(isLoggedIn == "true") {
            this.setState({
                renderLoading: true
            }, () => {
                this.props.navigation.navigate('Anasayfa')
            })
        }
        else {
            this.setState({
                renderLoading: false,
            })
        }

        if(DeviceInfo.getSystemName() == "Android") {
            GoogleSignin.configure({
                webClientId: '50768797639-balvndqlqktdtks061taihf6dq34mc3n.apps.googleusercontent.com',
            });
        }
    }

    _signIn = async () => {
        try {
            await GoogleSignin.hasPlayServices();
            const userInfo = await GoogleSignin.signIn();
            console.log("-----------------", userInfo, "--------------------");
            console.log("Welcome", userInfo.user.name);
            //////////////////////////////////NEW ADDED/////////////////////////////
            let userCredentials  = {
                name: userInfo.user.name,
                surname: "",
                email: userInfo.user.email,
                age: 0,
                password: "",
                userType: 'user',
                tckn: userInfo.user.id,
            };
            console.log(userCredentials);

            try {
                const body = {userCredentials}
                const response = fetch( url + "saveUser", {
                    method: 'POST',
                    headers: {'Content-Type' : 'application/json' },
                    body: JSON.stringify(body)
                })

                console.log('Login ekranında response');
                console.log(response)
            } catch (e) {
                console.log(e.message);
            }

            await AsyncStorage.setItem("userTckn", userInfo.user.id);
            await AsyncStorage.setItem("patientFirst", "true");
            /////////////////////////////////END///////////////////////////////////
            this.setState({ userInfo: userInfo, loggedIn: true });
        } catch (error) {
          if (error.code === statusCodes.SIGN_IN_CANCELLED) {
            // user cancelled the login flow
          } else if (error.code === statusCodes.IN_PROGRESS) {
            // operation (f.e. sign in) is in progress already
          } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
            // play services not available or outdated
          } else {
            // some other error happened
          }
        }
        finally{
            if(this.state.loggedIn==true)
                AsyncStorage.setItem("isLoggedIn", "true").then(this.props.navigation.navigate('Anasayfa'));
        }
    };

    /*I did not test this function but may be tested later*/
    /*getCurrentUserInfo = async () => {
        try {
          const userInfo = await GoogleSignin.signInSilently();
          this.setState({ userInfo });
        } catch (error) {
          if (error.code === statusCodes.SIGN_IN_REQUIRED) {
            // user has not signed in yet
            this.setState({ loggedIn: false });
          } else {
            // some other error
            this.setState({ loggedIn: false });
          }
        }
      };*/

    validateMail(text) {
        let reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        if (reg.test(text) === false) {
            this.setState({
                errorBorderForMail: true,
                email : '',
                signUpButtonDisabled: true,
            }, () => {
                Alert.alert(
                    'Hata ',
                    'Lütfen geçerli bir mail adresi girin!',
                    [
                        {text: 'OK', onPress: () => console.log('Email hatası')},
                    ],
                    {cancelable: false},
                );

                this.textInput.clear()
            })
        }
        else {
            this.setState({
                email: text,
                errorBorderForMail: false,
                passAuth2: true
            })
        }
    }

    validatePassword(text) {
        let eligible = true;
        let msg = ""
        if(text.length < 8) {
            eligible = false;
            msg += "Parolanız minimum 8 karakter içermelidir."
        }
        if(!eligible) {
            Alert.alert(
                'Hata ',
                msg,
                [
                    {text: 'OK', onPress: () => console.log('Password Confirm hatası')},
                ],
                {cancelable: false},
            );
            this.setState({
                errorBorderForPassword: true,
                password: '',
                passwordForConfirm: '',
                signUpButtonDisabled: true,
            }, () => {
                this.textInput2.clear();
                this.textInput3.clear();
            })
            return;
        }
        if(text === this.state.password) {
            this.setState({
                passwordConfirm: text,
                signUpButtonDisabled: false,
                errorBorderForPassword: false,
                passAuth1: true
            })
        }
        else {
            this.setState({
                errorBorderForPassword: true,
                password: '',
                passwordForConfirm: '',
                signUpButtonDisabled: true,
            }, () => {
                Alert.alert(
                    'Hata ',
                    'Girdiğiniz parolalar uyuşmuyor!',
                    [
                        {text: 'OK', onPress: () => console.log('Password Confirm hatası')},
                    ],
                    {cancelable: false},
                );
                this.textInput2.clear()
                this.textInput3.clear()
            });
        }
    }

    validatePasswordForUser = async (text)  => {
        let eligible = true;
        let msg = ""
        if(text.length < 8) {
            eligible = false;
            msg += "Parolanız minimum 8 karakter içermelidir."
        }
        if(!eligible) {
            Alert.alert(
                'Hata ',
                msg,
                [
                    {text: 'OK', onPress: () => console.log('Password hatası')},
                ],
                {cancelable: false},
            );
            this.setState({
                errorBorderForPassword: true,
                password: '',
            }, () => {
                this.textInput2.clear();
            })
        }
        else {
            this.setState({
                errorBorderForPassword: false,
            });
        }
    }

    validateTckn(tckn) {
        let pass = true;
        if(tckn.length != 11) {
            pass = false;
            Alert.alert(
                'Hata ',
                'Lütfen 11 haneli T.C. Kimlik Numaranızı Girin',
                [
                    {text: 'OK', onPress: () => console.log('TCKN hatası')},
                ],
                {cancelable: false},
            );
        }
        return pass;
    }

    onSubmit = async () => {
        if(!this.state.userExist) {
            this.validateMail(this.state.email);
            this.validatePassword(this.state.passwordConfirm)
            let tc_pass = this.validateTckn(this.state.userTckn);
            if(!this.state.errorBorderForMail && !this.state.errorBorderForPassword && tc_pass) {
                let userCredentials  = {
                    name: this.state.name,
                    surname: this.state.surname,
                    email: this.state.email,
                    age: parseInt(this.state.age),
                    password: this.state.password,
                    userType: this.state.userType,
                    tckn: this.state.userTckn,
                };
                console.log(userCredentials);

                try {
                    const body = {userCredentials}
                    const response = fetch( url + "saveUser", {
                        method: 'POST',
                        headers: {'Content-Type' : 'application/json' },
                        body: JSON.stringify(body)
                    })

                    console.log('Login ekranında response');
                    console.log(response)
                } catch (e) {
                    console.log(e.message);
                }

                await AsyncStorage.setItem("userTckn", this.state.userTckn);
                if(userCredentials.userType == 'expert') {
                    await AsyncStorage.setItem("expertFirst", "true")
                    AsyncStorage.setItem("isLoggedIn", "true").then(this.props.navigation.navigate('ExpertDetails'));
                }
                else {
                    await AsyncStorage.setItem("patientFirst", "true")
                    AsyncStorage.setItem("isLoggedIn", "true").then(this.props.navigation.navigate('Anasayfa'));
                }
            }
        }
        else if(this.state.userExist) {
            await this.validateMail(this.state.email);
            await this.validatePasswordForUser(this.state.password);
            if(!this.state.errorBorderForPassword && !this.state.errorBorderForMail) {
                try {
                    const response = await fetch(url + 'getUserForLogin/' + this.state.email)
                    const userObject = await response.json();
                    let user = userObject[0];
                    console.log(user);
                    await AsyncStorage.setItem("userTckn", user.tckn);

                    if(user.password == this.state.password) {
                        AsyncStorage.setItem("isLoggedIn", "true").then(this.props.navigation.navigate('Anasayfa'));
                    }
                    else {
                        Alert.alert(
                            'Bilgilendirme ',
                            'Girdiğiniz parola doğru değil, lütfen tekrar deneyin!',
                            [
                                {text: 'OK', onPress: () => console.log("closed dialog")},
                            ],
                            {cancelable: false},
                        );
                    }
                } catch (e) {
                    Alert.alert(
                        'Bilgilendirme ',
                        'Girdiğiniz bilgiler ile eşleşen bir kullanıcı kaydı bulunamadı!',
                        [
                            {text: 'OK', onPress: () => console.log("closed dialog")},
                        ],
                        {cancelable: false},
                    );
                    console.log(e.message)
                }
            }
        }
    }

    alreadyUser() { // login page renderını değiştirmek için, ilk seferde kaydolduktan sonra sonraki girişlerde sadece mail ve parola görüntülenir
        let current = this.state.userExist;
        if(!current) {
            this.setState({
                signUpButtonDisabled: false,
                userExist: !current
            })
        }
        else {
            this.setState({userExist: !current})
        }
    }

    toggleUserType() {
        if(this.state.userType == 'user') {
            this.setState({
                userType: 'expert'
            })
        }
        else {
            this.setState({
                userType: 'user'
            })
        }
    }


    render() {
        let area;
        if(DeviceInfo.getSystemName() == "Android"){
            area =  <GoogleSigninButton
            style={{ width: '140%', height: 48,
            alignItems: 'center',
            justifyContent: 'center',
            borderWidth: 2,
            borderColor: '#383838',
            borderRadius: 10,
            marginTop: 5,
            marginLeft: -screen.width + 540}}
            size={GoogleSigninButton.Size.Wide}
            color={GoogleSigninButton.Color.Dark}
            onPress={this._signIn} />
        }
        if(this.state.renderLoading) {
            return(
                <PacmanIndicator color='black'/>
            );
        }
        else {
            return (
                <View style={styles.container}>
                    <Header style={{
                        height: this.state.userExist ? (screen.height * 45) / 100: (screen.height * 74) / 100,
                        backgroundColor: 'white',
                        borderBottomWidth: 7,
                        borderBottomColor: '#292929',
                    }}>
                        <View style={{flexDirection: 'column'}}>
                            <View style={{
                                justifyContent: 'flex-start',
                                alignItems: 'center',
                                marginTop: 50,
                            }}>
                                <Image
                                    source={this.state.imageChoose == 0 ? require('../images/yeniBekleme.jpg') : this.state.imageChoose == 1 ? require('../images/yeniBir.jpg') : this.state.imageChoose == 2 ? require('../images/yeniIki.jpg') :
                                        this.state.imageChoose == 3 ? require('../images/yeniUc.jpg') : this.state.imageChoose == 4 ? require('../images/yeniDort.jpg') : this.state.imageChoose == 5 ? require('../images/yeniBes.jpg') :
                                            this.state.imageChoose == 6 ? require('../images/yeniAlti.jpg') : this.state.imageChoose == 7 ? require('../images/yeniYedi.jpg') : this.state.imageChoose == 8 ? require('../images/yeniSekiz.jpg') : this.state.imageChoose == -1 ? require('../images/password2.jpg') : this.state.imageChoose == 9 ? require('../images/yeniDokuz.jpg') : this.state.imageChoose == 10 ? require('../images/yeniOn.jpg') : require('../images/yeniOnbir.jpg')
                                    } style={
                                    deviceModel == 'iPhone 11' || deviceModel == 'iPhone 11 Pro Max' || deviceModel == 'iPhone 12' || deviceModel == 'iPhone 12 Pro' ||
                                    deviceModel == 'iPhone XS Max' || deviceModel == 'iPhone 12 Pro Max' || deviceModel == 'iPhone 7 Plus' || deviceModel == 'iPhone XR' ||
                                    deviceModel == 'iPhone 8 Plus' || deviceModel == 'iPhone 6S Plus' || deviceModel == 'iPhone 6 Plus' ? styles.imageForBiggerDevices :
                                        deviceModel == 'iPhone SE' || deviceModel == 'iPhone 5' || deviceModel == 'iPhone 5S' ? styles.imageForSmallDevices : styles.image}/>
                            </View>
                            <View>
                                {
                                    !this.state.userExist &&
                                    <TextInput
                                        style={styles.input}
                                        placeholder="İsim"
                                        placeholderTextColor="grey"
                                        textAlign='center'
                                        maxLength={15}
                                        autoCorrect={false}
                                        returnKeyType={'done'}
                                        onChangeText={(text) => {
                                            this.setState({imageChoose: text.length, name: text});
                                        }}
                                    />
                                }

                            </View>
                            <View>
                                {
                                    !this.state.userExist &&
                                    <TextInput
                                        style={styles.input}
                                        placeholder="Soyisim"
                                        placeholderTextColor="grey"
                                        textAlign='center'
                                        maxLength={15}
                                        autoCorrect={false}
                                        returnKeyType={'done'}
                                        onChangeText={(text) => {
                                            this.setState({imageChoose: text.length, surname: text});
                                        }}
                                    />
                                }
                            </View>
                            <View>
                                {
                                    !this.state.userExist &&
                                    <TextInput
                                        style={styles.input}
                                        placeholder="T.C. Kimlik Numarası"
                                        placeholderTextColor="grey"
                                        textAlign='center'
                                        keyboardType="number-pad"
                                        maxLength={11}
                                        minLength={11}
                                        autoCorrect={false}
                                        returnKeyType={'done'}
                                        onChangeText={(text) => {
                                            this.setState({imageChoose: text.length, userTckn: text});
                                        }}
                                    />
                                }
                            </View>
                            <View>
                                <TextInput
                                    style={this.state.errorBorderForMail ? styles.inputError: styles.input}
                                    placeholder="E-Mail Adresi"
                                    placeholderTextColor="grey"
                                    ref={input => { this.textInput = input }}
                                    textAlign='center'
                                    maxLength={25}
                                    autoCorrect={false}
                                    returnKeyType={'done'}
                                    onChangeText={(text) => {
                                        this.setState({imageChoose: text.length, email: text});
                                    }}
                                />
                            </View>
                            <View>
                                {
                                    !this.state.userExist
                                    &&
                                    <TextInput
                                        style={styles.input}
                                        placeholder="Yaş"
                                        placeholderTextColor="grey"
                                        textAlign='center'
                                        keyboardType="number-pad"
                                        maxLength={2}
                                        autoCorrect={false}
                                        returnKeyType={'done'}
                                        onChangeText={(text) => {
                                            this.setState({imageChoose: text.length, age: text});
                                        }}
                                    />
                                }
                            </View>

                            <View>
                                <TextInput
                                    style={this.state.errorBorderForPassword ? styles.inputError: styles.input}
                                    placeholder="Parola"
                                    placeholderTextColor="grey"
                                    secureTextEntry={true}
                                    ref={input => { this.textInput2 = input }}
                                    textAlign='center'
                                    maxLength={15}
                                    autoCorrect={false}
                                    returnKeyType={'done'}
                                    onChangeText={(text) => {
                                        this.setState({imageChoose: -1, password: text, passwordConfirmFieldEnabled: true});
                                    }}
                                />
                            </View>
                            <View>
                                {
                                    !this.state.userExist &&
                                    <TextInput
                                        style={this.state.errorBorderForPassword ? styles.inputError: styles.input}
                                        editable = {this.state.passwordConfirmFieldEnabled}
                                        secureTextEntry={true}
                                        ref={input => { this.textInput3 = input }}
                                        placeholder="Parola Onayı"
                                        placeholderTextColor="grey"
                                        textAlign='center'
                                        maxLength={15}
                                        autoCorrect={false}
                                        returnKeyType={'done'}
                                        onChangeText={(text) => {
                                            this.setState({imageChoose: -1, passwordConfirm: text});
                                            if(text.length != 0) {
                                                this.setState({
                                                    signUpButtonDisabled: false
                                                });
                                            }
                                        }}
                                    />
                                }
                            </View>

                            <View>
                                {
                                    !this.state.userExist &&
                                    <TouchableOpacity
                                        onPress={() => this.toggleUserType()}
                                    >
                                        <View style={styles.buttonUserType}>
                                            <Text style={{
                                                fontSize: 16,
                                                color: 'white',
                                                textAlign: 'center',
                                                paddingTop: 0,
                                            }}>
                                                Üyelik Tipi : {this.state.userType == 'expert' ? 'Uzman' : 'Kullanıcı' }
                                            </Text>
                                        </View>
                                    </TouchableOpacity>
                                }
                            </View>
                            <TouchableOpacity
                                disabled={this.state.signUpButtonDisabled}
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
                                        {this.state.userExist ? 'Giriş Yap' : 'Kaydol'}
                                    </Text>
                                </View>
                            </TouchableOpacity>

                        </View>
                    </Header>

                    <View style={{justifyContent: 'center', alignItems: 'center'}}>
                        <TouchableOpacity onPress={() => {
                            this.alreadyUser();
                        }}>
                            <Text style={{paddingTop: 20, fontSize: 18, color: '#efebeb', fontWeight: 'bold'}}>
                                {this.state.userExist ? "Hesap Oluştur" : "Zaten Kayıtlı Mısınız ? "}
                            </Text>
                        </TouchableOpacity>


                    </View>
                    <View style = {{
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: 200,
                        height: 200,
                        paddingLeft: 60
                    }}>
                        {area}
                    </View>

                </View>
            );
        }
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#4d738d',
    },
    text: {
        fontSize: 40,
        fontWeight: 'bold',
        textAlign: 'left',
        marginLeft: 20,
        marginTop: 100,
        color: 'black',
        //fontFamily: 'Helvetica-Bold',
    },
    input: {
        alignItems: 'center',
        fontFamily: 'Helvetica-Bold',
        borderWidth: 2,
        borderColor: '#383838',
        borderRadius: 10,
        height: 35,
        marginTop: 5,
        marginLeft: -screen.width / 10,
        width: '140%',
        textAlign: 'left',
    },
    inputError: {
        alignItems: 'center',
        fontFamily: 'Helvetica-Bold',
        borderWidth: 2,
        borderColor: '#B00D23',
        borderRadius: 10,
        height: 35,
        marginTop: 5,
        marginLeft: -screen.width / 10,
        width: '140%',
        textAlign: 'left',
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        width: '140%',
        borderWidth: 2,
        borderColor: '#383838',
        borderRadius: 10,
        height: 35,
        backgroundColor: '#4d738d',
        marginTop: 10,
        marginLeft: -screen.width / 10,
        fontFamily: 'Helvetica-Bold',
    },
    buttonUserType: {
        alignItems: 'center',
        justifyContent: 'center',
        width: '140%',
        borderWidth: 1,
        borderColor: '#383838',
        borderRadius: 10,
        height: 30,
        backgroundColor: '#92a4b0',
        marginTop: 10,
        marginLeft: -screen.width / 10,
        fontFamily: 'Helvetica',
    },
    image: { //iphone 6 7 8 için
        width: 185,
        height: 185,
        resizeMode: 'contain',
    },
    imageForBiggerDevices: {
        width: 200,
        height: 200,
        resizeMode: 'contain',
    },
    imageForSmallDevices: { // SE icin falan
        width: 150,
        height: 150,
        resizeMode: 'contain',
    },
    imageLogo: {
        width: 75,
        height: 75,
        resizeMode: 'contain',
        marginTop: 40,
    }
});

