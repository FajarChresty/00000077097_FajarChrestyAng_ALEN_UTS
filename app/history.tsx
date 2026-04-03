import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { FlatList, Image, Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useFajarState } from '../constants/FajarChresty_77097_Context';

export default function HistoryScreen() {
  const { history, isDarkMode } = useFajarState();
  const router = useRouter();
  
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const openDetail = (order) => {
    setSelectedOrder(order);
    setModalVisible(true);
  };

  return (
    <View style={[styles.container, isDarkMode && styles.darkContainer]}>
      
      <View style={[styles.header, isDarkMode && styles.darkHeader]}>
        <TouchableOpacity onPress={() => router.replace('/')}>
          <Ionicons name="arrow-back" size={24} color={isDarkMode ? "white" : "black"} />
        </TouchableOpacity>

        <Text style={[styles.headerTitle, isDarkMode && styles.darkText]}>
          Riwayat Transaksi
        </Text>

        <View style={{ width: 24 }} />
      </View>

      <FlatList
        data={history}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 15 }}
        renderItem={({ item }) => (
          <TouchableOpacity 
            style={[styles.card, isDarkMode && styles.darkCard]}
            onPress={() => openDetail(item)}
          >
            <View style={styles.cardInfo}>
              <View style={styles.iconCircle}>
                <Ionicons name="receipt-outline" size={20} color="#007AFF" />
              </View>
              <View style={{ marginLeft: 12 }}>
                <Text style={[styles.orderId, isDarkMode && styles.darkText]}>
                  ID: {item.id}
                </Text>
                <Text style={styles.dateText}>{item.date}</Text>
                <Text style={styles.totalPrice}>
                  Rp{item.total.toLocaleString()}
                </Text>
              </View>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#ccc" />
          </TouchableOpacity>
        )}
        ListEmptyComponent={
          <View style={styles.emptyBox}>
            <Ionicons name="document-text-outline" size={80} color="#ddd" />
            <Text style={styles.emptyText}>Belum ada riwayat transaksi.</Text>
          </View>
        }
      />

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, isDarkMode && styles.darkCard]}>
            <View style={styles.modalHeader}>
              <Text style={[styles.modalTitle, isDarkMode && styles.darkText]}>
                Detail Pesanan
              </Text>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Ionicons name="close-circle" size={30} color={isDarkMode ? "#555" : "#ccc"} />
              </TouchableOpacity>
            </View>

            {selectedOrder && (
              <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.orderMeta}>
                  <Text style={[styles.metaLabel, isDarkMode && styles.darkText]}>
                    Order ID: <Text style={{fontWeight:'bold'}}>{selectedOrder.id}</Text>
                  </Text>
                  <Text style={[styles.metaLabel, isDarkMode && styles.darkText]}>
                    Waktu: {selectedOrder.date}
                  </Text>
                </View>
                
                <View style={styles.divider} />

                {selectedOrder.items.map((item, index) => (
                  <View key={index} style={styles.itemRow}>
                    <Image source={item.image} style={styles.itemImage} />
                    <View style={styles.itemTextContainer}>
                      <Text style={[styles.itemName, isDarkMode && styles.darkText]} numberOfLines={1}>
                        {item.name}
                      </Text>
                      <Text style={styles.itemSubDetail}>
                        {item.quantity} x Rp{item.price.toLocaleString()}
                      </Text>
                    </View>
                    <Text style={[styles.itemTotal, isDarkMode && styles.darkText]}>
                      Rp{(item.price * item.quantity).toLocaleString()}
                    </Text>
                  </View>
                ))}

                <View style={styles.divider} />
                
                <View style={styles.footerSummary}>
                  <Text style={[styles.footerLabel, isDarkMode && styles.darkText]}>
                    Total Pembayaran
                  </Text>
                  <Text style={styles.footerValue}>
                    Rp{selectedOrder.total.toLocaleString()}
                  </Text>
                </View>
                
                <TouchableOpacity 
                  style={styles.closeBtn} 
                  onPress={() => setModalVisible(false)}
                >
                  <Text style={styles.closeBtnText}>Tutup Detail</Text>
                </TouchableOpacity>
              </ScrollView>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F9F9F9' },
  darkContainer: { backgroundColor: '#121212' },

  header: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'space-between', 
    paddingHorizontal: 15, 
    paddingTop: 10, 
    paddingBottom: 20, 
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee'
  },

  darkHeader: {
    backgroundColor: '#1E1E1E',
    borderBottomColor: '#333'
  },

  headerTitle: { fontSize: 20, fontWeight: 'bold' },

  card: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    padding: 16, 
    backgroundColor: '#fff', 
    borderRadius: 15, 
    marginBottom: 12, 
    borderWidth: 1,
    borderColor: '#eee'
  },

  darkCard: { backgroundColor: '#1E1E1E', borderColor: '#333' },
  cardInfo: { flexDirection: 'row', alignItems: 'center' },
  iconCircle: { backgroundColor: '#E1F0FF', padding: 10, borderRadius: 12 },
  orderId: { fontWeight: 'bold', fontSize: 15 },
  dateText: { fontSize: 12, color: '#888', marginTop: 2 },
  totalPrice: { color: '#007AFF', fontWeight: 'bold', marginTop: 4, fontSize: 16 },
  darkText: { color: 'white' },
  emptyBox: { alignItems: 'center', marginTop: 100 },
  emptyText: { color: '#bbb', marginTop: 10, fontSize: 16 },

  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.6)', justifyContent: 'flex-end' },
  modalContent: { 
    backgroundColor: 'white', 
    borderTopLeftRadius: 30, 
    borderTopRightRadius: 30, 
    padding: 25, 
    maxHeight: '85%' 
  },
  modalHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  modalTitle: { fontSize: 22, fontWeight: 'bold' },
  orderMeta: { marginBottom: 10 },
  metaLabel: { fontSize: 14, color: '#666', marginBottom: 4 },
  divider: { height: 1, backgroundColor: '#eee', marginVertical: 15 },
  itemRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 15 },
  itemImage: { width: 70, height: 70, borderRadius: 12 },
  itemTextContainer: { flex: 1, marginLeft: 12 },
  itemName: { fontSize: 15, fontWeight: '600' },
  itemSubDetail: { fontSize: 13, color: '#888', marginTop: 2 },
  itemTotal: { fontSize: 15, fontWeight: 'bold', marginLeft: 10 },
  footerSummary: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 10 },
  footerLabel: { fontSize: 16, fontWeight: '600' },
  footerValue: { fontSize: 20, fontWeight: 'bold', color: '#007AFF' },
  closeBtn: { 
    backgroundColor: '#007AFF', 
    padding: 16, 
    borderRadius: 15, 
    alignItems: 'center', 
    marginTop: 30,
    marginBottom: 10
  },
  closeBtnText: { color: 'white', fontWeight: 'bold', fontSize: 16 }
});