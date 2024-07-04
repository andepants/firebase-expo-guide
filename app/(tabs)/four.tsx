import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { getFunctions, httpsCallable } from 'firebase/functions';
import { Text, View } from '@/components/Themed';
import { app } from '../../FirebaseConfig';

export default function TabFourScreen() {
  const [functionResult, setFunctionResult] = useState('');

  useEffect(() => {
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

    callHelloWorldFunction();
  }, []);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.title}>Functions</Text>
        <Text style={styles.text}>{functionResult}</Text>
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
    padding: 20, // Added padding
  },
  title: {
    fontSize: 24, // Increased font size
    fontWeight: 'bold',
    marginBottom: 20, // Added margin bottom
  },
  text: {
    fontSize: 16,
  }
});