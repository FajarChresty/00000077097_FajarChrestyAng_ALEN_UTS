import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { FlatList, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import HomeSlider from '../../components/HomeSlider';
import { useFajarState } from '../../constants/FajarChresty_77097_Context';
import { Fajar_77097_Products } from '../../constants/Products';

const ProductCard = ({ item, isDarkMode, toggleWishlist, wishlist, addToCart }) => {
  const [showDesc, setShowDesc] = useState(false);

  return (
    <View style={[styles.card, isDarkMode && styles.darkCard]}>
      <Image source={item.image} style={styles.productImg} />

      <View style={styles.infoContainer}>
        <View style={styles.nameRow}>
          <Text numberOfLines={1} style={[styles.productName, { color: isDarkMode ? '#fff' : '#000' }]}>
            {item.name}
          </Text>

          <TouchableOpacity onPress={() => setShowDesc(!showDesc)}>
            <Ionicons 
              name={showDesc ? "close-circle" : "information-circle-outline"} 
              size={20} 
              color={isDarkMode ? "#aaa" : "#007AFF"} 
            />
          </TouchableOpacity>
        </View>

        {showDesc && (
          <Text style={[styles.productDesc, { color: isDarkMode ? '#aaa' : '#666' }]}>
            {item.description}
          </Text>
        )}

        <Text style={styles.productPrice}>
          Rp{item.price.toLocaleString('id-ID')}
        </Text>
      </View>

      <View style={styles.actionRow}>
        <TouchableOpacity onPress={() => toggleWishlist(item)}>
          <Ionicons
            name={wishlist.find(i => i.id === item.id) ? "star" : "star-outline"}
            size={24}
            color="#FFD700"
          />
        </TouchableOpacity>

        <TouchableOpacity style={styles.addBtn} onPress={() => addToCart(item)}>
          <Ionicons name="add" size={22} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default function HomeScreen() {
  const { addToCart, wishlist, setWishlist, isDarkMode } = useFajarState();

  const sliderData = Fajar_77097_Products.slice(0, 5);
  const displayProducts = Fajar_77097_Products.slice(0, 9);

  const toggleWishlist = (product) => {
    const isExist = wishlist.find(item => item.id === product.id);
    if (isExist) {
      setWishlist(wishlist.filter(item => item.id !== product.id));
    } else {
      setWishlist([...wishlist, product]);
    }
  };

  return (
    <View style={[styles.container, isDarkMode && styles.darkContainer]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        
        <View style={styles.sliderWrapper}>
          <HomeSlider data={sliderData} />
        </View>

        <FlatList
          data={displayProducts}
          keyExtractor={item => item.id.toString()}
          numColumns={3}
          scrollEnabled={false}
          columnWrapperStyle={styles.row}
          contentContainerStyle={{ paddingBottom: 30 }}
          renderItem={({ item }) => (
            <ProductCard 
              item={item}
              isDarkMode={isDarkMode}
              toggleWishlist={toggleWishlist}
              wishlist={wishlist}
              addToCart={addToCart}
            />
          )}
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F6FA' },
  darkContainer: { backgroundColor: '#121212' },

  sliderWrapper: {
    width: '100%', // FIXED
    marginTop: 10,
  },

  row: { justifyContent: 'center' },

  card: {
    backgroundColor: 'white',
    width: 250,
    minHeight: 280,
    borderRadius: 15,
    padding: 12,
    margin: 10,
  },

  darkCard: { backgroundColor: '#1E1E1E' },

  productImg: {
    width: '100%',
    height: 150,
    borderRadius: 10,
  },

  infoContainer: { marginTop: 10, flex: 1 },

  nameRow: { flexDirection: 'row', justifyContent: 'space-between' },

  productName: { fontSize: 16, fontWeight: 'bold', flex: 1 },

  productDesc: { fontSize: 13, marginVertical: 5 },

  productPrice: { color: '#007AFF', fontWeight: 'bold', marginTop: 4 },

  actionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },

  addBtn: {
    backgroundColor: '#007AFF',
    borderRadius: 10,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  }
});