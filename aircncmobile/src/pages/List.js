import React, {useState, useEffect} from 'react';
import {Text, Image, AsyncStorage, ScrollView, StyleSheet, SafeAreaView, Platform} from 'react-native'
import logo from '../assets/logo.png'

import SpotList from '../components/SpotList';

export default function List(){
    const [techs, setTechs] = useState([]);
    
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