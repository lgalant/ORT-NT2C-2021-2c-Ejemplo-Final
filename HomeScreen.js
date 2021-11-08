import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { FlatList, StyleSheet, Text, View, TouchableOpacity, Image , TextInput} from 'react-native';
import {useEffect, useState,useContext} from 'react';
import GlobalContext from './Context'


export default function Home({navigation}) {

    //const [movies,setMovies] = useState([])
    const [filtro,setFiltro] = useState('')
    const {state,dispatch } =useContext(GlobalContext)
    
    
    function buscaPelis() {
        if (filtro.length <4){
            dispatch({type:'TRAER_PELICULAS',payload:[]});
            return;
        }
     
        const f = fetch("https://www.omdbapi.com/?s="+filtro+"&apikey=2b23ac0e&page=1");
        return f
          .then(res => res.json())
          .then(json_extraido => {
            console.log("json.search", );
            dispatch({type:'TRAER_PELICULAS',payload:json_extraido.Search})
          })
          .catch(error => console.log("Fallo:" + error));
   
      }
    
    useEffect(()=> {
      buscaPelis()
    },[filtro])
    

    
    const renderItem = ({ item }) => (
        <TouchableOpacity style={styles.touch} onPress={()=> navigation.navigate("Detalles",{item})} >
            <Text style={{color:'green'}}> {item.Title + ' (' + item.Year + ')'}</Text>
            <Image source ={{uri:item.Poster}} style={{height:150, resizeMode:'contain', margin:10}} />
        </TouchableOpacity>
      );

      
    return (
      <View style={styles.container}>
        <Text> Bienvenido {state.email}</Text>

        <View style={{height:40,backgroundColor:'#CCCCCC', fontSize:50, paddingBottom:40}}>
            <Text> Filtro: </Text>
        <TextInput 
        onChangeText={setFiltro}
        value={filtro}/>
        </View>

        <FlatList
            style={{flex:1}}
            data={state.peliculas}
            renderItem={renderItem}
            keyExtractor={item => item.imdbID}
            horizontal={false}
      />


        <StatusBar style="auto" />
      </View>
    );
  }

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    touch: {
        //backgroundColor: 'yellow',
        paddingTop:20,
        fontSize:'50'
    }
  });
  