import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../Screens/Login';
import Signup from '../Screens/Signup';
import ForgotPassword from '../Screens/ForgotPassword';
import Routes from '.';

const Stack = createNativeStackNavigator();

const AuthStack = () => {
    return (
        <Stack.Navigator initialRouteName={Routes.auth.Login} screenOptions={{ headerShown: false }}>
            <Stack.Screen name={Routes.auth.Login} component={Login} />
            <Stack.Screen name={Routes.auth.Signup} component={Signup} />
            <Stack.Screen name={Routes.auth.ForgotPassword} component={ForgotPassword} />
        </Stack.Navigator>
    )
}

export default AuthStack

const styles = StyleSheet.create({})