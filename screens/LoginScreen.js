import { useState } from 'react';
import { 
  StyleSheet, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  View, 
  ImageBackground, 
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import Svg, { Path, Circle } from 'react-native-svg';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BASE_URL } from "../utils/config";


export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const WaveHandIcon = () => (
    <Svg width="32" height="32" viewBox="0 0 24 24" fill="none">
      {/* Palm */}
      <Path
        d="M9 11V6a1 1 0 0 1 2 0v5m0-3V5a1 1 0 0 1 2 0v8m0-4V6a1 1 0 0 1 2 0v7m0-3V7a1 1 0 0 1 2 0v7a6 6 0 0 1-12 0V9"
        stroke="#fbbf24"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="#fde68a"
      />
      {/* Wrist decoration */}
      <Circle cx="9" cy="19" r="2" fill="#fbbf24" opacity="0.6" />
      <Circle cx="11" cy="20" r="1.5" fill="#fbbf24" opacity="0.4" />
    </Svg>
  );

  const onLogin = async () => {
    if (!email || !password) {
      return Alert.alert("Error", "Email dan password wajib diisi.");
    }

    try {
      setLoading(true);

      const res = await fetch(`${BASE_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();

      if (res.status !== 200) {
        Alert.alert("Login gagal", data.message || "Email atau password salah");
        setLoading(false);
        return;
      }

      Alert.alert("Success", "Login berhasil!");

      // Simpan user ke HP
      await AsyncStorage.setItem("user", JSON.stringify(data.user));

      // Masuk ke main tabs
      navigation.replace("MainTabs");

    } catch (err) {
      Alert.alert("Error", "Tidak dapat terhubung ke server.");
      console.log("LOGIN ERROR:", err);
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
        colors={['rgba(99, 102, 241, 0.95)', 'rgba(79, 70, 229, 0.98)']}
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

              {/* LOGO/ICON */}
              <View style={styles.logoContainer}>
                <View style={styles.logoCircle}>
                  <Ionicons name="cart" size={40} color="#6366f1" />
                </View>
              </View>

              {/* TITLE WITH SVG */}
              <View style={styles.titleContainer}>
                <Text style={styles.title}>Welcome Back! </Text>
                <WaveHandIcon />
              </View>
              <Text style={styles.subtitle}>Login to continue your shopping journey</Text>

              {/* FORM CARD */}
              <View style={styles.formCard}>
                {/* Email Input */}
                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Email Address</Text>
                  <View style={styles.inputWrapper}>
                    <Ionicons name="mail-outline" size={20} color="#6366f1" style={styles.icon} />
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
                    <Ionicons name="lock-closed-outline" size={20} color="#6366f1" style={styles.icon} />
                    <TextInput
                      placeholder="Enter your password"
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

                {/* Forgot Password */}
                <TouchableOpacity style={styles.forgotBtn}>
                  <Text style={styles.forgotText}>Forgot Password?</Text>
                </TouchableOpacity>

                {/* Login Button */}
                <TouchableOpacity 
                  onPress={onLogin} 
                  activeOpacity={0.8} 
                  disabled={loading}
                  style={styles.loginButton}
                >
                  <LinearGradient 
                    colors={['#6366f1', '#4f46e5']} 
                    style={styles.buttonGradient}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                  >
                    {loading ? (
                      <Text style={styles.buttonText}>Logging in...</Text>
                    ) : (
                      <>
                        <Text style={styles.buttonText}>Login</Text>
                        <Ionicons name="arrow-forward" size={20} color="white" />
                      </>
                    )}
                  </LinearGradient>
                </TouchableOpacity>

                {/* Divider */}
                <View style={styles.dividerContainer}>
                  <View style={styles.divider} />
                  <Text style={styles.dividerText}>or continue with</Text>
                  <View style={styles.divider} />
                </View>

                {/* Social Login */}
                <View style={styles.socialContainer}>
                  <TouchableOpacity style={styles.socialBtn}>
                    <Ionicons name="logo-google" size={22} color="#ea4335" />
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.socialBtn}>
                    <Ionicons name="logo-apple" size={22} color="#1e293b" />
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.socialBtn}>
                    <Ionicons name="logo-facebook" size={22} color="#1877f2" />
                  </TouchableOpacity>
                </View>
              </View>

              {/* Signup Link */}
              <TouchableOpacity 
                onPress={() => navigation.navigate('Signup')}
                style={styles.signupLink}
              >
                <Text style={styles.linkText}>
                  Don't have an account? <Text style={styles.linkHighlight}>Sign up</Text>
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
  forgotBtn: {
    alignSelf: 'flex-end',
    marginBottom: 20,
  },
  forgotText: {
    color: '#6366f1',
    fontSize: 14,
    fontWeight: '600',
  },
  loginButton: {
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 20,
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
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: '#e2e8f0',
  },
  dividerText: {
    color: '#94a3b8',
    fontSize: 13,
    marginHorizontal: 12,
    fontWeight: '500',
  },
  socialContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 16,
  },
  socialBtn: {
    width: 56,
    height: 56,
    borderRadius: 12,
    backgroundColor: '#f8fafc',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  signupLink: {
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