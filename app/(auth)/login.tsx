import { useAuthStore } from "@/store/authStore";
import { styles } from "@/theme/ui";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { ActivityIndicator, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function Login() {
  const login = useAuthStore((s) => s.login);
  const router = useRouter();
  const [telephone, setTelephone] = useState("");
  const [mot_de_passe, setPassword] = useState("");
  const [busy, setBusy] = useState(false);

  const onSubmit = async () => {
    if (!telephone || !mot_de_passe) return alert("Téléphone et mot de passe requis");
    try {
      setBusy(true);
      await login(telephone, mot_de_passe);
    } catch (e: any) {
      console.log("eee",e)
      alert("Connexion échouée. Vérifiez vos identifiants.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <View style={styles.screen}>
      <Text style={styles.h2}>Connexion</Text>

      <TextInput
        style={styles.input}
        placeholder="Téléphone"
        // keyboardType="phone-pad"
        value={telephone}
        onChangeText={setTelephone}
      />
      <TextInput
        style={styles.input}
        placeholder="Mot de passe"
        secureTextEntry
        value={mot_de_passe}
        onChangeText={setPassword}
      />

      <TouchableOpacity style={styles.primaryBtn} onPress={onSubmit} disabled={busy}>
        {busy ? <ActivityIndicator /> : <Text style={styles.primaryBtnText}>Se connecter</Text>}
      </TouchableOpacity>

      {/* Forgot password */}
      <TouchableOpacity style={styles.linkBtn} onPress={() => router.push("forget-password")}>
        <Text style={styles.link}>Mot de passe oublié ?</Text>
      </TouchableOpacity>

      {/* Link to register */}
      <TouchableOpacity style={styles.linkBtn} onPress={() => router.push("register")}>
        <Text style={styles.link}>Créer votre compte</Text>
      </TouchableOpacity>
    </View>
  );
}
