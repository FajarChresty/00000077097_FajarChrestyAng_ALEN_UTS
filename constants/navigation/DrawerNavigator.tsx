import { Ionicons } from '@expo/vector-icons';
import { createDrawerNavigator } from '@react-navigation/drawer';
import React from 'react';
import HomeScreen from '../app/index';
import CustomDrawer from '../components/CustomDrawer';
import { useFajarState } from '../constants/FajarChresty_77097_Context';

const Drawer = createDrawerNavigator();

export default function DrawerNavigator() {
  const { isDarkMode } = useFajarState();

  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawer {...props} />}
      screenOptions={{
        headerStyle: {
          backgroundColor: isDarkMode ? '#121212' : '#ffffff',
        },
        headerTintColor: isDarkMode ? '#ffffff' : '#000000',

        drawerStyle: {
          backgroundColor: isDarkMode ? '#121212' : '#ffffff',
        },

        drawerActiveTintColor: '#007AFF',
        drawerInactiveTintColor: isDarkMode ? '#FFFFFF' : '#333333',

        headerRight: () => (
          <Ionicons
            name="cart"
            size={24}
            color={isDarkMode ? '#FFFFFF' : '#000000'}
            style={{ marginRight: 15 }}
          />
        ),
      }}
    >
      <Drawer.Screen 
        name="Home" 
        component={HomeScreen}
        options={{
          drawerIcon: ({ color, size }) => (
            <Ionicons name="home" size={size} color={color} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
}
