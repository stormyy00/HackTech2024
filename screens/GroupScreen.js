import React, { useState } from 'react';
import { StyleSheet, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { Input, Button, Card, Layout, Text, TabBar, Tab } from '@ui-kitten/components';
import { getFirestore, collection, addDoc, doc, updateDoc, arrayUnion } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const JoinGroupScreen = () => {
  const [joinCode, setJoinCode] = useState('');

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
        <Button onPress={() => console.log('Joining group with:', joinCode)}>
          Join Group
        </Button>
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
    const firestore = getFirestore();
    const auth = getAuth();
  
    const handleCreateGroup = async () => {
        if (!groupName) {
          console.log('Please enter a group name.');
          return;
        }
      
        const joinCode = generateJoinCode(); // Generate a join code for the group
      
        try {
          // Create a new group document in Firestore
          const newGroupRef = await addDoc(collection(firestore, "groups"), {
            groupName: groupName,
            joinCode: joinCode,  // Store the join code with the group
            createdAt: new Date(),
            members: [auth.currentUser.uid], // Add the current user as a member
            admin: [auth.currentUser.uid] // Add the current user as an admin
          });
      
          // Update the current user's document to include the new group
          const userRef = doc(firestore, "users", auth.currentUser.uid);
          await updateDoc(userRef, {
            groups: arrayUnion(newGroupRef.id) // Adds the new group's ID to the user's group list
          });
      
          console.log('Group created with ID:', newGroupRef.id);
          console.log('Join Code:', joinCode);
        } catch (error) {
          console.error("Error creating group: ", error);
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
