import { StyleSheet } from "react-native"
import Colors from "./Colors"

const globalStyles = StyleSheet.create({
    mainContainer: {
        // background: Colors.background,
        backgroundColor: Colors.background,
        flex: 1,
        alignItems: 'center'
    },
    text32: {
        fontSize: 32,
        color: Colors.text,
        fontWeight: 'bold'
    },
    text26: {
        fontSize: 26,
        color: Colors.text,
        fontWeight: "600"
    },
    text18: {
        fontSize: 18,
        color: Colors.text,
    },
    linkText: {
        fontSize: 18,
        color: Colors.links,
    },
})

export default globalStyles