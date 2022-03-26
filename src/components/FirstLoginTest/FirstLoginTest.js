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
import { Card, Icon, Avatar} from 'react-native-elements';
import BackHandler from 'react-native';
import RNExitApp from 'react-native-exit-app';

const windowHeight = Dimensions.get('window').height;

export default class ANX extends Component{
    constructor(){
        super();
        this.state={
            questions: [],
            answers: [],
            index: 0,
            name: "",
            button0clicked: false,
            button1clicked: false,
            button2clicked: false,
            prevButtonDisabled: true,
            nextButtonDisabled: false
        }
    }

    componentDidMount =  async () => {
        let question_s = [];

        let q1 = "Size hitap etmemiz için bir isim giriniz";
        question_s.push(q1);

        let q2 = "Uygulamamız sadece 17 yaş üstüne hizmet vermektedir. Devam etmek için Devam butonuna; 17 yaşın altındaysanız lütfen Çıkış butonuna basınız.";
        question_s.push(q2);

        //gender of user
        let q3 = "Aşağıdaki şıklardan size uygun olanını belirtiniz";
        question_s.push(q3);

        //gender choice for expert
        let q4 = "Uygulama kapsamında iletişime geçeceğiniz terapistte bulunmasını tercih ettiğiniz özellikleri işaretleyiniz";
        question_s.push(q4);

        //age choice for expert
        let q5 = "Uygulama kapsamında iletişime geçeceğiniz terapistte bulunmasını tercih ettiğiniz özellikleri işaretleyiniz";
        question_s.push(q5);

        //religion choice for expert
        let q6 = "Uygulama kapsamında iletişime geçeceğiniz terapistte bulunmasını tercih ettiğiniz özellikleri işaretleyiniz";
        question_s.push(q6);

        //color choices for expert
        let q7 = "Uygulama kapsamında iletişime geçeceğiniz terapistte bulunmasını tercih ettiğiniz özellikleri işaretleyiniz";
        question_s.push(q7);

        this.setState({
            questions: question_s
        })
    }

    button0Clicked_f = () =>{
        let updatedAnswers = this.state.answers;
        let goPrevDisabled = false;
        let goNextDisabled = false;

        if(this.state.index == 1){
            //cikis yap
        }
        else if(this.state.index == 2){
            updatedAnswers[this.state.index] = "female";
            this.setState({
                answers: updatedAnswers,
                nextButtonDisabled: goNextDisabled,
                prevButtonDisabled: goPrevDisabled,
                button0clicked: true,
                button1clicked: false,
                button2clicked: false
            });
        }
        else if(this.state.index == 3){
            updatedAnswers[this.state.index] = "female";
            this.setState({
                answers: updatedAnswers,
                nextButtonDisabled: goNextDisabled,
                prevButtonDisabled: goPrevDisabled,
                button0clicked: true,
                button1clicked: false,
                button2clicked: false
            });
        }
        else if(this.state.index == 4){
            updatedAnswers[this.state.index] = "younger";
            this.setState({
                answers: updatedAnswers,
                nextButtonDisabled: goNextDisabled,
                prevButtonDisabled: goPrevDisabled,
                button0clicked: true,
                button1clicked: false,
                button2clicked: false
            });
        }
        else if(this.state.index == 5){
            updatedAnswers[this.state.index] = "religious";
            this.setState({
                answers: updatedAnswers,
                nextButtonDisabled: goNextDisabled,
                prevButtonDisabled: goPrevDisabled,
                button0clicked: true,
                button1clicked: false
            });
        }
        else if(this.state.index == 6){
            updatedAnswers[this.state.index] = "color";
            this.setState({
                answers: updatedAnswers,
                nextButtonDisabled: goNextDisabled,
                prevButtonDisabled: goPrevDisabled,
                button0clicked: true,
                button1clicked: false
            });
        }
    }

    button1Clicked_f = () =>{
        let updatedAnswers = this.state.answers;
        let goPrevDisabled = false;
        let goNextDisabled = false;

        if(this.state.index == 1){
            //devam et
        }
        else if(this.state.index == 2){
            updatedAnswers[this.state.index] = "male";
            this.setState({
                answers: updatedAnswers,
                nextButtonDisabled: goNextDisabled,
                prevButtonDisabled: goPrevDisabled,
                button0clicked: false,
                button1clicked: true,
                button2clicked: false
            });
        }
        else if(this.state.index == 3){
            updatedAnswers[this.state.index] = "male";
            this.setState({
                answers: updatedAnswers,
                nextButtonDisabled: goNextDisabled,
                prevButtonDisabled: goPrevDisabled,
                button0clicked: false,
                button1clicked: true,
                button2clicked: false
            });
        }
        else if(this.state.index == 4){
            updatedAnswers[this.state.index] = "elder";
            this.setState({
                answers: updatedAnswers,
                nextButtonDisabled: goNextDisabled,
                prevButtonDisabled: goPrevDisabled,
                button0clicked: false,
                button1clicked: true,
                button2clicked: false
            });
        }
        else if(this.state.index == 5){
            updatedAnswers[this.state.index] = "non-religious";
            this.setState({
                answers: updatedAnswers,
                nextButtonDisabled: goNextDisabled,
                prevButtonDisabled: goPrevDisabled,
                button0clicked: false,
                button1clicked: true
            });
        }
        else if(this.state.index == 6){
            updatedAnswers[this.state.index] = "dont care";
            this.setState({
                answers: updatedAnswers,
                nextButtonDisabled: goNextDisabled,
                prevButtonDisabled: goPrevDisabled,
                button0clicked: false,
                button1clicked: true
            });
        }
    }

    button2Clicked_f = () =>{
        let updatedAnswers = this.state.answers;
        let goPrevDisabled = false;
        let goNextDisabled = false;

        if(this.state.index == 1){
            //devam et
        }
        else if(this.state.index == 2){
            updatedAnswers[this.state.index] = "other";
            this.setState({
                answers: updatedAnswers,
                nextButtonDisabled: goNextDisabled,
                prevButtonDisabled: goPrevDisabled,
                button0clicked: false,
                button1clicked: false,
                button2clicked: true
            });
        }
        else if(this.state.index == 3){
            updatedAnswers[this.state.index] = "lgbtq";
            this.setState({
                answers: updatedAnswers,
                nextButtonDisabled: goNextDisabled,
                prevButtonDisabled: goPrevDisabled,
                button0clicked: false,
                button1clicked: false,
                button2clicked: true
            });
        }
        else if(this.state.index == 4){
            updatedAnswers[this.state.index] = "dont care";
            this.setState({
                answers: updatedAnswers,
                nextButtonDisabled: goNextDisabled,
                prevButtonDisabled: goPrevDisabled,
                button0clicked: false,
                button1clicked: false,
                button2clicked: true
            });
        }
        
    }

    goPreviousQuestion = () => {
        let newIndex= this.state.index - 1;
        let goPrevDisabled = false;
        let goNextDisabled = false;
        let Name = "";
        let previous_answer = this.state.answers[newIndex];
        let isPreviousButton0 = false;
        let isPreviousButton1 = false;
        let isPreviousButton2 = false;

        if(newIndex == 0){
            goPrevDisabled = true;
            goNextDisabled = false;
            Name = this.state.answers[newIndex];
            this.setState({
                index: newIndex,
                nextButtonDisabled: goNextDisabled,
                prevButtonDisabled: goPrevDisabled,
                name: Name
            });
        }

        else if(newIndex == 1){
            isPreviousButton0 = false;
            isPreviousButton1 = false;
            this.setState({
                index: newIndex,
                button0clicked: isPreviousButton0,
                button1clicked: isPreviousButton1,
                nextButtonDisabled: goNextDisabled,
                prevButtonDisabled: goPrevDisabled
            });
        }

        else if(newIndex == 2){
            if(previous_answer == "female"){
                isPreviousButton0 = true;
                isPreviousButton1 = false;
                isPreviousButton2 = false;
            }
            else if(previous_answer == "male"){
                isPreviousButton0 = false;
                isPreviousButton1 = true;
                isPreviousButton2 = false;
            }
            else if(previous_answer == "other"){
                isPreviousButton0 = false;
                isPreviousButton1 = false;
                isPreviousButton2 = true;
            }
            this.setState({
                index: newIndex,
                button0clicked: isPreviousButton0,
                button1clicked: isPreviousButton1,
                button2clicked: isPreviousButton2,
                nextButtonDisabled: goNextDisabled,
                prevButtonDisabled: goPrevDisabled
            });
        }

        else if(newIndex == 3){
            if(previous_answer == "female"){
                isPreviousButton0 = true;
                isPreviousButton1 = false;
                isPreviousButton2 = false;
            }
            else if(previous_answer == "male"){
                isPreviousButton0 = false;
                isPreviousButton1 = true;
                isPreviousButton2 = false;
            }
            else if(previous_answer == "lgbtq"){
                isPreviousButton0 = false;
                isPreviousButton1 = false;
                isPreviousButton2 = true;
            }
            this.setState({
                index: newIndex,
                button0clicked: isPreviousButton0,
                button1clicked: isPreviousButton1,
                button2clicked: isPreviousButton2,
                nextButtonDisabled: goNextDisabled,
                prevButtonDisabled: goPrevDisabled
            });
        }

        else if(newIndex == 4){
            if(previous_answer == "younger"){
                isPreviousButton0 = true;
                isPreviousButton1 = false;
                isPreviousButton2 = false;
            }
            else if(previous_answer == "elder"){
                isPreviousButton0 = false;
                isPreviousButton1 = true;
                isPreviousButton2 = false;
            }
            else if(previous_answer == "dont care"){
                isPreviousButton0 = false;
                isPreviousButton1 = false;
                isPreviousButton2 = true;
            }
            this.setState({
                index: newIndex,
                button0clicked: isPreviousButton0,
                button1clicked: isPreviousButton1,
                button2clicked: isPreviousButton2,
                nextButtonDisabled: goNextDisabled,
                prevButtonDisabled: goPrevDisabled
            });
        }

        else if(newIndex == 5){
            if(previous_answer == "religious"){
                isPreviousButton0 = true;
                isPreviousButton1 = false;
            }
            else if(previous_answer == "non-religious"){
                isPreviousButton0 = false;
                isPreviousButton1 = true;
            }
            this.setState({
                index: newIndex,
                button0clicked: isPreviousButton0,
                button1clicked: isPreviousButton1,
                nextButtonDisabled: goNextDisabled,
                prevButtonDisabled: goPrevDisabled
            });
        }
        
    }

    goNextQuestion = () => {
        let newIndex = this.state.index + 1;
        let isButton0 = false;
        let isButton1 = false;
        let isButton2 = false;
        let goPrevDisabled = false;
        let goNextDisabled = false;
        let _answer;

        if(newIndex == 1){
            isButton0 = false;
            isButton1 = false;
            this.setState({
                index: newIndex,
                button0clicked: isButton0,
                button1clicked: isButton1,
                nextButtonDisabled: goNextDisabled,
                prevButtonDisabled: goPrevDisabled
            });
        }
        else if(newIndex == 2){
            if(this.state.answers[newIndex] != null){
                _answer = this.state.answers[newIndex];
                if(_answer == "female"){
                    isButton0 = true;
                    isButton1 = false;
                    isButton2 = false;
                }
                else if(_answer == "male"){
                    isButton0 = false;
                    isButton1 = true;
                    isButton2 = false;
                }
                else if(_answer == "other"){
                    isButton0 = false;
                    isButton1 = false;
                    isButton2 = true;
                }
                
            }
            this.setState({
                index: newIndex,
                button0clicked: isButton0,
                button1clicked: isButton1,
                button2clicked: isButton2,
                nextButtonDisabled: goNextDisabled,
                prevButtonDisabled: goPrevDisabled
            });
        }
        else if(newIndex == 3){
            if(this.state.answers[newIndex] != null){
                _answer = this.state.answers[newIndex];
                if(_answer == "female"){
                    isButton0 = true;
                    isButton1 = false;
                    isButton2 = false;
                }
                else if(_answer == "male"){
                    isButton0 = false;
                    isButton1 = true;
                    isButton2 = false;
                }
                else if(_answer == "lgbtq"){
                    isButton0 = false;
                    isButton1 = false;
                    isButton2 = true;
                }
            }
            this.setState({
                index: newIndex,
                button0clicked: isButton0,
                button1clicked: isButton1,
                button2clicked: isButton2,
                nextButtonDisabled: goNextDisabled,
                prevButtonDisabled: goPrevDisabled
            });
        }

        else if(newIndex == 4){
            if(this.state.answers[newIndex] != null){
                _answer = this.state.answers[newIndex];
                if(_answer == "younger"){
                    isButton0 = true;
                    isButton1 = false;
                    isButton2 = false;
                }
                else if(_answer == "elder"){
                    isButton0 = false;
                    isButton1 = true;
                    isButton2 = false;
                }
                else if(_answer == "dont care"){
                    isButton0 = false;
                    isButton1 = false;
                    isButton2 = true;
                }
            }
            this.setState({
                index: newIndex,
                button0clicked: isButton0,
                button1clicked: isButton1,
                button2clicked: isButton2,
                nextButtonDisabled: goNextDisabled,
                prevButtonDisabled: goPrevDisabled
            });
        }

        else if(newIndex == 5){
            if(this.state.answers[newIndex] != null){
                _answer = this.state.answers[newIndex];
                if(_answer == "religious"){
                    isButton0 = true;
                    isButton1 = false;
                }
                else if(_answer == "non-religious"){
                    isButton0 = false;
                    isButton1 = true;
                }
            }
            this.setState({
                index: newIndex,
                button0clicked: isButton0,
                button1clicked: isButton1,
                nextButtonDisabled: goNextDisabled,
                prevButtonDisabled: goPrevDisabled
            });
        }
        else if(newIndex == 6){
            if(this.state.answers[newIndex] != null){
                _answer = this.state.answers[newIndex];
                if(_answer == "color"){
                    isButton0 = true;
                    isButton1 = false;
                }
                else if(_answer == "dont care"){
                    isButton0 = false;
                    isButton1 = true;
                }
            }
            this.setState({
                index: newIndex,
                button0clicked: isButton0,
                button1clicked: isButton1,
                nextButtonDisabled: goNextDisabled,
                prevButtonDisabled: goPrevDisabled
            });
        }
        else if(newIndex == 7){
            console.log("Finished ", "\n");
            for(var i=0; i<7; i++){
                console.log(i, ". ", this.state.answers[i]);
            }
            this.props.navigation.navigate('Home');
        }
        
    }

    goExit = () => {

        RNExitApp.exitApp();
    }

    render () {
        let btn_prev;
        if(this.state.index !=0 && this.state.index != 1){
            btn_prev = 
            <View style={{flex:1}}>
                <TouchableOpacity onPress={() => this.goPreviousQuestion()}>
                    <View style={styles.buttonPrev}>
                        <Text style={styles.textStyle2}>
                            Önceki
                        </Text>
                    </View>
                </TouchableOpacity> 
            </View>
        }
        else  if(this.state.index == 1){
            btn_prev = 
            <View style={{flex:1}}>
                <TouchableOpacity onPress={() => this.goExit()}>
                    <View style={styles.buttonPrev}>
                        <Text style={styles.textStyle2}>
                            Çıkış
                        </Text>
                    </View>
                </TouchableOpacity> 
            </View>
        }
        let btn_next;
        if(this.state.index == 0 ){
            btn_next = 
            <View style={{flex:1}}>
                <TouchableOpacity onPress={() => this.goNextQuestion()}>
                    <View style={styles.buttonNext}>
                        <Text style={styles.textStyle2}>
                            Sonraki
                        </Text>
                    </View>
                </TouchableOpacity> 
            </View>
        }
        else if(this.state.index != 1){
            btn_next = 
            <View style={{flex:1}}>
                <TouchableOpacity onPress={() => this.goNextQuestion()} disabled = {this.state.answers[this.state.index]==null?true:false}>
                    <View style={styles.buttonNext}>
                        <Text style={styles.textStyle2}>
                            Sonraki
                        </Text>
                    </View>
                </TouchableOpacity> 
            </View>
        }
        else if(this.state.index == 1){
            btn_next = 
            <View style={{flex:1}}>
                <TouchableOpacity onPress={() => this.goNextQuestion()}>
                    <View style={styles.buttonNext}>
                        <Text style={styles.textStyle2}>
                            Devam Et
                        </Text>
                    </View>
                </TouchableOpacity> 
            </View>
        }
        else if(this.state.index == 6){
            btn_next = 
            <View style={{flex:1}}>
                <TouchableOpacity onPress={() => this.goNextQuestion()} disabled = {this.state.answers[this.state.index]==null?true:false}>
                    <View style={styles.buttonNext}>
                        <Text style={styles.textStyle2}>
                            Bitir
                        </Text>
                    </View>
                </TouchableOpacity> 
            </View>
        }

        let btn0;
        if(this.state.index != 0 && this.state.index != 1){
            if(this.state.index == 2 || this.state.index == 3){
                btn0 = 
                <TouchableOpacity onPress={() => this.button0Clicked_f()}>
                    <View style={this.state.button0clicked ? styles.buttonUnclicked : styles.buttonClicked}>
                        <Text style={styles.textStyle3}>
                            Kadın
                        </Text>
                    </View>
                </TouchableOpacity>
            }
            else if(this.state.index == 4){
                btn0 = 
                <TouchableOpacity onPress={() => this.button0Clicked_f()}>
                    <View style={this.state.button0clicked ? styles.buttonUnclicked : styles.buttonClicked}>
                        <Text style={styles.textStyle3}>
                            Genç
                        </Text>
                    </View>
                </TouchableOpacity>
            }
            else if(this.state.index == 5){
                btn0 = 
                <TouchableOpacity onPress={() => this.button0Clicked_f()}>
                    <View style={this.state.button0clicked ? styles.buttonUnclicked : styles.buttonClicked}>
                        <Text style={styles.textStyle3}>
                            Dindar
                        </Text>
                    </View>
                </TouchableOpacity>
            }
            else if(this.state.index == 6){
                btn0 = 
                <TouchableOpacity onPress={() => this.button0Clicked_f()}>
                    <View style={this.state.button0clicked ? styles.buttonUnclicked : styles.buttonClicked}>
                        <Text style={styles.textStyle3}>
                            Irkçılıkla ilgili
                        </Text>
                    </View>
                </TouchableOpacity>
            }
            
        }
        
        let btn1;
        if(this.state.index != 0 && this.state.index != 1){
            if(this.state.index == 2 || this.state.index == 3){
                btn1 = 
                <TouchableOpacity onPress={() => this.button1Clicked_f()}>
                    <View style={this.state.button1clicked ? styles.buttonUnclicked : styles.buttonClicked}>
                        <Text style={styles.textStyle3}>
                            Erkek
                        </Text>
                    </View>
                </TouchableOpacity>
            }
            else if(this.state.index == 4){
                btn1 = 
                <TouchableOpacity onPress={() => this.button1Clicked_f()}>
                    <View style={this.state.button1clicked ? styles.buttonUnclicked : styles.buttonClicked}>
                        <Text style={styles.textStyle3}>
                            40 +
                        </Text>
                    </View>
                </TouchableOpacity>
            }
            else if(this.state.index == 5){
                btn1 = 
                <TouchableOpacity onPress={() => this.button1Clicked_f()}>
                    <View style={this.state.button1clicked ? styles.buttonUnclicked : styles.buttonClicked}>
                        <Text style={styles.textStyle3}>
                            Dini değerler gözetmeyen
                        </Text>
                    </View>
                </TouchableOpacity>
            }
            else if(this.state.index == 6){
                btn1 = 
                <TouchableOpacity onPress={() => this.button1Clicked_f()}>
                    <View style={this.state.button1clicked ? styles.buttonUnclicked : styles.buttonClicked}>
                        <Text style={styles.textStyle3}>
                            Fark etmez
                        </Text>
                    </View>
                </TouchableOpacity>
            }
        }

        let btn2;
        if(this.state.index != 0 && this.state.index != 1 && this.state.index != 6 && this.state.index != 5){
            if(this.state.index == 2){
                btn2 = 
                <TouchableOpacity onPress={() => this.button2Clicked_f()}>
                    <View style={this.state.button2clicked ? styles.buttonUnclicked : styles.buttonClicked}>
                        <Text style={styles.textStyle3}>
                            Diğer
                        </Text>
                    </View>
                </TouchableOpacity>
            }
            else if(this.state.index == 3){
                btn2 = 
                <TouchableOpacity onPress={() => this.button2Clicked_f()}>
                    <View style={this.state.button2clicked ? styles.buttonUnclicked : styles.buttonClicked}>
                        <Text style={styles.textStyle3}>
                            LGBTQ+
                        </Text>
                    </View>
                </TouchableOpacity>
            }
            else if(this.state.index == 4){
                btn2 = 
                <TouchableOpacity onPress={() => this.button2Clicked_f()}>
                    <View style={this.state.button2clicked ? styles.buttonUnclicked : styles.buttonClicked}>
                        <Text style={styles.textStyle3}>
                            Fark etmez
                        </Text>
                    </View>
                </TouchableOpacity>
            }
        }

        let text_area;
        if(this.state.index==0){
            text_area=
            <View>
                <TextInput
                    style={this.state.errorBorderForMail ? styles.inputError: styles.input}
                    placeholder="name"
                    ref={input => { this.textInput = input }}
                    textAlign='center'
                    maxLength={25}
                    autoCorrect={false}
                    returnKeyType={'done'}
                    onChangeText={(text) => {
                        this.setState({name: text});
                    }}
                />
            </View>
        }
        return(
            <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
                <Card style={styles.gCard}>
                
                    <Avatar
                        size={64}
                        rounded
                        icon={{
                        name: 'hand-heart-outline',
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
                        {this.state.questions[this.state.index]}
                    </Text>

                    {text_area}
                    {btn0}
                    {btn1}
                    {btn2}

                </Card>

                <View>
                    <View style={{ marginTop: windowHeight-windowHeight*0.63, marginLeft: '5%', flexDirection:"row"}}>

                        {btn_prev}
                        {btn_next}

                    </View>
                </View>

            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#fff0f5',
    },
    container2: {
        flex: 2,
        flexDirection: 'row',
        backgroundColor: '#fff0f5',
        marginTop: '90%',
        paddingVertical : 2,
        paddingHorizontal : 20
    },
    bCard: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical : 2,
        paddingHorizontal : 20,
        backgroundColor: '#4d738d',
        borderRadius : 30,
        shadowColor : 'black',
        shadowOpacity : .2,
        shadowRadius : 5,
        marginTop : 10,
        text_align: 'center'
    },
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
    textStyle: {
        marginTop: 10,
        marginLeft: 2,
        fontSize: 20,
        fontWeight: "bold",
        fontFamily: "sans-serif-light"
    },
    textStyle2: {
        marginTop: 2,
        marginLeft: 2,
        fontSize: 14,
        fontFamily: "sans-serif-light",
        fontWeight: "bold"
    },
    textStyle3: {
        fontSize: 15,
        color: 'black',
        textAlign: 'center',
        fontFamily: "sans-serif-light",
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
    },
    buttonNext: {
        justifyContent: 'flex-end',
        alignItems: 'center',
        justifyContent: 'center',
        width: '90%',
        borderWidth: 2,
        borderColor: '#7cfc00',
        borderRadius: 100,
        height: 35,
        backgroundColor: '#7cfc00'
    },
    buttonPrev: {
        justifyContent: 'flex-start',
        alignItems: 'center',
        justifyContent: 'center',
        width: '85%',
        borderWidth: 2,
        borderColor: '#ff6347',
        borderRadius: 100,
        height: 35,
        backgroundColor: '#ff6347'
    },
    input: {
        alignItems: 'center',
        fontFamily: 'Helvetica-Bold',
        borderWidth: 2,
        borderColor: '#383838',
        borderRadius: 10,
        height: 35,
        marginTop: 5,
        marginLeft: 10,
        width: '90%',
        textAlign: 'left',
    },
});
