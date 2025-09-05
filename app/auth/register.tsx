import { registerUser } from '@/services/authService';
import { COLORS } from '@/theme/colors';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity } from 'react-native';

export default function Register() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (!name || !email || !phone || !password) return alert('Remplissez tous les champs');

    setLoading(true);
    try {
      await registerUser({ name, email, phone, password });
      alert('Inscription réussie ! Connectez-vous.');
      router.push('/auth/login');
    } catch (error) {
      console.log(error);
      alert('Erreur lors de l’inscription');
    } finally { setLoading(false); }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Créer un compte</Text>
      <TextInput placeholder="Nom" style={styles.input} value={name} onChangeText={setName} />
      <TextInput placeholder="Email" style={styles.input} value={email} onChangeText={setEmail} />
      <TextInput placeholder="Téléphone" style={styles.input} value={phone} onChangeText={setPhone} />
      <TextInput placeholder="Mot de passe" secureTextEntry style={styles.input} value={password} onChangeText={setPassword} />
      
      <TouchableOpacity style={styles.button} onPress={handleRegister} disabled={loading}>
        <Text style={styles.buttonText}>{loading ? 'Inscription...' : 'S’inscrire'}</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, flexGrow: 1, justifyContent: 'center', backgroundColor: COLORS.white },
  title: { fontSize: 24, fontWeight: 'bold', color: COLORS.secondary, marginBottom: 20 },
  input: { borderWidth: 1, borderColor: COLORS.secondary, borderRadius: 8, padding: 10, marginBottom: 15 },
  button: { backgroundColor: COLORS.primary, padding: 15, borderRadius: 10, alignItems: 'center' },
  buttonText: { color: COLORS.white, fontWeight: 'bold' },
});
