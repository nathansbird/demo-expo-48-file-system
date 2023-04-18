import 'expo-dev-client';
import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as ImageManipulator from 'expo-image-manipulator';
import * as FileSystem from 'expo-file-system';
import { useEffect } from 'react';

export default function App() {
  const [status, requestPermission] = ImagePicker.useMediaLibraryPermissions();

  useEffect(() => {
    console.log(status);
  }, [status])

  const pickImage = async () => {
    if(!status.granted){
      requestPermission();
      return;
    }
    // No permissions request is necessary for launching the image library
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result.assets[0].uri)

    const manipResult = await ImageManipulator.manipulateAsync(result.assets[0].uri, [{
      rotate: 0,
    }]);

    const stringRes = await FileSystem.readAsStringAsync(manipResult.uri);
    console.log(stringRes.length) //Prints length of string showing file is readable
  };

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Button title="Pick an image from camera roll" onPress={pickImage}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
