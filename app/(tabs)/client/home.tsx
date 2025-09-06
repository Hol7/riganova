// app/(tabs)/client/home.tsx
import { createDelivery } from "@/services/deliveryService";
import { styles } from "@/theme/ui";
import React, { useState } from "react";
import { ActivityIndicator, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function ClientHome() {
  const [type_colis, setType] = useState<"document"|"repas"|"objet"|"autre">("document");
  const [adresse_pickup, setPickup] = useState("");
  const [adresse_dropoff, setDropoff] = useState("");
  const [description, setDesc] = useState("");
  const [busy, setBusy] = useState(false);

  const onCreate = async () => {
    if (!adresse_pickup || !adresse_dropoff) return alert("Adresses requises");
    try {
      setBusy(true);
      await createDelivery({ type_colis, description, adresse_pickup, adresse_dropoff });
      alert("Demande envoyée !");
    } catch {
      alert("Erreur lors de la demande");
    } finally { setBusy(false); }
  };

  return (
    <View style={styles.screen}>
      <Text style={styles.h2}>Que voulez-vous livrer ?</Text>
      <TextInput style={styles.input} placeholder="Adresse de récupération" value={adresse_pickup} onChangeText={setPickup} />
      <TextInput style={styles.input} placeholder="Adresse de livraison" value={adresse_dropoff} onChangeText={setDropoff} />
      <TextInput style={styles.input} placeholder="Description (optionnel)" value={description} onChangeText={setDesc} />
      <TouchableOpacity style={styles.primaryBtn} onPress={onCreate} disabled={busy}>
        {busy ? <ActivityIndicator /> : <Text style={styles.primaryBtnText}>Demander un livreur</Text>}
      </TouchableOpacity>
    </View>
  );
}


// import { createDelivery } from '@/store/deliveryStore';
// import { COLORS } from '@/theme/colors';
// import { playNotification } from '@/utils/notifications';
// import { Picker } from '@react-native-picker/picker';
// import React, { useState } from 'react';
// import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity } from 'react-native';

// export default function ClientHome() {
//   const [type, setType] = useState('document');
//   const [pickup, setPickup] = useState('');
//   const [dropoff, setDropoff] = useState('');
//   const [description, setDescription] = useState('');
//   const [loading, setLoading] = useState(false);

//   const handleSubmit = async () => {
//     if (!pickup || !dropoff) return alert('Remplissez tous les champs obligatoires');

//     setLoading(true);
//     try {
//       await createDelivery({ type, pickup, dropoff, description });
//       setPickup('');
//       setDropoff('');
//       setDescription('');
//       setType('document');
//       playNotification();
//       alert('Demande envoyée avec succès !');
//     } catch (error) {
//       console.log(error);
//       alert('Erreur lors de l’envoi de la demande.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <ScrollView contentContainerStyle={styles.container}>
//       <Text style={styles.title}>Que voulez-vous livrer ?</Text>

//       <Text style={styles.label}>Type de colis :</Text>
//       <Picker selectedValue={type} onValueChange={(itemValue) => setType(itemValue)} style={styles.picker}>
//         <Picker.Item label="Document" value="document" />
//         <Picker.Item label="Repas" value="food" />
//         <Picker.Item label="Objet" value="item" />
//         <Picker.Item label="Autre" value="other" />
//       </Picker>

//       <Text style={styles.label}>Lieu de récupération :</Text>
//       <TextInput
//         style={styles.input}
//         placeholder="Adresse de pickup"
//         value={pickup}
//         onChangeText={setPickup}
//       />

//       <Text style={styles.label}>Lieu de livraison :</Text>
//       <TextInput
//         style={styles.input}
//         placeholder="Adresse de dropoff"
//         value={dropoff}
//         onChangeText={setDropoff}
//       />

//       <Text style={styles.label}>Description (optionnel) :</Text>
//       <TextInput
//         style={styles.input}
//         placeholder="Ex: Document important"
//         value={description}
//         onChangeText={setDescription}
//       />

//       <TouchableOpacity style={styles.button} onPress={handleSubmit} disabled={loading}>
//         <Text style={styles.buttonText}>{loading ? 'Envoi...' : 'Demander un livreur'}</Text>
//       </TouchableOpacity>
//     </ScrollView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     padding: 20,
//     backgroundColor: COLORS.white,
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     color: COLORS.secondary,
//     marginBottom: 20,
//   },
//   label: {
//     fontSize: 16,
//     color: COLORS.secondary,
//     marginTop: 15,
//   },
//   input: {
//     borderWidth: 1,
//     borderColor: COLORS.secondary,
//     borderRadius: 8,
//     padding: 10,
//     marginTop: 5,
//   },
//   picker: {
//     borderWidth: 1,
//     borderColor: COLORS.secondary,
//     borderRadius: 8,
//     marginTop: 5,
//   },
//   button: {
//     backgroundColor: COLORS.primary,
//     padding: 15,
//     borderRadius: 10,
//     marginTop: 25,
//     alignItems: 'center',
//   },
//   buttonText: {
//     color: COLORS.white,
//     fontWeight: 'bold',
//     fontSize: 16,
//   },
// });
