import { forgetPassword } from "@/services/authService";
import { styles } from "@/theme/ui";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { ActivityIndicator, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function ForgetPassword() {
  const [email, setEmail] = useState("");
  const [busy, setBusy] = useState(false);
  const router = useRouter();

  const onSubmit = async () => {
    if (!email) return alert("Email requis");
    try {
      setBusy(true);
      await forgetPassword(email);
      alert("Si un compte existe avec cet email, vous recevrez un lien de réinitialisation.");
      router.replace("/auth/login");
    } catch (e: any) {
      alert("Erreur: " + (e.response?.data?.detail || "Impossible de réinitialiser"));
    } finally {
      setBusy(false);
    }
  };

  return (
    <View style={styles.screen}>
      <Text style={styles.h2}>Réinitialiser le mot de passe</Text>
      <TextInput
        style={styles.input}
        placeholder="Votre email"
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
      />
      <TouchableOpacity style={styles.primaryBtn} onPress={onSubmit} disabled={busy}>
        {busy ? <ActivityIndicator /> : <Text style={styles.primaryBtnText}>Envoyer</Text>}
      </TouchableOpacity>
    </View>
  );
}
