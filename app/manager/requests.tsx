import { getDeliveries } from '@/store/deliveryStore';
import { COLORS } from '@/theme/colors';
import { playNotification } from '@/utils/notifications';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function ManagerRequests() {
  const [requests, setRequests] = useState([]);
  const router = useRouter();

  const fetchRequests = async () => {
    try {
      const data = await getDeliveries();
      const pending = data.filter((d: any) => d.status === 'pending');
      setRequests(pending);
      playNotification();
    } catch (error) { console.log(error); }
  };

  useEffect(() => { fetchRequests(); }, []);

  const renderItem = ({ item }: any) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => router.push(`/manager/assign/${item.id}`)}
    >
      <Text style={styles.type}>{item.type.toUpperCase()}</Text>
      <Text>Pickup: {item.pickup}</Text>
      <Text>Dropoff: {item.dropoff}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {requests.length === 0 ? <Text>Aucune demande en attente</Text> :
        <FlatList
          data={requests}
          keyExtractor={(item: any) => item?.id?.toString()}
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
