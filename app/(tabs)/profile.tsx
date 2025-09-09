import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { COLORS } from '@/theme/colors';
import { UI } from '@/theme/ui';
import { useAuthStore } from '@/store/authStore';

export default function ProfileScreen() {
  const { user, role, logout } = useAuthStore();
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

  const getRoleText = (role: string) => {
    switch (role) {
      case 'client': return 'Client';
      case 'livreur': return 'Livreur';
      case 'manager': return 'Manager';
      case 'admin': return 'Administrateur';
      default: return role;
    }
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'client': return 'person-outline';
      case 'livreur': return 'bicycle-outline';
      case 'manager': return 'briefcase-outline';
      case 'admin': return 'shield-outline';
      default: return 'person-outline';
    }
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
    <ScrollView style={UI.screen}>
      <View style={[UI.header, { backgroundColor: 'white', paddingBottom: 24 }]}>
        <Text style={[UI.title, { color: COLORS.secondary }]}>
          👤 Mon Profil
        </Text>
      </View>

      {/* User Info Card */}
      <View style={[UI.card, { margin: 16, marginBottom: 24 }]}>
        <View style={{ alignItems: 'center', paddingVertical: 16 }}>
          <View style={{
            width: 80,
            height: 80,
            borderRadius: 40,
            backgroundColor: COLORS.primary,
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: 16
          }}>
            <Ionicons name={getRoleIcon(role || 'client') as any} size={40} color="white" />
          </View>
          
          <Text style={[UI.textLarge, { marginBottom: 4 }]}>
            {user?.prenom} {user?.nom}
          </Text>
          
          <View style={{
            backgroundColor: COLORS.primary,
            paddingHorizontal: 12,
            paddingVertical: 6,
            borderRadius: 16,
            marginBottom: 8
          }}>
            <Text style={{ color: 'white', fontSize: 14, fontWeight: '600' }}>
              {getRoleText(role || 'client')}
            </Text>
          </View>
          
          <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 8 }}>
            <Ionicons name="call-outline" size={16} color={COLORS.textMuted} />
            <Text style={[UI.textSmall, { marginLeft: 6, color: COLORS.textMuted }]}>
              {user?.telephone}
            </Text>
          </View>
          
          {user?.email && (
            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 4 }}>
              <Ionicons name="mail-outline" size={16} color={COLORS.textMuted} />
              <Text style={[UI.textSmall, { marginLeft: 6, color: COLORS.textMuted }]}>
                {user.email}
              </Text>
            </View>
          )}
        </View>
      </View>

      {/* Profile Options */}
      <View style={{ paddingHorizontal: 16 }}>
        {profileOptions.map((option, index) => (
          <TouchableOpacity
            key={index}
            style={[UI.card, { marginBottom: 12, flexDirection: 'row', alignItems: 'center' }]}
            onPress={option.onPress}
          >
            <View style={{
              width: 40,
              height: 40,
              borderRadius: 20,
              backgroundColor: '#F0F0F0',
              justifyContent: 'center',
              alignItems: 'center',
              marginRight: 16
            }}>
              <Ionicons name={option.icon as any} size={20} color={COLORS.primary} />
            </View>
            
            <View style={{ flex: 1 }}>
              <Text style={[UI.textMedium, { fontWeight: '600', marginBottom: 2 }]}>
                {option.title}
              </Text>
              <Text style={[UI.textSmall, { color: COLORS.textMuted }]}>
                {option.subtitle}
              </Text>
            </View>
            
            <Ionicons name="chevron-forward" size={20} color={COLORS.textMuted} />
          </TouchableOpacity>
        ))}
      </View>

      {/* Logout Button */}
      <View style={{ padding: 16, paddingTop: 24 }}>
        <TouchableOpacity
          style={{
            backgroundColor: '#FF3B30',
            paddingVertical: 16,
            paddingHorizontal: 24,
            borderRadius: 12,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center'
          }}
          onPress={handleLogout}
        >
          <Ionicons name="log-out-outline" size={20} color="white" style={{ marginRight: 8 }} />
          <Text style={{ color: 'white', fontSize: 16, fontWeight: '600' }}>
            Se déconnecter
          </Text>
        </TouchableOpacity>
      </View>

      {/* App Info */}
      <View style={{ alignItems: 'center', padding: 16, paddingBottom: 32 }}>
        <Text style={[UI.textSmall, { color: COLORS.textMuted, marginBottom: 4 }]}>
          RIGANOVA
        </Text>
        <Text style={[UI.textSmall, { color: COLORS.textMuted }]}>
          Version 1.0.0
        </Text>
      </View>
    </ScrollView>
  );
}