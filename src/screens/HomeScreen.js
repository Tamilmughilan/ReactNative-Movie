import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import axios from 'axios';

const HomeScreen = ({ navigation }) => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    axios.get('https://api.tvmaze.com/search/shows?q=all')
      .then(response => setMovies(response.data))
      .catch(error => console.error(error));
  }, []);

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Search Movies..."
        style={styles.searchBar}
        onFocus={() => navigation.navigate('Search')}
      />
      <FlatList
        data={movies}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => navigation.navigate('Details', { movie: item.show })}>
            <View style={styles.card}>
              <Image
                source={{ uri: item.show.image?.medium }}
                style={styles.thumbnail}
              />
              <View style={styles.details}>
                <Text style={styles.title}>{item.show.name}</Text>
                <Text style={styles.summary} numberOfLines={3}>{item.show.summary?.replace(/<\/?[^>]+(>|$)/g, '')}</Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  searchBar: {
    backgroundColor: '#222',
    color: '#fff',
    padding: 10,
    margin: 10,
    borderRadius: 5,
  },
  card: { flexDirection: 'row', margin: 10 },
  thumbnail: { width: 100, height: 150, borderRadius: 5 },
  details: { flex: 1, marginLeft: 10 },
  title: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  summary: { color: '#aaa', marginTop: 5 },
});

export default HomeScreen;
