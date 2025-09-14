import { createDelivery } from "@/services/deliveryService";
import { COLORS } from "@/theme/colors";
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
  const [type_colis, setType] = useState<"colis"|"document"|"nourriture"|"autre">("colis");
  const [adresse_pickup, setPickup] = useState("");
  const [adresse_dropoff, setDropoff] = useState("");
  const [description, setDesc] = useState("");
  const [busy, setBusy] = useState(false);

  const onCreate = async () => {
    if (!adresse_pickup || !adresse_dropoff) return alert("Adresses requises");
    try {
      setBusy(true);
      await createDelivery({ type_colis, description, adresse_pickup, adresse_dropoff });
      alert("Demande envoyée avec succès ! Votre livraison sera traitée rapidement.");
      // Clear form
      setPickup("");
      setDropoff("");
      setDesc("");
      setType("colis");
    } catch (error) {
      console.log("Error creating delivery:", error);
      alert("Erreur lors de la demande. Veuillez réessayer.");
    } finally { 
      setBusy(false); 
    }
  };

  const packageTypes = [
    { label: "📄 Document", value: "document", icon: "📄" },
    { label: "🍕 Repas", value: "nourriture", icon: "🍕" },
    { label: "📦 Colis", value: "colis", icon: "📦" },
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
          <Text style={homeStyles.infoStepText}>Votre demande est automatiquement traitée</Text>
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
    padding: 20,
    paddingBottom: 40,
  },
  header: {
    alignItems: "center",
    marginBottom: 32,
    paddingTop: 16,
  },
  welcomeText: {
    fontSize: 18,
    color: COLORS.textMuted,
    marginBottom: 8,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: COLORS.text,
    textAlign: "center",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: COLORS.textMuted,
    textAlign: "center",
    lineHeight: 22,
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: COLORS.text,
    marginBottom: 16,
  },
  packageTypeContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: 12,
  },
  packageTypeBtn: {
    flex: 1,
    minWidth: (width - 40 - 12) / 2,
    backgroundColor: COLORS.surface,
    borderRadius: 16,
    padding: 16,
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
    marginBottom: 8,
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
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: "500",
    color: COLORS.text,
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.surface,
    borderRadius: 12,
    padding: 16,
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
    padding: 20,
    alignItems: "center",
    marginBottom: 24,
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
    marginBottom: 4,
  },
  submitBtnSubtext: {
    fontSize: 14,
    color: "#FFFFFF",
    opacity: 0.9,
  },
  infoCard: {
    backgroundColor: COLORS.surface,
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: COLORS.text,
    marginBottom: 16,
  },
  infoStep: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
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
    marginRight: 12,
  },
  infoStepText: {
    flex: 1,
    fontSize: 14,
    color: COLORS.textMuted,
    lineHeight: 20,
  },
});