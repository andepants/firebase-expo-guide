import { View, Text, StyleSheet, TextInput, Button, TouchableOpacity } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'
import { auth } from '../FirebaseConfig'
import { GoogleAuthProvider, signInWithRedirect } from 'firebase/auth'

const login = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput style={styles.textInput} placeholder="email" />
      <TextInput style={styles.textInput} placeholder="password" />
      <TouchableOpacity style={styles.button} onPress={() => console.log('hiiii')}>
        <Text style={{color:'white'}}>Google Login</Text>
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
