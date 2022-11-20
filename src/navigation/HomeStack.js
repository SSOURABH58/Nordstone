import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Notification from '../Screens/Notification';
import Routes from '.'
import Colors from './../Theme/Colors'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Photo from '../Screens/Photo';
import ShowText from '../Screens/ShowText';
import Calculator from '../Screens/Calculator';
import auth from '@react-native-firebase/auth';


const Tab = createBottomTabNavigator();

// notifications
// insert-photo
// text-snippet
// calculate

const HomeStack = () => {

    const handleLogOut = () => {
        auth()
            .signOut()
            .then(() => console.log('User signed out!'));
    }
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                headerStyle: {
                    backgroundColor: Colors.shad1,
                },
                headerTintColor: Colors.text,
                tabBarInactiveBackgroundColor: Colors.shad1,
                tabBarActiveBackgroundColor: Colors.shad2,
                headerRight: () => (
                    <Pressable
                        style={styles.logOutBtn}
                        onPress={() => handleLogOut()}
                        android_ripple={{ color: Colors.shad3 }}>
                        <Text style={styles.logoutText}>LogOut</Text>
                    </Pressable>
                ),
                // tabBarBackground: Colors.shad1,
                tabBarShowLabel: false,
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName
                    switch (route.name) {
                        case Routes.home.Notification:
                            iconName = "notifications"
                            break;
                        case Routes.home.Photo:
                            iconName = "insert-photo"
                            break;
                        case Routes.home.Text:
                            iconName = "text-snippet"
                            break;
                        case Routes.home.Calculate:
                            iconName = "calculate"
                            break;

                        default:
                            break;
                    }
                    return <MaterialIcons name={iconName} size={size} color={color} />
                },
                tabBarActiveTintColor: Colors.text,
                tabBarInactiveTintColor: Colors.shad3,
            })}>
            <Tab.Screen name={Routes.home.Notification} component={Notification} />
            <Tab.Screen name={Routes.home.Photo} component={Photo} />
            <Tab.Screen name={Routes.home.Text} component={ShowText} />
            <Tab.Screen name={Routes.home.Calculate} component={Calculator} />
        </Tab.Navigator>
    )
}

export default HomeStack

const styles = StyleSheet.create({
    logoutText: {
        color: Colors.red,
        fontSize: 18,
        marginLeft: 8
    },
    logOutBtn: {
        marginRight: 15
    }
})