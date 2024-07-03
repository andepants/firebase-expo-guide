import { StyleSheet, TouchableOpacity } from 'react-native';

import EditScreenInfo from '@/components/EditScreenInfo';
import { Text, View } from '@/components/Themed';
import { auth } from '@/FirebaseConfig';

export default function TabOneScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Out</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <TouchableOpacity style={styles.button} onPress={async () => {
         try {
          await auth.signOut();
          console.log('Signed out successfully');
        } catch (error) {
          console.error('Sign out error:', error);
        }
      }}>
        <Text style={{color:'white'}}>Sign Out</Text>
      </TouchableOpacity>
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
  button: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  }
});
