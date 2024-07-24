import React, { useState } from 'react';
import { FlatList, TextInput, View, Text, StyleSheet } from 'react-native';

const posts = [
  { id: '1', title: 'Post sobre React', content: 'Aprenda a usar React Native' },
  { id: '2', title: 'Post sobre JavaScript', content: 'Entendendo funções em JavaScript' },
  { id: '3', title: 'Post sobre CSS', content: 'Estilizando com CSS' },
  // Outros posts
];

export default function Favorite() {
  const [searchText, setSearchText] = useState('');
  const [filteredPosts, setFilteredPosts] = useState(posts);

  const handleSearch = (text) => {
    setSearchText(text);

    if (text) {
      const filteredData = posts.filter(item =>
        item.title.toLowerCase().includes(text.toLowerCase()) ||
        item.content.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredPosts(filteredData);
    } else {
      setFilteredPosts(posts);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchBar}
        placeholder="Buscar..."
        value={searchText}
        onChangeText={handleSearch}
      />
      <FlatList
        data={filteredPosts}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.postItem}>
            <Text style={styles.postTitle}>{item.title}</Text>
            <Text style={styles.postContent}>{item.content}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff'
  },
  searchBar: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    paddingHorizontal: 10,
    marginBottom: 20,
    borderRadius: 5
  },
  postItem: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee'
  },
  postTitle: {
    fontSize: 18,
    fontWeight: 'bold'
  },
  postContent: {
    marginTop: 5,
    fontSize: 14,
    color: '#333'
  }
});
