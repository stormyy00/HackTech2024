import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView, Button, Image, TouchableOpacity } from 'react-native';
import { useEffect, useRef, useState } from 'react';
import { Camera, CameraType  } from 'expo-camera';
import { shareAsync } from 'expo-sharing';
import * as MediaLibrary from 'expo-media-library';
import { getAuth } from 'firebase/auth';

export default function App() { 
  let cameraRef = useRef();
  const auth = getAuth();
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(CameraType.front);   // Default to front camera
  const [isUploaded, setIsUploaded] = useState(false);


  const [hasCameraPermission, setHasCameraPermission] = useState();
  const [hasMediaLibraryPermission, setHasMediaLibraryPermission] = useState();
  const [photo, setPhoto] = useState();

  useEffect(() => {
    (async () => {
      const cameraPermission = await Camera.requestCameraPermissionsAsync();
      const mediaLibraryPermission = await MediaLibrary.requestPermissionsAsync();
      setHasCameraPermission(cameraPermission.status === "granted");
      setHasMediaLibraryPermission(mediaLibraryPermission.status === "granted");
    })();
  }, []);

  function toggleCameraType() {
    setType(current => (current === CameraType.back ? CameraType.front : CameraType.back));
  }
   

  let takePic = async () => {
    let options = {
      quality: 0.1,
      base64: false,
      exif: false,
    };
    let newPhoto = await cameraRef.current.takePictureAsync(options);
    setPhoto(newPhoto);
    
    
    const formData = new FormData();
    formData.append('file', {
      uri: newPhoto.uri,
      name: 'Mood.jpeg',
      type: 'image/jpeg'
    });

    // Use fetch to send the photo to your server
    fetch('http://apt.howard-zhu.com/upload', {
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data',
        'Username': auth.currentUser.uid // Assuming your server expects this header
      },
      body: formData
    })
    .then(response => response.text())
    .then(data => {
      console.log('Success:', data);
      setIsUploaded(true);
    })
    .catch((error) => {
      console.error('Error:', error);
    });

    
  };


  if (hasCameraPermission === undefined) {
    return <Text>Requesting permissions...</Text>
  } else if (!hasCameraPermission) {
    return <Text>Permission for camera not granted. Please change this in settings.</Text>
  }

  // let takePic = async () => {
  //   let options = {
  //     quality: 0.1,
  //     base64: true,
  //     exif: false
  //   };
  //   const db = getFirestore();

  //   let newPhoto = await cameraRef.current.takePictureAsync(options);
  //   const timestamp = new Date().toISOString().replace(/:/g, '-');  // Formatting timestamp to be file safe
  //   await setDoc(doc(db, "users", timestamp), {
  //     photo: newPhoto.base64,  // Storing only base64 string
  //   });
  //   console.log("Photo written to Firestore with timestamp:", timestamp);
      // setPhoto(newPhoto);
  // };
  


    if (photo) {
      let sharePic = () => {
        shareAsync(photo.uri).then(() => {
          setPhoto(undefined);
        });
      };

    let savePhoto = () => {
      MediaLibrary.saveToLibraryAsync(photo.uri).then(() => {
        setPhoto(undefined);
      });
    };

    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.uploadMessageContainer}>
        <Text style={styles.uploadMessage}>Picture Uploaded</Text>
      </View>
        {/* <Image style={styles.preview} source={{ uri: "data:image/jpg;base64," + photo.base64 }} />
        <Button title="Share" onPress={sharePic} />
        {hasMediaLibraryPermission ? <Button title="Save" onPress={savePhoto} /> : undefined}
        <Button title="Discard" onPress={() => setPhoto(undefined)} /> */}
      </SafeAreaView>
    );
    
  }



  return (
    <Camera style={styles.container} type={type} ref={cameraRef}>
    <View style={styles.buttonContainer}>
    <TouchableOpacity onPress={takePic} style={styles.captureButton}>
    </TouchableOpacity>
    </View>
      
    

    <StatusBar style="auto" />
  </Camera>
  );

  

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContainer: {  
    position: 'absolute', // Absolute positioning to place it over the camera view
    bottom: 50, // Distance from the bottom of the screen
    alignSelf: 'center', // Center horizontally in the bottom
  },
  preview: {
    alignSelf: 'stretch',
    flex: 1
  },
  captureButton: {
    backgroundColor: '#FFF', // White background for the button
    width: 70, // Width of the circle
    height: 70, // Height of the circle
    borderRadius: 35, // Half of either width or height to make it a perfect circle
    justifyContent: 'center', // Align content inside (if any) vertically center
    alignItems: 'center', // Align content inside (if any) horizontally center
  },
  uploadMessage: {
    color: 'white',
    fontSize: 16,
  },
  uploadMessageContainer: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -70 }, { translateY: -50 }],
    padding: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    borderRadius: 10,
  },
});