/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useEffect, useState } from 'react';
import {
  Alert,
  SafeAreaView,
  StatusBar,
  StyleSheet,

} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

import AuthStack from './src/navigation/AuthStack';
import HomeStack from './src/navigation/HomeStack';

import auth from '@react-native-firebase/auth';
import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SplashScreen from 'react-native-splash-screen'

const fcmTokenKey = "fcmToken"


export const UserContext = React.createContext();

export const getToken = async () => {
  let fcmToken = null
  try {
    const jsonValue = await AsyncStorage.getItem(fcmTokenKey)
    fcmToken = jsonValue != null ? JSON.parse(jsonValue) : null;

    console.log("fcmToken from AsyncStorage: ", fcmToken)

    if (!fcmToken) {

      fcmToken = await messaging().getToken()
      const val = fcmToken

      if (fcmToken) {

        try {
          const jsonValue = JSON.stringify(val)
          await AsyncStorage.setItem(fcmTokenKey, jsonValue)
        } catch (e) {
        }
      }
    }
  } catch (e) {
  }

  return fcmToken
}


const App = () => {

  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();
  const [FcmToken, setFcmToken] = useState()

  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      Alert.alert('Notification arrived', `It will not pop up on tray since the app is open \n\n--------------\n ${remoteMessage.notification.title}\n${remoteMessage.notification.body}`);
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    if (user) {
      setFcmToken(getToken())
    }
  }, [user])


  if (initializing) { return null; }
  else {
    SplashScreen.hide()
  } // handle splash screen
  return (
    <SafeAreaView style={styles.container}>
      <UserContext.Provider value={{
        user: user,
        fcmToken: FcmToken
      }}>

        <StatusBar
          animated={true}
          hidden={true} />
        <NavigationContainer>
          {user ? <HomeStack /> : <AuthStack />}
        </NavigationContainer>
      </UserContext.Provider>
    </SafeAreaView>


  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});

export default App;
