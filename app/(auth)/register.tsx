import { registerUser } from "@/services/authService";
import { useAuthStore } from "@/store/authStore";
import { styles } from "@/theme/ui";
import React, { useState } from "react";
import { ActivityIndicator, ScrollView, Text, TextInput, TouchableOpacity } from "react-native";

export default function Register() {
  const [nom, setNom] = useState("");
  const [email, setEmail] = useState("");
  const [telephone, setTelephone] = useState("");
  const [mot_de_passe, setPassword] = useState("");
  const [adresse, setAdresse] = useState("");
  const [busy, setBusy] = useState(false);

  const login = useAuthStore((s) => s.login);

  const onSubmit = async () => {
    if (!nom || !email || !telephone || !mot_de_passe || !adresse) {
      return alert("Tous les champs sont requis");
    }
    try {
      setBusy(true);
      await registerUser({ nom, email, telephone, mot_de_passe, adresse });
      // ✅ directly log in after registration
      await login(telephone, mot_de_passe);
    } catch (e: any) {
      console.log("ereuur",e);
      alert("Échec de l'inscription: " + (e.response?.data?.detail || "Erreur inconnue"));
    } finally {
      setBusy(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.screen}>
      <Text style={styles.h2}>Créer un compte</Text>

      <TextInput
        style={styles.input}
        placeholder="Nom complet"
        value={nom}
        onChangeText={setNom}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Téléphone"
        keyboardType="phone-pad"
        value={telephone}
        onChangeText={setTelephone}
      />
      <TextInput
        style={styles.input}
        placeholder="Adresse"
        value={adresse}
        onChangeText={setAdresse}
      />
      <TextInput
        style={styles.input}
        placeholder="Mot de passe"
        secureTextEntry
        value={mot_de_passe}
        onChangeText={setPassword}
      />

      <TouchableOpacity style={styles.primaryBtn} onPress={onSubmit} disabled={busy}>
        {busy ? <ActivityIndicator /> : <Text style={styles.primaryBtnText}>S’inscrire</Text>}
      </TouchableOpacity>
    </ScrollView>
  );
}
