import { Ionicons } from '@expo/vector-icons';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { useRouter } from 'expo-router';
import { Drawer } from 'expo-router/drawer';
import { StatusBar } from 'expo-status-bar';
import { LogBox, Switch, Text, TouchableOpacity, View } from 'react-native';
import 'react-native-gesture-handler';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { FajarChresty_77097_Provider, useFajarState } from '../constants/FajarChresty_77097_Context';

if (typeof setImmediate === 'undefined') {
  global.setImmediate = ((fn) => setTimeout(fn, 0));
}

LogBox.ignoreLogs(['ViewPropTypes will be removed', 'Indexed property setter']);

const CustomDrawerContent = (props) => {
  const { isDarkMode, setIsDarkMode } = useFajarState();

  return (
    <DrawerContentScrollView 
      {...props} 
      style={{ backgroundColor: isDarkMode ? '#1e1e1e' : '#fff' }}
    >
      <View style={{ 
        padding: 20, 
        borderBottomWidth: 1, 
        borderBottomColor: isDarkMode ? '#333' : '#ccc', 
        marginBottom: 10 
      }}>
        <Text style={{ 
          fontSize: 18, 
          fontWeight: 'bold', 
          color: isDarkMode ? '#fff' : '#000' 
        }}>
          Redline Parts
        </Text>
        <Text style={{ fontSize: 12, color: '#888' }}>
          Fajar Chresty - 77097
        </Text>
      </View>

      <DrawerItemList 
        {...props} 
        labelStyle={{ 
          color: isDarkMode ? '#fff' : '#000',
          fontWeight: 'bold'
        }} 
      />

      <View style={{ 
        flexDirection: 'row', 
        alignItems: 'center', 
        justifyContent: 'space-between', 
        padding: 20, 
        borderTopWidth: 1, 
        borderTopColor: isDarkMode ? '#333' : '#ccc', 
        marginTop: 10 
      }}>
        <Text style={{ color: isDarkMode ? '#fff' : '#000' }}>
          Dark Mode
        </Text>
        <Switch value={isDarkMode} onValueChange={setIsDarkMode} />
      </View>
    </DrawerContentScrollView>
  );
};

const CartBadge = () => {
  const { cart, isDarkMode } = useFajarState();
  const router = useRouter();
  const totalItem = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <TouchableOpacity 
      style={{ marginRight: 15 }} 
      onPress={() => router.push('/cart')}
    >
      <Ionicons 
        name="cart-outline" 
        size={26} 
        color={isDarkMode ? "white" : "black"} 
      />

      {totalItem > 0 && (
        <View style={{
          position: 'absolute',
          right: -6,
          top: -3,
          backgroundColor: 'red',
          borderRadius: 10,
          width: 18,
          height: 18,
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <Text style={{ 
            color: 'white', 
            fontSize: 10, 
            fontWeight: 'bold' 
          }}>
            {totalItem}
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

function DrawerLayout() {
  const { isDarkMode } = useFajarState();

  return (
    <Drawer
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerStyle: {
          backgroundColor: isDarkMode ? '#121212' : '#ffffff',
        },
        headerTintColor: isDarkMode ? '#ffffff' : '#000000',

        drawerStyle: {
          backgroundColor: isDarkMode ? '#1e1e1e' : '#ffffff',
        },

        drawerActiveTintColor: '#007AFF',
        drawerInactiveTintColor: isDarkMode ? '#FFFFFF' : '#333333',

        sceneContainerStyle: {
          backgroundColor: isDarkMode ? '#121212' : '#ffffff',
        },

        headerRight: () => <CartBadge />,
      }}
    >
      <Drawer.Screen 
        name="(tabs)" 
        options={{ drawerLabel: 'Home', title: 'Redline Parts' }} 
      />

      <Drawer.Screen 
        name="wishlist" 
        options={{ drawerLabel: 'Wishlist', title: 'My Wishlist' }} 
      />

      <Drawer.Screen 
        name="history" 
        options={{ drawerLabel: 'History', title: 'Transaction History' }} 
      />

      <Drawer.Screen 
        name="profile" 
        options={{ drawerLabel: 'Profile', title: 'My Profile' }} 
      />

      <Drawer.Screen 
        name="modal" 
        options={{ drawerItemStyle: { display: 'none' } }} 
      />

      <Drawer.Screen 
        name="cart" 
        options={{ 
          drawerItemStyle: { display: 'none' }, 
          title: 'Shopping Cart' 
        }} 
      />

      <Drawer.Screen 
        name="history_detail" 
        options={{ 
          drawerItemStyle: { display: 'none' }, 
          title: 'Detail' 
        }} 
      />
    </Drawer>
  );
}

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <FajarChresty_77097_Provider>
        <DrawerLayout />
        <StatusBar style="auto" />
      </FajarChresty_77097_Provider>
    </GestureHandlerRootView>
  );
}
