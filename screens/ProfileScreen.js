import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Image, TouchableOpacity, ActivityIndicator, FlatList } from 'react-native';
import { Text, Card, Icon } from '@ui-kitten/components';
import * as ImagePicker from 'expo-image-picker';
import { getAuth } from 'firebase/auth';
import { getFirestore, doc, getDoc, updateDoc } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import MoodChart from '../components/MoodChart';

const ProfileScreen = () => {
    const [imageUri, setImageUri] = useState(null);
    const [hasGalleryPermission, setHasGalleryPermission] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');


    const auth = getAuth();
    const firestore = getFirestore();
    const storage = getStorage();

    useEffect(() => {
        (async () => {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            setHasGalleryPermission(status === 'granted');
            if (status !== 'granted') {
                setError('Gallery permissions are required to use this feature');
            }
            fetchProfilePicture();
        })();
    }, []);

    const fetchProfilePicture = async () => {
        setIsLoading(true);
        const userDoc = doc(firestore, "users", auth.currentUser.uid);
        try {
            const docSnap = await getDoc(userDoc);
            if (docSnap.exists()) {
                const userData = docSnap.data();
                setImageUri(userData.profilePhotoUrl || null);
                // Set the first and last name from the user document
                setFirstName(userData.firstName || '');
                setLastName(userData.lastName || '');
            } else {
                console.log("No profile photo URL found in Firestore.");
            }
        } catch (error) {
            console.error("Error fetching profile photo:", error.message);
            setError("Failed to fetch profile photo.");
        }
        setIsLoading(false);
    };

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.cancelled && result.assets && result.assets.length > 0) {
            const uri = result.assets[0].uri;
            uploadImage(uri);
        } else {
            console.log("No image selected or operation cancelled.");
        }
    };

    const uploadImage = async (uri) => {
        if (!uri) {
            console.error("Error: No file URI provided for upload.");
            setError("No file selected for upload.");
            return;
        }

        setIsLoading(true);
        try {
            const response = await fetch(uri);
            const blob = await response.blob();

            const segments = uri.split('.');
            const fileExtension = segments.length > 1 ? segments.pop().toLowerCase() : 'jpg';

            if (!['jpg', 'jpeg', 'png', 'gif'].includes(fileExtension)) {
                console.error("Unsupported file type:", fileExtension);
                setError("Unsupported file type.");
                setIsLoading(false);
                return;
            }

            const fileName = `profilephoto.${fileExtension}`;
            const storageRef = ref(storage, `user/${auth.currentUser.uid}/${fileName}`);

            const snapshot = await uploadBytes(storageRef, blob);
            const downloadURL = await getDownloadURL(snapshot.ref);

            await updateDoc(doc(firestore, "users", auth.currentUser.uid), {
                profilePhotoUrl: downloadURL
            });
            setImageUri(downloadURL);
        } catch (error) {
            console.error("Error uploading new profile photo:", error);
            setError("Failed to upload new profile photo.");
        } finally {
            setIsLoading(false);
        }
    };

    if (!hasGalleryPermission) {
        return (
            <View style={styles.centeredView}>
                <Text>No access to media library.</Text>
            </View>
        );
    }
    const renderHeader = () => (
        <>
            {isLoading ? (
                <ActivityIndicator size="large" color="#0000ff" />
            ) : (
                <>
                    <Card style={styles.card}>
                        <TouchableOpacity style={styles.imageContainer} onPress={pickImage}>
                            {imageUri ? (
                                <Image source={{ uri: imageUri }} style={styles.image} />
                            ) : (
                                <Icon name="person-outline" fill="#8F9BB3" style={styles.icon} />
                            )}
                            <TouchableOpacity style={styles.editIcon} onPress={pickImage}>
                                <Icon name="edit-2-outline" fill="#8F9BB3" style={{ width: 32, height: 32 }} />
                            </TouchableOpacity>
                        </TouchableOpacity>
                        <View style={styles.nameContainer}>
                            <Text style={styles.name}>{firstName} {lastName}</Text>
                        </View>
                        {error ? <Text style={styles.errorText}>{error}</Text> : null}
                    </Card>
                    <MoodChart />
                </>
            )}
        </>
    );

    return (
        <FlatList
            ListHeaderComponent={renderHeader}
            data={[]} // No data is necessary since all content is in header
            keyExtractor={(item, index) => index.toString()}
            contentContainerStyle={styles.scrollViewContainer}
            style={styles.screenContainer}
        />
    );
};

const styles = StyleSheet.create({
    scrollViewContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        paddingTop: 50, // Adjust top padding if needed
    },
    screenContainer: {
        flex: 1,
        backgroundColor: '#FBAB7E', // Your theme background color
    },
    // Keep moodChartContainer in case it's used elsewhere
    moodChartContainer: {
        width: '100%',
        maxWidth: 600, // Max width for mood chart
        alignSelf: 'center',
        marginTop: 20, // Space above the mood chart
        marginBottom: 20, // Space below the mood chart
    },
    container: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FBAB7E', // Your theme background color
    },
    card: {
        width: '100%',
        maxWidth: 340,
        padding: 16,
        borderRadius: 10,
        elevation: 3, // Optional: adds shadow to card
        alignSelf: 'center', // Ensure card is centered in its container
        margin: 10, // Ensure there is space around the card
    },
    imageContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        backgroundColor: '#FFFFFF', // Use a contrasting color for the border
        borderRadius: 25, // Makes it fully rounded
        borderColor: '#FFB4A2', // Secondary color for the border
        borderWidth: 10, // Border thickness
        margin: 10, // Added margin around the image container
    },
    image: {
        width: 190, // slightly less to account for padding
        height: 190, // slightly less to account for padding
        borderRadius: 15, // Fully rounded
    },
    icon: {
        width: 190,
        height: 190,
    },
    editIcon: {
        position: 'absolute',
        right: 5,
        top: 5,
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: '#FFFFFF', // Ensure visibility against any background
        padding: 6, // Ensures touch area is larger
    },
    errorText: {
        color: 'red',
        marginTop: 10,
        textAlign: 'center',
        margin: 10, // Added margin
    },
    nameContainer: {
        marginBottom: 16, // Add space between name and image
        margin: 10, // Added margin
    },
    name: {
        fontSize: 34, // Large font size for the name
        fontWeight: 'bold', // Bold font weight for the name
        textAlign: 'center', // Center the name text
        color: '#333333', // Dark gray color for the text, which is softer than pure black
        margin: 10, // Added margin
    },
});




export default ProfileScreen;
