import { useAuthStore } from "@/store/authStore";
import { Redirect } from "expo-router";
import * as SecureStore from "expo-secure-store";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";
import { ActivityIndicator, View, Text } from "react-native";

export default function Index() {
  const { isAuthenticated, role, setAuthState } = useAuthStore();
  const [isInitializing, setIsInitializing] = useState(true);

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const token = await SecureStore.getItemAsync("access_token");
        const userData = await SecureStore.getItemAsync("user_data");
        
        if (token && userData) {
          const user = JSON.parse(userData);
          console.log("Found stored auth:", { token: !!token, user: user.role });
          setAuthState({
            token,
            user,
            role: user.role,
            isAuthenticated: true,
            isLoading: false
          });
        } else {
          console.log("No stored auth found");
          setAuthState({
            token: null,
            user: null,
            role: null,
            isAuthenticated: false,
            isLoading: false
          });
        }
      } catch (error) {
        console.log("Error checking auth state:", error);
        setAuthState({
          token: null,
          user: null,
          role: null,
          isAuthenticated: false,
          isLoading: false
        });
      } finally {
        setIsInitializing(false);
        SplashScreen.hideAsync();
      }
    };

    initializeAuth();
  }, [setAuthState]);

  // Show loading while initializing
  if (isInitializing) {
    return (
      <View style={{ 
        flex: 1, 
        justifyContent: "center", 
        alignItems: "center", 
        backgroundColor: "#FFFFFF" 
      }}>
        <ActivityIndicator size="large" color="#ffa704" />
        <Text style={{ 
          marginTop: 20, 
          fontSize: 18, 
          color: "#002276", 
          fontWeight: "600" 
        }}>
          RIGANOVA
        </Text>
        <Text style={{ 
          marginTop: 8, 
          fontSize: 14, 
          color: "#6B7280" 
        }}>
          Initialisation...
        </Text>
      </View>
    );
  }

  // Redirect based on authentication state
  if (!isAuthenticated) {
    return <Redirect href="/(auth)/login" />;
  }

  // Redirect based on user role
  console.log("Redirecting based on role:", role);
  switch (role) {
    case "client":
      return <Redirect href="/(tabs)/client/home" />;
    case "livreur":
      return <Redirect href="/(tabs)/livreur/missions" />;
    case "manager":
    case "admin":
      return <Redirect href="/(tabs)/manager/clients" />;
    default:
      return <Redirect href="/(tabs)/client/home" />;
  }
}
