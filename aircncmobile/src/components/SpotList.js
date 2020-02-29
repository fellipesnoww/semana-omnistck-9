import React, {useEffect, useState} from 'react';
import {withNavigation} from 'react-navigation';        //Como o SpotList nao é uma rota, é necessario o withNavigation para encaminhar o usuario para outro lugar
import {View, Text, StyleSheet, FlatList, Image, TouchableOpacity} from 'react-native';
import api from '../services/api';
import { render } from 'react-dom';

//Desestrutura o props (parametro) pegando somente o atributo tech
function SpotList({tech, navigation}){
    const [spots, setSpots] = useState([]);
    const [urlExpo, setUrlExpo] = useState("");

    useEffect(() => {
        async function loadSpots(){
            const response = await api.get("/spots",{
                params: {tech}
            })
            setUrlExpo("192.168.86.56");
            setSpots(response.data);
        }
        loadSpots();
    },[]);

    //Recebe o id do Spot como parametro e envia pra outra tela
    function handleNavigate(spotToReserve){        
        navigation.navigate('Book', {spotToReserve, urlExpo});
    }    
    
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Empresas que usam <Text style={styles.bold}>{tech}</Text></Text>
            <FlatList 
                style={styles.list}
                data={spots}
                keyExtractor={spot => spot._id}
                horizontal
                showsHorizontalScrollIndicator={false}
                renderItem={({item}) => (                    
                    <View style={styles.listItem}>
                        <Image source={{ uri: item.thumbnail_url.replace("localhost", urlExpo)}} style={styles.thumbnail}/>
                        <Text style={styles.company}>{item.company}</Text>
                        <Text style={styles.price}>{item.price ? `R$${item.price}/dia` : "GRATUITO"}</Text>
                        <TouchableOpacity onPress={() => handleNavigate(item)} style={styles.button}>
                            <Text style={styles.textButton}>Solicitar Reserva</Text>
                        </TouchableOpacity>
                    </View>
                )}
            />
        </View>
)
}

const styles = StyleSheet.create({
    container:{
        marginTop: 30,
    }, 
    title:{
        fontSize: 20,
        color: "#444",
        paddingHorizontal: 20,
        marginBottom: 15,
    },
    bold: {
        fontWeight: "bold"
    },

    list:{
        paddingHorizontal: 20,
    },

    listItem:{
        marginRight: 15,
    },

    thumbnail:{
        width: 200,
        height: 120,
        resizeMode: 'cover',
        borderRadius: 2,
    },

    company: {
        fontSize: 24,
        fontWeight: 'bold',
        color: "#333",
        marginTop: 10,
    },

    price:{
        fontSize: 15,
        color: "#333",
        marginTop: 5
    },

    button:{
        marginTop: 15,
        height: 32,
        backgroundColor: '#f05a5b',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 2
    },

    textButton:{
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 15
    }

});

export default withNavigation(SpotList);