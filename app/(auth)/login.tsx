import { useAuthStore } from "@/store/authStore";
import { COLORS } from "@/theme/colors";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { 
  ActivityIndicator, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  View, 
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView
} from "react-native";

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
      
      // Force a redirect after successful login
      setTimeout(() => {
        // The index.tsx will handle the role-based redirect
        router.replace("/");
      }, 100);
      
    } catch (e: any) {
      console.log("Login error:", e);
      alert("Connexion échouée. Vérifiez vos identifiants.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <KeyboardAvoidingView 
      style={loginStyles.container} 
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView contentContainerStyle={loginStyles.scrollContainer}>
        {/* Header */}
        <View style={loginStyles.header}>
          <Text style={loginStyles.logo}>RIGANOVA</Text>
          <Text style={loginStyles.tagline}>Livraison à moto rapide</Text>
        </View>

        {/* Form */}
        <View style={loginStyles.form}>
          <Text style={loginStyles.title}>Connexion</Text>
          <Text style={loginStyles.subtitle}>
            Connectez-vous pour accéder à vos livraisons
          </Text>

          <View style={loginStyles.inputContainer}>
            <Text style={loginStyles.inputLabel}>📱 Téléphone</Text>
            <TextInput
              style={loginStyles.input}
              placeholder="Entrez votre numéro de téléphone"
              keyboardType="phone-pad"
              value={telephone}
              onChangeText={setTelephone}
              autoCapitalize="none"
            />
          </View>

          <View style={loginStyles.inputContainer}>
            <Text style={loginStyles.inputLabel}>🔒 Mot de passe</Text>
            <TextInput
              style={loginStyles.input}
              placeholder="Entrez votre mot de passe"
              secureTextEntry
              value={mot_de_passe}
              onChangeText={setPassword}
              autoCapitalize="none"
            />
          </View>

          <TouchableOpacity 
            style={[loginStyles.submitBtn, busy && loginStyles.submitBtnDisabled]} 
            onPress={onSubmit} 
            disabled={busy}
          >
            {busy ? (
              <ActivityIndicator color="#FFFFFF" />
            ) : (
              <Text style={loginStyles.submitBtnText}>Se connecter</Text>
            )}
          </TouchableOpacity>

          {/* Links */}
          <TouchableOpacity 
            style={loginStyles.linkBtn} 
            onPress={() => router.push("/(auth)/forget-password")}
          >
            <Text style={loginStyles.linkText}>Mot de passe oublié ?</Text>
          </TouchableOpacity>
        </View>

        {/* Register Link */}
        <View style={loginStyles.footer}>
          <Text style={loginStyles.footerText}>Pas encore de compte ?</Text>
          <TouchableOpacity onPress={() => router.push("/(auth)/register")}>
            <Text style={loginStyles.footerLink}>Créer un compte</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const loginStyles = StyleSheet.create({
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
    marginBottom: 40,
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
    marginBottom: 32,
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
    marginBottom: 32,
    lineHeight: 22,
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
  submitBtn: {
    backgroundColor: COLORS.primary,
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
    marginTop: 16,
    marginBottom: 16,
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
  linkBtn: {
    alignItems: "center",
    paddingVertical: 8,
  },
  linkText: {
    fontSize: 16,
    color: COLORS.secondary,
    fontWeight: "500",
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
