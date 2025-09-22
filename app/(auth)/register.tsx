import { registerUser } from "@/services/authService";
import { useAuthStore } from "@/store/authStore";
import { COLORS } from "@/theme/colors";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";

export default function Register() {
  const [nom, setNom] = useState("");
  const [email, setEmail] = useState("");
  const [telephone, setTelephone] = useState("");
  const [mot_de_passe, setPassword] = useState("");
  const [adresse, setAdresse] = useState("");
  const [busy, setBusy] = useState(false);

  const login = useAuthStore((s) => s.login);
  const router = useRouter();

  const onSubmit = async () => {
    if (!nom || !email || !telephone || !mot_de_passe || !adresse) {
      return alert("Tous les champs sont requis");
    }
    try {
      setBusy(true);
      await registerUser({ nom, email, telephone, mot_de_passe, adresse });
      // ✅ directly log in after registration
      await login(telephone, mot_de_passe);
      // Direct redirect to home after successful registration
      router.replace("/(tabs)/home");
    } catch (e: any) {
      console.log("erreur",e);
      alert("Échec de l'inscription: " + (e.response?.data?.detail || "Erreur inconnue"));
    } finally {
      setBusy(false);
    }
  };

  return (
    <KeyboardAvoidingView 
      style={registerStyles.container} 
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView contentContainerStyle={registerStyles.scrollContainer}>
        {/* Header */}
        {/* <View style={registerStyles.header}>
          <Text style={registerStyles.logo}>RIGANOVA</Text>
          <Text style={registerStyles.tagline}>Livraison à moto rapide</Text>
        </View> */}

        {/* Form */}
        <View style={registerStyles.form}>
          <Text style={registerStyles.title}>Créer un compte</Text>
          {/* <Text style={registerStyles.subtitle}>
            Rejoignez RIGANOVA et commencez à utiliser nos services de livraison
          </Text> */}

          <View style={registerStyles.inputContainer}>
            <Text style={registerStyles.inputLabel}>👤 Nom complet</Text>
            <TextInput
              style={registerStyles.input}
              placeholder="Entrez votre nom complet"
              value={nom}
              onChangeText={setNom}
              autoCapitalize="words"
            />
          </View>

          <View style={registerStyles.inputContainer}>
            <Text style={registerStyles.inputLabel}>📧 Email</Text>
            <TextInput
              style={registerStyles.input}
              placeholder="Entrez votre adresse email"
              keyboardType="email-address"
              autoCapitalize="none"
              value={email}
              onChangeText={setEmail}
            />
          </View>

          <View style={registerStyles.inputContainer}>
            <Text style={registerStyles.inputLabel}>📱 Téléphone</Text>
            <TextInput
              style={registerStyles.input}
              placeholder="Entrez votre numéro de téléphone"
              keyboardType="phone-pad"
              value={telephone}
              onChangeText={setTelephone}
            />
          </View>

          <View style={registerStyles.inputContainer}>
            <Text style={registerStyles.inputLabel}>📍 Adresse</Text>
            <TextInput
              style={registerStyles.input}
              placeholder="Entrez votre adresse complète"
              value={adresse}
              onChangeText={setAdresse}
              multiline
            />
          </View>

          <View style={registerStyles.inputContainer}>
            <Text style={registerStyles.inputLabel}>🔒 Mot de passe</Text>
            <TextInput
              style={registerStyles.input}
              placeholder="Créez un mot de passe sécurisé"
              secureTextEntry
              value={mot_de_passe}
              onChangeText={setPassword}
              autoCapitalize="none"
            />
          </View>

          <TouchableOpacity 
            style={[registerStyles.submitBtn, busy && registerStyles.submitBtnDisabled]} 
            onPress={onSubmit} 
            disabled={busy}
          >
            {busy ? (
              <ActivityIndicator color="#FFFFFF" />
            ) : (
              <Text style={registerStyles.submitBtnText}>Créer mon compte</Text>
            )}
          </TouchableOpacity>
        </View>

        {/* Login Link */}
        <View style={registerStyles.footer}>
          <Text style={registerStyles.footerText}>Déjà un compte ?</Text>
          <TouchableOpacity onPress={() => router.push("/(auth)/login")}>
            <Text style={registerStyles.footerLink}>Se connecter</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const registerStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.bg,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    padding: 20,
  },
  header: {
    alignItems: "center",
    marginBottom: 32,
  },
  logo: {
    fontSize: 36,
    fontWeight: "bold",
    color: COLORS.primary,
    letterSpacing: 1,
    marginBottom: 8,
  },
  tagline: {
    fontSize: 16,
    color: COLORS.textMuted,
    textAlign: "center",
  },
  form: {
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: COLORS.text,
    textAlign: "center",
    marginBottom: 18,
  },
  subtitle: {
    fontSize: 16,
    color: COLORS.textMuted,
    textAlign: "center",
    marginBottom: 32,
    lineHeight: 22,
  },
  inputContainer: {
    marginBottom: 12,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: "400",
    color: COLORS.text,
    marginBottom: 4,
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
  submitBtn: {
    backgroundColor: COLORS.primary,
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
    marginTop: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  submitBtnDisabled: {
    opacity: 0.6,
  },
  submitBtnText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 16,
  },
  footerText: {
    fontSize: 16,
    color: COLORS.textMuted,
    marginRight: 8,
  },
  footerLink: {
    fontSize: 16,
    color: COLORS.primary,
    fontWeight: "600",
  },
});
