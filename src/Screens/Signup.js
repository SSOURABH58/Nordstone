import { Alert, Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import globalStyles from '../Theme/globalStyles'
import AuthForm from '../Components/AuthForm'
import Routes from '../navigation'
import auth from '@react-native-firebase/auth';
import * as yup from 'yup'
import tempEmailList from '../validation/disposable-email-address-dea-domains.json'

const isTempEmail = (email) => {
    if (!email) {
        return false;
    }
    else if (!(email.includes("@"))) {
        return false;
    }
    else {
        const domain = email.split('@')[1]
        const isTemp = tempEmailList.indexOf(domain) != -1

        return !isTemp
    }


}


const signUpValidationSchema = yup.object().shape({
    email: yup
        .string()
        .email("Please enter valid email")
        .required('Email is required')
        .test("isTemp", "ComeOn!, we aren't gonna spam you", isTempEmail),
    password: yup
        .string()
        .matches(/\w*[a-z]\w*/, "Password must have a small letter")
        .matches(/\w*[A-Z]\w*/, "Password must have a capital letter")
        .matches(/\d/, "Password must have a number")
        .matches(/[!@#$%^&*()\-_"=+{}; :,<.>]/, "Password must have a special character")
        .min(8, ({ min }) => `Password must be at least ${min} characters`)
        .required('Password is required'),
    confirmPassword: yup
        .string()
        .oneOf([yup.ref('password')], 'Passwords do not match')
        .required('Confirm password is required'),
})


const Signup = ({ navigation }) => {

    const handleSignup = (email, password) => {
        auth()
            .createUserWithEmailAndPassword(email, password)
            .then(() => {
                console.log('User account created & signed in!');
            })
            .catch(error => {
                if (error.code === 'auth/invalid-email') {
                    Alert.alert(
                        "Invalid Email",
                        `That email address is invalid!`,
                    );
                    console.log('That email address is invalid!');
                } else {
                    Alert.alert(
                        "Error Logging in",
                        `${error.code}`,
                    );
                }

            });
    }
    return (
        <View style={globalStyles.mainContainer}>
            <View style={styles.container}>
                <AuthForm
                    ValidationSchema={signUpValidationSchema}
                    title={"Sign up"}
                    onSubmit={handleSignup}
                    conf />
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

export default Signup

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