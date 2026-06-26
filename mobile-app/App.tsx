import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View, Text, Button, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import { GraphQLClient, gql } from 'graphql-request';

const graphqlClient = new GraphQLClient('http://10.0.2.2:8000/graphql'); // 10.0.2.2 points to localhost from Android emulator

const Stack = createNativeStackNavigator();

const GET_RESTAURANTS = gql`
  query GetRestaurants {
    restaurants(first: 10) {
      data {
        id
        name
        address
      }
    }
  }
`;

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
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    graphqlClient.request(GET_RESTAURANTS)
      .then((res: any) => {
        setRestaurants(res.restaurants.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <View style={styles.container}><ActivityIndicator size="large" /></View>;
  }

  return (
    <View style={styles.listContainer}>
      <FlatList
        data={restaurants}
        keyExtractor={(item: any) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.cardTitle}>{item.name}</Text>
            <Text>{item.address}</Text>
          </View>
        )}
      />
    </View>
  );
}

function ManagerScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Manager Dashboard</Text>
      <Text>Active Orders will appear here.</Text>
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
  listContainer: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold'
  },
  card: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  }
});
