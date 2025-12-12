import React, { useEffect } from 'react';
import { 
  ActivityIndicator, 
  StyleSheet, 
  Text, 
  View 
} from 'react-native';

export default function SplashScreen({ navigation }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('Login');
    }, 1500);
    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>AI-Commerce</Text>
      <Text style={styles.subtitle}>AI-Powered Recommendation System</Text>
      <ActivityIndicator size="large" color="#a5b4fc" style={{ marginTop: 24 }} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#020617',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    fontSize: 30,
    color: '#e5e7eb',
    fontWeight: '700',
  },
  subtitle: {
    fontSize: 13,
    color: '#9ca3af',
    marginTop: 8,
  },
});
