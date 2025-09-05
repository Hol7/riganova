import { loginUser } from '@/services/authService';
import { useAuthStore } from '@/store/authStore';
import { COLORS } from '@/theme/colors';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function Login() {
  const router = useRouter();
  const setAuthUser = useAuthStore((state) => state.setUser);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) return alert('Remplissez tous les champs');

    setLoading(true);
    try {
      const data = await loginUser({ email, password });
      setAuthUser(data.user, data.token);

      // Navigation selon rôle
      switch (data.user.role) {
        case 'client':
          router.replace('/client/home');
          break;
        case 'livreur':
          router.replace('/livreur/missions');
          break;
        case 'manager':
          router.replace('/manager/requests');
          break;
        case 'admin':
          router.replace('/auth/login'); // ou admin dashboard
          break;
      }
    } catch (error) {
      console.log(error);
      alert('Email ou mot de passe incorrect');
    } finally { setLoading(false); }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Se connecter</Text>
      <TextInput placeholder="Email" style={styles.input} value={email} onChangeText={setEmail} />
      <TextInput placeholder="Mot de passe" secureTextEntry style={styles.input} value={password} onChangeText={setPassword} />
      <TouchableOpacity style={styles.button} onPress={handleLogin} disabled={loading}>
        <Text style={styles.buttonText}>{loading ? 'Connexion...' : 'Se connecter'}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, flex: 1, justifyContent: 'center', backgroundColor: COLORS.white },
  title: { fontSize: 24, fontWeight: 'bold', color: COLORS.secondary, marginBottom: 20 },
  input: { borderWidth: 1, borderColor: COLORS.secondary, borderRadius: 8, padding: 10, marginBottom: 15 },
  button: { backgroundColor: COLORS.primary, padding: 15, borderRadius: 10, alignItems: 'center' },
  buttonText: { color: COLORS.white, fontWeight: 'bold' },
});
