import React, {userState, useState} from 'react';
import {SafeAreaView, StatusBar, KeyboardAvoidingView, View, Text, StyleSheet, AsyncStorage, TextInput, TouchableOpacity, Alert, Image, BackHandler} from 'react-native';
import api from '../services/api';
import logo from '../assets/logo.png';
import DropdownAlert from 'react-native-dropdownalert';
import { AlertHelper } from './AlertHelper';


export default function Book({navigation}){
    
    const spot = navigation.getParam('spotToReserve');       //Busca o spot dentro do navigation
    const urlExpo = navigation.getParam('urlExpo');     

    const [date, setDate] = useState();
    
    async function handleSubmit(){
        const user_id = await AsyncStorage.getItem('user');
                        
        if(!date || date === ""){
            //Alert.alert("Por favor informe uma data válida!");  
            AlertHelper.show('error','Erro', 'Ops! Você precisa informar uma data.')
        } else{
            await api.post(`/spots/${spot._id}/bookings`,{date},{
                headers: {user_id}
            });
            
            Alert.alert("Solicitação de Reserva enviada");
            
            navigation.navigate('List');            
        }                
    }          

    function handleCancel(){
        navigation.navigate('List');
    }
  
    return (
        <View behavior="padding" style={styles.droidSafeArea}>
            <Image style={styles.logo} source={logo}/>
            <Text style={styles.confirm}>Confirmando dados do Spot</Text>
            <View style={styles.spotData}>
                <Image style={styles.thumbnail} source={{ uri: spot.thumbnail_url.replace('localhost', urlExpo)}} />
                <Text style={styles.spotDetails}>Empresa: {spot.company}</Text>
                <Text style={styles.spotDetails}>Preço: {spot.price ? `R$${spot.price}/dia` : "GRATUITO"}</Text>
            </View>
             <Text style={styles.label}>Data de interesse * </Text>
                <TextInput 
                    style={styles.input}
                    placeholder="Qual data deseja?"
                    placeholderTextColor="#999"
                    autoCapitalize="words"
                    autoCorrect={false}
                    value={date}
                    onChangeText = {setDate}
                />

                <TouchableOpacity onPress={handleSubmit} style={styles.button}>
                    <Text style={styles.textButton}>SOLICITAR RESERVA</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={handleCancel} style={[styles.button, styles.cancelButton]}>
                    <Text style={styles.textButton}>Cancelar</Text>
                </TouchableOpacity>                
                
                <DropdownAlert
                defaultContainer={{ paddingTop: StatusBar.currentHeight, flexDirection: 'row' }}
                ref={ref => AlertHelper.setDropDown(ref)}
                onClose={() => AlertHelper.invokeOnClose()}
                />
        </View>
       
    )
}

const styles = StyleSheet.create({
    droidSafeArea: {
        flex: 1,
        paddingTop: Platform.OS === 'android' ? 25 : 0,
        margin: 20,      
    },
  
    logo:{
        marginLeft: 100,
        marginTop: 20,
        marginBottom: 20
    },

    confirm:{
        fontSize: 24,
        fontWeight: 'bold',
        color: '#f05a5b',    
        textAlign: "center", 
        marginTop: 30,
        
    },

    textButton:{
        color: '#fff',
        fontWeight: "bold"
    },

    thumbnail:{
        marginTop: 10,
        width: 200,
        height: 120,
        resizeMode: 'cover',
        borderRadius: 2,
    },

    spotData:{
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 50
    },

    spotDetails:{
        fontWeight: 'bold',
        fontSize: 20,
        color: '#444',        
        marginTop: 15,
    },

    label:{
        fontWeight: 'bold',
        color: '#444',
        marginBottom: 8,        
    },

    button:{
        height: 42,
        backgroundColor: '#f05a5b',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 2,        
    },

    cancelButton:{
        marginTop: 10,
        backgroundColor: '#ccc',
        color: '#fff',
        fontWeight: "bold"
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
})