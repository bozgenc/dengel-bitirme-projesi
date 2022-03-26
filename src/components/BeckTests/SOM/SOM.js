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

const windowHeight = Dimensions.get('window').height;

export default class SOM extends Component{
    constructor(){
        super();
        this.state={
            questions: [],
            answers: [],
            index: 0,
            score: 0,
            num_of_questions: 10,
            button0clicked: false,
            button1clicked: false,
            button2clicked: false,
            button3clicked: false,
            button4clicked: false,
            prevButtonDisabled: true,
            nextButtonDisabled: false
        }
    }

    componentDidMount =  async () => {
        let question_s = [];

        let q1 = "Baş ağrısı hissetme şiddeti veya sıklığı";
        question_s.push(q1);

        let q2 = "Baygınlık geçirme veya baş dönmesi";
        question_s.push(q2);

        let q3 = "Göğüs ya da kalp ağrıları şiddeti veya sıklığı";
        question_s.push(q3);

        let q4 = "Belin alt kısmında oluşan ağrıların şiddeti veya sıklığı";
        question_s.push(q4);

        let q5 = "Ağırlık kaldırma vb. eylemler gerçekleştirilmediği halde oluşan kas ağrılarının şiddeti veya sıklığı";
        question_s.push(q5);

        let q6 = "Nefes alırken tıkanmak veya güçlük çekme sıklığı";
        question_s.push(q6);

        let q7 = "Aniden gelen sıcak basmasıya da üşüme";
        question_s.push(q7);

        let q8 = "Bedeninizde oluşan uyuşma ve karıncalanma hissi";
        question_s.push(q8);

        let q9 = "Boğazınıza yumru inmiş hissi";
        question_s.push(q9);

        let q10 = "Bedeninizin bası kısımlarında zayıflık ya da güçsüzlük hissetmek";
        question_s.push(q10);

        let q11 = "Kol veya bacaklarda ağırlık hissetmek";
        question_s.push(q11);
        
        let q12 = "Mide bulantısı veya midede rahatsızlık hissetme sıklığı";
        question_s.push(q12);

        this.setState({
            questions: question_s
        })
    }

    button0Clicked_f = () =>{
        let updatedAnswers = this.state.answers;
        updatedAnswers[this.state.index] = "button 0";
        let goPrevDisabled = false;
        let goNextDisabled = false;
        let new_score = this.state.score + 0;

        this.setState({
            answers: updatedAnswers,
            nextButtonDisabled: goNextDisabled,
            prevButtonDisabled: goPrevDisabled,
            score: new_score,
            button0clicked: true,
            button1clicked: false,
            button2clicked: false,
            button3clicked: false,
            button4clicked: false,
        });
    }

    button1Clicked_f = () =>{
        let updatedAnswers = this.state.answers;
        updatedAnswers[this.state.index] = "button 1";
        let goPrevDisabled = false;
        let goNextDisabled = false;
        let new_score = this.state.score + 1;
        this.setState({
            answers: updatedAnswers,
            nextButtonDisabled: goNextDisabled,
            prevButtonDisabled: goPrevDisabled,
            score: new_score,
            button0clicked: false,
            button1clicked: true,
            button2clicked: false,
            button3clicked: false,
            button4clicked: false,
        });
    }

    button2Clicked_f = () =>{
        let updatedAnswers = this.state.answers;
        updatedAnswers[this.state.index] = "button 2";
        let goPrevDisabled = false;
        let goNextDisabled = false;
        let new_score = this.state.score + 2;

        this.setState({
            answers: updatedAnswers,
            nextButtonDisabled: goNextDisabled,
            prevButtonDisabled: goPrevDisabled,
            score: new_score,
            button0clicked: false,
            button1clicked: false,
            button2clicked: true,
            button3clicked: false,
            button4clicked: false,
        });
    }

    button3Clicked_f = () =>{
        let updatedAnswers = this.state.answers;
        updatedAnswers[this.state.index] = "button 3";
        let goPrevDisabled = false;
        let goNextDisabled = false;
        let new_score = this.state.score + 3;

        this.setState({
            answers: updatedAnswers,
            nextButtonDisabled: goNextDisabled,
            prevButtonDisabled: goPrevDisabled,
            score: new_score,
            button0clicked: false,
            button1clicked: false,
            button2clicked: false,
            button3clicked: true,
            button4clicked: false,
        });
    }

    button4Clicked_f = () =>{
        let updatedAnswers = this.state.answers;
        updatedAnswers[this.state.index] = "button 4";
        let goPrevDisabled = false;
        let goNextDisabled = false;
        let new_score = this.state.score + 4;

        this.setState({
            answers: updatedAnswers,
            nextButtonDisabled: goNextDisabled,
            prevButtonDisabled: goPrevDisabled,
            score: new_score,
            button0clicked: false,
            button1clicked: false,
            button2clicked: false,
            button3clicked: false,
            button4clicked: true,
        });
    }

    goPreviousQuestion = () => {
        let newIndex= this.state.index - 1;
        let goPrevDisabled = false;
        let goNextDisabled = false;
        if(newIndex == 0){
            goPrevDisabled = true;
            goNextDisabled = false;
        }
        let previous_answer = this.state.answers[newIndex];
        let isPreviousButton0 = false;
        let isPreviousButton1 = false;
        let isPreviousButton2 = false;
        let isPreviousButton3 = false;
        let isPreviousButton4 = false;

        if(previous_answer == "button 0"){
            isPreviousButton0 = true;
        }
        else if(previous_answer == "button 1"){
            isPreviousButton1 = true;
        }
        else if(previous_answer == "button 2"){
            isPreviousButton2 = true;
        }
        else if(previous_answer == "button 3"){
            isPreviousButton3 = true;
        }
        else if(previous_answer == "button 4"){
            isPreviousButton4 = true;
        }

        this.setState({
            index: newIndex,
            nextButtonDisabled: goNextDisabled,
            prevButtonDisabled: goPrevDisabled,
            button0clicked: isPreviousButton0,
            button1clicked: isPreviousButton1,
            button2clicked: isPreviousButton2,
            button3clicked: isPreviousButton3,
            button4clicked: isPreviousButton4
        });
    }

    goNextQuestion = () => {
        let newIndex = this.state.index + 1;
        let isButton0 = false;
        let isButton1 = false;
        let isButton2 = false;
        let isButton3 = false;
        let isButton4 = false;
        let _answer;
        if(newIndex==12){
            console.log("Somatization Score: ", this.state.score/12, "\n");
            this.props.navigation.navigate('EndTest');
        }
        else{
            if(this.state.answers[newIndex] != null){
                _answer = this.state.answers[newIndex];
                if(_answer == "button 4"){
                    isButton0 = false;
                    isButton1 = false;
                    isButton2 = false;
                    isButton3 = false;
                    isButton4 = true;
                } 
                else if(_answer == "button 3"){
                    isButton0 = false;
                    isButton1 = false;
                    isButton2 = false;
                    isButton3 = true;
                    isButton4 = false;
                }
                else if(_answer == "button 2"){
                    isButton0 = false;
                    isButton1 = false;
                    isButton2 = true;
                    isButton3 = false;
                    isButton4 = false;
                }
                else if(_answer == "button 1"){
                    isButton0 = false;
                    isButton1 = true;
                    isButton2 = false;
                    isButton3 = false;
                    isButton4 = false;
                }
                else if(_answer == "button 0"){
                    isButton0 = true;
                    isButton1 = false;
                    isButton2 = false;
                    isButton3 = false;
                    isButton4 = false;
                } 
            }
            this.setState({
                index: newIndex,
                button0clicked: isButton0,
                button1clicked: isButton1,
                button2clicked: isButton2,
                button3clicked: isButton3,
                button4clicked: isButton4
            })
        }
    }

    render () {
        let btn_prev;
        if(this.state.index!=0){
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
        let current_avatar;
        if(this.state.index == 0){
            current_avatar = <Avatar
                                size={64}
                                rounded
                                icon={{
                                name: 'head-alert',
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
        }
        else if(this.state.index == 1){
            current_avatar = <Avatar
                                size={64}
                                rounded
                                icon={{
                                name: 'head-flash',
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
        }
        else if(this.state.index == 2){
            current_avatar = <Avatar
                                size={64}
                                rounded
                                icon={{
                                name: 'heart-half-full',
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
        }
        else if(this.state.index == 3){
            current_avatar = <Avatar
                                size={64}
                                rounded
                                icon={{
                                name: 'stethoscope',
                                type: 'font-awesome',
                                color: '#cdde20'
                                }}
                                containerStyle={{
                                borderColor: '#cdde20',
                                borderStyle: 'solid',
                                borderWidth: 1,
                                alignSelf: "center"
                                }}
                            />
        }
        else if(this.state.index == 4){
            current_avatar = <Avatar
                                size={64}
                                rounded
                                icon={{
                                name: 'alert-rhombus-outline',
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
        }
        else if(this.state.index == 5){
            current_avatar = <Avatar
                                size={64}
                                rounded
                                icon={{
                                name: 'emoji-nature',
                                type: 'material-icons',
                                color: '#cdde20'
                                }}
                                containerStyle={{
                                borderColor: '#cdde20',
                                borderStyle: 'solid',
                                borderWidth: 1,
                                alignSelf: "center"
                                }}
                            />
        }
        else if(this.state.index == 6){
            current_avatar = <Avatar
                                size={64}
                                rounded
                                icon={{
                                name: 'sun-o',
                                type: 'font-awesome',
                                color: '#cdde20'
                                }}
                                containerStyle={{
                                borderColor: '#cdde20',
                                borderStyle: 'solid',
                                borderWidth: 1,
                                alignSelf: "center"
                                }}
                            />
        }
        else if(this.state.index == 7){
            current_avatar = <Avatar
                                size={64}
                                rounded
                                icon={{
                                name: 'bug',
                                type: 'font-awesome',
                                color: '#cdde20'
                                }}
                                containerStyle={{
                                borderColor: '#cdde20',
                                borderStyle: 'solid',
                                borderWidth: 1,
                                alignSelf: "center"
                                }}
                            />
        }
        else if(this.state.index == 8){
            current_avatar = <Avatar
                                size={64}
                                rounded
                                icon={{
                                name: 'minuscircleo',
                                type: 'ant-design',
                                color: '#cdde20'
                                }}
                                containerStyle={{
                                borderColor: '#cdde20',
                                borderStyle: 'solid',
                                borderWidth: 1,
                                alignSelf: "center"
                                }}
                            />
        }
        else if(this.state.index == 9){
            current_avatar = <Avatar
                                size={64}
                                rounded
                                icon={{
                                name: 'doctor',
                                type: 'fontisto',
                                color: '#cdde20'
                                }}
                                containerStyle={{
                                borderColor: '#cdde20',
                                borderStyle: 'solid',
                                borderWidth: 1,
                                alignSelf: "center"
                                }}
                            />
        }
        else if(this.state.index == 10){
            current_avatar = <Avatar
                                size={64}
                                rounded
                                icon={{
                                name: 'weight',
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
        }
        else if(this.state.index == 11){
            current_avatar = <Avatar
                                size={64}
                                rounded
                                icon={{
                                name: 'stomach',
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
        }
        return(
            <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
                <Card style={styles.gCard}>
                
                    {current_avatar}

                    <Text style={styles.textStyle}>
                        {this.state.questions[this.state.index]}
                    </Text>

                    <TouchableOpacity onPress={() => this.button0Clicked_f()}>
                        <View style={this.state.button0clicked ? styles.buttonUnclicked : styles.buttonClicked}>
                            <Text style={styles.textStyle3}>
                                0
                            </Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => this.button1Clicked_f()}>
                        <View style={this.state.button1clicked ? styles.buttonUnclicked : styles.buttonClicked}>
                            <Text style={styles.textStyle3}>
                                1
                            </Text>
                        </View>
                    </TouchableOpacity>


                    <TouchableOpacity onPress={() => this.button2Clicked_f()}>
                        <View style={this.state.button2clicked ? styles.buttonUnclicked : styles.buttonClicked}>
                            <Text style={styles.textStyle3}>
                                2
                            </Text>
                        </View>
                    </TouchableOpacity>


                    <TouchableOpacity onPress={() => this.button3Clicked_f()}>
                        <View style={this.state.button3clicked ? styles.buttonUnclicked : styles.buttonClicked}>
                            <Text style={styles.textStyle3}>
                                3
                            </Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => this.button4Clicked_f()}>
                        <View style={this.state.button4clicked ? styles.buttonUnclicked : styles.buttonClicked}>
                            <Text style={styles.textStyle3}>
                                4
                            </Text>
                        </View>
                    </TouchableOpacity>
                </Card>

                <View>
                    <View style={{ marginTop: windowHeight-windowHeight*0.63, marginLeft: '5%', flexDirection:"row"}}>

                        {btn_prev}

                        <View style={{flex:1}}>
                            <TouchableOpacity onPress={() => this.goNextQuestion()} disabled = {this.state.answers[this.state.index]==null?true:false}>
                                <View style={styles.buttonNext}>
                                    <Text style={styles.textStyle2}>
                                        Sonraki
                                    </Text>
                                </View>
                            </TouchableOpacity>  
                        </View>
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
    }
});
