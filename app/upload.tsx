import React, { useState } from 'react';
import { View, Image, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { router } from 'expo-router';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { catApi } from '../src/api/catApi';
import Button from '../src/components/Button';

const UploadScreen = () => {
  const [imageUri, setImageUri] = useState<string | null>(null);
  const queryClient = useQueryClient();

  const uploadMutation = useMutation({
    mutationFn: (uri: string) => catApi.uploadImage(uri, 'image/jpeg', 'cat.jpg'),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cats'] });
      Alert.alert('Success', 'Cat uploaded successfully!');
      router.replace('/');
    },
    onError: (error: any) => {
      Alert.alert('Upload Failed', error.response?.data?.message || 'Something went wrong');
    }
  });

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      quality: 0.8,
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
    }
  };

  const handleUpload = () => {
    if (!imageUri) return Alert.alert('Validation Error', 'Please select an image first.');
    uploadMutation.mutate(imageUri);
  };

  return (
    <View style={styles.container}>
      {imageUri ? (
        <Image source={{ uri: imageUri }} style={styles.preview} />
      ) : (
        <View style={styles.placeholder} />
      )}

      <View style={styles.actions}>
        <Button title="1. Select Cat Image" onPress={pickImage} variant="secondary" />
        {uploadMutation.isPending ? (
          <ActivityIndicator size="large" color="#FF6B6B" style={{ marginTop: 16 }} />
        ) : (
          <Button title="2. Upload Cat" onPress={handleUpload} disabled={!imageUri} />
        )}
      </View>
    </View>
  );
};

export default UploadScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F8F9FA',
    alignItems: 'center'
  },
  preview: {
    width: 300,
    height: 300,
    borderRadius: 12,
    marginBottom: 20
  },
  placeholder: {
    width: 300,
    height: 300,
    borderRadius: 12,
    backgroundColor: '#E9ECEF',
    marginBottom: 20
  },
  actions: {
    width: '100%',
    gap: 16
  },
});