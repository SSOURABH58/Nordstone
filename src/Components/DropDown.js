import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Colors from '../Theme/Colors'
import globalStyles from '../Theme/globalStyles'



const DropDown = ({ value, options, setValue, state, changeState }) => {

    return (
        <Pressable style={styles.container} onPress={() => { changeState(!state) }}>
            <Text style={globalStyles.text18}>{value}</Text>
            {state && <View style={styles.drop}>
                {options.map(val =>
                    <Pressable key={val.key} style={styles.itemsCont} onPress={() => { setValue(val.value); changeState(false) }}>
                        <Text style={globalStyles.text18}>{val.value}</Text>
                    </Pressable>)}


            </View>}
        </Pressable>
    )
}

export default DropDown

const styles = StyleSheet.create({
    container: {
        position: 'relative',
        height: 50,
        // margin: 12,
        borderWidth: 1,
        // padding: 10,
        // paddingHorizontal: 18,
        backgroundColor: Colors.shad1,
        color: Colors.text,
        borderColor: Colors.text,
        marginTop: 8,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        // fontSize: 18
        zIndex: 1000
    },
    itemsCont: {
        height: 50,
        // margin: 12,
        // borderWidth: 1,
        // padding: 10,
        // paddingHorizontal: 18,
        borderTopWidth: 1,
        backgroundColor: Colors.shad2,
        color: Colors.text,
        borderColor: Colors.shad1,
        // marginTop: 8,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        // fontSize: 18
        zIndex: 1000
    },
    drop: {
        width: '100%',
        position: "absolute",
        top: 42,
        zIndex: 1010,
        backgroundColor: Colors.shad2,
        borderColor: Colors.text,
        borderWidth: 1,
        borderTopWidth: 0
    }

})