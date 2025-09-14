import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Alert,
  StyleSheet,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { COLORS } from '@/theme/colors';
import { useAuthStore } from '@/store/authStore';

export default function ProfileScreen() {
  const user = useAuthStore((s) => s.user);
  const logout = useAuthStore((s) => s.logout);
  const router = useRouter();

  const handleLogout = () => {
    Alert.alert(
      'Déconnexion',
      'Êtes-vous sûr de vouloir vous déconnecter ?',
      [
        { text: 'Annuler', style: 'cancel' },
        { 
          text: 'Déconnexion', 
          style: 'destructive',
          onPress: async () => {
            await logout();
            router.replace('/(auth)/login');
          }
        }
      ]
    );
  };

  const profileOptions = [
    {
      icon: 'person-outline',
      title: 'Informations personnelles',
      subtitle: 'Modifier vos informations',
      onPress: () => console.log('Edit profile')
    },
    {
      icon: 'notifications-outline',
      title: 'Notifications',
      subtitle: 'Gérer vos notifications',
      onPress: () => console.log('Notifications')
    },
    {
      icon: 'help-circle-outline',
      title: 'Aide & Support',
      subtitle: 'Obtenir de l\'aide',
      onPress: () => console.log('Help')
    },
    {
      icon: 'information-circle-outline',
      title: 'À propos',
      subtitle: 'Version de l\'application',
      onPress: () => console.log('About')
    }
  ];

  return (
    <ScrollView style={styles.screen}>
      <View style={styles.header}>
        <Text style={styles.title}>
          👤 Mon Profil
        </Text>
      </View>

      {/* User Info Card */}
      <View style={styles.card}>
        <View style={styles.userInfo}>
          <View style={styles.avatar}>
            <Ionicons name="person-outline" size={40} color="white" />
          </View>
          
          <Text style={styles.userName}>
            {user?.prenom} {user?.nom}
          </Text>
          
          <View style={styles.roleBadge}>
            <Text style={styles.roleText}>Client</Text>
          </View>
          
          <View style={styles.contactInfo}>
            <Ionicons name="call-outline" size={16} color={COLORS.textMuted} />
            <Text style={styles.contactText}>
              {user?.telephone}
            </Text>
          </View>
          
          {user?.email && (
            <View style={styles.contactInfo}>
              <Ionicons name="mail-outline" size={16} color={COLORS.textMuted} />
              <Text style={styles.contactText}>
                {user.email}
              </Text>
            </View>
          )}
        </View>
      </View>

      {/* Profile Options */}
      <View style={styles.optionsContainer}>
        {profileOptions.map((option, index) => (
          <TouchableOpacity
            key={index}
            style={styles.optionCard}
            onPress={option.onPress}
          >
            <View style={styles.optionIcon}>
              <Ionicons name={option.icon as any} size={20} color={COLORS.primary} />
            </View>
            
            <View style={styles.optionContent}>
              <Text style={styles.optionTitle}>
                {option.title}
              </Text>
              <Text style={styles.optionSubtitle}>
                {option.subtitle}
              </Text>
            </View>
            
            <Ionicons name="chevron-forward" size={20} color={COLORS.textMuted} />
          </TouchableOpacity>
        ))}
      </View>

      {/* Logout Button */}
      <View style={styles.logoutContainer}>
        <TouchableOpacity
          style={styles.logoutButton}
          onPress={handleLogout}
        >
          <Ionicons name="log-out-outline" size={20} color="white" />
          <Text style={styles.logoutText}>
            Se déconnecter
          </Text>
        </TouchableOpacity>
      </View>

      {/* App Info */}
      <View style={styles.appInfo}>
        <Text style={styles.appName}>RIGANOVA</Text>
        <Text style={styles.appVersion}>Version 1.0.0</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  header: {
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 20,
    backgroundColor: 'white',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: COLORS.secondary,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 16,
    margin: 16,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },
  userInfo: {
    alignItems: 'center',
    paddingVertical: 16,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  userName: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: 4,
  },
  roleBadge: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginBottom: 8,
  },
  roleText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
  contactInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  contactText: {
    fontSize: 14,
    color: COLORS.textMuted,
    marginLeft: 6,
  },
  optionsContainer: {
    paddingHorizontal: 16,
  },
  optionCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },
  optionIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F0F0F0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  optionContent: {
    flex: 1,
  },
  optionTitle: {
    fontSize: 16,
    color: COLORS.text,
    fontWeight: '600',
    marginBottom: 2,
  },
  optionSubtitle: {
    fontSize: 14,
    color: COLORS.textMuted,
  },
  logoutContainer: {
    padding: 16,
    paddingTop: 24,
  },
  logoutButton: {
    backgroundColor: '#FF3B30',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoutText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  appInfo: {
    alignItems: 'center',
    padding: 16,
    paddingBottom: 32,
  },
  appName: {
    fontSize: 12,
    color: COLORS.textMuted,
    marginBottom: 4,
  },
  appVersion: {
    fontSize: 12,
    color: COLORS.textMuted,
  },
});