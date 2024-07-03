import { StyleSheet, Button, Image, FlatList, Alert } from 'react-native';
import React, { useState, useEffect } from 'react';
import { Text, View } from '@/components/Themed';
import { storage, auth } from '../../FirebaseConfig';
import { getDownloadURL, ref, uploadBytes, listAll, deleteObject } from 'firebase/storage';
import * as ImagePicker from 'expo-image-picker';
import { onAuthStateChanged } from 'firebase/auth';

export default function TabThreeScreen() {
  const [image, setImage] = useState(null);
  const [images, setImages] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        fetchImages(currentUser.uid);
      }
    });
    return unsubscribe;
  }, []);

  const fetchImages = async (userId) => {
    try {
      const storageRef = ref(storage, `images/${userId}`);
      const result = await listAll(storageRef);
      const urls = await Promise.all(result.items.map((itemRef) => getDownloadURL(itemRef)));
      setImages(urls);
    } catch (error) {
      console.error("Error fetching images: ", error);
    }
  };

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      const imageUri = result.assets[0].uri;
      console.log(result, 'the result');
      setImage(imageUri);
      console.log("Image picked: ", imageUri);
    }
  };

  const uploadImage = async () => {
    if (!user || !image) {
      console.log(`User: ${user}, Image: ${image}`); // Add logging to check values
      Alert.alert('No user or image found!');
      return;
    }

    console.log("Attempting to upload image: ", image); // Log the image URI for debugging

    try {
      const response = await fetch(image);
      const blob = await response.blob();

      console.log("Blob created: ", blob); // Log the blob for debugging

      const storageRef = ref(storage, `images/${user.uid}/${Date.now()}`);
      await uploadBytes(storageRef, blob);

      const url = await getDownloadURL(storageRef);
      setImages(images => [...images, url]);
      setImage(null); // Reset the image state
      console.log("Image uploaded and URL retrieved: ", url);
    } catch (error) {
      console.error("Error uploading image: ", error);
      Alert.alert('Upload failed!', error.message);
    }
  };

  const deleteImage = async (url) => {
    if (!user) {
      Alert.alert('No user found!');
      return;
    }

    try {
      const storageRef = ref(storage, url);
      await deleteObject(storageRef);
      setImages(images.filter((img) => img !== url));
    } catch (error) {
      console.error("Error deleting image: ", error);
      Alert.alert('Delete failed!', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Storage</Text>
      <Button title="Pick an image from camera roll" onPress={pickImage} />
      {image && (
        <>
          <Image source={{ uri: image }} style={styles.image} />
          <Button title="Upload Image" onPress={uploadImage} />
        </>
      )}
      <FlatList
        data={images}
        renderItem={({ item }) => (
          <View style={styles.imageContainer}>
            <Image source={{ uri: item }} style={styles.image} />
            <Button title="Delete" onPress={() => deleteImage(item)} />
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  image: {
    width: 200,
    height: 200,
    marginVertical: 10,
  },
  imageContainer: {
    alignItems: 'center',
    marginVertical: 10,
  },
});