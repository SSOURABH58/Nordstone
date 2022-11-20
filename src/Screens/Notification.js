import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import globalStyles from '../Theme/globalStyles'
import Colors from '../Theme/Colors'
import { UserContext } from '../../App'
import { sendPushNotification, delayedNotifications } from '../pushNotifaction/sendNotifaction'
import SubmitButton from '../Components/SubmitButton'


const Notification = () => {
    const { user, fcmToken } = React.useContext(UserContext);

    const handleNotification = async () => {
        if (fcmToken?._j) {

            await sendPushNotification(fcmToken._j)
        }

    }
    const handleDelayedNotification = () => {
        if (fcmToken?._j) {

            delayedNotifications(fcmToken._j)
        }

    }
    return (
        <View style={[globalStyles.mainContainer, { justifyContent: "center" }]}>
            <Text style={[globalStyles.text18, { textAlign: 'center' }]}>Press the Red Button to get a instant Notification </Text>
            <Pressable style={styles.notification} onPress={handleNotification} android_ripple={{ color: Colors.shad3 }}>
                <Text style={globalStyles.text32}>Big Red</Text>
            </Pressable>
            <View style={{ width: "80%", marginTop: 60 }}>

                <Text style={[globalStyles.text18, { textAlign: 'center', marginBottom: 20 }]}>The Delayed Notification button will send a notification after 5s, So you can close the app and count to 10, and you will see the notification in your notification tray</Text>
                <SubmitButton isValid={true} onPress={handleDelayedNotification} title={"Delayed Notification"} />
            </View>
        </View>
    )
}

export default Notification

const styles = StyleSheet.create({
    notification: {
        width: '80%',
        backgroundColor: Colors.red,
        borderRadius: 20,
        height: 80,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 20
    }
})