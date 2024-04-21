import React, { useState, useEffect } from "react";
import { StyleSheet, View, TouchableOpacity, Alert } from "react-native";
import { Audio } from "expo-av";
import { Button, Text, Icon, Card, Layout } from '@ui-kitten/components';

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
    if (isRecording || !audioPermission) {
      return;
    }
    setIsRecording(true);
    setRecording(null);
    setRecordedAudio(null);

    try {
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      const newRecording = new Audio.Recording();
      await newRecording.prepareToRecordAsync(Audio.RecordingOptionsPresets.HIGH_QUALITY);
      await newRecording.startAsync();
      setRecording(newRecording);
      setRecordingStatus("recording");
    } catch (error) {
      console.error("Failed to start recording", error);
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

        // Append the file to FormData with proper file handling
        // The react-native-fetch-blob or similar library might be needed if fetch does not handle local file URIs properly
        // Here we assume the environment or library can handle the file URI directly.
        // 'file' corresponds to the name expected by the server for the file part of the request
        formData.append("file", {
            uri: uri,
            name: name,
            type: 'audio/m4a' // Mime type of the file
        });

        // Make a POST request to the server
        console.log("Sending POST request to server...");
        const fetchResponse = await fetch("http://apt.howard-zhu.com/upload", {
            method: "POST",
            headers: {
                "Content-Type": "multipart/form-data", // Explicitly declare the Content-Type for multipart
                "Username": "Howard"
            },
            body: formData
        });

        console.log("Response received:", fetchResponse);
        if (!fetchResponse.ok) {
            const errorResponse = await fetchResponse.text(); // Get the error message from the server
            throw new Error(`Failed to submit recorded audio. Server responded: ${errorResponse}`);
        }

        console.log("Recorded audio submitted successfully.");
    } catch (error) {
        console.error("Error submitting recorded audio:", error);
    }
}


  async function stopRecording() {
    setIsRecording(false);
    if (recordingStatus === "recording") {
      try {
        await recording.stopAndUnloadAsync();
        const uri = recording.getURI();
        setRecordedAudio({ uri, name: `recording-${Date.now()}.m4a`, type: "audio/m4a" });
        setRecording(null);
        setRecordingStatus("stopped");
        return uri;
      } catch (error) {
        console.error("Failed to stop recording", error);
      }
    }
  }

  return (
    <Layout style={styles.container}>
      <Card style={styles.card}>
        <Text category='h1' style={styles.title}>RANT</Text>
        <View style={styles.voiceContainer}>
          <TouchableOpacity
            style={styles.voiceButton}
            onPress={handleRecordButtonPress}
          >
            <Icon name={isRecording ? "mic-off" : "mic"} fill="#FFFFFF" style={styles.icon} />
          </TouchableOpacity>
        </View>
        <Button style={styles.submitButton} onPress={handleSubmit}>
          Submit
        </Button>
      </Card>
    </Layout>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      padding: 20,
      backgroundColor: '#FFCDB2',  // Use color-primary-100 as the background color
    },
    card: {
      width: '100%',
      maxWidth: 600,
      padding: 20,
      borderRadius: 20,
      alignItems: 'center',
      backgroundColor: '#FFB4A2',  // Use color-primary-200 for the card background
    },
    title: {
      textAlign: "center",
      marginBottom: 24,
      color: '#7B4242',  // Use color-primary-900 for the text color
    },
    voiceContainer: {
      flexDirection: "row",
      justifyContent: "center",
      marginBottom: 24,
    },
    voiceButton: {
      backgroundColor: "#FF6B6B",  // Use color-primary-500 for the button background
      padding: 20,
      borderRadius: 50,
    },
    icon: {
      width: 32,
      height: 32,
      color: "#FFFFFF",  // Assuming you want the icon color to be white for contrast
    },
    submitButton: {
      marginTop: 20,
      backgroundColor: '#DB6B67',  // Use color-primary-600 for the submit button
    }
  });
  

