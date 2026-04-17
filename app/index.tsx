import React from 'react';
import { View, FlatList, ActivityIndicator, Text, StyleSheet, useWindowDimensions } from 'react-native';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { router } from 'expo-router';
import { catApi, CatImage } from '../src/api/catApi';
import CatCard from '../src/components/CatCard';
import Button from '../src/components/Button';

const HomeScreen = () => {
  const { width } = useWindowDimensions();
  const queryClient = useQueryClient();

  // Responsive logic: max 4 per row, scales down neatly.
  const numColumns = width > 1024 ? 4 : width > 768 ? 3 : width > 340 ? 2 : 1;

  const { data: cats, isLoading, isError, refetch } = useQuery({
    queryKey: ['cats'],
    queryFn: catApi.getMergedCats,
  });

  const favMutation = useMutation({
    mutationFn: ({ id, isFav, favId }: { id: string, isFav: boolean, favId?: number }) => 
      catApi.toggleFavourite(id, isFav, favId),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['cats'] }),
  });

  const voteMutation = useMutation({
    mutationFn: ({ id, value }: { id: string, value: number }) => catApi.vote(id, value),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['cats'] }),
  });

  if (isLoading) return <ActivityIndicator style={styles.center} size="large" color="#FF6B6B" />;
  if (isError) return <Text style={styles.center}>Failed to load cats. Please check your API key.</Text>;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Button title="Upload New Cat" onPress={() => router.push('/upload')} />
      </View>

      <FlatList
        key={numColumns} // Forces re-render when columns change
        data={cats}
        numColumns={numColumns}
        keyExtractor={(item) => item.id}
        refreshing={isLoading}
        onRefresh={refetch}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <CatCard
            cat={item}
            cardWidth={(width / numColumns) - 20} // Account for padding
            onToggleFavourite={() => favMutation.mutate({ id: item.id, isFav: !!item.isFavourite, favId: item.favouriteId })}
            onVote={(value) => voteMutation.mutate({ id: item.id, value })}
          />
        )}
      />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA'
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  header: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E9ECEF'
  },
  list: {
    padding: 8
  },
});