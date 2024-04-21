import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView, Button, Image, TouchableOpacity } from 'react-native';
import { useEffect, useRef, useState } from 'react';
import { Camera, CameraType  } from 'expo-camera';
import { shareAsync } from 'expo-sharing';
import * as MediaLibrary from 'expo-media-library';


export default function App() { 
  let cameraRef = useRef();
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(CameraType.front);   // Default to front camera

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
    const formData = new FormData();
    formData.append('file', {
      uri: newPhoto.uri,
      name: 'photo.jpg',
      type: 'image/jpeg'
    });

    // Use fetch to send the photo to your server
    fetch('http://apt.howard-zhu.com/upload', {
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data',
        'Username': 'Howard'  // Assuming your server expects this header
      },
      body: formData
    })
    .then(response => response.text())
    .then(data => {
      console.log('Success:', data);
    })
    .catch((error) => {
      console.error('Error:', error);
    });

    setPhoto(newPhoto);
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
        
        <Image style={styles.preview} source={{ uri: "data:image/jpg;base64," + photo.base64 }} />
        <Button title="Share" onPress={sharePic} />
        {hasMediaLibraryPermission ? <Button title="Save" onPress={savePhoto} /> : undefined}
        <Button title="Discard" onPress={() => setPhoto(undefined)} />
      </SafeAreaView>
    );
  }



  return (
    
    <Camera style={styles.container} ref={cameraRef}>
      <View style={styles.buttonContainer}>
        <Button title="Flip Camera" onPress={toggleCameraType} />
        <Button title="Take Pic" onPress={takePic} />

             {/* <Camera/> */}
            {/* <ProfilePicture/>
            <Stats/> */}

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
    backgroundColor: '#fff',
    alignSelf: 'flex-end'
  },
  preview: {
    alignSelf: 'stretch',
    flex: 1
  }
});