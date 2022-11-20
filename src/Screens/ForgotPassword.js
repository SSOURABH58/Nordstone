import { Alert, Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import globalStyles from '../Theme/globalStyles'
import AuthForm from '../Components/AuthForm'
import Routes from '../navigation'
import * as yup from 'yup'
import auth from '@react-native-firebase/auth';


const forgotPassValidationSchema = yup.object().shape({
    email: yup
        .string()
        .email("Please enter valid email")
        .required('Email Address is Required'),
})

const ForgotPassword = ({ navigation }) => {

    const ShowAlert = (email) =>
        Alert.alert(
            "Check Your Email 📧",
            `The password reset email has bin send to  ${email} \n\n ⚠️Don't forgot to check your Spam Folder`,
        );

    const handleForgotPassword = (email) => {
        auth().sendPasswordResetEmail(email).then(() => {
            console.log("email send");
            ShowAlert(email)
        }).catch(err => {
            console.log("err:", err.code);
        })
    }
    return (
        <View style={globalStyles.mainContainer}>
            <View style={styles.container}>
                <AuthForm
                    ValidationSchema={forgotPassValidationSchema}
                    title={"ForgotPassword"}
                    onSubmit={handleForgotPassword}
                    pass />
            </View>
            <View style={styles.footer}>
                <Text style={globalStyles.text18}>Already have an Account </Text>
                <Pressable onPress={() => navigation.navigate(Routes.auth.Login)}>
                    <Text style={globalStyles.linkText}>{` Login`}</Text>
                </Pressable>
            </View>
        </View>
    )
}

export default ForgotPassword

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    footer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 45
    }
})