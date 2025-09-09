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

interface Livreur {
  id: string;
  nom: string;
  prenom: string;
  telephone: string;
  email?: string;
  status: 'available' | 'busy' | 'offline' | 'suspended';
  rating: number;
  total_deliveries: number;
  current_delivery?: string;
  created_at: string;
}

export default function LivreursScreen() {
  const [livreurs, setLivreurs] = useState<Livreur[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchLivreurs = async () => {
    try {
      // TODO: Replace with actual API call
      // const response = await api.get('/manager/livreurs');
      // setLivreurs(response.data);
      
      // Mock data for now
      const mockLivreurs: Livreur[] = [
        {
          id: '1',
          nom: 'Ouattara',
          prenom: 'Moussa',
          telephone: '+225 07 11 22 33 44',
          email: 'moussa.ouattara@riganova.com',
          status: 'available',
          rating: 4.8,
          total_deliveries: 156,
          created_at: '2023-12-01'
        },
        {
          id: '2',
          nom: 'Diabate',
          prenom: 'Sekou',
          telephone: '+225 05 55 66 77 88',
          status: 'busy',
          rating: 4.6,
          total_deliveries: 89,
          current_delivery: 'LIV-2024-001',
          created_at: '2024-01-15'
        },
        {
          id: '3',
          nom: 'Bamba',
          prenom: 'Fatou',
          telephone: '+225 01 99 88 77 66',
          email: 'fatou.bamba@riganova.com',
          status: 'offline',
          rating: 4.9,
          total_deliveries: 203,
          created_at: '2023-11-10'
        }
      ];
      setLivreurs(mockLivreurs);
    } catch (error) {
      console.error('Error fetching livreurs:', error);
      Alert.alert('Erreur', 'Impossible de charger la liste des livreurs');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchLivreurs();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    fetchLivreurs();
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available': return '#34C759';
      case 'busy': return '#FF9500';
      case 'offline': return '#8E8E93';
      case 'suspended': return '#FF3B30';
      default: return COLORS.textMuted;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'available': return 'Disponible';
      case 'busy': return 'En mission';
      case 'offline': return 'Hors ligne';
      case 'suspended': return 'Suspendu';
      default: return status;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'available': return 'checkmark-circle';
      case 'busy': return 'bicycle';
      case 'offline': return 'moon';
      case 'suspended': return 'ban';
      default: return 'help-circle';
    }
  };

  const handleLivreurAction = (livreur: Livreur) => {
    Alert.alert(
      `${livreur.prenom} ${livreur.nom}`,
      'Que voulez-vous faire ?',
      [
        { text: 'Voir détails', onPress: () => console.log('View details:', livreur.id) },
        { text: 'Assigner mission', onPress: () => console.log('Assign mission:', livreur.id) },
        { text: 'Modifier statut', onPress: () => console.log('Change status:', livreur.id) },
        { text: 'Annuler', style: 'cancel' }
      ]
    );
  };

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<Ionicons key={i} name="star" size={14} color="#FFD700" />);
    }
    if (hasHalfStar) {
      stars.push(<Ionicons key="half" name="star-half" size={14} color="#FFD700" />);
    }
    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<Ionicons key={`empty-${i}`} name="star-outline" size={14} color="#FFD700" />);
    }
    return stars;
  };

  const renderLivreur = ({ item }: { item: Livreur }) => (
    <TouchableOpacity
      style={[UI.card, { marginBottom: 12 }]}
      onPress={() => handleLivreurAction(item)}
    >
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <View style={{ flex: 1 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
            <Ionicons name="bicycle" size={24} color={COLORS.primary} />
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
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              {renderStars(item.rating)}
              <Text style={[UI.textSmall, { marginLeft: 4, color: COLORS.textMuted }]}>
                {item.rating}
              </Text>
            </View>
            <Text style={[UI.textSmall, { color: COLORS.textMuted, marginLeft: 16 }]}>
              📦 {item.total_deliveries} livraisons
            </Text>
          </View>

          {item.current_delivery && (
            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 4 }}>
              <Ionicons name="location" size={16} color={COLORS.primary} />
              <Text style={[UI.textSmall, { marginLeft: 6, color: COLORS.primary, fontWeight: '600' }]}>
                Mission en cours: {item.current_delivery}
              </Text>
            </View>
          )}
        </View>
        
        <View style={{ alignItems: 'flex-end' }}>
          <View style={{
            backgroundColor: getStatusColor(item.status),
            paddingHorizontal: 8,
            paddingVertical: 4,
            borderRadius: 12,
            marginBottom: 8,
            flexDirection: 'row',
            alignItems: 'center'
          }}>
            <Ionicons 
              name={getStatusIcon(item.status) as any} 
              size={12} 
              color="white" 
              style={{ marginRight: 4 }}
            />
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
          Chargement des livreurs...
        </Text>
      </View>
    );
  }

  const availableCount = livreurs.filter(l => l.status === 'available').length;
  const busyCount = livreurs.filter(l => l.status === 'busy').length;

  return (
    <View style={UI.screen}>
      <View style={[UI.header, { backgroundColor: 'white', paddingBottom: 16 }]}>
        <Text style={[UI.title, { color: COLORS.secondary }]}>
          🏍️ Gestion des Livreurs
        </Text>
        <View style={{ flexDirection: 'row', marginTop: 8 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: 16 }}>
            <View style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: '#34C759', marginRight: 4 }} />
            <Text style={[UI.textSmall, { color: COLORS.textMuted }]}>
              {availableCount} disponible{availableCount > 1 ? 's' : ''}
            </Text>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: '#FF9500', marginRight: 4 }} />
            <Text style={[UI.textSmall, { color: COLORS.textMuted }]}>
              {busyCount} en mission
            </Text>
          </View>
        </View>
      </View>

      <FlatList
        data={livreurs}
        renderItem={renderLivreur}
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
              Aucun livreur trouvé
            </Text>
            <Text style={[UI.textMedium, { marginTop: 8, color: COLORS.textMuted, textAlign: 'center' }]}>
              Les livreurs apparaîtront ici une fois qu'ils s'inscriront
            </Text>
          </View>
        }
      />
    </View>
  );
}
