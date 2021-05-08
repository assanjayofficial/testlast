import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {SplashScreen, AppScreen} from '../pages';

//Kevin
const Stack = createStackNavigator();
const Router = () =>{
    return(
        <Stack.Navigator>
            <Stack.Screen name="SplashScreen" component={SplashScreen} options={{headerShown: false}}/>
            <Stack.Screen name="AppScreen" component={AppScreen} options={{headerShown: false}}/>
        </Stack.Navigator>
    );
};

export default Router;