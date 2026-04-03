import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useFajarState } from '../constants/FajarChresty_77097_Context';

export default function HistoryDetailScreen() {
  const { id } = useLocalSearchParams();
  const { history, isDarkMode } = useFajarState();
  const router = useRouter();

  const transaction = history.find(item => item.id === id);

  if (!transaction) return null;

  return (
    <View style={[styles.container, isDarkMode && styles.darkContainer]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color={isDarkMode ? "white" : "black"} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, isDarkMode && styles.darkText]}>Detail Transaksi</Text>
        <View style={{ width: 24 }} />
      </View>

      <View style={[styles.summaryCard, isDarkMode && styles.darkCard]}>
        <Text style={styles.label}>ID Transaksi: {transaction.id}</Text>
        <Text style={styles.label}>Tanggal: {transaction.date}</Text>
        <Text style={[styles.totalBold, isDarkMode && styles.darkText]}>Total: Rp{transaction.total.toLocaleString()}</Text>
      </View>

      <FlatList
        data={transaction.items}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={{ padding: 15 }}
        renderItem={({ item }) => (
          <View style={[styles.itemCard, isDarkMode && styles.darkCard]}>
            <Image source={{ uri: item.image }} style={styles.img} />
            <View style={styles.info}>
              <Text style={[styles.name, isDarkMode && styles.darkText]}>{item.name}</Text>
              <Text style={styles.qty}>Jumlah: {item.quantity}</Text>
              <Text style={styles.price}>Rp{item.price.toLocaleString()}</Text>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8F9FA' },
  darkContainer: { backgroundColor: '#121212' },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 15, paddingTop: 50, paddingBottom: 15 },
  headerTitle: { fontSize: 18, fontWeight: 'bold' },
  summaryCard: { padding: 20, backgroundColor: '#fff', margin: 15, borderRadius: 15, elevation: 3 },
  darkCard: { backgroundColor: '#1E1E1E' },
  label: { fontSize: 14, color: '#888', marginBottom: 5 },
  totalBold: { fontSize: 20, fontWeight: 'bold', color: '#1A1A1A', marginTop: 5 },
  itemCard: { flexDirection: 'row', padding: 12, backgroundColor: '#fff', borderRadius: 12, marginBottom: 10 },
  img: { width: 60, height: 60, borderRadius: 8 },
  info: { marginLeft: 12, flex: 1 },
  name: { fontSize: 15, fontWeight: 'bold' },
  qty: { fontSize: 13, color: '#666', marginVertical: 2 },
  price: { fontSize: 14, color: '#007AFF', fontWeight: 'bold' },
  darkText: { color: 'white' }
});