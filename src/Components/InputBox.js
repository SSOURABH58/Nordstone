import { StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'
import Colors from '../Theme/Colors'

const InputBox = ({
    placeholder,
    name,
    onChangeText,
    onBlur,
    value,
    keyboardType,
    error,
    secureTextEntry,
    touched }) => {
    return (
        <View>
            {/* <View style={styles.inputBox}> */}
            <TextInput
                name={name}
                style={[styles.input, { borderColor: error && touched ? Colors.red : Colors.text }]}
                placeholderTextColor={"#F5F7FA80"}
                onChangeText={onChangeText}
                value={value}
                placeholder={placeholder}
                onBlur={onBlur}
                keyboardType={keyboardType}
                secureTextEntry={secureTextEntry}
            />
            {/* </View> */}
            {error && touched && <Text style={styles.errorText}>{error}</Text>}
        </View>
    )
}

export default InputBox

const styles = StyleSheet.create({
    input: {
        height: 50,
        // margin: 12,
        borderWidth: 1,
        padding: 10,
        paddingHorizontal: 18,
        backgroundColor: Colors.shad1,
        color: Colors.text,
        borderColor: Colors.text,
        marginTop: 8,
        borderRadius: 8,
        fontSize: 18
    },
    errorText: {
        color: Colors.red,
        fontSize: 18,
        marginLeft: 8
    }
})