import { useAuthStore } from "@/store/authStore";
import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";

export default function TabsLayout() {
  const { role } = useAuthStore();

  return (
    <Tabs screenOptions={{ headerShown: false, tabBarActiveTintColor: "#ffa704" }}>
      {role === "client" && (
        <>
          <Tabs.Screen
            name="client/home"
            options={{
              title: "Accueil",
              tabBarIcon: ({ color, size }) => <Ionicons name="home-outline" size={size} color={color} />,
            }}
          />
          <Tabs.Screen
            name="client/deliveries"
            options={{
              title: "Courses",
              tabBarIcon: ({ color, size }) => <Ionicons name="bicycle-outline" size={size} color={color} />,
            }}
          />
        </>
      )}

      {role === "livreur" && (
        <Tabs.Screen
          name="livreur/missions"
          options={{
            title: "Missions",
            tabBarIcon: ({ color, size }) => <Ionicons name="map-outline" size={size} color={color} />,
          }}
        />
      )}

      {role === "manager" && (
        <Tabs.Screen
          name="manager/requests"
          options={{
            title: "Demandes",
            tabBarIcon: ({ color, size }) => <Ionicons name="list-outline" size={size} color={color} />,
          }}
        />
      )}

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

