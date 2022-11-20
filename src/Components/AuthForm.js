import { Pressable, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import globalStyles from '../Theme/globalStyles';
import InputBox from './InputBox';
import SubmitButton from './SubmitButton';
import { Formik } from 'formik'



const AuthForm = ({ title, forgot, pass, forgotPassword, ValidationSchema, conf, onSubmit }) => {
  return (
    <View style={styles.container}>
      <Text style={[globalStyles.text32, { marginBottom: 15 }]}>{title}</Text>
      <Formik
        validationSchema={ValidationSchema}
        initialValues={{ email: '', password: '' }}
        onSubmit={values => pass ? onSubmit(values.email) : onSubmit(values.email, values.password)}
        // isInitialValid={false}
        validateOnMount={true}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, isValid, touched }) => (
          <>
            <InputBox
              placeholder={"Email: email@xyz.abc"}
              error={errors.email}
              name="email"
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              value={values.email}
              keyboardType="email-address"
              touched={touched.email}
            />
            {!pass
              && <InputBox
                name="password"
                placeholder="Password: ********"
                style={styles.textInput}
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                value={values.password}
                error={errors.password}
                secureTextEntry
                touched={touched.password}
              />}
            {conf
              && <InputBox
                name="confirmPassword"
                placeholder="confirm Password"
                style={styles.textInput}
                onChangeText={handleChange('confirmPassword')}
                onBlur={handleBlur('confirmPassword')}
                value={values.confirmPassword}
                error={errors.confirmPassword}
                secureTextEntry
                touched={touched.confirmPassword}
              />}
            <View style={styles.forgotPassword}>
              {forgot &&
                <Pressable onPress={forgotPassword}>

                  <Text style={globalStyles.linkText}>forgot password?</Text>
                </Pressable>}
            </View>
            <SubmitButton isValid={isValid} title={"Submit"} onPress={handleSubmit} />
          </>
        )}
      </Formik>
    </View>
  );
};

export default AuthForm;

const styles = StyleSheet.create({
  container: {
    // justifyContent: 'center',
    width: '80%',
    // backgroundColor: "#eee221"
  },
  forgotPassword: {
    width: '100%',
    alignItems: 'flex-end',
    marginBottom: 20,
    marginTop: 8,
  }
});
