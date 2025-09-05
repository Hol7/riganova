import { getDeliveries } from '@/store/deliveryStore';
import { COLORS } from '@/theme/colors';
import { playNotification } from '@/utils/notifications';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function LivreurMissions() {
  const [missions, setMissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const fetchMissions = async () => {
    try {
      const data = await getDeliveries(); // On filtre côté backend pour missions assignées
      const myMissions = data.filter((m: any) => m.livreur_id); 
      setMissions(myMissions);
      playNotification(); // Notif sonore à chaque rafraîchissement
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMissions();
  }, []);

  const renderItem = ({ item }: any) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => router.push(`/livreur/mission/${item.id}`)}
    >
      <Text style={styles.type}>{item.type.toUpperCase()}</Text>
      <Text>Pickup: {item.pickup}</Text>
      <Text>Dropoff: {item.dropoff}</Text>
      <Text>Status: {item.status}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {loading ? <Text>Chargement...</Text> :
      <FlatList
        data={missions}
        keyExtractor={(item : any) => item.id.toString()}
        renderItem={renderItem}
      />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: COLORS.white },
  card: {
    padding: 15,
    borderRadius: 10,
    backgroundColor: COLORS.gray,
    marginBottom: 15,
  },
  type: { fontWeight: 'bold', color: COLORS.secondary, marginBottom: 5 },
});
