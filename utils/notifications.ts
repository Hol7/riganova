import { Audio } from 'expo-av';

// Config notifications foreground
// Notifications.setNotificationHandler({
//   handleNotification: async () => ({
//     shouldShowAlert: true,
//     shouldPlaySound: false,
//     shouldSetBadge: false,
//   }),
// });

// Fonction pour demander la permission
// export async function registerForPushNotificationsAsync() {
//   const { status: existingStatus } = await Notifications.getPermissionsAsync();
//   let finalStatus = existingStatus;

//   if (existingStatus !== 'granted') {
//     const { status } = await Notifications.requestPermissionsAsync();
//     finalStatus = status;
//   }

//   if (finalStatus !== 'granted') return null;

//   const tokenData = await Notifications.getExpoPushTokenAsync();
//   return tokenData.data;
// }

// Fonction pour jouer un son local
export async function playNotification() {
  const { sound } = await Audio.Sound.createAsync(
    require('@/assets/sounds/notification_sound.mp3')
  );
  await sound.playAsync();
}
