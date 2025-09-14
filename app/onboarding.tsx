import { COLORS } from "@/theme/colors";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { 
  View, 
  Text, 
  StyleSheet, 
  Dimensions, 
  TouchableOpacity,
  ScrollView 
} from "react-native";
import * as SecureStore from 'expo-secure-store';

const { width, height } = Dimensions.get("window");

const onboardingSteps = [
  {
    icon: "🏍️",
    title: "Livraison Express",
    description: "Nos livreurs à moto vous garantissent une livraison rapide et sécurisée dans toute la ville"
  },
  {
    icon: "📦",
    title: "Tous Types de Colis",
    description: "Documents, repas, objets personnels - nous livrons tout ce dont vous avez besoin"
  },
  {
    icon: "📱",
    title: "Suivi en Temps Réel",
    description: "Suivez votre livraison en direct et communiquez avec votre livreur"
  }
];

export default function Onboarding() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);

  const handleNext = () => {
    if (currentStep < onboardingSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleFinish();
    }
  };

  const handleSkip = () => {
    handleFinish();
  };

  const handleFinish = async () => {
    await SecureStore.setItemAsync('hasSeenOnboarding', 'true');
    router.replace("/(auth)/login");
  };

  const currentStepData = onboardingSteps[currentStep];

  return (
    <View style={styles.container}>
      {/* Skip Button */}
      <TouchableOpacity style={styles.skipButton} onPress={handleSkip}>
        <Text style={styles.skipText}>Passer</Text>
      </TouchableOpacity>

      {/* Content */}
      <View style={styles.content}>
        <View style={styles.stepContainer}>
          <Text style={styles.stepIcon}>{currentStepData.icon}</Text>
          <Text style={styles.stepTitle}>{currentStepData.title}</Text>
          <Text style={styles.stepDescription}>{currentStepData.description}</Text>
        </View>

        {/* Pagination Dots */}
        <View style={styles.pagination}>
          {onboardingSteps.map((_, index) => (
            <View
              key={index}
              style={[
                styles.dot,
                index === currentStep ? styles.activeDot : styles.inactiveDot
              ]}
            />
          ))}
        </View>

        {/* Navigation Buttons */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
            <Text style={styles.nextButtonText}>
              {currentStep === onboardingSteps.length - 1 ? "Commencer" : "Suivant"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Brand Footer */}
      <View style={styles.footer}>
        <Text style={styles.brandText}>RIGANOVA</Text>
        <Text style={styles.footerTagline}>Votre partenaire livraison</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primary,
  },
  skipButton: {
    position: 'absolute',
    top: 60,
    right: 20,
    zIndex: 1,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  skipText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
  },
  stepContainer: {
    alignItems: 'center',
    marginBottom: 60,
  },
  stepIcon: {
    fontSize: 80,
    marginBottom: 30,
  },
  stepTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginBottom: 20,
  },
  stepDescription: {
    fontSize: 18,
    color: 'white',
    opacity: 0.9,
    textAlign: 'center',
    lineHeight: 26,
    paddingHorizontal: 20,
  },
  pagination: {
    flexDirection: 'row',
    marginBottom: 50,
  },
  dot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginHorizontal: 6,
  },
  activeDot: {
    backgroundColor: 'white',
  },
  inactiveDot: {
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
  },
  nextButton: {
    backgroundColor: 'white',
    paddingVertical: 16,
    paddingHorizontal: 50,
    borderRadius: 25,
    minWidth: 200,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  nextButtonText: {
    color: COLORS.primary,
    fontSize: 18,
    fontWeight: 'bold',
  },
  footer: {
    alignItems: 'center',
    paddingBottom: 40,
  },
  brandText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    letterSpacing: 1,
  },
  footerTagline: {
    fontSize: 14,
    color: 'white',
    opacity: 0.8,
    marginTop: 4,
  },
});
