import { getDeliveryHistory } from '@/services/deliveryService';
import { COLORS } from '@/theme/colors';
import { spacing } from '@/theme/ui';
import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import {
    ActivityIndicator,
    FlatList,
    RefreshControl,
    StyleSheet,
    Text,
    View
} from 'react-native';

interface DeliveryHistory {
  id: number;
  type_colis: string;
  description: string;
  adresse_pickup: string;
  adresse_dropoff: string;
  statut: string;
  prix: number;
  client_id: number;
  client_nom: string;
  client_telephone: string;
  livreur_id: number | null;
  livreur_nom: string | null;
  livreur_telephone: string | null;
  created_at: string;
  updated_at: string | null;
}

export default function DeliveryHistory() {
  const [deliveries, setDeliveries] = useState<DeliveryHistory[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchHistory = async () => {
    try {
      const data = await getDeliveryHistory();
      setDeliveries(data);
    } catch (error) {
      console.error('Error fetching delivery history:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    fetchHistory();
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'en_attente': return '#FFA500';
      case 'assigne': return '#2196F3';
      case 'en_route_pickup': return '#9C27B0';
      case 'recupere': return '#FF9800';
      case 'en_route_dropoff': return '#3F51B5';
      case 'livre': return '#4CAF50';
      case 'annule': return '#F44336';
      default: return '#757575';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'en_attente': return 'En attente';
      case 'assigne': return 'Assigné';
      case 'en_route_pickup': return 'En route (récup.)';
      case 'recupere': return 'Récupéré';
      case 'en_route_dropoff': return 'En route (livr.)';
      case 'livre': return 'Livré';
      case 'annule': return 'Annulé';
      default: return status;
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'document': return '📄';
      case 'nourriture': return '🍕';
      case 'colis': return '📦';
      case 'autre': return '🎁';
      default: return '📦';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const renderItem = ({ item }: { item: DeliveryHistory }) => (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <View style={styles.typeContainer}>
          <Text style={styles.typeIcon}>{getTypeIcon(item.type_colis)}</Text>
          <Text style={styles.typeText}>{item.type_colis?.toUpperCase() || 'COLIS'}</Text>
        </View>
        <View style={[styles.statusBadge, { backgroundColor: getStatusColor(item.statut) }]}>
          <Text style={styles.statusText}>{getStatusText(item.statut)}</Text>
        </View>
      </View>

      <Text style={styles.description} numberOfLines={2}>
        {item.description || 'Aucune description'}
      </Text>

      <View style={styles.addressContainer}>
        <View style={styles.addressRow}>
          <Ionicons name="location-outline" size={16} color={COLORS.primary} />
          <Text style={styles.addressLabel}>Récupération:</Text>
        </View>
        <Text style={styles.addressText} numberOfLines={1}>
          {item.adresse_pickup}
        </Text>
      </View>

      <View style={styles.addressContainer}>
        <View style={styles.addressRow}>
          <Ionicons name="flag-outline" size={16} color={COLORS.secondary} />
          <Text style={styles.addressLabel}>Livraison:</Text>
        </View>
        <Text style={styles.addressText} numberOfLines={1}>
          {item.adresse_dropoff}
        </Text>
      </View>

      {item.livreur_nom && (
        <View style={styles.livreurContainer}>
          <Ionicons name="person-outline" size={16} color={COLORS.textMuted} />
          <Text style={styles.livreurText}>
            Livreur: {item.livreur_nom} ({item.livreur_telephone})
          </Text>
        </View>
      )}

      <View style={styles.cardFooter}>
        <Text style={styles.dateText}>
          Créé le {formatDate(item.created_at)}
        </Text>
        {item.updated_at && (
          <Text style={styles.dateText}>
            Mis à jour le {formatDate(item.updated_at)}
          </Text>
        )}
      </View>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={COLORS.primary} />
        <Text style={styles.loadingText}>Chargement de l'historique...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={deliveries}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContainer}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyIcon}>📋</Text>
            <Text style={styles.emptyTitle}>Aucun historique</Text>
            <Text style={styles.emptyText}>
              Votre historique de livraisons apparaîtra ici.
            </Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  listContainer: {
    padding: spacing.md,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: spacing.md,
    marginBottom: spacing.md,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  typeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  typeIcon: {
    fontSize: 20,
    marginRight: spacing.xs,
  },
  typeText: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.textMuted,
  },
  statusBadge: {
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
  },
  description: {
    fontSize: 16,
    fontWeight: '500',
    color: COLORS.text,
    marginBottom: spacing.sm,
  },
  addressContainer: {
    marginBottom: spacing.xs,
  },
  addressRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 2,
  },
  addressLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.textMuted,
    marginLeft: 4,
  },
  addressText: {
    fontSize: 14,
    color: COLORS.text,
    marginLeft: 20,
  },
  livreurContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: spacing.xs,
    paddingTop: spacing.xs,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  livreurText: {
    fontSize: 12,
    color: COLORS.textMuted,
    marginLeft: 4,
  },
  cardFooter: {
    marginTop: spacing.sm,
    paddingTop: spacing.xs,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  dateText: {
    fontSize: 11,
    color: COLORS.textMuted,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: spacing.sm,
    fontSize: 16,
    color: COLORS.textMuted,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 60,
  },
  emptyIcon: {
    fontSize: 48,
    marginBottom: spacing.md,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: spacing.xs,
  },
  emptyText: {
    fontSize: 14,
    color: COLORS.textMuted,
    textAlign: 'center',
    paddingHorizontal: spacing.lg,
  },
});
