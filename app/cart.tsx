import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { Alert, FlatList, Image, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useFajarState } from '../constants/FajarChresty_77097_Context';

export default function CartScreen() {
  const { cart, setCart, setHistory, isDarkMode, generateFajar_77097_ID } = useFajarState();
  const router = useRouter();

  const updateQty = (id, delta) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = item.quantity + delta;
        return newQty > 0 ? { ...item, quantity: newQty } : null;
      }
      return item;
    }).filter(Boolean));
  };

  const totalHarga = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const handleCheckout = () => {
    if (cart.length === 0) {
      if (Platform.OS === 'web') alert("Keranjang Kosong!");
      else Alert.alert("Keranjang Kosong", "Pilih barang dulu.");
      return;
    }

    const processCheckout = () => {
      const newTransaction = {
        id: generateFajar_77097_ID(),
        date: new Date().toLocaleString('id-ID'),
        items: [...cart],
        total: totalHarga
      };

      setHistory(prevHistory => [newTransaction, ...prevHistory]);
      setCart([]);
      router.replace('/');
    };

    if (Platform.OS === 'web') {
      alert("Checkout Berhasil!");
      processCheckout();
    } else {
      Alert.alert(
        "Checkout Berhasil",
        "Pesanan Anda sudah masuk ke Riwayat.",
        [{ text: "OK", onPress: processCheckout }]
      );
    }
  };

  return (
    <View style={[styles.container, isDarkMode && styles.darkContainer]}>
      <View style={[styles.header, isDarkMode && styles.darkCard]}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color={isDarkMode ? "white" : "black"} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, isDarkMode && styles.darkText]}>Keranjang Belanja</Text>
        <View style={{ width: 24 }} />
      </View>

      <FlatList
        data={cart}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ padding: 15 }}
        renderItem={({ item }) => (
          <View style={[styles.card, isDarkMode && styles.darkCard]}>
            <Image source={item.image} style={styles.img} />
            <View style={styles.info}>
              <Text style={[styles.name, isDarkMode && styles.darkText]}>{item.name}</Text>
              <Text style={styles.description} numberOfLines={2}>{item.description}</Text>
              <Text style={styles.price}>Rp{item.price.toLocaleString()}</Text>
              
              <View style={styles.qtyRow}>
                <TouchableOpacity onPress={() => updateQty(item.id, -1)}>
                  <Ionicons name="remove-circle" size={28} color="#E74C3C" />
                </TouchableOpacity>
                <Text style={[styles.qtyText, isDarkMode && styles.darkText]}>{item.quantity}</Text>
                <TouchableOpacity onPress={() => updateQty(item.id, 1)}>
                  <Ionicons name="add-circle" size={28} color="#27AE60" />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}
        ListEmptyComponent={
          <View style={styles.emptyBox}>
            <Ionicons name="cart-outline" size={100} color="#ccc" />
            <Text style={styles.emptyText}>Keranjang Kosong</Text>
          </View>
        }
      />

      <View style={[styles.footer, isDarkMode && styles.darkFooter]}>
        <View style={styles.totalRow}>
          <Text style={[styles.totalLabel, isDarkMode && styles.darkText]}>Total Pembayaran</Text>
          <Text style={styles.totalAmount}>Rp{totalHarga.toLocaleString()}</Text>
        </View>
        <TouchableOpacity style={styles.checkoutBtn} onPress={handleCheckout}>
          <Text style={styles.btnText}>Checkout Sekarang</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8f8f8' },
  darkContainer: { backgroundColor: '#121212' },
  header: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'space-between', 
    paddingHorizontal: 15, 
    paddingTop: 15, 
    paddingBottom: 15, 
    backgroundColor: '#fff',
    elevation: 2 
  },
  headerTitle: { fontSize: 18, fontWeight: 'bold' },
  card: { 
    flexDirection: 'row', 
    padding: 15, 
    backgroundColor: '#fff', 
    borderRadius: 15, 
    marginBottom: 12, 
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 3
  },
  darkCard: { backgroundColor: '#1E1E1E', borderColor: '#333' },
  img: { width: 85, height: 85, borderRadius: 12 },
  info: { flex: 1, marginLeft: 15 },
  name: { fontSize: 16, fontWeight: 'bold' },
  description: { fontSize: 12, color: '#777', marginVertical: 4 },
  price: { color: '#007AFF', fontWeight: 'bold', fontSize: 15 },
  qtyRow: { flexDirection: 'row', alignItems: 'center', marginTop: 10 },
  qtyText: { marginHorizontal: 15, fontWeight: 'bold', fontSize: 16 },
  footer: { 
    padding: 20, 
    backgroundColor: '#fff', 
    borderTopLeftRadius: 25, 
    borderTopRightRadius: 25,
    elevation: 10 
  },
  darkFooter: { backgroundColor: '#1E1E1E', borderTopColor: '#333' },
  totalRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 15 },
  totalLabel: { fontSize: 14, color: '#666' },
  totalAmount: { fontSize: 20, fontWeight: 'bold', color: '#007AFF' },
  checkoutBtn: { backgroundColor: '#007AFF', padding: 18, borderRadius: 15, alignItems: 'center' },
  btnText: { color: 'white', fontWeight: 'bold', fontSize: 16 },
  darkText: { color: 'white' },
  emptyBox: { alignItems: 'center', marginTop: 100 },
  emptyText: { color: '#999', fontSize: 16, marginTop: 10 }
});