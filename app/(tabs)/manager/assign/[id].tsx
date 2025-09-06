import { getDeliveries, updateDeliveryStatus } from '@/store/deliveryStore';
import { COLORS } from '@/theme/colors';
import { playNotification } from '@/utils/notifications';
import { Picker } from '@react-native-picker/picker';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function AssignDelivery() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [delivery, setDelivery] = useState<any>(null);
  const [livreurId, setLivreurId] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchDelivery = async () => {
      const data = await getDeliveries();
      const d = data.find((item: any) => item.id.toString() === id);
      setDelivery(d);
    };
    fetchDelivery();
  }, [id]);

  const handleAssign = async () => {
    if (!livreurId) return alert('Choisir un livreur');
    setLoading(true);
    try {
      await updateDeliveryStatus(id as string, 'assigned'); // backend doit accepter livreurId
      playNotification();
      alert('Livreur assigné avec succès !');
      router.back();
    } catch (error) {
      console.log(error);
      alert('Erreur lors de l’assignation');
    } finally { setLoading(false); }
  };

  if (!delivery) return <Text>Chargement...</Text>;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Assigner un livreur</Text>
      <Text>Pickup: {delivery.pickup}</Text>
      <Text>Dropoff: {delivery.dropoff}</Text>

      <Text style={styles.label}>Livreur :</Text>
      <Picker selectedValue={livreurId} onValueChange={(val) => setLivreurId(val)} style={styles.picker}>
        <Picker.Item label="Livreur 1" value="1" />
        <Picker.Item label="Livreur 2" value="2" />
        <Picker.Item label="Livreur 3" value="3" />
      </Picker>

      <TouchableOpacity style={styles.button} onPress={handleAssign} disabled={loading}>
        <Text style={styles.buttonText}>{loading ? 'Envoi...' : 'Assigner'}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: COLORS.white },
  title: { fontSize: 22, fontWeight: 'bold', color: COLORS.secondary, marginBottom: 15 },
  label: { marginTop: 15, marginBottom: 5, color: COLORS.secondary },
  picker: { borderWidth: 1, borderColor: COLORS.secondary, borderRadius: 8 },
  button: {
    backgroundColor: COLORS.primary,
    padding: 15,
    borderRadius: 10,
    marginTop: 25,
    alignItems: 'center',
  },
  buttonText: { color: COLORS.white, fontWeight: 'bold' },
});
