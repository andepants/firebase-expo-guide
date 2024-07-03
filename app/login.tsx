import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { auth } from '../FirebaseConfig'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'
import { router } from 'expo-router'


const login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const signIn = async () => {
    console.log('Sign in');
    try {
      const user = await signInWithEmailAndPassword(auth, email, password)
      if (user) router.replace('/(tabs)')
    } catch (error: any) {
      console.log(error)
      alert('Sign in failed: ' + error.message);
    }
  }

  const signUp = async () => {
    console.log('Sign Up');
    try {
      const user = await createUserWithEmailAndPassword(auth, email, password)
      if (user) router.replace('/(tabs)')
    } catch (error: any) {
      console.log(error)
      alert('Sign in failed: ' + error.message);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput style={styles.textInput} placeholder="email" value={email} onChangeText={setEmail} />
      <TextInput style={styles.textInput} placeholder="password" value={password} onChangeText={setPassword} secureTextEntry/>
      <TouchableOpacity style={styles.button} onPress={signIn}>
        <Text style={{color:'white'}}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={signUp}>
        <Text style={{color:'white'}}>Make Account</Text>
      </TouchableOpacity>
    </View>
  )
}

export default login

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  textInput: {
    height: 40,
    width: '80%',
    borderColor: 'gray',
    borderWidth: 1,
    marginVertical: 10,
    padding: 10,
  },
  button: {
    width: '80%',
    marginVertical: 10,
    backgroundColor: '#007BFF', // A nice shade of blue
    padding: 15,
    borderRadius: 10,
    alignItems: 'center', // Center text or content inside the button
    justifyContent: 'center', // Center vertically if the button has a fixed height
    shadowColor: '#000', // Shadow for iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5, // Shadow for Android
  }
});
