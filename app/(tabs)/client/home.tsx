import { createDelivery } from "@/services/deliveryService";
import { COLORS } from "@/theme/colors";
import { spacing, styles } from "@/theme/ui";
import { Picker } from "@react-native-picker/picker";
import React, { useState } from "react";
import { 
  ActivityIndicator, 
  ScrollView, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  View, 
  StyleSheet,
  Dimensions 
} from "react-native";

const { width } = Dimensions.get("window");

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
      alert("Demande envoyée avec succès ! Un manager va traiter votre demande.");
      // Clear form
      setPickup("");
      setDropoff("");
      setDesc("");
      setType("document");
    } catch (error) {
      console.log("Error creating delivery:", error);
      alert("Erreur lors de la demande. Veuillez réessayer.");
    } finally { 
      setBusy(false); 
    }
  };

  const packageTypes = [
    { label: "📄 Document", value: "document", icon: "📄" },
    { label: "🍕 Repas", value: "repas", icon: "🍕" },
    { label: "📦 Objet", value: "objet", icon: "📦" },
    { label: "🎁 Autre", value: "autre", icon: "🎁" },
  ];

  return (
    <ScrollView style={homeStyles.container} contentContainerStyle={homeStyles.contentContainer}>
      {/* Header */}
      <View style={homeStyles.header}>
        <Text style={homeStyles.welcomeText}>Bonjour ! 👋</Text>
        <Text style={homeStyles.title}>Que voulez-vous livrer ?</Text>
        <Text style={homeStyles.subtitle}>
          Choisissez le type de colis et renseignez les adresses
        </Text>
      </View>

      {/* Package Type Selection */}
      <View style={homeStyles.section}>
        <Text style={homeStyles.sectionTitle}>Type de colis</Text>
        <View style={homeStyles.packageTypeContainer}>
          {packageTypes.map((pkg) => (
            <TouchableOpacity
              key={pkg.value}
              style={[
                homeStyles.packageTypeBtn,
                type_colis === pkg.value && homeStyles.packageTypeBtnActive
              ]}
              onPress={() => setType(pkg.value as any)}
            >
              <Text style={homeStyles.packageTypeIcon}>{pkg.icon}</Text>
              <Text style={[
                homeStyles.packageTypeText,
                type_colis === pkg.value && homeStyles.packageTypeTextActive
              ]}>
                {pkg.label.replace(/^.+ /, '')}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Addresses */}
      <View style={homeStyles.section}>
        <Text style={homeStyles.sectionTitle}>Adresses</Text>
        
        <View style={homeStyles.inputContainer}>
          <Text style={homeStyles.inputLabel}>📍 Lieu de récupération</Text>
          <TextInput
            style={homeStyles.input}
            placeholder="Où devons-nous récupérer le colis ?"
            value={adresse_pickup}
            onChangeText={setPickup}
            multiline
          />
        </View>

        <View style={homeStyles.inputContainer}>
          <Text style={homeStyles.inputLabel}>🎯 Lieu de livraison</Text>
          <TextInput
            style={homeStyles.input}
            placeholder="Où devons-nous livrer le colis ?"
            value={adresse_dropoff}
            onChangeText={setDropoff}
            multiline
          />
        </View>

        <View style={homeStyles.inputContainer}>
          <Text style={homeStyles.inputLabel}>💬 Description (optionnel)</Text>
          <TextInput
            style={[homeStyles.input, homeStyles.textArea]}
            placeholder="Ajoutez des détails sur votre colis..."
            value={description}
            onChangeText={setDesc}
            multiline
            numberOfLines={3}
          />
        </View>
      </View>

      {/* Submit Button */}
      <TouchableOpacity 
        style={[homeStyles.submitBtn, busy && homeStyles.submitBtnDisabled]} 
        onPress={onCreate} 
        disabled={busy}
      >
        {busy ? (
          <ActivityIndicator color="#FFFFFF" />
        ) : (
          <>
            <Text style={homeStyles.submitBtnText}>🏍️ Demander un livreur</Text>
            <Text style={homeStyles.submitBtnSubtext}>Livraison rapide garantie</Text>
          </>
        )}
      </TouchableOpacity>

      {/* Info Card */}
      <View style={homeStyles.infoCard}>
        <Text style={homeStyles.infoTitle}>💡 Comment ça marche ?</Text>
        <View style={homeStyles.infoStep}>
          <Text style={homeStyles.infoStepNumber}>1</Text>
          <Text style={homeStyles.infoStepText}>Remplissez le formulaire ci-dessus</Text>
        </View>
        <View style={homeStyles.infoStep}>
          <Text style={homeStyles.infoStepNumber}>2</Text>
          <Text style={homeStyles.infoStepText}>Un manager assigne votre demande à un livreur</Text>
        </View>
        <View style={homeStyles.infoStep}>
          <Text style={homeStyles.infoStepNumber}>3</Text>
          <Text style={homeStyles.infoStepText}>Suivez votre livraison en temps réel</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const homeStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.bg,
  },
  contentContainer: {
    padding: spacing(5),
    paddingBottom: spacing(10),
  },
  header: {
    alignItems: "center",
    marginBottom: spacing(8),
    paddingTop: spacing(4),
  },
  welcomeText: {
    fontSize: 18,
    color: COLORS.textMuted,
    marginBottom: spacing(2),
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: COLORS.text,
    textAlign: "center",
    marginBottom: spacing(2),
  },
  subtitle: {
    fontSize: 16,
    color: COLORS.textMuted,
    textAlign: "center",
    lineHeight: 22,
  },
  section: {
    marginBottom: spacing(8),
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: COLORS.text,
    marginBottom: spacing(4),
  },
  packageTypeContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: spacing(3),
  },
  packageTypeBtn: {
    flex: 1,
    minWidth: (width - spacing(10) - spacing(3)) / 2,
    backgroundColor: COLORS.surface,
    borderRadius: 16,
    padding: spacing(4),
    alignItems: "center",
    borderWidth: 2,
    borderColor: COLORS.border,
  },
  packageTypeBtnActive: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  packageTypeIcon: {
    fontSize: 32,
    marginBottom: spacing(2),
  },
  packageTypeText: {
    fontSize: 16,
    fontWeight: "500",
    color: COLORS.text,
  },
  packageTypeTextActive: {
    color: "#FFFFFF",
  },
  inputContainer: {
    marginBottom: spacing(5),
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: "500",
    color: COLORS.text,
    marginBottom: spacing(2),
  },
  input: {
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.surface,
    borderRadius: 12,
    padding: spacing(4),
    fontSize: 16,
    color: COLORS.text,
    minHeight: 50,
  },
  textArea: {
    minHeight: 80,
    textAlignVertical: "top",
  },
  submitBtn: {
    backgroundColor: COLORS.primary,
    borderRadius: 16,
    padding: spacing(5),
    alignItems: "center",
    marginBottom: spacing(6),
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  submitBtnDisabled: {
    opacity: 0.6,
  },
  submitBtnText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: spacing(1),
  },
  submitBtnSubtext: {
    fontSize: 14,
    color: "#FFFFFF",
    opacity: 0.9,
  },
  infoCard: {
    backgroundColor: COLORS.surface,
    borderRadius: 16,
    padding: spacing(5),
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: COLORS.text,
    marginBottom: spacing(4),
  },
  infoStep: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: spacing(3),
  },
  infoStepNumber: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: COLORS.primary,
    color: "#FFFFFF",
    textAlign: "center",
    lineHeight: 28,
    fontSize: 14,
    fontWeight: "bold",
    marginRight: spacing(3),
  },
  infoStepText: {
    flex: 1,
    fontSize: 14,
    color: COLORS.textMuted,
    lineHeight: 20,
  },
});


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
