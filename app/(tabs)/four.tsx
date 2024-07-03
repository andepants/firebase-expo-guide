import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { getFunctions, httpsCallable } from 'firebase/functions';

import EditScreenInfo from '@/components/EditScreenInfo';
import { Text, View } from '@/components/Themed';
import { app } from '../../FirebaseConfig'; // Make sure to import your Firebase app config

export default function TabFourScreen() {
  const [functionResult, setFunctionResult] = useState('');

  useEffect(() => {
    const callHelloWorldFunction = async () => {
      const functions = getFunctions(app, 'us-central1');
      const helloWorld = httpsCallable(functions, 'helloWorld');
      try {
        const result = await helloWorld();
        setFunctionResult(result.data.message);
      } catch (error) {
        console.error("Error calling function:", error);
        setFunctionResult('Failed to call function');
      }
    };

    callHelloWorldFunction();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Functions</Text>
      <Text>{functionResult}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
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
});