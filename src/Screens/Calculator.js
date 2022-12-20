import { Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import globalStyles from '../Theme/globalStyles'
import Colors from '../Theme/Colors'
import SubmitButton from '../Components/SubmitButton'
import InputBox from './../Components/InputBox';
import DropDown from '../Components/DropDown'

const options = [
    { key: 1, value: "+" },
    { key: 2, value: "-" },
    { key: 3, value: "*" },
    { key: 4, value: "/" },
]

const calcApiUrl = "https://nordstone-task-server.onrender.com"

const Calculator = () => {
    const [InputState, setInputState] = useState({ num1: 0, num2: 0, opera: "+" })
    const [ResultServer, setResultServer] = useState(0)
    const [IsDropDown, setIsDropDown] = useState(false)

    const getResult = (state) => {
        const { num1, num2, opera } = state
        console.log(num1, num2, opera, state);
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "num1": num1,
            "num2": num2,
            "opera": opera
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch(calcApiUrl + "/calc", requestOptions)
            .then(response => response.text())
            .then(result => { setResultServer(result) })
            .catch(error => console.log('error', error));

    }

    return (
        <Pressable style={globalStyles.mainContainer} onPress={() => setIsDropDown(false)}>
            <View style={styles.container}>

                <Text style={[globalStyles.text26, { marginBottom: 10 }]}>Result form Heroku</Text>
                <View style={styles.outputs}>

                    <Text style={globalStyles.text26}>{ResultServer}</Text>
                </View>

                <InputBox placeholder={"Enter 1st number"}
                    value={InputState.num1}
                    onChangeText={(val) => { setInputState(state => ({ ...state, num1: val })) }}
                    keyboardType="number-pad"
                />
                <DropDown placeholder={"any text …"}
                    value={InputState.opera}
                    setValue={(val) => { setInputState(state => ({ ...state, opera: val })) }}
                    options={options}
                    state={IsDropDown}
                    changeState={(val) => setIsDropDown(val)}
                />
                <InputBox placeholder={"Enter 1st number"}
                    value={InputState.num2}
                    onChangeText={(val) => { setInputState(state => ({ ...state, num2: val })) }}
                    keyboardType="number-pad"
                />
                <View style={{ height: 20 }} />

                <SubmitButton isValid={true} title={"Calculate "} onPress={() => getResult(InputState)} />
            </View>
        </Pressable>
    )
}

export default Calculator

const styles = StyleSheet.create({
    container: {
        width: '80%',
        marginTop: 20,
        height: '95%',
        // justifyContent: 'center',
        // alignItems: 'center',
    },
    outputs: {
        backgroundColor: Colors.shad2,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 15,
        marginBottom: 10,
        height: '30%',
        width: '100%',
    },

})