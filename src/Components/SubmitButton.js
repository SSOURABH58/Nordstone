import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Colors from '../Theme/Colors'
import globalStyles from '../Theme/globalStyles'

const SubmitButton = ({ title, onPress, isValid }) => {
    return (
        <Pressable
            onPress={onPress}
            android_ripple={{ color: Colors.shad3 }}
            style={[styles.container, { opacity: isValid ? 1 : 0.5 }]}
            disabled={!isValid}>
            <Text style={globalStyles.text26}>{title}</Text>
        </Pressable>
    )
}

export default SubmitButton

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 50,
        width: '100%',
        backgroundColor: Colors.shad1,
        borderRadius: 5
    }
})