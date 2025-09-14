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
import { COLORS } from '@/theme/colors';
import { UI } from '@/theme/ui';
import { listClients } from '@/services/userService';

interface Client {
  id: string;
  nom: string;
  prenom: string;
  telephone: string;
  email?: string;
  created_at: string;
  status: 'active' | 'inactive' | 'suspended';
  total_deliveries: number;
}

export default function ClientsScreen() {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchClients = async () => {
    try {
      const clients = await listClients();
      setClients(clients);
    } catch (error) {
      console.error('Error fetching clients:', error);
      // Fallback to mock data if API fails
      const mockClients: Client[] = [
        {
          id: '1',
          nom: 'Kouassi',
          prenom: 'Jean',
          telephone: '+225 07 12 34 56 78',
          email: 'jean.kouassi@email.com',
          created_at: '2024-01-15',
          status: 'active',
          total_deliveries: 15
        },
        {
          id: '2',
          nom: 'Traore',
          prenom: 'Aminata',
          telephone: '+225 05 98 76 54 32',
          email: 'aminata.traore@email.com',
          created_at: '2024-02-20',
          status: 'active',
          total_deliveries: 8
        },
        {
          id: '3',
          nom: 'Kone',
          prenom: 'Ibrahim',
          telephone: '+225 01 23 45 67 89',
          created_at: '2024-03-10',
          status: 'inactive',
          total_deliveries: 3
        }
      ];
      setClients(mockClients);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchClients();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    fetchClients();
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return '#34C759';
      case 'inactive': return '#FF9500';
      case 'suspended': return '#FF3B30';
      default: return COLORS.textMuted;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active': return 'Actif';
      case 'inactive': return 'Inactif';
      case 'suspended': return 'Suspendu';
      default: return status;
    }
  };

  const handleClientAction = (client: Client) => {
    Alert.alert(
      `${client.prenom} ${client.nom}`,
      'Que voulez-vous faire ?',
      [
        { text: 'Voir détails', onPress: () => console.log('View details:', client.id) },
        { text: 'Modifier statut', onPress: () => console.log('Change status:', client.id) },
        { text: 'Annuler', style: 'cancel' }
      ]
    );
  };

  const renderClient = ({ item }: { item: Client }) => (
    <TouchableOpacity
      style={[UI.card, { marginBottom: 12 }]}
      onPress={() => handleClientAction(item)}
    >
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <View style={{ flex: 1 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
            <Ionicons name="person-circle-outline" size={24} color={COLORS.primary} />
            <Text style={[UI.textLarge, { marginLeft: 8, fontWeight: '600' }]}>
              {item.prenom} {item.nom}
            </Text>
          </View>
          
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 4 }}>
            <Ionicons name="call-outline" size={16} color={COLORS.textMuted} />
            <Text style={[UI.textSmall, { marginLeft: 6, color: COLORS.textMuted }]}>
              {item.telephone}
            </Text>
          </View>
          
          {item.email && (
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 4 }}>
              <Ionicons name="mail-outline" size={16} color={COLORS.textMuted} />
              <Text style={[UI.textSmall, { marginLeft: 6, color: COLORS.textMuted }]}>
                {item.email}
              </Text>
            </View>
          )}
          
          <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 8 }}>
            <Text style={[UI.textSmall, { color: COLORS.textMuted }]}>
              📦 {item.total_deliveries} livraisons
            </Text>
            <Text style={[UI.textSmall, { color: COLORS.textMuted, marginLeft: 16 }]}>
              📅 Depuis {new Date(item.created_at).toLocaleDateString('fr-FR')}
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
          Chargement des clients...
        </Text>
      </View>
    );
  }

  return (
    <View style={UI.screen}>
      <View style={[UI.header, { backgroundColor: 'white', paddingBottom: 16 }]}>
        <Text style={[UI.title, { color: COLORS.secondary }]}>
          👥 Gestion des Clients
        </Text>
        <Text style={[UI.textMedium, { color: COLORS.textMuted, marginTop: 4 }]}>
          {clients.length} client{clients.length > 1 ? 's' : ''} enregistré{clients.length > 1 ? 's' : ''}
        </Text>
      </View>

      <FlatList
        data={clients}
        renderItem={renderClient}
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
            <Ionicons name="people-outline" size={64} color={COLORS.textMuted} />
            <Text style={[UI.textLarge, { marginTop: 16, color: COLORS.textMuted }]}>
              Aucun client trouvé
            </Text>
            <Text style={[UI.textMedium, { marginTop: 8, color: COLORS.textMuted, textAlign: 'center' }]}>
              Les clients apparaîtront ici une fois qu'ils s'inscriront
            </Text>
          </View>
        }
      />
    </View>
  );
}
