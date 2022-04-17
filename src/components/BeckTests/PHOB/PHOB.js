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
var screen = Dimensions.get('window');
var url = "http://localhost:5000/"


export default class PHOB extends Component{
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
            nextButtonDisabled: false,
            userID: 0
        }
    }

    componentDidMount =  async () => {
        let id = await AsyncStorage.getItem('userId');
        let question_s = [];

        let q1 = "Caddele, sokak, AVM vb. halka açık alanlarda korku hissi";
        question_s.push(q1);

        let q2 = "Dışarıya yalnız çıkmaktan korkmak";
        question_s.push(q2);

        let q3 = "Otobüs, tren, metro gibi toplu taşıma araçlarında yolculuk ederken korku duyulması durumu";
        question_s.push(q3);

        let q4 = "Sizi korkutan olaylar ve nesnelerden kaçma sıklığı";
        question_s.push(q4);

        let q5 = "Çarşı, pazar, sinema gibi kalabalık yerlerde rahatsızlık hissi";
        question_s.push(q5);

        let q6 = "Yalnız bırakıldığınızda sinirlenme sıklığı";
        question_s.push(q6);

        this.setState({
            questions: question_s,
            userID: id
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

        if(newIndex == 6){
            console.log("PHOB (fobik anksiyete) Score: ", this.state.score / 6, "\n");
            var scr = this.state.score / 6;
            scr = scr.toString();
            AsyncStorage.setItem('PHOB', scr);
            this.props.navigation.navigate('EndTest');
        }

        if(newIndex == 6){
            var scr=0;
            for(i=0; i<6; i++){
                if(this.state.answers[i] == "button 0")
                    scr = scr + 0;
                else if(this.state.answers[i] == "button 1")
                    scr = scr + 1;
                else if(this.state.answers[i] == "button 2")
                    scr = scr + 2;
                if(this.state.answers[i] == "button 3")
                    scr = scr + 3;
                if(this.state.answers[i] == "button 4")
                    scr = scr + 4;
            }
            scr = scr/6;
            console.log("PHOB (fobik anksiyete) Score: ", scr, "\n");
            this.setState({score: scr} , () => {
                scr = scr.toString();
                try {
                        fetch(url + "uPHOB", {
                        method: 'put',
                        headers: {'content-type': 'application/json'},
                        body: JSON.stringify(this.state)
                    });
                }
                catch (e) {
                    console.log(e.message);
                }
                scr = scr.toString();
                AsyncStorage.setItem('PHOB', scr);
                this.props.navigation.navigate('EndTest');

            });
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

    render() {
        let btn_prev;
        if(this.state.index!=0){
            btn_prev =
            <View style = {{marginTop: 10, marginBottom: 4, alignItems:'center'}}>
                <TouchableOpacity onPress={() => this.goPreviousQuestion()}>
                    <View style={styles.buttonPrev}>
                        <Text style={styles.textStyle2}>
                            Önceki
                        </Text>
                    </View>
                </TouchableOpacity>
            </View>
        }

        return(
            <View style = {styles.container}>
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

                    <Text style={{marginTop: 16, fontSize: 20, fontFamily: "Helvetica-Bold"}}>PHOB</Text>

                    <Right>
                    </Right>
                </Header>
                <View>
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

                    <View style={{marginTop: 10}}>
                        <View>

                            {btn_prev}

                            <View style = {{marginTop: 10, marginBottom: 4, alignItems:'center',}}>
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

                </View>
            </View>
    );
}
}

const styles = StyleSheet.create({
container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#faf8f8',
},
container2: {
    flex: 2,
    flexDirection: 'row',
    backgroundColor: '#faf8f8',
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
    textAlign : 'center',
},
textStyle2: {
    marginTop: 2,
    marginLeft: 2,
    fontSize: 14,
    fontWeight: "bold"
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
    justifyContent: 'flex-end',
    alignItems: 'center',
    width: screen.width - 100,
    borderWidth: 2,
    borderColor: '#7cfc00',
    borderRadius: 100,
    height: 35,
    backgroundColor: '#7cfc00'
},
buttonPrev: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: screen.width - 100,
    borderWidth: 2,
    borderColor: '#ff6347',
    borderRadius: 100,
    height: 35,
    backgroundColor: '#ff6347'
}
});
