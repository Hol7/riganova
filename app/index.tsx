// import { useAuthStore } from "@/store/authStore";
// import { useRouter } from "expo-router";
// import { ActivityIndicator, View } from "react-native";

// export default function Index() {
//   const { isLoading, isAuthenticated, role } = useAuthStore();
//   const router = useRouter();

// //   useEffect(() => {
// //     if (isLoading) return; // attendre que l'état soit connu

// //     if (!isAuthenticated) {
// //       router.replace("/(auth)/login");
// //     } else {
// //       if (role === "client") router.replace("/(tabs)/client/home");
// //       if (role === "livreur") router.replace("/(tabs)/livreur/missions");
// //       if (role === "manager") router.replace("/(tabs)/manager/requests");
// //     }
// //   }, [isLoading, isAuthenticated, role]);

//   return (
//     <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
//       <ActivityIndicator size="large" color="#ffa704" />
//     </View>
//   );
// }
