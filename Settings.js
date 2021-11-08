import { StatusBar } from 'expo-status-bar';
import React,{useContext} from 'react';
import { FlatList, StyleSheet, Text, View, TouchableOpacity, Image , TextInput} from 'react-native';
import GlobalContext from './Context'

export default function App({navigation}) {

    const context =useContext(GlobalContext)

    const clearData = async () => {
        try {
        //  await AsyncStorage.clear()
          
        } catch (e) {
          // saving error
        }

        context.authData.setLoggedIn(false)
       navigation.navigate("Login")
      }

    return (
        <View>
            <Text> Bienvenidos a Settings</Text>

            <TouchableOpacity onPress={()=>clearData()}>
                <Text> LOGOUT </Text>
                <Text> Estado actual: {context.authData.loggedIn?"IN":"OUT"}</Text>
            </TouchableOpacity>
        </View>
    )
}