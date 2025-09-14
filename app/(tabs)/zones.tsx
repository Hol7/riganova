import { getZones } from '@/services/userService';
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
    View,
} from 'react-native';

interface Zone {
  id: number;
  nom_zone: string;
  area: string;
  prix: number;
  is_active: boolean;
  created_at: string;
  updated_at: string | null;
}

export default function ZonesScreen() {
  const [zones, setZones] = useState<Zone[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchZones = async () => {
    try {
      const data = await getZones();
      setZones(data);
    } catch (error) {
      console.error('Error fetching zones:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchZones();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    fetchZones();
  };

  const formatPrice = (price: number) => {
    return `${price.toLocaleString('fr-FR')} FCFA`;
  };

  const renderItem = ({ item }: { item: Zone }) => (
    <View style={[styles.card, !item.is_active && styles.inactiveCard]}>
      <View style={styles.cardHeader}>
        <View style={styles.zoneInfo}>
          <Text style={styles.zoneName}>{item.nom_zone}</Text>
          <Text style={styles.areaName}>{item.area}</Text>
        </View>
        <View style={[
          styles.statusBadge, 
          { backgroundColor: item.is_active ? COLORS.primary : '#757575' }
        ]}>
          <Text style={styles.statusText}>
            {item.is_active ? 'Active' : 'Inactive'}
          </Text>
        </View>
      </View>

      <View style={styles.priceContainer}>
        <Ionicons name="cash-outline" size={20} color={COLORS.primary} />
        <Text style={styles.priceText}>{formatPrice(item.prix)}</Text>
      </View>

      <View style={styles.cardFooter}>
        <Text style={styles.dateText}>
          Créée le {new Date(item.created_at).toLocaleDateString('fr-FR')}
        </Text>
        {item.updated_at && (
          <Text style={styles.dateText}>
            Mise à jour le {new Date(item.updated_at).toLocaleDateString('fr-FR')}
          </Text>
        )}
      </View>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={COLORS.primary} />
        <Text style={styles.loadingText}>Chargement des zones...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Zones de livraison</Text>
        <Text style={styles.headerSubtitle}>
          Consultez les zones disponibles et leurs tarifs
        </Text>
      </View>

      <FlatList
        data={zones}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContainer}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyIcon}>🗺️</Text>
            <Text style={styles.emptyTitle}>Aucune zone disponible</Text>
            <Text style={styles.emptyText}>
              Les zones de livraison apparaîtront ici une fois configurées.
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
  header: {
    backgroundColor: 'white',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 14,
    color: COLORS.textMuted,
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
  inactiveCard: {
    opacity: 0.6,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: spacing.sm,
  },
  zoneInfo: {
    flex: 1,
  },
  zoneName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 2,
  },
  areaName: {
    fontSize: 14,
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
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    padding: spacing.sm,
    borderRadius: 8,
    marginBottom: spacing.sm,
  },
  priceText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginLeft: spacing.xs,
  },
  cardFooter: {
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
