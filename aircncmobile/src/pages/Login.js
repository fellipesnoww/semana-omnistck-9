import React, {useState, useEffect} from 'react';
import {View, KeyboardAvoidingView, Platform, AsyncStorage, Text, Image, StyleSheet, TextInput, TouchableOpacity} from 'react-native';
import logo from '../assets/logo.png';
import api from '../services/api';


/*enabled={Platform.OS ==="ios"} Para jogar o conteudo acima da abertura do teclado no IOS*/

export default function Login({navigation}){
    const [email, setEmail] = useState("");
    const [techs, setTechs] = useState("");

    //Primeiro parametro: Executar o que, segundo parametro: quando executar
    useEffect(() => {
        //Procura o usuario, se existir, leva para tela de List
        AsyncStorage.getItem('user').then(user => {
            if(user){
                navigation.navigate('List');
            }
        })
    },[]);  //Se o segundo parametro for vazio, sera executado somente uma vez

    async function handleSubmit(){
        //Emails e Techs
        const response = await api.post("/sessions", {
            email
        });

        const {_id} = response.data;

        //Como o storage local é assincrono, deve se esperar salvar o id
        //(nome do item, dado)
        await AsyncStorage.setItem('user', _id);
        await AsyncStorage.setItem('techs', techs);

        navigation.navigate('List');
    }

    return (
        <KeyboardAvoidingView behavior="padding" style={styles.container}>
            <Image source={logo}/>    
        
            <View style={styles.form}>
                <Text style={styles.label}>SEU E-MAIL * </Text>
                <TextInput 
                    style={styles.input}
                    placeholder="Seu melhor e-mail"
                    placeholderTextColor="#999"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoCorrect={false}
                    value={email}
                    onChangeText = {setEmail}
                />
                <Text style={styles.label}>TECNOLOGIAS * </Text>
                <TextInput 
                    style={styles.input}
                    placeholder="Tecnologias"
                    placeholderTextColor="#999"
                    autoCapitalize="words"
                    autoCorrect={false}   
                    value={techs}
                    onChangeText={setTechs}               
                />

                <TouchableOpacity onPress={handleSubmit} style={styles.button}>
                    <Text style={styles.textButton}>Encontrar Spots</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    //Estilização da View
    container:{
        flex: 1, //Ocupar todo tamanho da tela
        justifyContent: 'center', //Alinhar conteudo verticalmente ao centro
        alignItems: 'center', //Alinha conteudo horizontalmente ao centro
    },
    label:{
        fontWeight: 'bold',
        color: '#444',
        marginBottom: 8,
    },
    form:{
        alignSelf:'stretch', //Ocupa a largura inteira possivel
        paddingHorizontal: 30, //Nao é como no css que pode se passar mais valores
        marginTop: 30
    },
    input:{
        borderWidth: 1,
        borderColor: '#ddd',
        paddingHorizontal: 20,
        fontSize: 16,
        color: '#444',
        height: 44,
        marginBottom: 20,
        borderRadius: 2
    },
    button:{
        height: 40,
        backgroundColor: '#f05a5b',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 2
    },
    textButton:{
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16
    }
});
