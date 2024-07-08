// Import TouchableOpacity from react-native
import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, TouchableOpacity, Text, View } from 'react-native';
import { getFunctions, httpsCallable } from 'firebase/functions';
import { app } from '../../FirebaseConfig';

export default function TabFourScreen() {
  const [functionResult, setFunctionResult] = useState('');

  const callHelloWorldFunction = async () => {
    const functions = getFunctions(app, 'us-central1');
    const helloWorld = httpsCallable(functions, 'helloWorld');
    try {
      const result: any = await helloWorld();
      setFunctionResult(result.data.message);
    } catch (error) {
      console.error("Error calling function:", error);
      setFunctionResult('Failed to call function');
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.title}>Functions</Text>
        <Text style={styles.text}>{functionResult}</Text>
        <TouchableOpacity style={styles.button} onPress={callHelloWorldFunction}>
          <Text style={styles.buttonText}>Call Hello World Function</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    marginBottom: -40,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  button: {
    padding: 10,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#5C6BC0',
    shadowColor: '#5C6BC0',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 5,
    elevation: 5,
    marginLeft: 10,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
  text: {
    color: '#000', // Maintained white for clear visibility
    fontSize: 18, // Slightly larger for emphasis
    fontWeight: '600', // Semi-bold for a balanced weight
    margin: 20,
  }
});