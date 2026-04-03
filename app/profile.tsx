import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useFajarState } from '../constants/FajarChresty_77097_Context';

export default function ProfileScreen() {
  const { isDarkMode } = useFajarState();
  const router = useRouter();

  return (
    <View style={[styles.container, isDarkMode && styles.darkContainer]}>
      <View style={[styles.profileCard, isDarkMode && styles.darkCard]}>
        <View style={styles.avatarWrapper}>
        <Image 
          source={require('../assets/images/hai.webp')} 
          style={styles.avatar} 
        />
          <View style={styles.statusBadge} />
        </View>

        <Text style={[styles.name, isDarkMode && styles.darkText]}>Fajar Chresty Ang</Text>
        <Text style={styles.nim}>00000077097</Text>
        
        <View style={styles.divider} />

        <View style={styles.infoBox}>
          <Text style={[styles.university, isDarkMode && styles.lightText]}>Universitas Multimedia Nusantara</Text>
          <Text style={[styles.major, isDarkMode && styles.lightText]}>Informatika 2023</Text>
        </View>

        <TouchableOpacity 
          style={styles.backBtn} 
          onPress={() => router.replace('/')} 
          activeOpacity={0.7}
        >
          <Ionicons name="home" size={20} color="white" />
          <Text style={styles.backBtnText}>Back to Home</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center', 
    backgroundColor: '#F8F9FA' 
  },
  darkContainer: { backgroundColor: '#121212' },
  profileCard: {
    width: '85%',
    backgroundColor: '#FFFFFF',
    borderRadius: 30,
    padding: 30,
    alignItems: 'center',
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 15,
  },
  darkCard: { backgroundColor: '#1E1E1E' },
  avatarWrapper: { marginBottom: 20, position: 'relative' },
  avatar: { 
    width: 130, 
    height: 130, 
    borderRadius: 65, 
    borderWidth: 4, 
    borderColor: '#007AFF' 
  },
  statusBadge: {
    position: 'absolute',
    bottom: 5,
    right: 10,
    width: 25,
    height: 25,
    borderRadius: 12.5,
    backgroundColor: '#2ECC71',
    borderWidth: 4,
    borderColor: '#FFF',
  },
  name: { fontSize: 24, fontWeight: '800', color: '#1A1A1A', marginBottom: 4 },
  nim: { fontSize: 16, color: '#007AFF', fontWeight: '600', letterSpacing: 1 },
  divider: { width: '100%', height: 1, backgroundColor: '#EEE', marginVertical: 20 },
  infoBox: { alignItems: 'center', marginBottom: 25 },
  university: { color: '#2D3436', fontSize: 15, fontWeight: '600', textAlign: 'center' },
  major: { color: '#636E72', fontSize: 14, marginTop: 4 },
  backBtn: {
    flexDirection: 'row',
    backgroundColor: '#007AFF',
    paddingVertical: 14,
    paddingHorizontal: 25,
    borderRadius: 15,
    alignItems: 'center',
    width: '100%',
    justifyContent: 'center',
    elevation: 5,
  },
  backBtnText: { color: 'white', fontWeight: '700', fontSize: 15, marginLeft: 10 },
  darkText: { color: 'white' },
  lightText: { color: '#BBB' }
});