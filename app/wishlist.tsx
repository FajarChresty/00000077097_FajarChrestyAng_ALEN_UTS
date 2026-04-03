import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { GestureHandlerRootView, Swipeable } from 'react-native-gesture-handler';
import { useFajarState } from '../constants/FajarChresty_77097_Context';

export default function WishlistScreen() {
  const { wishlist, setWishlist, addToCart, isDarkMode } = useFajarState();
  const router = useRouter();

  const removeFromWishlist = (id) => {
    setWishlist(wishlist.filter(item => item.id !== id));
  };

  const movetoCart = (item) => {
    addToCart(item);
    removeFromWishlist(item.id);
  };

  const renderRightActions = (item) => (
    <View style={styles.actionContainer}>
      <TouchableOpacity 
        style={[styles.actionBtn, { backgroundColor: '#4CAF50' }]} 
        onPress={() => movetoCart(item)}
      >
        <Ionicons name="cart" size={28} color="white" />
        <Text style={styles.actionText}>Add</Text>
      </TouchableOpacity>
      <TouchableOpacity 
        style={[styles.actionBtn, { backgroundColor: '#F44336' }]} 
        onPress={() => removeFromWishlist(item.id)}
      >
        <Ionicons name="trash" size={28} color="white" />
        <Text style={styles.actionText}>Delete</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={[styles.container, isDarkMode && styles.darkContainer]}>
        <View style={[styles.header, isDarkMode && styles.darkHeader]}>
          <TouchableOpacity style={styles.backBtn} onPress={() => router.replace('/(tabs)')}>
            <Ionicons name="arrow-back" size={24} color={isDarkMode ? "white" : "black"} />
            <Text style={[styles.backText, isDarkMode && styles.darkText]}>Back to Home</Text>
          </TouchableOpacity>
        </View>

        <FlatList
          data={wishlist}
          keyExtractor={(item) => item.id.toString()}
          ListEmptyComponent={
            <View style={styles.emptyBox}>
              <Ionicons name="heart-outline" size={80} color="#ccc" />
              <Text style={[styles.emptyText, isDarkMode && styles.darkText]}>Wishlist is empty</Text>
            </View>
          }
          renderItem={({ item }) => (
            <Swipeable renderRightActions={() => renderRightActions(item)}>
              <View style={[styles.itemCard, isDarkMode && styles.darkCard]}>
                <Image source={item.image} style={styles.img} />
                <View style={styles.info}>
                  <Text style={[styles.name, isDarkMode && styles.darkText]}>{item.name}</Text>
                  <Text style={styles.price}>Rp{item.price.toLocaleString()}</Text>
                </View>
                <View style={styles.swipeHint}>
                   <Text style={styles.hintText}>Swipe</Text>
                   <Ionicons name="chevron-back" size={16} color="#ccc" />
                </View>
              </View>
            </Swipeable>
          )}
        />
      </View>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#f5f5f5' 
  },
  darkContainer: { 
    backgroundColor: '#121212' 
  },
  header: { 
    backgroundColor: '#fff', 
    paddingTop: 5, 
    zIndex: 10,
    borderBottomWidth: 1, 
    borderBottomColor: '#eee'
  },
  darkHeader: { 
    backgroundColor: '#1e1e1e', 
    borderBottomColor: '#333'
  },
  backBtn: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    paddingHorizontal: 15,
    paddingVertical: 10 
  },
  backText: { 
    fontSize: 16, 
    fontWeight: '500', 
    marginLeft: 10 
  },
  emptyBox: { 
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center', 
    marginTop: 150 
  },
  emptyText: { 
    textAlign: 'center', 
    marginTop: 10, 
    fontSize: 16, 
    color: '#999' 
  },
  itemCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#eee'
  },
  darkCard: { 
    backgroundColor: '#1e1e1e', 
    borderBottomColor: '#333' 
  },
  img: { 
    width: 70, 
    height: 70, 
    borderRadius: 10 
  },
  info: { 
    flex: 1, 
    marginLeft: 15 
  },
  name: { 
    fontSize: 16, 
    fontWeight: 'bold' 
  },
  price: { 
    color: '#007AFF', 
    marginTop: 4, 
    fontWeight: 'bold' 
  },
  darkText: { 
    color: 'white' 
  },
  actionContainer: { 
    flexDirection: 'row', 
    width: 160 
  },
  actionBtn: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center', 
    height: '100%' 
  },
  actionText: { 
    color: 'white', 
    fontSize: 12, 
    fontWeight: 'bold', 
    marginTop: 4 
  },
  swipeHint: { 
    flexDirection: 'row', 
    alignItems: 'center' 
  },
  hintText: { 
    fontSize: 12, 
    color: '#ccc', 
    marginRight: 5 
  }
});