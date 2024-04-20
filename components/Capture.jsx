
import { Text, SafeAreaView, } from 'react-native';
import { useEffect, useRef, useState } from 'react';
import { Camera } from 'expo-camera';
const GetImage = ({cameraRef}) => {
    const [photo, setPhoto] = useState();

    useEffect(() => {
        // Use setTimeout to update the message after 2000 milliseconds (2 seconds)
        const interval = setInterval(() => {takePic(); }, 2000);
        
        // Cleanup function to clear the timeout if the component unmounts
        return () => clearInterval(interval);
      }, []);
    
      let takePic = async () => {
        let options = {
          quality: 1,
          base64: true,
          exif: false
        };
    
        let newPhoto = await cameraRef.current.takePictureAsync(options);
          //setPhotos([...photo,    newPhoto]);
          setPhoto(newPhoto);
          console.log("take picture");
      };
};
  
export default function Capture() {
  let cameraRef = useRef();
  const [hasCameraPermission, setHasCameraPermission] = useState();

  useEffect(() => {
    (async () => {
      const cameraPermission = await Camera.requestCameraPermissionsAsync();
      setHasCameraPermission(cameraPermission.status === "granted");
    })();
  }, []);
    
  if (hasCameraPermission === undefined) {
    return <Text>Requesting permissions...</Text>
  } else if (!hasCameraPermission) {
    return <Text>Permission for camera not granted. Please change this in settings.</Text>
  }

  return (
      <SafeAreaView style="flex-1 justify-center items-center">
          <Camera className="w-screen h-screen" ref={cameraRef}>
          <GetImage cameraRef={cameraRef} />
          </Camera>
      </SafeAreaView>
  );
}