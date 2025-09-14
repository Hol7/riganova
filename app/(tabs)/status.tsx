import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams } from 'expo-router';
import { getDeliveryStatus } from '@/services/deliveryService';
import { COLORS } from '@/theme/colors';
import { spacing } from '@/theme/ui';

interface DeliveryStatus {
  delivery_id: number;
  status: string;
  updated_at: string;
}

export default function DeliveryStatusScreen() {
  const { id } = useLocalSearchParams();
  const [status, setStatus] = useState<DeliveryStatus | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchStatus = async () => {
    try {
      if (!id) return;
      const data = await getDeliveryStatus(Number(id));
      setStatus(data);
    } catch (error) {
      console.error('Error fetching delivery status:', error);
      Alert.alert('Erreur', 'Impossible de récupérer le statut de la livraison');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStatus();
    
    // Set up polling for real-time updates
    const interval = setInterval(fetchStatus, 5000); // Poll every 5 seconds
    
    return () => clearInterval(interval);
  }, [id]);

  const getStatusColor = (statusValue: string) => {
    switch (statusValue) {
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

  const getStatusText = (statusValue: string) => {
    switch (statusValue) {
      case 'en_attente': return 'En attente';
      case 'assigne': return 'Assigné';
      case 'en_route_pickup': return 'En route pour récupération';
      case 'recupere': return 'Colis récupéré';
      case 'en_route_dropoff': return 'En route pour livraison';
      case 'livre': return 'Livré avec succès';
      case 'annule': return 'Annulé';
      default: return statusValue;
    }
  };

  const getStatusIcon = (statusValue: string) => {
    switch (statusValue) {
      case 'en_attente': return 'time-outline';
      case 'assigne': return 'person-add-outline';
      case 'en_route_pickup': return 'car-outline';
      case 'recupere': return 'checkmark-circle-outline';
      case 'en_route_dropoff': return 'navigate-outline';
      case 'livre': return 'checkmark-done-outline';
      case 'annule': return 'close-circle-outline';
      default: return 'help-outline';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={COLORS.primary} />
        <Text style={styles.loadingText}>Chargement du statut...</Text>
      </View>
    );
  }

  if (!status) {
    return (
      <View style={styles.errorContainer}>
        <Ionicons name="alert-circle-outline" size={64} color={COLORS.textMuted} />
        <Text style={styles.errorTitle}>Statut introuvable</Text>
        <Text style={styles.errorText}>
          Impossible de récupérer le statut de cette livraison.
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Suivi de livraison</Text>
        <Text style={styles.headerSubtitle}>
          Livraison #{status.delivery_id}
        </Text>
      </View>

      <View style={styles.statusCard}>
        <View style={[styles.statusIcon, { backgroundColor: getStatusColor(status.status) }]}>
          <Ionicons 
            name={getStatusIcon(status.status) as any} 
            size={40} 
            color="white" 
          />
        </View>
        
        <Text style={styles.statusTitle}>
          {getStatusText(status.status)}
        </Text>
        
        <Text style={styles.statusDescription}>
          Dernière mise à jour: {formatDate(status.updated_at)}
        </Text>
      </View>

      <View style={styles.infoCard}>
        <View style={styles.infoRow}>
          <Ionicons name="refresh-outline" size={20} color={COLORS.primary} />
          <Text style={styles.infoText}>
            Le statut se met à jour automatiquement toutes les 5 secondes
          </Text>
        </View>
        
        <View style={styles.infoRow}>
          <Ionicons name="notifications-outline" size={20} color={COLORS.primary} />
          <Text style={styles.infoText}>
            Vous recevrez une notification à chaque changement de statut
          </Text>
        </View>
      </View>
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
    paddingVertical: spacing.lg,
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
    fontSize: 16,
    color: COLORS.textMuted,
  },
  statusCard: {
    backgroundColor: 'white',
    margin: spacing.lg,
    borderRadius: 16,
    padding: spacing.xl,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  statusIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  statusTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.text,
    textAlign: 'center',
    marginBottom: spacing.sm,
  },
  statusDescription: {
    fontSize: 14,
    color: COLORS.textMuted,
    textAlign: 'center',
  },
  infoCard: {
    backgroundColor: 'white',
    marginHorizontal: spacing.lg,
    borderRadius: 12,
    padding: spacing.lg,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  infoText: {
    fontSize: 14,
    color: COLORS.text,
    marginLeft: spacing.sm,
    flex: 1,
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
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
  },
  errorTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.text,
    marginTop: spacing.md,
    marginBottom: spacing.sm,
  },
  errorText: {
    fontSize: 16,
    color: COLORS.textMuted,
    textAlign: 'center',
  },
});
