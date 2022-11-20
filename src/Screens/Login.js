import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import globalStyles from '../Theme/globalStyles'
import AuthForm from '../Components/AuthForm'
import Routes from '../navigation'
import auth from '@react-native-firebase/auth';
import * as yup from 'yup'


const loginValidationSchema = yup.object().shape({
    email: yup
        .string()
        .email("Please enter valid email")
        .required('Email Address is Required'),
    password: yup
        .string()
        .min(8, ({ min }) => `Password must be at least ${min} characters`)
        .required('Password is required'),
})

const Login = ({ navigation }) => {

    const handleLogin = (email, password) => {
        auth().signInWithEmailAndPassword(email, password).then(() => {
            console.log('User Login successful');
        })
            .catch(error => {
                if (error.code === 'auth/email-already-in-use') {
                    console.log('That email address is already in use!');
                }

                if (error.code === 'auth/invalid-email') {
                    console.log('That email address is invalid!');
                }

                console.error(error);
            });
    }

    const forgotPassword = () => {
        navigation.navigate(Routes.auth.ForgotPassword)
    }
    return (
        <View style={globalStyles.mainContainer}>
            <View style={styles.container}>
                <AuthForm
                    ValidationSchema={loginValidationSchema}
                    title={"Login"}
                    onSubmit={handleLogin}
                    forgot
                    forgotPassword={forgotPassword} />
            </View>
            <View style={styles.footer}>
                <Text style={globalStyles.text18}>Do not have an Account</Text>
                <Pressable onPress={() => navigation.navigate(Routes.auth.Signup)}>
                    <Text style={globalStyles.linkText}>{` Sign-up`}</Text>
                </Pressable>
            </View>
        </View>
    )
}

export default Login

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