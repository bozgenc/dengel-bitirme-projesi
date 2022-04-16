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

export default class Definition extends Component{
    constructor(){
        super();
        this.state={
            headers: [],
            definitions: [],
            selectedList: [],
            index: 0,
            is_curr_selected: false,
            prevButtonDisabled: true,
            nextButtonDisabled: false
        }
    }

    componentDidMount =  async () => {
        let definition_s = [];
        let header_s = [];

        let header1 = "Anksiyete Bozukluğu";
        header_s.push(header1);
        let anx = "Anksiyete ya da kaygı bozukluğu bozukluğu kişinin günlük hayattaki işlevselliğini olumsuz yönde etkileyen ve genelde sebebi tam çözülemeyen çeşitli korku, kaygı veya anksiyete durumlarına denir.";
        definition_s.push(anx);

        let header2 = "Depresif Duygu Durum Bozukluğu";
        header_s.push(header2);
        let dep = "Olaylar karşısında baskın olumsuz beklentilere sahip olma ve gidişatı genel olumsuz olarak yargılama durumudur. Bu durum çoğunlukla gerçekleşmesi mümkün olmayan, veya gerçekleşmeyeceği düşünülen beklentiler söz konusu olduğunda kendini belli eder.";
        dep = dep + " İlgisizlik, hızlı kilo değişimleri, uyku bozuklukları, odaklanma problemleri, kendini suçlama ve/veya hayatını sonlandırma düşünceleri bu duygu durum bozukluğunu yaşayan kişiler arasında yaygındır.";
        definition_s.push(dep);

        let header3 = "Öfke ve Düşmanlık";
        header_s.push(header3);
        let hos = "Bu duygu durum bozukluğunda kişiler günlük hayatta sinirlerini bozan durumlara aşırı tepki vererek kendisine ya da karşısındakilere zarar verir ya da ";
        hos = hos + "öfkesini içine atarak biriktirir ve bu birikim sonucu öfke patlamaları yaşar.";
        definition_s.push(hos);

        let header4 = "Kişilerarası Duyarlık";
        header_s.push(header4);
        let kisilerarasi = "Kişinin kendisini başkaları ile karşılaştırması sonucu sürekli olarak kendisini yetersiz ve küçük görmesi ve bundan duyulan rahatsızlıklardır.";
        definition_s.push(kisilerarasi);

        let header5 = "Obsesif Kompülsif Bozukluk";
        header_s.push(header5);
        let okb = "Obsesif Kompülsif Bozukluk kişinin rahatsızlık duyduğu ancak sürekli tekrarlayarak kendisini eyleme geçirmek için tehdit eden düşüncelerdir. ";
        okb = okb + "Bu bozukluğa sahip kişiler, obsesif (saplantılı) düşüncelerinden kurtulmak için bir kompulsif (zorlayıcı) davranışı uyguladığı takdirde geçici bir rahatlığa ulaşır.";
        okb = okb + " Kontrol etme ritüelleri, temizlik ritüelleri gibi gündelik hayattan komutların normal üstünde sıklığı da obsesif düşüncye örnek verilebilir.";
        definition_s.push(okb);

        let header6 = "Paranoid Düşünce";
        header_s.push(header6);
        let par = "Paranoid duygu durum bozukluğu, başkalarının hareketlerini küçük düşürücü ve tehdit edici olarak algılayan aşırı duyarlı yaklaşımdır.";
        par = par + " Kişilerde düşmanlık, şüphe, bağımsızlığı kaybetme duygusu ve yıkımlar oluşturur.";
        definition_s.push(par);

        let header7 = "Fobik Anksiyete";
        header_s.push(header7);
        let phob = "Spesifik bir olaya veya nesneye karşı duyulan ve kişiyi rahatsız edici şiddetlenen korku olarak ifade edilebilir.";
        phob = phob + " Kişi, korkutuklarından sürekli kaçınma halindedir ve bu kaçış zamanla kişinin sosyal ilişkilerini, mesleki performansını ve gündelik hayatını olumsuz etkiler"
        definition_s.push(phob);

        let header8 = "Psikotizm";
        header_s.push(header8);
        let psy = "İnsanlardan ve ilişkilerinden  kendilerini kopararak içsel alanda dramatikleşme sürecini kapsayan aşamalı bir duygu durum bozukluğudur";
        psy = psy + " Kendini sosyal çevreye karşı izole etme, dikkat ve odak problemleri ile algı ve düşüncede bozukluk bu bozukluğun belirtilerindendir.";
        definition_s.push(psy);

        let header9= "Somatizasyon";
        header_s.push(header9);
        let som = "Somatizasyon bozukluğu fiziksel ve bedensel rahatsızlık semptomları içeren psikyatrik bir durumdur.";
        som = som + " Bu rahatsızlıklara örnek olarak vücutta yanma, karıncalanma hissi; bedenin çeşitli bölgelerinde oluşan ağrılar veya kramplar, besin alınmadığı takdirde dilde farklı tatların hissedilmesi verilebilir.";
        definition_s.push(som);

        this.setState({
            headers: header_s,
            definitions: definition_s
        })
    }

    Select = () =>{
        let updatedAnswers = this.state.selectedList;
        if(this.state.index == 0){
            updatedAnswers[this.state.index] = "anx";
        }
        else if(this.state.index == 1){
            updatedAnswers[this.state.index] = "dep";
        }
        else if(this.state.index == 2){
            updatedAnswers[this.state.index] = "hos";
        }
        else if(this.state.index == 3){
            updatedAnswers[this.state.index] = "int";
        }
        else if(this.state.index == 4){
            updatedAnswers[this.state.index] = "okb";
        }
        else if(this.state.index == 5){
            updatedAnswers[this.state.index] = "par";
        }
        else if(this.state.index == 6){
            updatedAnswers[this.state.index] = "phob";
        }
        else if(this.state.index == 7){
            updatedAnswers[this.state.index] = "psy";
        }
        else if(this.state.index == 8){
            updatedAnswers[this.state.index] = "som";
        }
        let goPrevDisabled = false;
        let goNextDisabled = false;
        let new_score = this.state.score + 0;

        this.setState({
            selectedList: updatedAnswers,
            nextButtonDisabled: goNextDisabled,
            prevButtonDisabled: goPrevDisabled,
            score: new_score,
            is_curr_selected: true,
        });
    }

    goPreviousDef = () => {
        let newIndex= this.state.index - 1;
        let goPrevDisabled = false;
        let goNextDisabled = false;
        if(newIndex == 0){
            goPrevDisabled = true;
            goNextDisabled = false;

        }
        let previous_answer = this.state.selectedList[newIndex];
        let is_prev_selected = false;

        if(previous_answer != null){
            is_prev_selected = true;
        }

        this.setState({
            index: newIndex,
            nextButtonDisabled: goNextDisabled,
            prevButtonDisabled: goPrevDisabled,
            is_curr_selected: is_prev_selected
        });
    }

    goNextDef = () => {
        let newIndex = this.state.index + 1;
        let is_selected_before = false;

        if(newIndex == 9){
            console.log("End of the definition part \n");
            console.log("------Selected List------ \n");
            for(var i =0; i<8; i++){
                if(this.state.selectedList[i] != null)
                    console.log("------", this.state.selectedList[i], "-------\n");
            }
            this.props.navigation.navigate('Home');
        }

        else{
            if(this.state.selectedList[newIndex] != null){
                is_selected_before = true;
            }
            this.setState({
                index: newIndex,
                is_curr_selected: is_selected_before
            })
        }
    }

    render () {
        let btn_prev;
        if(this.state.index!=0){
            btn_prev =
            <View style = {{marginTop: 10, marginBottom: 4, alignItems:'center'}}>
                <TouchableOpacity onPress={() => this.goPreviousDef()}  disabled = {this.state.goPrevDisabled}>
                    <View style={styles.buttonPrev}>
                        <Text style={styles.textStyleButton}>
                            Önceki
                        </Text>
                    </View>
                </TouchableOpacity>
            </View>
        }
        let btn_next;
        if(this.state.index != 8){
            btn_next =
            <View style = {{marginTop: 10, marginBottom: 4, alignItems:'center'}}>
                <TouchableOpacity onPress={() => this.goNextDef()}>
                    <View style={styles.buttonNext}>
                        <Text style={styles.textStyleButton}>
                            Sonraki
                        </Text>
                    </View>
                </TouchableOpacity>
            </View>

        }

        let btn_fin;
        if(this.state.index == 8){
            btn_fin =
            <View style = {{marginTop: 10, marginBottom: 4, alignItems:'center'}}>
                <TouchableOpacity onPress={() => this.goNextDef()}>
                    <View style={styles.buttonFin}>
                        <Text style={styles.textStyleButton}>
                            Bitir
                        </Text>
                    </View>
                </TouchableOpacity>
            </View>
        }

        return(
            <View style={styles.container}>
                <Header style={{backgroundColor: 'white', borderBottomWidth: 2, borderBottomColor: '#f18a21'}}>
                    <Left>
                    </Left>

                    <Text style={{marginTop: 10, fontSize: 20, fontFamily: "Helvetica-Bold"}}>Tanımlar</Text>

                    <Right>
                    </Right>
                </Header>

                <View>
                    <View style={styles.container3} >
                        <Text style={styles.textStyle2}>
                            {this.state.headers[this.state.index]}
                        </Text>
                    </View>

                    <Card style={styles.gCard}>
                        <Text style={styles.textStyle3}>
                            {this.state.definitions[this.state.index]}
                        </Text>

                    </Card>

                    <Card style={styles.bCard}>
                        <TouchableOpacity onPress={() => this.Select()}>
                            <View style={this.state.is_curr_selected ? styles.buttonUnclicked : styles.buttonClicked}>
                                <Text style={styles.textStyle3}>
                                    Seç
                                </Text>
                            </View>
                        </TouchableOpacity>
                    </Card>

                    <View style={{marginTop: 10}}>
                        <View>

                            {btn_prev}
                            {btn_next}
                            {btn_fin}

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
    container3: {
        flex: 2,
        flexDirection: 'row',
        backgroundColor: '#fff0f5',
        marginTop: '5%',
        paddingVertical : 2,
        paddingHorizontal : 20,
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
    bCard: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical : 2,
        paddingHorizontal : 20,
        backgroundColor : '#fff0f5',
        borderRadius : 30,
        shadowColor : '#fff0f5',
        shadowOpacity : .2,
        shadowRadius : 5,
        marginTop : 10,
        text_align: 'center'
    },
    textStyle2: {
        marginTop: 2,
        marginLeft: 10,
        fontSize: 20,
        fontWeight: 'bold'
    },
    textStyleButton: {
        marginTop: 2,
        marginLeft: 2,
        fontSize: 14,
        fontWeight: 'bold'
    },
    textStyle3: {
        fontSize: 15,
        color: 'black',
        textAlign: 'center',
        paddingTop: 0,
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
    },
    buttonFin: {
        justifyContent: 'flex-end',
        alignItems: 'center',
        width: screen.width - 100,
        borderWidth: 2,
        borderColor: '#ffd700',
        borderRadius: 100,
        height: 35,
        backgroundColor: '#ffd700'
    }
});
