import { getDeliveries } from '@/store/deliveryStore';
import { COLORS } from '@/theme/colors';
import { useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function DeliveryDetails() {
  const { id } = useLocalSearchParams();
  const [delivery, setDelivery] = useState<any>(null);

  useEffect(() => {
    const fetchDelivery = async () => {
      const data = await getDeliveries();
      const d = data.find((item: any) => item.id.toString() === id);
      setDelivery(d);
    };
    fetchDelivery();
  }, [id]);

  if (!delivery) return <Text>Chargement...</Text>;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Détails de la course</Text>
      <Text>Type: {delivery.type}</Text>
      <Text>Pickup: {delivery.pickup}</Text>
      <Text>Dropoff: {delivery.dropoff}</Text>
      <Text>Description: {delivery.description || 'N/A'}</Text>
      <Text>Status: {delivery.status}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: COLORS.white },
  title: { fontSize: 22, fontWeight: 'bold', color: COLORS.secondary, marginBottom: 15 },
});
