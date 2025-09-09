import { useAuthStore } from "@/store/authStore";
import { useRouter } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { useEffect } from "react";
import { ActivityIndicator, View, Text } from "react-native";

export default function Index() {
  const { isLoading, isAuthenticated, role, setAuthState } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    const checkAuthState = async () => {
      try {
        const token = await SecureStore.getItemAsync("access_token");
        const userData = await SecureStore.getItemAsync("user_data");
        
        if (token && userData) {
          const user = JSON.parse(userData);
          setAuthState({
            token,
            user,
            role: user.role,
            isAuthenticated: true,
            isLoading: false
          });
        } else {
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
      }
    };

    checkAuthState();
  }, []);

  useEffect(() => {
    if (isLoading) return; // Wait for auth state to be determined

    console.log("Navigation check:", { isAuthenticated, role, isLoading });

    if (!isAuthenticated) {
      router.replace("/(auth)/login");
    } else {
      // Redirect based on user role
      switch (role) {
        case "client":
          router.replace("/(tabs)/client/home");
          break;
        case "livreur":
          router.replace("/(tabs)/livreur/missions");
          break;
        case "manager":
        case "admin":
          router.replace("/(tabs)/manager/clients");
          break;
        default:
          router.replace("/(tabs)/client/home");
      }
    }
  }, [isLoading, isAuthenticated, role]);

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
        Chargement...
      </Text>
    </View>
  );
}
