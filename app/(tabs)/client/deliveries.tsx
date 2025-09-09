import { getDeliveries } from '@/store/deliveryStore';
import { COLORS } from '@/theme/colors';
import { spacing } from '@/theme/ui';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { 
  FlatList, 
  StyleSheet, 
  Text, 
  TouchableOpacity, 
  View, 
  ActivityIndicator,
  RefreshControl,
  ScrollView
} from 'react-native';

export default function ClientDeliveries() {
  const [deliveries, setDeliveries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const router = useRouter();

  const fetchDeliveries = async () => {
    try {
      const data = await getDeliveries();
      setDeliveries(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchDeliveries();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    fetchDeliveries();
  };

  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'en_attente': return '#FFA704';
      case 'en_route_pickup': return '#007AFF';
      case 'arrive_pickup': return '#34C759';
      case 'en_route_dropoff': return '#007AFF';
      case 'livre': return '#34C759';
      case 'annule': return '#FF3B30';
      default: return COLORS.textMuted;
    }
  };

  const getStatusText = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'en_attente': return 'En attente';
      case 'en_route_pickup': return 'En route vers récupération';
      case 'arrive_pickup': return 'Arrivé au point de récupération';
      case 'en_route_dropoff': return 'En route vers livraison';
      case 'livre': return 'Livré';
      case 'annule': return 'Annulé';
      default: return status;
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type?.toLowerCase()) {
      case 'document': return '📄';
      case 'repas': return '🍕';
      case 'objet': return '📦';
      case 'autre': return '🎁';
      default: return '📦';
    }
  };

  const renderItem = ({ item }: any) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => router.push(`/client/delivery/${item.id}`)}
      activeOpacity={0.7}
    >
      <View style={styles.cardHeader}>
        <View style={styles.typeContainer}>
          <Text style={styles.typeIcon}>{getTypeIcon(item.type_colis)}</Text>
          <Text style={styles.typeText}>{item.type_colis?.toUpperCase() || 'COLIS'}</Text>
        </View>
        <View style={[styles.statusBadge, { backgroundColor: getStatusColor(item.statut) }]}>
          <Text style={styles.statusText}>{getStatusText(item.statut)}</Text>
        </View>
      </View>

      <View style={styles.addressContainer}>
        <View style={styles.addressRow}>
          <Text style={styles.addressIcon}>📍</Text>
          <View style={styles.addressContent}>
            <Text style={styles.addressLabel}>Récupération</Text>
            <Text style={styles.addressText} numberOfLines={2}>
              {item.adresse_pickup || 'Adresse non spécifiée'}
            </Text>
          </View>
        </View>

        <View style={styles.addressRow}>
          <Text style={styles.addressIcon}>🎯</Text>
          <View style={styles.addressContent}>
            <Text style={styles.addressLabel}>Livraison</Text>
            <Text style={styles.addressText} numberOfLines={2}>
              {item.adresse_dropoff || 'Adresse non spécifiée'}
            </Text>
          </View>
        </View>
      </View>

      {item.description && (
        <View style={styles.descriptionContainer}>
          <Text style={styles.descriptionText} numberOfLines={2}>
            💬 {item.description}
          </Text>
        </View>
      )}

      <View style={styles.cardFooter}>
        <Text style={styles.dateText}>
          {item.created_at ? new Date(item.created_at).toLocaleDateString('fr-FR') : 'Date inconnue'}
        </Text>
        <Text style={styles.viewMoreText}>Voir détails →</Text>
      </View>
    </TouchableOpacity>
  );

  const renderEmptyState = () => (
    <ScrollView 
      contentContainerStyle={styles.emptyContainer}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
    >
      <Text style={styles.emptyIcon}>📦</Text>
      <Text style={styles.emptyTitle}>Aucune livraison</Text>
      <Text style={styles.emptyText}>
        Vous n'avez pas encore de livraisons. Créez votre première demande depuis l'onglet Accueil.
      </Text>
      <TouchableOpacity 
        style={styles.emptyButton}
        onPress={() => router.push('/(tabs)/client/home')}
      >
        <Text style={styles.emptyButtonText}>Créer une livraison</Text>
      </TouchableOpacity>
    </ScrollView>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={COLORS.primary} />
        <Text style={styles.loadingText}>Chargement de vos livraisons...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Mes livraisons</Text>
        <Text style={styles.headerSubtitle}>
          {deliveries.length} livraison{deliveries.length !== 1 ? 's' : ''}
        </Text>
      </View>

      {deliveries.length === 0 ? (
        renderEmptyState()
      ) : (
        <FlatList
          data={deliveries}
          keyExtractor={(item: any) => item.id?.toString() || Math.random().toString()}
          renderItem={renderItem}
          contentContainerStyle={styles.listContainer}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.bg,
  },
  header: {
    padding: spacing(5),
    paddingBottom: spacing(3),
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: spacing(1),
  },
  headerSubtitle: {
    fontSize: 16,
    color: COLORS.textMuted,
  },
  listContainer: {
    padding: spacing(5),
    paddingTop: 0,
  },
  card: {
    backgroundColor: COLORS.surface,
    borderRadius: 16,
    padding: spacing(4),
    marginBottom: spacing(4),
    borderWidth: 1,
    borderColor: COLORS.border,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing(3),
  },
  typeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  typeIcon: {
    fontSize: 20,
    marginRight: spacing(2),
  },
  typeText: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.text,
  },
  statusBadge: {
    paddingHorizontal: spacing(3),
    paddingVertical: spacing(1),
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  addressContainer: {
    marginBottom: spacing(3),
  },
  addressRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: spacing(2),
  },
  addressIcon: {
    fontSize: 16,
    marginRight: spacing(2),
    marginTop: 2,
  },
  addressContent: {
    flex: 1,
  },
  addressLabel: {
    fontSize: 12,
    fontWeight: '500',
    color: COLORS.textMuted,
    marginBottom: spacing(1),
  },
  addressText: {
    fontSize: 14,
    color: COLORS.text,
    lineHeight: 18,
  },
  descriptionContainer: {
    backgroundColor: COLORS.bg,
    padding: spacing(3),
    borderRadius: 8,
    marginBottom: spacing(3),
  },
  descriptionText: {
    fontSize: 14,
    color: COLORS.textMuted,
    fontStyle: 'italic',
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: spacing(2),
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  dateText: {
    fontSize: 12,
    color: COLORS.textMuted,
  },
  viewMoreText: {
    fontSize: 14,
    color: COLORS.primary,
    fontWeight: '500',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.bg,
  },
  loadingText: {
    marginTop: spacing(4),
    fontSize: 16,
    color: COLORS.textMuted,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing(8),
  },
  emptyIcon: {
    fontSize: 64,
    marginBottom: spacing(4),
  },
  emptyTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: spacing(2),
  },
  emptyText: {
    fontSize: 16,
    color: COLORS.textMuted,
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: spacing(6),
  },
  emptyButton: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: spacing(6),
    paddingVertical: spacing(3),
    borderRadius: 12,
  },
  emptyButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});
