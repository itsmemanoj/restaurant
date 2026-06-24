import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View, Text, Button, StyleSheet } from 'react-native';

const Stack = createNativeStackNavigator();

function HomeScreen({ navigation }: any) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>FoodApp Mobile</Text>
      <Button 
        title="Browse Restaurants" 
        onPress={() => navigation.navigate('Restaurants')} 
      />
      <Button 
        title="Manager Dashboard" 
        onPress={() => navigation.navigate('Manager')} 
      />
    </View>
  );
}

function RestaurantsScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Restaurants List</Text>
      <Text>Fetching via GraphQL...</Text>
    </View>
  );
}

function ManagerScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Manager Dashboard</Text>
      <Text>Active Orders, Approvals...</Text>
    </View>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Restaurants" component={RestaurantsScreen} />
        <Stack.Screen name="Manager" component={ManagerScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center',
    gap: 20
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold'
  }
});
