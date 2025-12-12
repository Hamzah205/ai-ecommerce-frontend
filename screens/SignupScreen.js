import React, { useState } from 'react';
import { 
  StyleSheet, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  View, 
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  ImageBackground
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import Svg, { Path, Circle, Rect, Polygon } from 'react-native-svg';
import { BASE_URL } from "../utils/config";


export default function SignupScreen({ navigation }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const PartyPopperIcon = () => (
    <Svg width="32" height="32" viewBox="0 0 24 24" fill="none">
      {/* Confetti pieces */}
      <Rect x="4" y="3" width="2" height="2" fill="#f59e0b" rx="0.5" />
      <Circle cx="19" cy="5" r="1" fill="#ef4444" />
      <Polygon points="16,2 17,4 15,4" fill="#3b82f6" />
      <Rect x="20" y="8" width="2" height="2" fill="#8b5cf6" rx="0.5" />
      
      {/* Party cone */}
      <Path
        d="M5 21L13 13L16 16L8 24L5 21Z"
        fill="#fbbf24"
        stroke="#f59e0b"
        strokeWidth="1.5"
      />
      <Path
        d="M13 13L16 16"
        stroke="#f97316"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      
      {/* Confetti streams */}
      <Path d="M14 7L15 9" stroke="#ec4899" strokeWidth="1.5" strokeLinecap="round" />
      <Path d="M18 10L19 12" stroke="#06b6d4" strokeWidth="1.5" strokeLinecap="round" />
      <Path d="M10 4L11 6" stroke="#10b981" strokeWidth="1.5" strokeLinecap="round" />
    </Svg>
  );

  const onSignup = async () => {
    if (!name || !email || !password) {
      return Alert.alert("Error", "Semua field wajib diisi.");
    }

    try {
      setLoading(true);

      const res = await fetch(`${BASE_URL}/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();

      if (res.status !== 200) {
        setLoading(false);
        return Alert.alert("Signup gagal", data.message || "Terjadi kesalahan.");
      }

      Alert.alert("Berhasil", "Akun berhasil dibuat!");
      navigation.replace("MainTabs");

    } catch (err) {
      Alert.alert("Error", "Tidak bisa terhubung ke server.");
      console.log("SIGNUP ERROR:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ImageBackground
      source={require('../assets/images/bg-login.png')}
      style={styles.bg}
      resizeMode="cover"
    >
      <LinearGradient
        colors={['rgba(16, 185, 129, 0.95)', 'rgba(5, 150, 105, 0.98)']}
        style={styles.overlay}
      >
        <KeyboardAvoidingView 
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.keyboardView}
        >
          <ScrollView 
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.container}>

              {/* BACK BUTTON */}
              <TouchableOpacity 
                style={styles.backBtn}
                onPress={() => navigation.goBack()}
              >
                <Ionicons name="arrow-back" size={24} color="white" />
              </TouchableOpacity>

              {/* LOGO/ICON */}
              <View style={styles.logoContainer}>
                <View style={styles.logoCircle}>
                  <Ionicons name="person-add" size={40} color="#10b981" />
                </View>
              </View>

              {/* TITLE WITH SVG */}
              <View style={styles.titleContainer}>
                <Text style={styles.title}>Create Account </Text>
                <PartyPopperIcon />
              </View>
              <Text style={styles.subtitle}>Join us and get AI-powered recommendations</Text>

              {/* FORM CARD */}
              <View style={styles.formCard}>
                {/* Name Input */}
                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Full Name</Text>
                  <View style={styles.inputWrapper}>
                    <Ionicons name="person-outline" size={20} color="#10b981" style={styles.icon} />
                    <TextInput
                      placeholder="Enter your full name"
                      placeholderTextColor="#94a3b8"
                      style={styles.input}
                      value={name}
                      onChangeText={setName}
                    />
                  </View>
                </View>

                {/* Email Input */}
                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Email Address</Text>
                  <View style={styles.inputWrapper}>
                    <Ionicons name="mail-outline" size={20} color="#10b981" style={styles.icon} />
                    <TextInput
                      placeholder="Enter your email"
                      placeholderTextColor="#94a3b8"
                      style={styles.input}
                      value={email}
                      onChangeText={setEmail}
                      autoCapitalize="none"
                      keyboardType="email-address"
                    />
                  </View>
                </View>

                {/* Password Input */}
                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Password</Text>
                  <View style={styles.inputWrapper}>
                    <Ionicons name="lock-closed-outline" size={20} color="#10b981" style={styles.icon} />
                    <TextInput
                      placeholder="Create a password"
                      placeholderTextColor="#94a3b8"
                      style={styles.input}
                      secureTextEntry={!showPassword}
                      value={password}
                      onChangeText={setPassword}
                    />
                    <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                      <Ionicons 
                        name={showPassword ? "eye-off-outline" : "eye-outline"} 
                        size={20} 
                        color="#94a3b8" 
                      />
                    </TouchableOpacity>
                  </View>
                </View>

                {/* Password Requirements */}
                <View style={styles.requirementBox}>
                  <View style={styles.requirementItem}>
                    <Ionicons 
                      name={password.length >= 6 ? "checkmark-circle" : "ellipse-outline"} 
                      size={16} 
                      color={password.length >= 6 ? "#10b981" : "#cbd5e1"} 
                    />
                    <Text style={[styles.requirementText, password.length >= 6 && styles.requirementMet]}>
                      At least 6 characters
                    </Text>
                  </View>
                </View>

                {/* Signup Button */}
                <TouchableOpacity 
                  onPress={onSignup} 
                  disabled={loading}
                  style={styles.signupButton}
                >
                  <LinearGradient 
                    colors={['#10b981', '#059669']} 
                    style={styles.buttonGradient}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                  >
                    {loading ? (
                      <Text style={styles.buttonText}>Creating account...</Text>
                    ) : (
                      <>
                        <Text style={styles.buttonText}>Sign Up</Text>
                        <Ionicons name="arrow-forward" size={20} color="white" />
                      </>
                    )}
                  </LinearGradient>
                </TouchableOpacity>

                {/* Terms */}
                <Text style={styles.termsText}>
                  By signing up, you agree to our{' '}
                  <Text style={styles.termsLink}>Terms of Service</Text>
                  {' '}and{' '}
                  <Text style={styles.termsLink}>Privacy Policy</Text>
                </Text>
              </View>

              {/* Login Link */}
              <TouchableOpacity 
                onPress={() => navigation.goBack()}
                style={styles.loginLink}
              >
                <Text style={styles.linkText}>
                  Already have an account? <Text style={styles.linkHighlight}>Login</Text>
                </Text>
              </TouchableOpacity>

            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </LinearGradient>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  bg: { 
    flex: 1 
  },
  overlay: { 
    flex: 1 
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingVertical: 40,
  },
  container: { 
    paddingHorizontal: 24,
  },
  backBtn: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 32,
  },
  logoCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 8,
  },
  titleContainer: { 
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  title: { 
    fontSize: 32, 
    fontWeight: '800', 
    color: '#fff',
  },
  subtitle: { 
    fontSize: 15, 
    color: 'rgba(255, 255, 255, 0.8)', 
    marginBottom: 32,
    textAlign: 'center',
  },
  formCard: {
    backgroundColor: 'white',
    borderRadius: 24,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 10,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 8,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: '#e2e8f0',
    backgroundColor: '#f8fafc',
  },
  icon: { 
    marginRight: 10 
  },
  input: { 
    flex: 1, 
    color: '#1e293b', 
    fontSize: 15,
    fontWeight: '500',
  },
  requirementBox: {
    marginBottom: 20,
  },
  requirementItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  requirementText: {
    fontSize: 13,
    color: '#94a3b8',
    marginLeft: 8,
  },
  requirementMet: {
    color: '#10b981',
    fontWeight: '600',
  },
  signupButton: {
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 16,
  },
  buttonGradient: {
    flexDirection: 'row',
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: { 
    color: '#fff', 
    fontSize: 17, 
    fontWeight: '700',
    marginRight: 8,
  },
  termsText: {
    fontSize: 12,
    color: '#64748b',
    textAlign: 'center',
    lineHeight: 18,
  },
  termsLink: {
    color: '#10b981',
    fontWeight: '600',
  },
  loginLink: {
    marginTop: 24,
  },
  linkText: { 
    color: 'rgba(255, 255, 255, 0.8)', 
    textAlign: 'center', 
    fontSize: 15,
    fontWeight: '500',
  },
  linkHighlight: { 
    color: '#fff', 
    fontWeight: '700',
  },
});