import React, {useState, useEffect} from 'react';
import {Text, StatusBar, Image, AsyncStorage, ScrollView, StyleSheet, SafeAreaView, Platform, Alert} from 'react-native'
import socketio from 'socket.io-client';
import logo from '../assets/logo.png'
import DropdownAlert from 'react-native-dropdownalert';
import { AlertHelper } from './AlertHelper';


import SpotList from '../components/SpotList';

export default function List(){
    const [techs, setTechs] = useState([]);
    
    useEffect(() => {
        AsyncStorage.getItem('user').then(user_id => {
            const socket = socketio('http://10.254.207.47:3333', {
                query: {user_id}
            });
            
            socket.on('booking_response', booking => {
                //Alert.alert(`Sua reserva em ${booking.spot.company} em ${booking.date} foi ${booking.approved === true ? 'APROVADA' : 'REJEITADA'}`)
                if(booking.approved === true){
                    AlertHelper.show('success','SUCESSO', `Sua reserva em ${booking.spot.company} em ${booking.date} foi APROVADA`);
                } else{
                    AlertHelper.show('warn','OPS', `Sua reserva em ${booking.spot.company} em ${booking.date} infelizmente foi REPROVADA`);
                }
                
            })
        });

    }, []);

    useEffect(() => {
        //Busca as tecnologias passadas no login e transforma em array
        AsyncStorage.getItem("techs").then(storagedTechs => {
            const techsArray = storagedTechs.split(',').map(tech => tech.trim());

            setTechs(techsArray);
        })
    }, []);

return (
    <SafeAreaView style={styles.droidSafeArea}>            
        <Image style={styles.logo} source={logo}></Image>

        <ScrollView>
            {techs.map(tech => <SpotList key={tech} tech={tech}/>)}
        </ScrollView>
        <DropdownAlert
                defaultContainer={{ padding: 8, paddingTop: StatusBar.currentHeight, flexDirection: 'row' }}
                ref={ref => AlertHelper.setDropDown(ref)}
                onClose={() => AlertHelper.invokeOnClose()}
                />
    </SafeAreaView >    
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1
    },
    logo:{
        height: 32,
        resizeMode: "contain",
        alignSelf: "center",
        marginTop: 60,
    },

    droidSafeArea: {
        flex: 1,
        paddingTop: Platform.OS === 'android' ? 25 : 0
    },
});