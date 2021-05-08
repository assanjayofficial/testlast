import React, {useEffect} from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import Logo from '../../assets/logo.jpeg'

//Jay
const SplashScreen =({navigation}) =>{
    useEffect (() =>{
        setTimeout(() => {
            navigation.replace('AppScreen')
        }, 4000);
    });
    return(
        <View style={styles.splashApp}>
            <Image style ={{width: 220, height: 220}}
            resizeMode={'contain'}
            source={Logo}/>
            <Text style={styles.namaAplikasi}>myChecklist</Text>
        </View>
    );
    
};

export default SplashScreen;

const styles = StyleSheet.create ({
    namaAplikasi : {
        color : 'white',
        fontWeight : 'bold',
        fontSize : 40,
    },
    splashApp : {
        flex : 1,
        backgroundColor : '#5B8A72',
        alignItems: 'center',
        justifyContent : 'center'
    }
});