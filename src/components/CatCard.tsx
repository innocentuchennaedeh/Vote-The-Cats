import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { CatImage } from '../api/catApi';
import { TouchableOpacity } from 'react-native';

interface CatCardProps {
  cat: CatImage;
  cardWidth: number;
  onToggleFavourite: () => void;
  onVote: (value: number) => void;
}

const CatCard = ({ cat, cardWidth, onToggleFavourite, onVote }: CatCardProps) => {
  return (
    <View style={[styles.card, { width: cardWidth }]}>
      <Image source={{ uri: cat.url }} style={styles.image} resizeMode="cover" />
      
      {/* Favorite Heart Overlay */}
      <TouchableOpacity style={styles.favBadge} onPress={onToggleFavourite}>
        <Ionicons 
          name={cat.isFavourite ? "heart" : "heart-outline"} 
          size={24} 
          color={cat.isFavourite ? "#FF6B6B" : "#FFF"} 
        />
      </TouchableOpacity>

      <View style={styles.footer}>
        <Text style={styles.scoreText}>Score: {cat.score ?? 0}</Text>
        
        <View style={styles.voteActions}>
          <TouchableOpacity onPress={() => onVote(1)} style={styles.voteBtn}>
            <Ionicons name="arrow-up-circle" size={28} color="#4CAF50" />
          </TouchableOpacity>
          
          <TouchableOpacity onPress={() => onVote(-1)} style={styles.voteBtn}>
            <Ionicons name="arrow-down-circle" size={28} color="#F44336" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default CatCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFF',
    margin: 8,
    borderRadius: 12,
    overflow: 'hidden',
    // Modern Shadow/Elevation
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  image: { width: '100%', height: 180 },
  favBadge: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'rgba(0,0,0,0.3)',
    borderRadius: 20,
    padding: 6,
  },
  footer: {
    padding: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  scoreText: { 
    fontSize: 16, 
    fontWeight: 'bold', 
    color: '#333' 
  },
  voteActions: { 
    flexDirection: 'row', 
    gap: 8 
  },
  voteBtn: { 
    padding: 4 
  },
});