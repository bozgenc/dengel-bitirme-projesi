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
//npm install react-native-elements
//npm install react-native-vector-icons
//npx react-native link react-native-vector-icons
    
    


var screen = Dimensions.get('window');

export default class FirstLoginTest extends Component{
    constructor(){
        super();
        this.state={
            questions: [],
            answers: [],
            index: 0,
            num_of_questions: 4,
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

        let q1 = "question 1.";
        question_s.push(q1);

        let q2 = "question 2.";
        question_s.push(q2);

        let q3 = "question 3.";
        question_s.push(q3);

        let q4 = "question 4.";
        question_s.push(q4);

        this.setState({
            questions: question_s
        })
    }

    button1Clicked_f = () =>{
        let updatedAnswers = this.state.answers;
        updatedAnswers[this.state.index] = "button 1";
        let goPrevDisabled = false;
        let goNextDisabled = false;

        if(this.state.index == this.state.num_of_questions){
            //write sth needed
        }

        this.setState({
            answers: updatedAnswers,
            nextButtonDisabled: goNextDisabled,
            prevButtonDisabled: goPrevDisabled,
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

        if(this.state.index == this.state.num_of_questions){
            //write sth needed
        }

        this.setState({
            answers: updatedAnswers,
            nextButtonDisabled: goNextDisabled,
            prevButtonDisabled: goPrevDisabled,
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

        if(this.state.index == this.state.num_of_questions){
            //write sth needed
        }

        this.setState({
            answers: updatedAnswers,
            nextButtonDisabled: goNextDisabled,
            prevButtonDisabled: goPrevDisabled,
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

        if(this.state.index == this.state.num_of_questions){
            //write sth needed
        }

        this.setState({
            answers: updatedAnswers,
            nextButtonDisabled: goNextDisabled,
            prevButtonDisabled: goPrevDisabled,
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
        let isPreviousButton1 = false;
        let isPreviousButton2 = false;
        let isPreviousButton3 = false;
        let isPreviousButton4 = false;

        if(previous_answer == "button 1"){
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
            button1clicked: isPreviousButton1,
            button2clicked: isPreviousButton2,
            button3clicked: isPreviousButton3,
            button4clicked: isPreviousButton4
        });
    }

    goNextQuestion = () => {
        let newIndex = this.state.index + 1;
        let isButton1 = false;
        let isButton2 = false;
        let isButton3 = false;
        let isButton4 = false;
        let _answer;
        if(newIndex==4){
            this.props.navigation.navigate('Home');
        }
        else{
            if(this.state.answers[newIndex] != null){
                _answer = this.state.answers[newIndex];
                if(_answer == "button 4"){
                    isButton1 = false;
                    isButton2 = false;
                    isButton3 = false;
                    isButton4 = true;
                } 
                else if(_answer == "button 3"){
                    isButton1 = false;
                    isButton2 = false;
                    isButton3 = true;
                    isButton4 = false;
                }
                else if(_answer == "button 2"){
                    isButton1 = false;
                    isButton2 = true;
                    isButton3 = false;
                    isButton4 = false;
                }
                else if(_answer == "button 1"){
                    isButton1 = true;
                    isButton2 = false;
                    isButton3 = false;
                    isButton4 = false;
                }
            }
            this.setState({
                index: newIndex,
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
            <TouchableOpacity onPress={() => this.goPreviousQuestion()} disabled = {this.state.goPrevDisabled}>
                <View style={styles.buttonPrev}>
                    <Text style={styles.textStyle2}>
                        Previous
                    </Text>
                </View>
            </TouchableOpacity>
        }
        return(
            <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
                <Card style={styles.gCard}>
                <Avatar
                        size={64}
                        rounded
                        icon={{
                        name: 'emoticon-angry',
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


                    <TouchableOpacity onPress={() => this.button1Clicked_f()}>
                        <View style={this.state.button1clicked ? styles.buttonUnclicked : styles.buttonClicked}>
                            <Text style={styles.textStyle3}>
                                button 1
                            </Text>
                        </View>
                    </TouchableOpacity>


                    <TouchableOpacity onPress={() => this.button2Clicked_f()}>
                        <View style={this.state.button2clicked ? styles.buttonUnclicked : styles.buttonClicked}>
                            <Text style={styles.textStyle3}>
                                button 2
                            </Text>
                        </View>
                    </TouchableOpacity>


                    <TouchableOpacity onPress={() => this.button3Clicked_f()}>
                        <View style={this.state.button3clicked ? styles.buttonUnclicked : styles.buttonClicked}>
                            <Text style={styles.textStyle3}>
                                button 3
                            </Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => this.button4Clicked_f()}>
                        <View style={this.state.button4clicked ? styles.buttonUnclicked : styles.buttonClicked}>
                            <Text style={styles.textStyle3}>
                                button 4
                            </Text>
                        </View>
                    </TouchableOpacity>
                </Card>


                <View style={styles.container2}>

                    {btn_prev}
                    
                    <TouchableOpacity onPress={() => this.goNextQuestion()} disabled = {this.state.answers[this.state.index]==null?true:false}>
                        <View style={styles.buttonNext}>
                            <Text style={styles.textStyle2}>
                                Next
                            </Text>
                        </View>
                    </TouchableOpacity>                   
                    
                </View>

            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#4d738d',
    },
    container2: {
        flex: 2,
        flexDirection: 'row',
        backgroundColor: '#4d738d',
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
    },
    buttonNext: {
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        borderWidth: 2,
        borderColor: '#7cfc00',
        borderRadius: 100,
        height: 35,
        marginLeft: '45%',
        backgroundColor: '#7cfc00',
        fontFamily: 'Helvetica-Bold',
    },
    buttonPrev: {
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        borderWidth: 2,
        borderColor: '#ff6347',
        borderRadius: 100,
        marginLeft: '10%',
        height: 35,
        backgroundColor: '#ff6347',
        fontFamily: 'Helvetica-Bold'
    }
});