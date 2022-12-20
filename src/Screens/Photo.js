import { Image, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import globalStyles from '../Theme/globalStyles'
import Colors from '../Theme/Colors'
import SubmitButton from '../Components/SubmitButton'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import storage from '@react-native-firebase/storage';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';


const Photo = () => {

    const [SelectedImage, setSelectedImage] = useState(null);
    const [IsUploading, setIsUploading] = useState(false)
    const reference = storage().ref('nordstone.png');
    const [FirebaseImageUrl, setFirebaseImageUrl] = useState(null)

    const handleImagePicker = async () => {
        const options = {
            mediaType: "photo",
        }
        setSelectedImage(await launchImageLibrary(options))
    }
    const handleCamera = async () => {
        const options = {
            mediaType: "photo",
        }
        setSelectedImage(await launchCamera(options))
    }

    useEffect(() => {
        console.log(SelectedImage);
        if (SelectedImage && SelectedImage.assets?.length && SelectedImage.assets[0]?.uri) {
            console.log(SelectedImage);

            const task = reference.putFile(SelectedImage.assets[0].uri)
            setIsUploading(true)
            task.then(async () => {
                setIsUploading(false)
                setFirebaseImageUrl(await reference.getDownloadURL())

            })
        }
    }, [SelectedImage])


    const imageUri = "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg"
    return (
        <View style={globalStyles.mainContainer}>
            <View style={styles.container}>
                <View style={styles.photo}>
                    {FirebaseImageUrl ?
                        <Image
                            style={styles.image}
                            source={{ uri: FirebaseImageUrl }}
                        /> : <MaterialIcons name={"insert-photo"} size={60} color={Colors.text} />}
                </View>
                <Text style={[globalStyles.text18, { marginBottom: 20 }]}>{IsUploading ? "Uploading to Firebase ..." : FirebaseImageUrl ? "Done ✅, you can replace it again" : "Pick or Click a new Photo"}</Text>
                <SubmitButton isValid={true} title={"Camera"} onPress={handleCamera} />
                <View style={{ height: 15 }} />
                <SubmitButton isValid={true} title={"Image Picker"} onPress={handleImagePicker} />
            </View>
        </View>
    )
}

export default Photo

const styles = StyleSheet.create({
    container: {
        width: '80%',
        marginTop: 20,
        height: '95%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    photo: {
        backgroundColor: Colors.shad2,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 15,
        marginBottom: 10,
        height: '65%',
        width: '100%',
    },
    image: {
        height: '100%',
        width: '100%',
        borderRadius: 15,

    }
})