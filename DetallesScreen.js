import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
export default function Detalles({navigation, route}) {
    console.log("Route", route)
    return (
      <View style={styles.container}>
        <Text>Pantalla Detalles {route.params.item.Title}</Text>
        <Image source ={{uri:route.params.item.Poster}} style={{height:500, resizeMode:'contain', margin:10}} />
        <StatusBar style="auto" />
      </View>
    );
  }

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      //alignItems: 'center',
      justifyContent: 'center',
    },
  });
  


