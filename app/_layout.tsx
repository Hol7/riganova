import { useAuthStore } from '@/store/authStore';
import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';

export default function Layout() {
  const { user } = useAuthStore();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#FFA704',
        tabBarInactiveTintColor: '#002276',
        headerShown: false,
      }}
    >
      {user?.role === 'client' && (
        <>
          <Tabs.Screen
            name="client/home"
            options={{
              title: 'Accueil',
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="home-outline" color={color} size={size} />
              ),
            }}
          />
          <Tabs.Screen
            name="client/deliveries"
            options={{
              title: 'Mes Courses',
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="list-outline" color={color} size={size} />
              ),
            }}
          />
        </>
      )}

      {user?.role === 'livreur' && (
        <Tabs.Screen
          name="livreur/missions"
          options={{
            title: 'Missions',
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="bicycle-outline" color={color} size={size} />
            ),
          }}
        />
      )}

      {user?.role === 'manager' && (
        <Tabs.Screen
          name="manager/requests"
          options={{
            title: 'Demandes',
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="people-outline" color={color} size={size} />
            ),
          }}
        />
      )}

      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profil',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person-outline" color={color} size={size} />
          ),
        }}
      />
    </Tabs>
  );
}


// import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
// import { useFonts } from 'expo-font';
// import { Stack } from 'expo-router';
// import { StatusBar } from 'expo-status-bar';
// import 'react-native-reanimated';

// import { useColorScheme } from '@/hooks/useColorScheme';

// export default function RootLayout() {
//   const colorScheme = useColorScheme();
//   const [loaded] = useFonts({
//     SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
//   });

//   if (!loaded) {
//     // Async font loading only occurs in development.
//     return null;
//   }

//   return (
//     <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
//       <Stack>
//         <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
//         <Stack.Screen name="+not-found" />
//       </Stack>
//       <StatusBar style="auto" />
//     </ThemeProvider>
//   );
// }
