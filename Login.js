import { StatusBar } from 'expo-status-bar';
import React,{ useEffect, useState, useContext, useReducer } from 'react';
import { FlatList, StyleSheet, Text, View, TouchableOpacity, Image , TextInput} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import GlobalContext from './Context'


export default function App({navigation}) {

    const [email, setEmail] = useState("usuario123")
    const [password, setPassword] = useState("clave345")
    const {state,dispatch } =useContext(GlobalContext)

 
    useEffect(()=>{
        if (state.loggedIn)
            navigation.navigate("childNav")
       
    },[state.loggedIn])
 
  

    function login() {

        const headers = new Headers()
        headers.append("Content-type", "application/json")
        const requestOptions = {
            method:"POST",
            headers:headers,
            body: JSON.stringify({"username": email, "password": password})
          }

        return fetch('http://localhost:8000/auth/jwt/create/', requestOptions )
        .then( resp => {
            if (!resp.ok)
                throw Error("Error en login:" + resp.statusText)
            return resp.json()
        })
        .then( jsonResp => {
            console.log("resp json:", jsonResp)
            // LOGIN OK
            dispatch({'type':'LOGIN_AND_STORE', payload:{'email':email, 'token':jsonResp.access}})
            navigation.navigate("childNav")
        })
        .catch( error => alert("Error:" + error))
 
    }



    return (
        <View>
            <TextInput
                value={email}
                placeholder="Email"
                onChangeText={setEmail}
                keyboardType="email-address"
            />
            <TextInput
                value={password}
                placeholder="Password"
                onChangeText={setPassword}
                keyboardType="visible-password"
            />

            <TouchableOpacity onPress={()=>login()}>
                <Text> LOGIN </Text>
            </TouchableOpacity>

            <Text> Estado actual: {state.loggedIn?"IN":"OUT"}</Text>
        </View>
    )
}