import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Animated,
} from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import Svg, { Path, Circle, Rect } from 'react-native-svg';
import { BASE_URL } from "../utils/config";


export default function AIRecommendationScreen({ navigation }) {
  const [recommendations, setRecommendations] = useState([]);
  const [activeFilter, setActiveFilter] = useState(0);
  const fadeAnim = React.useRef(new Animated.Value(0)).current;

  useEffect(() => {
    fetch(`${BASE_URL}/ai/recommend`)
      .then((res) => res.json())
      .then((data) => {
        console.log("AI RECOMMEND:", data);
        setRecommendations(data);
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }).start();
      })
      .catch((err) => console.log("ERROR:", err));
  }, []);

  const renderItem = ({ item, index }) => (
    <Animated.View 
      style={[
        styles.cardWrapper,
        {
          opacity: fadeAnim,
          transform: [{
            translateY: fadeAnim.interpolate({
              inputRange: [0, 1],
              outputRange: [50, 0],
            }),
          }],
        },
      ]}
    >
      <TouchableOpacity
        style={styles.card}
        onPress={() => navigation.navigate("ProductDetail", { product: item })}
        activeOpacity={0.9}
      >
        <LinearGradient
          colors={['rgba(79, 70, 229, 0.1)', 'rgba(124, 58, 237, 0.05)']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.cardGradient}
        >
          <View style={styles.imageContainer}>
            <Image
              source={{ uri: BASE_URL + item.image }}
              style={styles.image}
            />
            <View style={styles.aiScoreBadge}>
              <Text style={styles.aiScoreText}>{item.aiScore}%</Text>
            </View>
          </View>

          <View style={styles.cardContent}>
            <Text style={styles.name} numberOfLines={2}>
              {item.name}
            </Text>

            <View style={styles.priceRow}>
              <Text style={styles.priceLabel}>Price</Text>
              <Text style={styles.price}>
                Rp {item.price.toLocaleString("id-ID")}
              </Text>
            </View>

            <View style={styles.metaRow}>
              <View style={styles.categoryBadge}>
                <View style={styles.categoryDot} />
                <Text style={styles.categoryText}>
                  {item.category || "Unknown"}
                </Text>
              </View>
              
              <View style={styles.confidenceBadge}>
                <Text style={styles.confidenceText}>✨ High Match</Text>
              </View>
            </View>
          </View>
        </LinearGradient>
      </TouchableOpacity>
    </Animated.View>
  );

  const filters = ["Similarity", "Category Match", "High Confidence"];

  const RobotIcon = () => (
    <Svg width="32" height="32" viewBox="0 0 24 24" fill="none">
      {/* Antenna */}
      <Circle cx="12" cy="3" r="1.5" fill="#a78bfa" />
      <Rect x="11.5" y="3" width="1" height="3" fill="#8b5cf6" />
      
      {/* Head */}
      <Rect x="7" y="6" width="10" height="8" rx="2" fill="#6366f1" />
      
      {/* Eyes */}
      <Circle cx="10" cy="10" r="1.5" fill="#ffffff" />
      <Circle cx="14" cy="10" r="1.5" fill="#ffffff" />
      <Circle cx="10" cy="10" r="0.8" fill="#4f46e5" />
      <Circle cx="14" cy="10" r="0.8" fill="#4f46e5" />
      
      {/* Mouth */}
      <Rect x="9" y="12" width="6" height="1" rx="0.5" fill="#c4b5fd" />
      
      {/* Body */}
      <Rect x="8" y="14" width="8" height="6" rx="1.5" fill="#818cf8" />
      
      {/* Arms */}
      <Rect x="5" y="15" width="3" height="1.5" rx="0.75" fill="#a5b4fc" />
      <Rect x="16" y="15" width="3" height="1.5" rx="0.75" fill="#a5b4fc" />
      
      {/* Legs */}
      <Rect x="9" y="20" width="2" height="3" rx="1" fill="#6366f1" />
      <Rect x="13" y="20" width="2" height="3" rx="1" fill="#6366f1" />
    </Svg>
  );

  return (
    <View style={styles.container}>
      {/* Header with gradient background */}
      <LinearGradient
        colors={['#0f172a', '#1e1b4b', '#312e81']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.header}
      >
        <View style={styles.headerContent}>
          <View style={styles.titleRow}>
            <View style={styles.iconWrapper}>
              <RobotIcon />
            </View>
            <View>
              <Text style={styles.title}>AI Recommendations</Text>
              <Text style={styles.subtitle}>
                Powered by machine learning
              </Text>
            </View>
          </View>

          {/* Filter chips */}
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            style={styles.filterScroll}
            contentContainerStyle={styles.filterContainer}
          >
            {filters.map((label, i) => (
              <TouchableOpacity
                key={i}
                style={[
                  styles.filterChip,
                  activeFilter === i && styles.filterChipActive,
                ]}
                onPress={() => setActiveFilter(i)}
                activeOpacity={0.7}
              >
                <LinearGradient
                  colors={
                    activeFilter === i
                      ? ['#4f46e5', '#7c3aed']
                      : ['rgba(30, 41, 59, 0.8)', 'rgba(30, 41, 59, 0.8)']
                  }
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.filterGradient}
                >
                  <Text
                    style={[
                      styles.filterText,
                      activeFilter === i && styles.filterTextActive,
                    ]}
                  >
                    {label}
                  </Text>
                </LinearGradient>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </LinearGradient>

      {/* Content */}
      <FlatList
        data={recommendations}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#020617",
  },

  header: {
    paddingTop: 60,
    paddingBottom: 24,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
    shadowColor: "#4f46e5",
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 10 },
    shadowRadius: 20,
    elevation: 8,
  },

  headerContent: {
    gap: 20,
  },

  titleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },

  iconWrapper: {
    width: 56,
    height: 56,
    borderRadius: 16,
    backgroundColor: "rgba(79, 70, 229, 0.2)",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "rgba(139, 92, 246, 0.3)",
  },

  title: {
    fontSize: 26,
    fontWeight: "800",
    color: "#ffffff",
    letterSpacing: -0.5,
  },

  subtitle: {
    fontSize: 14,
    color: "#a78bfa",
    marginTop: 2,
    fontWeight: "500",
  },

  filterScroll: {
    marginHorizontal: -20,
  },

  filterContainer: {
    paddingHorizontal: 20,
    gap: 10,
  },

  filterChip: {
    borderRadius: 20,
    overflow: "hidden",
    marginRight: 10,
  },

  filterChipActive: {
    shadowColor: "#4f46e5",
    shadowOpacity: 0.5,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 12,
    elevation: 6,
  },

  filterGradient: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "rgba(139, 92, 246, 0.2)",
  },

  filterText: {
    fontSize: 13,
    color: "#94a3b8",
    fontWeight: "600",
  },

  filterTextActive: {
    color: "#ffffff",
  },

  listContent: {
    padding: 20,
    paddingTop: 24,
    gap: 16,
  },

  cardWrapper: {
    marginBottom: 16,
  },

  card: {
    borderRadius: 24,
    overflow: "hidden",
    shadowColor: "#4f46e5",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 8 },
    shadowRadius: 16,
    elevation: 6,
  },

  cardGradient: {
    flexDirection: "row",
    padding: 16,
    borderWidth: 1,
    borderColor: "rgba(139, 92, 246, 0.15)",
    backgroundColor: "rgba(15, 23, 42, 0.8)",
  },

  imageContainer: {
    position: "relative",
  },

  image: {
    width: 110,
    height: 110,
    borderRadius: 18,
    backgroundColor: "rgba(30, 41, 59, 0.5)",
  },

  aiScoreBadge: {
    position: "absolute",
    top: -6,
    right: -6,
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#4f46e5",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 3,
    borderColor: "#0f172a",
    shadowColor: "#4f46e5",
    shadowOpacity: 0.6,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    elevation: 8,
  },

  aiScoreText: {
    fontSize: 11,
    fontWeight: "800",
    color: "#ffffff",
  },

  cardContent: {
    flex: 1,
    marginLeft: 16,
    justifyContent: "space-between",
  },

  name: {
    fontSize: 16,
    fontWeight: "700",
    color: "#f1f5f9",
    lineHeight: 22,
    marginBottom: 8,
  },

  priceRow: {
    flexDirection: "row",
    alignItems: "baseline",
    gap: 8,
    marginBottom: 12,
  },

  priceLabel: {
    fontSize: 11,
    color: "#64748b",
    fontWeight: "600",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },

  price: {
    fontSize: 17,
    color: "#38bdf8",
    fontWeight: "700",
  },

  metaRow: {
    flexDirection: "row",
    gap: 8,
    flexWrap: "wrap",
  },

  categoryBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(30, 58, 138, 0.4)",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 12,
    gap: 6,
    borderWidth: 1,
    borderColor: "rgba(59, 130, 246, 0.3)",
  },

  categoryDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#60a5fa",
  },

  categoryText: {
    fontSize: 11,
    color: "#93c5fd",
    fontWeight: "600",
  },

  confidenceBadge: {
    backgroundColor: "rgba(139, 92, 246, 0.2)",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "rgba(167, 139, 250, 0.3)",
  },

  confidenceText: {
    fontSize: 11,
    color: "#c4b5fd",
    fontWeight: "600",
  },
});