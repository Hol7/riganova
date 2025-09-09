import { COLORS } from "@/theme/colors";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from "react-native";

const { width, height } = Dimensions.get("window");

export default function SplashScreen() {
  const router = useRouter();
  const [showWelcome, setShowWelcome] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowWelcome(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const handleGetStarted = () => {
    router.replace("/(auth)/login");
  };

  if (!showWelcome) {
    return (
      <View style={styles.splashContainer}>
        <View style={styles.logoContainer}>
          <Text style={styles.logoText}>RIGANOVA</Text>
          <Text style={styles.tagline}>Livraison à moto rapide</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.welcomeContainer}>
      <View style={styles.content}>
        <View style={styles.welcomeHeader}>
          <Text style={styles.welcomeTitle}>Bienvenue sur RIGANOVA</Text>
          <Text style={styles.welcomeSubtitle}>
            La solution de livraison à moto la plus rapide de votre région
          </Text>
        </View>

        <View style={styles.featuresContainer}>
          <View style={styles.feature}>
            <Text style={styles.featureIcon}>🏍️</Text>
            <Text style={styles.featureTitle}>Livraison Rapide</Text>
            <Text style={styles.featureText}>
              Nos livreurs à moto vous garantissent une livraison express
            </Text>
          </View>

          <View style={styles.feature}>
            <Text style={styles.featureIcon}>📦</Text>
            <Text style={styles.featureTitle}>Tous Types de Colis</Text>
            <Text style={styles.featureText}>
              Documents, repas, objets - nous livrons tout ce dont vous avez besoin
            </Text>
          </View>

          <View style={styles.feature}>
            <Text style={styles.featureIcon}>📱</Text>
            <Text style={styles.featureTitle}>Suivi en Temps Réel</Text>
            <Text style={styles.featureText}>
              Suivez votre livraison en direct depuis votre téléphone
            </Text>
          </View>
        </View>

        <TouchableOpacity style={styles.getStartedBtn} onPress={handleGetStarted}>
          <Text style={styles.getStartedText}>Commencer</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  splashContainer: {
    flex: 1,
    backgroundColor: COLORS.primary,
    justifyContent: "center",
    alignItems: "center",
  },
  welcomeContainer: {
    flex: 1,
    backgroundColor: COLORS.primary,
  },
  logoContainer: {
    alignItems: "center",
  },
  logoText: {
    fontSize: 48,
    fontWeight: "bold",
    color: "#FFFFFF",
    letterSpacing: 2,
    marginBottom: 10,
  },
  tagline: {
    fontSize: 18,
    color: "#FFFFFF",
    opacity: 0.9,
    textAlign: "center",
  },
  content: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 30,
    paddingVertical: 60,
  },
  welcomeHeader: {
    alignItems: "center",
    marginTop: 40,
  },
  welcomeTitle: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#FFFFFF",
    textAlign: "center",
    marginBottom: 15,
  },
  welcomeSubtitle: {
    fontSize: 18,
    color: "#FFFFFF",
    opacity: 0.9,
    textAlign: "center",
    lineHeight: 24,
  },
  featuresContainer: {
    flex: 1,
    justifyContent: "center",
    width: "100%",
  },
  feature: {
    alignItems: "center",
    marginVertical: 20,
    paddingHorizontal: 20,
  },
  featureIcon: {
    fontSize: 40,
    marginBottom: 10,
  },
  featureTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#FFFFFF",
    marginBottom: 8,
    textAlign: "center",
  },
  featureText: {
    fontSize: 16,
    color: "#FFFFFF",
    opacity: 0.8,
    textAlign: "center",
    lineHeight: 22,
  },
  getStartedBtn: {
    backgroundColor: "#FFFFFF",
    paddingVertical: 16,
    paddingHorizontal: 40,
    borderRadius: 25,
    minWidth: 200,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  getStartedText: {
    color: COLORS.secondary,
    fontSize: 18,
    fontWeight: "bold",
  },
});