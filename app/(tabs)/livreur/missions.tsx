import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  RefreshControl,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { COLORS } from '@/theme/colors';
import { UI } from '@/theme/ui';
import { useAuthStore } from '@/store/authStore';

interface Mission {
  id: string;
  type: string;
  pickup_address: string;
  dropoff_address: string;
  client_name: string;
  client_phone: string;
  status: 'assigned' | 'pickup_in_progress' | 'in_transit' | 'delivered' | 'cancelled';
  created_at: string;
  estimated_duration: number;
  distance: number;
  price: number;
}

export default function LivreurMissions() {
  const [missions, setMissions] = useState<Mission[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const router = useRouter();
  const { user } = useAuthStore();

  const fetchMissions = async () => {
    try {
      // TODO: Replace with actual API call
      // const response = await api.get('/livreur/missions');
      // setMissions(response.data);
      
      // Mock data for now
      const mockMissions: Mission[] = [
        {
          id: '1',
          type: 'Colis',
          pickup_address: 'Cocody Riviera, Abidjan',
          dropoff_address: 'Yopougon Selmer, Abidjan',
          client_name: 'Jean Kouassi',
          client_phone: '+225 07 12 34 56 78',
          status: 'assigned',
          created_at: '2024-01-15T10:30:00Z',
          estimated_duration: 45,
          distance: 12.5,
          price: 2500
        },
        {
          id: '2',
          type: 'Document',
          pickup_address: 'Plateau Centre, Abidjan',
          dropoff_address: 'Marcory Zone 4, Abidjan',
          client_name: 'Aminata Traore',
          client_phone: '+225 05 98 76 54 32',
          status: 'pickup_in_progress',
          created_at: '2024-01-15T09:15:00Z',
          estimated_duration: 30,
          distance: 8.2,
          price: 1500
        }
      ];
      setMissions(mockMissions);
    } catch (error) {
      console.error('Error fetching missions:', error);
      Alert.alert('Erreur', 'Impossible de charger vos missions');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchMissions();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    fetchMissions();
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'assigned': return '#FF9500';
      case 'pickup_in_progress': return '#007AFF';
      case 'in_transit': return '#34C759';
      case 'delivered': return '#34C759';
      case 'cancelled': return '#FF3B30';
      default: return COLORS.textMuted;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'assigned': return 'Assignée';
      case 'pickup_in_progress': return 'Récupération en cours';
      case 'in_transit': return 'En transit';
      case 'delivered': return 'Livrée';
      case 'cancelled': return 'Annulée';
      default: return status;
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case 'colis': return 'cube-outline';
      case 'document': return 'document-outline';
      case 'nourriture': return 'restaurant-outline';
      default: return 'bag-outline';
    }
  };

  const handleMissionAction = (mission: Mission) => {
    const actions = [];
    
    if (mission.status === 'assigned') {
      actions.push({ text: 'Commencer récupération', onPress: () => updateMissionStatus(mission.id, 'pickup_in_progress') });
    } else if (mission.status === 'pickup_in_progress') {
      actions.push({ text: 'Colis récupéré', onPress: () => updateMissionStatus(mission.id, 'in_transit') });
    } else if (mission.status === 'in_transit') {
      actions.push({ text: 'Marquer comme livré', onPress: () => updateMissionStatus(mission.id, 'delivered') });
    }
    
    actions.push(
      { text: 'Voir détails', onPress: () => router.push(`/livreur/mission/${mission.id}`) },
      { text: 'Contacter client', onPress: () => console.log('Call client:', mission.client_phone) },
      { text: 'Annuler', style: 'cancel' as const }
    );

    Alert.alert(`Mission ${mission.type}`, 'Que voulez-vous faire ?', actions);
  };

  const updateMissionStatus = (missionId: string, newStatus: string) => {
    // TODO: API call to update mission status
    console.log('Updating mission status:', missionId, newStatus);
    
    setMissions(prev => prev.map(mission => 
      mission.id === missionId 
        ? { ...mission, status: newStatus as any }
        : mission
    ));
    
    Alert.alert('Succès', 'Statut de la mission mis à jour');
  };

  const renderMission = ({ item }: { item: Mission }) => (
    <TouchableOpacity
      style={[UI.card, { marginBottom: 12 }]}
      onPress={() => handleMissionAction(item)}
    >
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <View style={{ flex: 1 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
            <Ionicons name={getTypeIcon(item.type) as any} size={24} color={COLORS.primary} />
            <Text style={[UI.textLarge, { marginLeft: 8, fontWeight: '600' }]}>
              {item.type} - {item.client_name}
            </Text>
          </View>
          
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 4 }}>
            <Ionicons name="location-outline" size={16} color={COLORS.textMuted} />
            <Text style={[UI.textSmall, { marginLeft: 6, color: COLORS.textMuted, flex: 1 }]}>
              De: {item.pickup_address}
            </Text>
          </View>
          
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
            <Ionicons name="flag-outline" size={16} color={COLORS.textMuted} />
            <Text style={[UI.textSmall, { marginLeft: 6, color: COLORS.textMuted, flex: 1 }]}>
              Vers: {item.dropoff_address}
            </Text>
          </View>
          
          <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 8 }}>
            <Text style={[UI.textSmall, { color: COLORS.textMuted }]}>
              📏 {item.distance} km
            </Text>
            <Text style={[UI.textSmall, { color: COLORS.textMuted, marginLeft: 16 }]}>
              ⏱️ {item.estimated_duration} min
            </Text>
            <Text style={[UI.textSmall, { color: COLORS.primary, marginLeft: 16, fontWeight: '600' }]}>
              💰 {item.price} FCFA
            </Text>
          </View>
        </View>
        
        <View style={{ alignItems: 'flex-end' }}>
          <View style={{
            backgroundColor: getStatusColor(item.status),
            paddingHorizontal: 8,
            paddingVertical: 4,
            borderRadius: 12,
            marginBottom: 8
          }}>
            <Text style={{ color: 'white', fontSize: 12, fontWeight: '600' }}>
              {getStatusText(item.status)}
            </Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color={COLORS.textMuted} />
        </View>
      </View>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={[UI.screen, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" color={COLORS.primary} />
        <Text style={[UI.textMedium, { marginTop: 16, color: COLORS.textMuted }]}>
          Chargement de vos missions...
        </Text>
      </View>
    );
  }

  const assignedMissions = missions.filter(m => m.status === 'assigned').length;
  const inProgressMissions = missions.filter(m => m.status === 'pickup_in_progress' || m.status === 'in_transit').length;

  return (
    <View style={UI.screen}>
      <View style={[UI.header, { backgroundColor: 'white', paddingBottom: 16 }]}>
        <Text style={[UI.title, { color: COLORS.secondary }]}>
          🏍️ Mes Missions
        </Text>
        <Text style={[UI.textMedium, { color: COLORS.textMuted, marginTop: 4 }]}>
          Bonjour {user?.prenom || 'Livreur'} !
        </Text>
        <View style={{ flexDirection: 'row', marginTop: 8 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: 16 }}>
            <View style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: '#FF9500', marginRight: 4 }} />
            <Text style={[UI.textSmall, { color: COLORS.textMuted }]}>
              {assignedMissions} assignée{assignedMissions > 1 ? 's' : ''}
            </Text>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: '#007AFF', marginRight: 4 }} />
            <Text style={[UI.textSmall, { color: COLORS.textMuted }]}>
              {inProgressMissions} en cours
            </Text>
          </View>
        </View>
      </View>

      <FlatList
        data={missions}
        renderItem={renderMission}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 16 }}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={[COLORS.primary]}
          />
        }
        ListEmptyComponent={
          <View style={{ alignItems: 'center', marginTop: 50 }}>
            <Ionicons name="bicycle-outline" size={64} color={COLORS.textMuted} />
            <Text style={[UI.textLarge, { marginTop: 16, color: COLORS.textMuted }]}>
              Aucune mission assignée
            </Text>
            <Text style={[UI.textMedium, { marginTop: 8, color: COLORS.textMuted, textAlign: 'center' }]}>
              Vos missions apparaîtront ici une fois qu'elles vous seront assignées
            </Text>
          </View>
        }
      />
    </View>
  );
}
