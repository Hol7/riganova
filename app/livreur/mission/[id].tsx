import { getDeliveries, updateDeliveryStatus } from '@/store/deliveryStore';
import { COLORS } from '@/theme/colors';
import { playNotification } from '@/utils/notifications';
import { useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function MissionDetails() {
  const { id } = useLocalSearchParams();
  const [mission, setMission] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const fetchMission = async () => {
    const data = await getDeliveries();
    const m = data.find((item: any) => item.id.toString() === id);
    setMission(m);
  };

  useEffect(() => { fetchMission(); }, [id]);

  const handleStatusUpdate = async (status: string) => {
    setLoading(true);
    try {
      await updateDeliveryStatus(id as string, status);
      playNotification();
      await fetchMission();
    } catch (error) {
      console.log(error);
      alert('Erreur lors de la mise à jour');
    } finally { setLoading(false); }
  };

  if (!mission) return <Text>Chargement...</Text>;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mission: {mission.type}</Text>
      <Text>Pickup: {mission.pickup}</Text>
      <Text>Dropoff: {mission.dropoff}</Text>
      <Text>Status: {mission.status}</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => handleStatusUpdate('arrived')}
        disabled={loading}
      >
        <Text style={styles.buttonText}>Je suis arrivé</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => handleStatusUpdate('picked_up')}
        disabled={loading}
      >
        <Text style={styles.buttonText}>Colis récupéré</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => handleStatusUpdate('delivered')}
        disabled={loading}
      >
        <Text style={styles.buttonText}>Colis livré</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: COLORS.white },
  title: { fontSize: 22, fontWeight: 'bold', color: COLORS.secondary, marginBottom: 15 },
  button: {
    backgroundColor: COLORS.primary,
    padding: 15,
    borderRadius: 10,
    marginTop: 15,
    alignItems: 'center',
  },
  buttonText: { color: COLORS.white, fontWeight: 'bold' },
});
