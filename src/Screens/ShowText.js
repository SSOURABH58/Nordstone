import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import globalStyles from '../Theme/globalStyles'
import Colors from '../Theme/Colors'
import SubmitButton from '../Components/SubmitButton'
import InputBox from './../Components/InputBox';
import firestore from '@react-native-firebase/firestore';


const ShowText = () => {
    const TextDoc = firestore().collection('Text').doc('text');
    const [FireStoreTest, setFireStoreTest] = useState("")
    const [TextInput, setTextInput] = useState("")

    const handleSend = async (val) => {
        await TextDoc.set({ text: val }, { merge: true }).then(() => { console.log("Done send"); })
    }
    useEffect(() => {
        const subscriber = TextDoc
            .onSnapshot(documentSnapshot => {
                console.log('User data: ', documentSnapshot?.data());
                if (documentSnapshot?.data()) {

                    setFireStoreTest(documentSnapshot.data().text)
                }
            });

        return () => subscriber();
    }, [TextDoc]);

    return (
        <View style={globalStyles.mainContainer}>
            <View style={styles.container}>

                <View style={styles.outputs}>
                    <Text style={[globalStyles.text26, { marginBottom: 10 }]}>Test form Fire-base</Text>
                    <Text style={globalStyles.text18}>{FireStoreTest}</Text>

                </View>
                <InputBox placeholder={"any text …"}
                    value={TextInput}
                    onChangeText={(val) => { setTextInput(val) }}
                // error={"gg"}
                />
                <View style={{ height: 20 }} />
                <SubmitButton isValid={TextInput} title={"Send"} onPress={() => { handleSend(TextInput) }} />
            </View>
        </View>
    )
}

export default ShowText

const styles = StyleSheet.create({
    container: {
        width: '80%',
        marginTop: 20,
        height: '95%',
        // justifyContent: '',
        // alignItems: 'center',
    },
    outputs: {
        width: '100%',
        flexGrow: 1
    }
})