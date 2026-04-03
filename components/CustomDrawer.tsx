import { Ionicons } from '@expo/vector-icons';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import React from 'react';
import { StyleSheet, Switch, Text, View } from 'react-native';
import { useFajarState } from '../constants/FajarChresty_77097_Context';

export default function CustomDrawer(props) {
  const { isDarkMode, setIsDarkMode } = useFajarState();

  return (
    <View style={{ flex: 1, backgroundColor: isDarkMode ? '#121212' : '#fff' }}>
      <DrawerContentScrollView {...props}>
        <View style={styles.header}>
          <Text style={[styles.title, { color: isDarkMode ? '#FFFFFF' : '#000000' }]}>
          Redline Parts
          </Text>
          <Text style={[styles.subtitle, { color: isDarkMode ? '#BBBBBB' : '#666666' }]}>
            Fajar Chresty - 77097
          </Text>
        </View>

        <View style={styles.drawerListWrapper}>
          <DrawerItemList 
            {...props}
            labelStyle={{
              fontWeight: 'bold',
              fontSize: 16,
              color: isDarkMode ? '#FFFFFF' : '#333333'
            }}
          />
        </View>
      </DrawerContentScrollView>

      <View style={[styles.footer, { borderTopColor: isDarkMode ? '#333333' : '#eeeeee' }]}>
        <View style={styles.darkRow}>
          <View style={styles.labelIcon}>
            <Ionicons 
              name={isDarkMode ? "moon" : "sunny"} 
              size={20} 
              color={isDarkMode ? "#FFD700" : "#555"} 
            />
            <Text style={[styles.footerText, { color: isDarkMode ? '#FFFFFF' : '#000000' }]}>
              Dark Mode
            </Text>
          </View>
          <Switch 
            value={isDarkMode} 
            onValueChange={() => setIsDarkMode(!isDarkMode)} 
            trackColor={{ false: "#767577", true: "#007AFF" }}
            thumbColor="#FFFFFF"
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: { padding: 20, paddingTop: 30, marginBottom: 10 },
  title: { fontSize: 24, fontWeight: 'bold' },
  subtitle: { fontSize: 14, marginTop: 4 },
  drawerListWrapper: { flex: 1 },
  footer: { padding: 20, borderTopWidth: 1, paddingBottom: 30 },
  darkRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  labelIcon: { flexDirection: 'row', alignItems: 'center' },
  footerText: { marginLeft: 10, fontWeight: 'bold' }
});
