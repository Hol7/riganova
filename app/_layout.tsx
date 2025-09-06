import { Slot } from "expo-router";

export default function RootLayout() {
  return <Slot />;
}


// // // app/_layout.tsx
// // import { Stack } from "expo-router";

// // export default function RootLayout() {
// //   return (
// //     <Stack screenOptions={{ headerShown: false }}>
// //       {/* index.tsx sera notre routeur "intermédiaire" */}
// //       <Stack.Screen name="index" options={{ headerShown: false }} />
// //       <Stack.Screen name="(auth)" options={{ headerShown: false }} />
// //       <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
// //     </Stack>
// //   );
// // }

// import { Slot } from "expo-router";

// export default function RootLayout() {
//   return <Slot />;
// }


// // // app/_layout.tsx
// // import { useAuthStore } from "@/store/authStore";
// // import { Stack, useRouter } from "expo-router";
// // import * as SplashScreen from "expo-splash-screen";
// // import { useEffect } from "react";

// // SplashScreen.preventAutoHideAsync();

// // export default function RootLayout() {
// //   const { isLoading, isAuthenticated, role } = useAuthStore();
// //   const router = useRouter();

// //   useEffect(() => {
// //     if (!isLoading) {
// //       SplashScreen.hideAsync();
// //       if (!isAuthenticated) {
// //         router.replace("/(auth)/login");
// //       } else {
// //         // ✅ redirect based on role
// //         if (role === "client") router.replace("/(tabs)/client/home");
// //         if (role === "livreur") router.replace("/(tabs)/livreur/missions");
// //         if (role === "manager") router.replace("/(tabs)/manager/requests");
// //       }
// //     }
// //   }, [isLoading, isAuthenticated, role]);

// //   // Always render a navigator
// //   return (
// //     <Stack screenOptions={{ headerShown: false }}>
// //       <Stack.Screen name="(auth)" options={{ headerShown: false }} />
// //       <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
// //     </Stack>
// //   );
// // }


// // // app/_layout.tsx
// // import { useAuthStore } from "@/store/authStore";
// // import { SplashScreen, Stack, useRouter } from "expo-router";
// // import { useEffect } from "react";

// // SplashScreen.preventAutoHideAsync();

// // export default function RootLayout() {
// //   const { isLoading, isAuthenticated } = useAuthStore();
// //   const router = useRouter();

// //   useEffect(() => {
// //     if (!isLoading) {
// //       SplashScreen.hideAsync();
// //       if (!isAuthenticated) {
// //         router.replace("/(auth)/login");
// //       } else {
// //         router.replace("/(tabs)/client/home"); // default tab after login
// //       }
// //     }
// //   }, [isLoading, isAuthenticated]);

// //   if (isLoading) {
// //     return null; // could be a splash screen component
// //   }

// //   return (
// //     <Stack screenOptions={{ headerShown: false }}>
// //       <Stack.Screen name="(auth)" options={{ headerShown: false }} />
// //       <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
// //     </Stack>
// //   );
// // }
