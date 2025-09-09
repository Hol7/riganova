import { useAuthStore } from "@/store/authStore";
import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { useEffect } from "react";

export default function TabsLayout() {
  const { role, isAuthenticated } = useAuthStore();

  useEffect(() => {
    console.log("TabsLayout - role:", role, "isAuthenticated:", isAuthenticated);
  }, [role, isAuthenticated]);

  return (
    <Tabs screenOptions={{ headerShown: false, tabBarActiveTintColor: "#ffa704" }}>
      {/* CLIENT TABS */}
      <Tabs.Screen
        name="client/home"
        options={{
          title: "Accueil",
          tabBarIcon: ({ color, size }) => <Ionicons name="home-outline" size={size} color={color} />,
          href: role === "client" ? "/client/home" : null,
        }}
      />
      <Tabs.Screen
        name="client/deliveries"
        options={{
          title: "Mes Courses",
          tabBarIcon: ({ color, size }) => <Ionicons name="bicycle-outline" size={size} color={color} />,
          href: role === "client" ? "/client/deliveries" : null,
        }}
      />

      {/* LIVREUR TABS */}
      <Tabs.Screen
        name="livreur/missions"
        options={{
          title: "Mes Missions",
          tabBarIcon: ({ color, size }) => <Ionicons name="map-outline" size={size} color={color} />,
          href: role === "livreur" ? "/livreur/missions" : null,
        }}
      />

      {/* MANAGER/ADMIN TABS */}
      <Tabs.Screen
        name="manager/clients"
        options={{
          title: "Clients",
          tabBarIcon: ({ color, size }) => <Ionicons name="people-outline" size={size} color={color} />,
          href: (role === "manager" || role === "admin") ? "/manager/clients" : null,
        }}
      />
      <Tabs.Screen
        name="manager/livreurs"
        options={{
          title: "Livreurs",
          tabBarIcon: ({ color, size }) => <Ionicons name="bicycle-outline" size={size} color={color} />,
          href: (role === "manager" || role === "admin") ? "/manager/livreurs" : null,
        }}
      />
      <Tabs.Screen
        name="manager/requests"
        options={{
          title: "Demandes",
          tabBarIcon: ({ color, size }) => <Ionicons name="list-outline" size={size} color={color} />,
          href: (role === "manager" || role === "admin") ? "/manager/requests" : null,
        }}
      />

      {/* PROFILE TAB - Always visible for all roles */}
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profil",
          tabBarIcon: ({ color, size }) => <Ionicons name="person-outline" size={size} color={color} />,
        }}
      />
    </Tabs>
  );
}


// // app/(tabs)/_layout.tsx
// import { useAuthStore } from "@/store/authStore";
// import { Ionicons } from "@expo/vector-icons";
// import { Tabs } from "expo-router";

// export default function TabsLayout() {
//   const { role } = useAuthStore(); // "client" | "livreur" | "manager"

//   return (
//     <Tabs screenOptions={{ headerShown: false, tabBarActiveTintColor: "#ffa704" }}>
//       {role === "client" && (
//         <>
//           <Tabs.Screen
//             name="client/home"
//             options={{
//               title: "Accueil",
//               tabBarIcon: ({ color, size }) => (
//                 <Ionicons name="home-outline" size={size} color={color} />
//               ),
//             }}
//           />
//           <Tabs.Screen
//             name="client/deliveries"
//             options={{
//               title: "Courses",
//               tabBarIcon: ({ color, size }) => (
//                 <Ionicons name="bicycle-outline" size={size} color={color} />
//               ),
//             }}
//           />
//         </>
//       )}

//       {role === "livreur" && (
//         <Tabs.Screen
//           name="livreur/missions"
//           options={{
//             title: "Missions",
//             tabBarIcon: ({ color, size }) => (
//               <Ionicons name="map-outline" size={size} color={color} />
//             ),
//           }}
//         />
//       )}

//       {role === "manager" && (
//         <Tabs.Screen
//           name="manager/requests"
//           options={{
//             title: "Demandes",
//             tabBarIcon: ({ color, size }) => (
//               <Ionicons name="list-outline" size={size} color={color} />
//             ),
//           }}
//         />
//       )}

//       {/* ✅ always show profile */}
//       <Tabs.Screen
//         name="profile"
//         options={{
//           title: "Profil",
//           tabBarIcon: ({ color, size }) => (
//             <Ionicons name="person-outline" size={size} color={color} />
//           ),
//         }}
//       />
//     </Tabs>
//   );
// }



// // import { TabBarIcon } from "@/components/TabBarIcon";
// // import { useAuthStore } from "@/store/authStore";
// // import { Ionicons } from "@expo/vector-icons";
// // import { Tabs } from "expo-router";

// // const PRIMARY = "#FFA704";
// // const SECONDARY = "#002276";

// // export default function TabsLayout() {
// //   const role = useAuthStore(s => s.role);

// //   console.log("role",role)

// //   return (
// //     <Tabs
// //       screenOptions={{
// //         headerShown: false,
// //         tabBarActiveTintColor: PRIMARY,
// //         tabBarInactiveTintColor: SECONDARY,
// //       }}
// //     >
// //       {role === "client" && (
// //         <>
// //           <Tabs.Screen
// //             name="client/home"
// //             options={{
// //               title: "Accueil",
// //               tabBarIcon: ({ color, focused }) => (
// //                 <TabBarIcon
// //                   name={focused ? "search-circle" : "search-circle-outline"}
// //                   color={color}
// //                 />
// //               ),
// //             }}
// //           />
// //           <Tabs.Screen
// //             name="client/deliveries"
// //             options={{
// //               title: "Mes courses",
// //               tabBarIcon: ({ color, size }) => <Ionicons name="cube-outline" size={size} color={color} />,
// //             }}
// //           />
// //         </>
// //       )}

// //       {role === "livreur" && (
// //         <Tabs.Screen
// //           name="livreur/missions"
// //           options={{
// //             title: "Missions",
// //             tabBarIcon: ({ color, size }) => <Ionicons name="bicycle-outline" size={size} color={color} />,
// //           }}
// //         />
// //       )}

// //       {role === "manager" && (
// //         <Tabs.Screen
// //           name="manager/requests"
// //           options={{
// //             title: "Demandes",
// //             tabBarIcon: ({ color, size }) => <Ionicons name="briefcase-outline" size={size} color={color} />,
// //           }}
// //         />
// //       )}

// //       <Tabs.Screen
// //         name="profile"
// //         options={{
// //           title: "Profil",
// //           tabBarIcon: ({ color, size }) => <Ionicons name="person-outline" size={size} color={color} />,
// //         }}
// //       />
// //     </Tabs>
// //   );
// // }

