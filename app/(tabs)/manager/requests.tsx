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
import { getAllDeliveries, assignDelivery } from '@/services/deliveryService';
import { listLivreurs } from '@/services/userService';

interface DeliveryRequest {
  id: string;
  type_colis: string;
  description?: string;
  adresse_pickup: string;
  adresse_dropoff: string;
  client_name: string;
  client_phone: string;
  statut: 'en_attente' | 'assigne' | 'en_route_pickup' | 'en_route_dropoff' | 'livre' | 'annule';
  livreur_id?: number;
  livreur_name?: string;
  created_at: string;
  prix?: number;
}

interface Livreur {
  id: number;
  nom: string;
  prenom: string;
  status: 'available' | 'busy' | 'offline';
}

export default function ManagerRequests() {
  const [requests, setRequests] = useState<DeliveryRequest[]>([]);
  const [livreurs, setLivreurs] = useState<Livreur[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchData = async () => {
    try {
      const [deliveries, availableLivreurs] = await Promise.all([
        getAllDeliveries(),
        listLivreurs()
      ]);
      setRequests(deliveries);
      setLivreurs(availableLivreurs);
    } catch (error) {
      console.error('Error fetching data:', error);
      // Fallback to mock data
      const mockRequests: DeliveryRequest[] = [
        {
          id: '1',
          type_colis: 'colis',
          description: 'Colis important à livrer rapidement',
          adresse_pickup: 'Cocody Riviera, Abidjan',
          adresse_dropoff: 'Yopougon Selmer, Abidjan',
          client_name: 'Jean Kouassi',
          client_phone: '+225 07 12 34 56 78',
          statut: 'en_attente',
          created_at: '2024-01-15T10:30:00Z',
          prix: 2500
        },
        {
          id: '2',
          type_colis: 'document',
          adresse_pickup: 'Plateau Centre, Abidjan',
          adresse_dropoff: 'Marcory Zone 4, Abidjan',
          client_name: 'Aminata Traore',
          client_phone: '+225 05 98 76 54 32',
          statut: 'assigne',
          livreur_name: 'Moussa Ouattara',
          created_at: '2024-01-15T09:15:00Z',
          prix: 1500
        }
      ];
      setRequests(mockRequests);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    fetchData();
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'en_attente': return '#FF9500';
      case 'assigne': return '#007AFF';
      case 'en_route_pickup': return '#34C759';
      case 'en_route_dropoff': return '#34C759';
      case 'livre': return '#34C759';
      case 'annule': return '#FF3B30';
      default: return COLORS.textMuted;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'en_attente': return 'En attente';
      case 'assigne': return 'Assignée';
      case 'en_route_pickup': return 'En route récupération';
      case 'en_route_dropoff': return 'En route livraison';
      case 'livre': return 'Livrée';
      case 'annule': return 'Annulée';
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

  const handleAssignDelivery = (request: DeliveryRequest) => {
    const availableLivreurs = livreurs.filter(l => l.status === 'available');
    
    if (availableLivreurs.length === 0) {
      Alert.alert('Aucun livreur disponible', 'Tous les livreurs sont occupés actuellement');
      return;
    }

    const options: any[] = availableLivreurs.map(livreur => ({
      text: `${livreur.prenom} ${livreur.nom}`,
      onPress: () => assignToLivreur(request.id, livreur.id, `${livreur.prenom} ${livreur.nom}`)
    }));

    options.push({ text: 'Annuler', style: 'cancel' });

    Alert.alert('Assigner à un livreur', 'Choisissez un livreur disponible:', options);
  };

  const assignToLivreur = async (requestId: string, livreurId: number, livreurName: string) => {
    try {
      await assignDelivery(parseInt(requestId), livreurId);
      
      setRequests(prev => prev.map(request => 
        request.id === requestId 
          ? { ...request, statut: 'assigne' as const, livreur_id: livreurId, livreur_name: livreurName }
          : request
      ));
      
      Alert.alert('Succès', `Livraison assignée à ${livreurName}`);
    } catch (error) {
      console.error('Error assigning delivery:', error);
      Alert.alert('Erreur', 'Impossible d\'assigner la livraison');
    }
  };

  const handleRequestAction = (request: DeliveryRequest) => {
    const actions: any[] = [];
    
    if (request.statut === 'en_attente') {
      actions.push({ text: 'Assigner à un livreur', onPress: () => handleAssignDelivery(request) });
    }
    
    actions.push(
      { text: 'Voir détails', onPress: () => console.log('View details:', request.id) },
      { text: 'Contacter client', onPress: () => console.log('Call client:', request.client_phone) },
      { text: 'Annuler', style: 'cancel' }
    );

    Alert.alert(`Demande ${request.type_colis}`, 'Que voulez-vous faire ?', actions);
  };

  const renderRequest = ({ item }: { item: DeliveryRequest }) => (
    <TouchableOpacity
      style={[UI.card, { marginBottom: 12 }]}
      onPress={() => handleRequestAction(item)}
    >
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <View style={{ flex: 1 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
            <Ionicons name={getTypeIcon(item.type_colis) as any} size={24} color={COLORS.primary} />
            <Text style={[UI.textLarge, { marginLeft: 8, fontWeight: '600' }]}>
              {item.type_colis} - {item.client_name}
            </Text>
          </View>
          
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 4 }}>
            <Ionicons name="location-outline" size={16} color={COLORS.textMuted} />
            <Text style={[UI.textSmall, { marginLeft: 6, color: COLORS.textMuted, flex: 1 }]}>
              De: {item.adresse_pickup}
            </Text>
          </View>
          
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
            <Ionicons name="flag-outline" size={16} color={COLORS.textMuted} />
            <Text style={[UI.textSmall, { marginLeft: 6, color: COLORS.textMuted, flex: 1 }]}>
              Vers: {item.adresse_dropoff}
            </Text>
          </View>

          {item.livreur_name && (
            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 4 }}>
              <Ionicons name="bicycle" size={16} color={COLORS.primary} />
              <Text style={[UI.textSmall, { marginLeft: 6, color: COLORS.primary, fontWeight: '600' }]}>
                Livreur: {item.livreur_name}
              </Text>
            </View>
          )}
          
          <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 8 }}>
            <Text style={[UI.textSmall, { color: COLORS.textMuted }]}>
              📅 {new Date(item.created_at).toLocaleDateString('fr-FR')}
            </Text>
            {item.prix && (
              <Text style={[UI.textSmall, { color: COLORS.primary, marginLeft: 16, fontWeight: '600' }]}>
                💰 {item.prix} FCFA
              </Text>
            )}
          </View>
        </View>
        
        <View style={{ alignItems: 'flex-end' }}>
          <View style={{
            backgroundColor: getStatusColor(item.statut),
            paddingHorizontal: 8,
            paddingVertical: 4,
            borderRadius: 12,
            marginBottom: 8
          }}>
            <Text style={{ color: 'white', fontSize: 12, fontWeight: '600' }}>
              {getStatusText(item.statut)}
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
          Chargement des demandes...
        </Text>
      </View>
    );
  }

  const pendingRequests = requests.filter(r => r.statut === 'en_attente').length;
  const assignedRequests = requests.filter(r => r.statut === 'assigne').length;

  return (
    <View style={UI.screen}>
      <View style={[UI.header, { backgroundColor: 'white', paddingBottom: 16 }]}>
        <Text style={[UI.title, { color: COLORS.secondary }]}>
          📋 Demandes de Livraison
        </Text>
        <View style={{ flexDirection: 'row', marginTop: 8 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: 16 }}>
            <View style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: '#FF9500', marginRight: 4 }} />
            <Text style={[UI.textSmall, { color: COLORS.textMuted }]}>
              {pendingRequests} en attente
            </Text>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: '#007AFF', marginRight: 4 }} />
            <Text style={[UI.textSmall, { color: COLORS.textMuted }]}>
              {assignedRequests} assignée{assignedRequests > 1 ? 's' : ''}
            </Text>
          </View>
        </View>
      </View>

      <FlatList
        data={requests}
        renderItem={renderRequest}
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
            <Ionicons name="clipboard-outline" size={64} color={COLORS.textMuted} />
            <Text style={[UI.textLarge, { marginTop: 16, color: COLORS.textMuted }]}>
              Aucune demande trouvée
            </Text>
            <Text style={[UI.textMedium, { marginTop: 8, color: COLORS.textMuted, textAlign: 'center' }]}>
              Les demandes de livraison apparaîtront ici
            </Text>
          </View>
        }
      />
    </View>
  );
}
