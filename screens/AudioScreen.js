import React, { useState, useEffect } from "react";
import { StyleSheet, View, TouchableOpacity, Button } from "react-native";
import { Audio, RecordingOptionsPresets } from "expo-av";
import { FontAwesome } from '@expo/vector-icons'; // Assuming FontAwesome is imported properly

export default function AudioScreen() {
  const [isRecording, setIsRecording] = useState(false);
  const [recording, setRecording] = useState(null);
  const [recordingStatus, setRecordingStatus] = useState("idle");
  const [audioPermission, setAudioPermission] = useState(null);
  const [recordedAudio, setRecordedAudio] = useState(null);

  useEffect(() => {
    async function getPermission() {
      try {
        const permission = await Audio.requestPermissionsAsync();
        console.log("Permission Granted: " + permission.granted);
        setAudioPermission(permission.granted);
      } catch (error) {
        console.log(error);
      }
    }

    getPermission();
    return () => {
      if (recording) {
        stopRecording();
      }
    };
  }, []);

  async function handleRecordButtonPress() {
    setRecordedAudio(null);
    setRecording(null);
    if (recording) {
      const audioUri = await stopRecording(recording);
      if (audioUri) {
        console.log("Saved audio file to", audioUri);
      }
    } else {
      await startRecording();
    }
  }

  async function startRecording() {
    setIsRecording(true);
    setRecording(null);
    setRecordedAudio(null);

    // Check if a recording is already in progress
    if (isRecording) {
      console.warn("A recording is already in progress");
      return;
    }

    // Check for permissions before starting the recording
    if (!audioPermission) {
      console.warn("Audio permission is not granted");
      return;
    }
    try {
      // needed for IOS, If you develop mainly on IOS device or emulator, 
      // there will be an error if you don't include this.
      if (audioPermission) {
        await Audio.setAudioModeAsync({
          allowsRecordingIOS: true,
          playsInSilentModeIOS: true,
        });
      }

      const newRecording = new Audio.Recording();
      console.log("Starting Recording");
      await newRecording.prepareToRecordAsync(
        Audio.RecordingOptionsPresets.HIGH_QUALITY
      );
      await newRecording.startAsync();
      setRecording(newRecording);
      setRecordingStatus("recording");
    } catch (error) {
      console.error("Failed to start recording", error);
    }
  }

  async function stopRecording() {
    setIsRecording(false);
    try {
      if (recordingStatus === "recording") {
        console.log("Stopping Recording");
        await recording.stopAndUnloadAsync();
        const uri = recording.getURI();

        setRecordedAudio({
          uri,
          name: `recording-${Date.now()}.m4a`, // Change the file extension to .m4a
          type: "audio/m4a", // Update the type to M4A
        });

        // reset our states to record again
        setRecording(null);
        setRecordingStatus("stopped");
        return uri;
      }
    } catch (error) {
      console.error("Failed to stop recording", error);
    }
  }

  async function handleSubmit() {
    try {
        console.log("Starting handleSubmit function...");

        if (!recordedAudio) {
            console.error("No recorded audio to submit.");
            return;
        }

        console.log("Recorded audio found:", recordedAudio);

        const { uri, name } = recordedAudio;
        console.log("URI:", uri);
        console.log("Name:", name);

        // Create a new FormData object
        const formData = new FormData();

        // Fetch the file from the URI, create a Blob and append to FormData
        const response = await fetch(uri);
        const blob = await response.blob();
        formData.append("file", blob, name);

        // Make a POST request to the server
        console.log("Sending POST request to server...");
        const fetchResponse = await fetch("http://apt.howard-zhu.com/upload", {
            method: "POST",
            headers: {
                Username: "Howard" // Removed Content-Type header
            },
            body: formData
        });

        console.log("Response received:", fetchResponse);
        if (!fetchResponse.ok) {
            throw new Error("Failed to submit recorded audio.");
        }

        console.log("Recorded audio submitted successfully.");
    } catch (error) {
        console.error("Error submitting recorded audio:", error);
    }
}


  
  
  
  

  return (
    <View style={styles.container}>
      <View style={styles.voiceContainer}>
        <TouchableOpacity
          style={styles.voiceButton}
          onPress={handleRecordButtonPress}
        >
          <FontAwesome name="microphone" size={24} color="white" />
        </TouchableOpacity>
      </View>
      <Button title="Submit" onPress={handleSubmit} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  voiceContainer: {
    // Add your styles for the voice container
  },
  voiceButton: {
    // Add your styles for the voice button
  },
});
