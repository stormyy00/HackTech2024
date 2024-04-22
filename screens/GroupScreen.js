import React, { useState } from 'react';
import { StyleSheet, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { Input, Button, Card, Layout, Text, TabBar, Tab } from '@ui-kitten/components';
import { getFirestore, collection, addDoc, doc, updateDoc, arrayUnion, query, where, getDocs } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { Alert } from 'react-native';

const JoinGroupScreen = () => {
    const [joinCode, setJoinCode] = useState('');
    const [groupInfo, setGroupInfo] = useState(null);  // State to store joined group info
    const firestore = getFirestore();
    const auth = getAuth();
  
    const handleJoinGroup = async () => {
      if (!joinCode) {
        Alert.alert('Error', 'Please enter a join code.');
        return;
      }
  
      const groupsRef = collection(firestore, "groups");
      const q = query(groupsRef, where("joinCode", "==", joinCode));
      
      try {
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
          const groupDoc = querySnapshot.docs[0];
          const groupId = groupDoc.id;
  
          const groupRef = doc(firestore, "groups", groupId);
          await updateDoc(groupRef, {
            members: arrayUnion(auth.currentUser.uid)
          });

          setGroupInfo({ id: groupId, joinCode: joinCode });  // Save the group info for display
          Alert.alert('Success', 'Joined group successfully');
        } else {
          Alert.alert('Error', 'No group found with that join code.');
        }
      } catch (error) {
        console.error("Error joining group:", error);
        Alert.alert('Error', 'Failed to join group.');
      }
    };
  
    return (
      <Layout style={styles.container}>
        <Card style={styles.card}>
          <Text category='h4' style={styles.title}>Join a Group</Text>
          <Input
            value={joinCode}
            label='Join Code'
            placeholder='Enter join code'
            onChangeText={setJoinCode}
            style={styles.input}
          />
          <Button onPress={handleJoinGroup}>
            Join Group
          </Button>
          {groupInfo && (
            <Card style={[styles.card, styles.infoCard]}>
              <Text category='h6'>You have joined the group successfully!</Text>
              <Text category='s1'>Group ID: {groupInfo.id}</Text>
              <Text category='s1'>Join Code: {groupInfo.joinCode}</Text>
            </Card>
          )}
        </Card>
      </Layout>
    );
};


const generateJoinCode = () => {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < 5; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  };
  

  const CreateGroupScreen = () => {
    const [groupName, setGroupName] = useState('');
    const [joinCode, setJoinCode] = useState('');  // State to store the join code after group creation
    const firestore = getFirestore();
    const auth = getAuth();
  
    const handleCreateGroup = async () => {
        if (!groupName) {
          Alert.alert('Error', 'Please enter a group name.');
          return;
        }
      
        const newJoinCode = generateJoinCode();
        setJoinCode(newJoinCode);  // Update join code state to display it in the UI
      
        try {
          const newGroupRef = await addDoc(collection(firestore, "groups"), {
            groupName: groupName,
            joinCode: newJoinCode,
            createdAt: new Date(),
            members: [auth.currentUser.uid],
            admin: [auth.currentUser.uid]
          });
      
          const userRef = doc(firestore, "users", auth.currentUser.uid);
          await updateDoc(userRef, {
            groups: arrayUnion(newGroupRef.id)
          });
      
          Alert.alert('Success', `Group created successfully.`);
        } catch (error) {
          console.error("Error creating group: ", error);
          Alert.alert('Error', 'Failed to create group.');
        }
      };
  
  return (
    <Layout style={styles.container}>
      <Card style={styles.card}>
        <Text category='h4' style={styles.title}>Create a Group</Text>
        <Input
          value={groupName}
          label='Group Name'
          placeholder='Enter group name'
          onChangeText={setGroupName}
          style={styles.input}
        />
        <Button onPress={handleCreateGroup}>
          Create Group
        </Button>
        {joinCode && (
          <Card style={[styles.card, styles.infoCard]}>
            <Text category='h6'>Group Created Successfully!</Text>
            <Text category='s1'>Your Join Code: {joinCode}</Text>
          </Card>
        )}
      </Card>
    </Layout>
  );
};


const GroupScreen = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  return (
    <Layout style={styles.fullScreenContainer}>
      <TabBar selectedIndex={selectedIndex} onSelect={index => setSelectedIndex(index)}>
        <Tab title='Join Group'/>
        <Tab title='Create Group'/>
      </TabBar>
      <ScrollView style={styles.scrollViewStyle}>
        {selectedIndex === 0 ? <JoinGroupScreen /> : <CreateGroupScreen />}
      </ScrollView>
    </Layout>
  );
};

const styles = StyleSheet.create({
  fullScreenContainer: {
    flex: 1,
    backgroundColor: '#FBAB7E', // Apply background color to the entire screen container
  },
  scrollViewStyle: {
    flex: 1,
    backgroundColor: '#FBAB7E', // Ensure the background color fills the scroll view
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#FBAB7E',
  },
  card: {
    width: '100%',
    maxWidth: 500,
    padding: 16,
    borderRadius: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  title: {
    textAlign: 'center',
    marginBottom: 24,
    fontFamily: 'AvenirNext-DemiBold',
  },
  input: {
    marginBottom: 16,
  },
});

export default GroupScreen;
