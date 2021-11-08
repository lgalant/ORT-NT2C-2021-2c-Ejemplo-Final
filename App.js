import { StatusBar } from 'expo-status-bar';
import React, { useState, useReducer, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Ionicons from '@expo/vector-icons/Ionicons'

import HomeScreen from './HomeScreen'
import DetallesScreen from './DetallesScreen'
import SettingsScreen from './Settings'
import LoginScreen from './Login'
import GlobalContext from './Context'
import {Datos, reducer} from './reducer'
import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createNativeStackNavigator();
const tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

function granChildNavigator() {

  return  (
    <Stack.Navigator 

    >
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Detalles" component={DetallesScreen} />
    </Stack.Navigator>
  )
}

function  childTabNavigator({data}) {

  return  (
    <tab.Navigator 
    screenOptions={{
      headerShown: false
    }}>
    
      <tab.Screen name="Movies" component={granChildNavigator} />
      <tab.Screen name="Settings" component={SettingsScreen} />
    </tab.Navigator>
  )
}

export default function App() {

 

  const [state,dispatch ] = useReducer(reducer, Datos)

  useEffect(() => {
  const data = AsyncStorage.getItem('token').then(
      (data)=>{console.log("devuelve data",data)
      if (data) {
        const jsonData = JSON.parse(data)
        dispatch({'type':'LOGIN', payload:{'email':jsonData.email, 'token':jsonData.token}})
      }
         
      })
    },[])
     
  return (
    <GlobalContext.Provider value={{state,dispatch}}>
      <NavigationContainer>
        <Stack.Navigator 
            screenOptions={{
              headerShown: false
            }}
        >
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="childNav" component={childTabNavigator} />

        </Stack.Navigator>
      </NavigationContainer>
    </GlobalContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
