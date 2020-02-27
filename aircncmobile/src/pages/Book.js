import React, {userState, useState} from 'react';
import {SafeAreaView, View, Text, StyleSheet, AsyncStorage, TextInput, TouchableOpacity, Alert, Image} from 'react-native'
import api from '../services/api';
import logo from '../assets/logo.png';


export default function Book({navigation}){
    const spot = navigation.getParam('spotToReserve');       //Busca o id dentro do navigation,
    const [date, setDate] = useState();

    async function handleSubmit(){
        const user_id = await AsyncStorage.getItem('user');
                
        await api.post(`/spots/${spot._id}/bookings`,{date},{
            headers: {user_id}
        });

        Alert.alert("Solicitação de Reserva enviada");

        navigation.navigate('List');
    }

    function handleCancel(){
        navigation.navigate('List');
    }

    return (
        <SafeAreaView style={styles.droidSafeArea}>
            <Image style={styles.logo} source={logo}/>
            <Text style={styles.confirm}>Confirmando dados do Spot</Text>
            <View style={styles.spotData}>
                <Image style={styles.thumbnail} source={{ uri: spot.thumbnail_url}} />
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

        </SafeAreaView>
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

    spotData:{
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 50
    },

    spotDetails:{
        fontWeight: 'bold',
        fontSize: 20,
        color: '#444',
        marginBottom: 8,
        marginTop: 15,
    },

    label:{
        fontWeight: 'bold',
        color: '#444',
        marginBottom: 8,
        marginTop: 45,
    },

    button:{
        height: 42,
        backgroundColor: '#f05a5b',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 2
    },

    cancelButton:{
        marginTop: 10,
        backgroundColor: '#ccc',
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