import React, { useEffect, useState, useContext } from "react";
import {
  StyleSheet,
  FlatList,
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from 'expo-linear-gradient';
import Svg, { Path, Circle, G } from 'react-native-svg';
import { CartContext } from "../utils/CartContext";
import { BASE_URL } from "../utils/config";


export default function HomeScreen({ navigation }) {
  const { cart } = useContext(CartContext);

  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [user, setUser] = useState(null);

  // SVG Component - Wave Hand
  const WaveHandIcon = () => (
    <Svg width="32" height="32" viewBox="0 0 24 24" fill="none">
      <Path
        d="M9 11V6a1 1 0 0 1 2 0v5m0-3V5a1 1 0 0 1 2 0v8m0-4V6a1 1 0 0 1 2 0v7m0-3V7a1 1 0 0 1 2 0v7a6 6 0 0 1-12 0V9"
        stroke="#fcd34d"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="#fef3c7"
      />
      <Circle cx="9" cy="19" r="2" fill="#fbbf24" opacity="0.6" />
      <Circle cx="11" cy="20" r="1.5" fill="#fbbf24" opacity="0.4" />
    </Svg>
  );

  // SVG Component - Sparkle/AI Icon
  const SparkleIcon = () => (
    <Svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <Path
        d="M12 3L14 10L21 12L14 14L12 21L10 14L3 12L10 10L12 3Z"
        fill="#a78bfa"
        stroke="#8b5cf6"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Circle cx="19" cy="5" r="1.5" fill="#c4b5fd" />
      <Circle cx="5" cy="19" r="1" fill="#c4b5fd" />
    </Svg>
  );

  useEffect(() => {
    AsyncStorage.getItem("user").then((res) => {
      if (res) setUser(JSON.parse(res));
    });
  }, []);

  useEffect(() => {
    fetch(`${BASE_URL}/products`)
      .then((res) => res.json())
      .then((data) => setItems(data))
      .catch((err) => console.log("HOME ERROR:", err));
  }, []);

  useEffect(() => {
    setFilteredItems(items);
  }, [items]);

  const handleSearch = (text) => {
    setSearchQuery(text);
    const q = text.toLowerCase();
    setFilteredItems(
      items.filter(
        (item) =>
          item.name.toLowerCase().includes(q) ||
          item.category.toLowerCase().includes(q) ||
          item.description.toLowerCase().includes(q)
      )
    );
  };

  const renderHorizontal = ({ item }) => (
    <TouchableOpacity
      style={styles.hCard}
      onPress={() => navigation.navigate("ProductDetail", { product: item })}
      activeOpacity={0.8}
    >
      <LinearGradient
        colors={['rgba(99, 102, 241, 0.05)', 'rgba(139, 92, 246, 0.05)']}
        style={styles.hCardGradient}
      >
        <View style={styles.hImageContainer}>
          <Image source={{ uri: BASE_URL + item.image }} style={styles.hImage} />
          <View style={styles.hOverlay} />
        </View>
        <Text style={styles.hName} numberOfLines={1}>
          {item.name}
        </Text>
        <View style={styles.hPriceTag}>
          <Text style={styles.hPrice}>Rp {(item.price / 1000).toFixed(0)}k</Text>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );

  const renderGrid = ({ item }) => (
    <TouchableOpacity
      style={styles.gCard}
      onPress={() => navigation.navigate("ProductDetail", { product: item })}
      activeOpacity={0.8}
    >
      <View style={styles.gImageContainer}>
        <Image source={{ uri: BASE_URL + item.image }} style={styles.gImage} />
        <LinearGradient
          colors={['transparent', 'rgba(0, 0, 0, 0.4)']}
          style={styles.gGradient}
        />
      </View>
      <View style={styles.gContent}>
        <Text style={styles.gName} numberOfLines={2}>
          {item.name}
        </Text>
        <Text style={styles.gPrice}>
          Rp {item.price.toLocaleString("id-ID")}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* DEKORASI BACKGROUND - Enhanced */}
      <LinearGradient
        colors={['#6366f1', '#8b5cf6', '#a78bfa']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.bgDecoration}
      />
      <View style={styles.bgCircle1} />
      <View style={styles.bgCircle2} />
      <View style={styles.bgCircle3} />

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* HEADER */}
        <View style={styles.headerRow}>
          <View style={styles.headerLeft}>
            <View style={styles.headerTitleRow}>
              <Text style={styles.header}>
                Hi, {user ? user.name : "Loading..."}
              </Text>
              <WaveHandIcon />
            </View>

            <View style={styles.subheaderRow}>
              <SparkleIcon />
              <Text style={styles.subheader}>
                Find your best products with AI
              </Text>
            </View>
          </View>

          {/* CART ICON - Enhanced */}
          <TouchableOpacity
            style={styles.cartBtn}
            onPress={() => navigation.navigate("Cart")}
            activeOpacity={0.7}
          >
            <LinearGradient
              colors={['rgba(255, 255, 255, 0.25)', 'rgba(255, 255, 255, 0.15)']}
              style={styles.cartIconContainer}
            >
              <Ionicons name="cart-outline" size={24} color="#ffffff" />
              {cart.length > 0 && (
                <LinearGradient
                  colors={['#f43f5e', '#e11d48']}
                  style={styles.badge}
                >
                  <Text style={styles.badgeText}>{cart.length}</Text>
                </LinearGradient>
              )}
            </LinearGradient>
          </TouchableOpacity>
        </View>

        {/* SEARCH BAR - Enhanced */}
        <View style={styles.searchContainer}>
          <LinearGradient
            colors={['#ffffff', '#f8fafc']}
            style={styles.searchGradient}
          >
            <Ionicons name="search" size={20} color="#6366f1" style={styles.searchIcon} />
            <TextInput
              placeholder="Search products..."
              placeholderTextColor="#94a3b8"
              style={styles.search}
              value={searchQuery}
              onChangeText={handleSearch}
            />
            {searchQuery.length > 0 && (
              <TouchableOpacity onPress={() => handleSearch("")}>
                <Ionicons name="close-circle" size={20} color="#94a3b8" />
              </TouchableOpacity>
            )}
          </LinearGradient>
        </View>

        {/* RECOMMENDED SECTION */}
        <View style={styles.sectionHeader}>
          <View style={styles.sectionTitleContainer}>
            <View style={styles.sectionIconWrapper}>
              <Ionicons name="star" size={18} color="#fbbf24" />
            </View>
            <View>
              <Text style={styles.sectionTitle}>Recommended</Text>
              <Text style={styles.sectionSubtitle}>Handpicked for you</Text>
            </View>
          </View>

          <TouchableOpacity 
            onPress={() => navigation.navigate("AIRecommendation")}
            style={styles.seeAllBtn}
          >
            <Text style={styles.seeAll}>See All</Text>
            <Ionicons name="arrow-forward" size={14} color="#6366f1" />
          </TouchableOpacity>
        </View>

        <FlatList
          horizontal
          data={filteredItems.slice(0, 6)}
          renderItem={renderHorizontal}
          keyExtractor={(item) => item.id}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.hList}
        />

        {/* ALL PRODUCTS SECTION */}
        <View style={styles.sectionHeader}>
          <View style={styles.sectionTitleContainer}>
            <View style={[styles.sectionIconWrapper, { backgroundColor: '#dbeafe' }]}>
              <Ionicons name="grid" size={18} color="#3b82f6" />
            </View>
            <View>
              <Text style={styles.sectionTitle}>All Products</Text>
              <Text style={styles.sectionSubtitle}>{filteredItems.length} items available</Text>
            </View>
          </View>
        </View>

        {filteredItems.length === 0 ? (
          <View style={styles.emptyContainer}>
            <View style={styles.emptyIconWrapper}>
              <Ionicons name="search-outline" size={48} color="#94a3b8" />
            </View>
            <Text style={styles.emptyText}>No products found</Text>
            <Text style={styles.emptySubtext}>
              Try searching with different keywords
            </Text>
          </View>
        ) : (
          <FlatList
            data={filteredItems}
            renderItem={renderGrid}
            numColumns={3}
            keyExtractor={(item) => item.id}
            scrollEnabled={false}
            columnWrapperStyle={styles.gridRow}
            contentContainerStyle={{ paddingBottom: 80 }}
          />
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8fafc",
  },
  bgDecoration: {
    position: "absolute",
    top: -100,
    left: -50,
    right: -50,
    height: 420,
    borderBottomLeftRadius: 200,
    borderBottomRightRadius: 200,
    opacity: 0.95,
  },
  bgCircle1: {
    position: "absolute",
    top: 60,
    right: -40,
    width: 180,
    height: 180,
    borderRadius: 90,
    backgroundColor: "#c4b5fd",
    opacity: 0.25,
  },
  bgCircle2: {
    position: "absolute",
    top: 180,
    left: -50,
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: "#e0e7ff",
    opacity: 0.2,
  },
  bgCircle3: {
    position: "absolute",
    top: 120,
    right: 30,
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#fef3c7",
    opacity: 0.3,
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 48,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
  },
  headerLeft: {
    flex: 1,
  },
  headerTitleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 6,
  },
  header: {
    color: "#ffffff",
    fontSize: 28,
    fontWeight: "800",
    letterSpacing: -0.5,
  },
  subheaderRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  subheader: {
    color: "#e0e7ff",
    fontSize: 14,
    fontWeight: "500",
  },
  cartBtn: {
    marginLeft: 16,
  },
  cartIconContainer: {
    position: "relative",
    padding: 12,
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: "rgba(255, 255, 255, 0.3)",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  badge: {
    position: "absolute",
    right: -8,
    top: -8,
    borderRadius: 12,
    minWidth: 22,
    height: 22,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 6,
    borderWidth: 2.5,
    borderColor: "#6366f1",
    shadowColor: "#f43f5e",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 4,
  },
  badgeText: {
    color: "white",
    fontSize: 11,
    fontWeight: "800",
  },
  searchContainer: {
    marginBottom: 28,
    shadowColor: "#6366f1",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.12,
    shadowRadius: 16,
    elevation: 6,
  },
  searchGradient: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 18,
    paddingHorizontal: 18,
    paddingVertical: 14,
    borderWidth: 1,
    borderColor: "rgba(99, 102, 241, 0.1)",
  },
  searchIcon: {
    marginRight: 12,
  },
  search: {
    flex: 1,
    color: "#1e293b",
    fontSize: 15,
    fontWeight: "500",
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  sectionTitleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  sectionIconWrapper: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: "#fef3c7",
    alignItems: "center",
    justifyContent: "center",
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "800",
    color: "#1e293b",
    letterSpacing: -0.3,
  },
  sectionSubtitle: {
    fontSize: 13,
    color: "#64748b",
    marginTop: 2,
    fontWeight: "500",
  },
  seeAllBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: "#eef2ff",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
  },
  seeAll: {
    color: "#6366f1",
    fontSize: 14,
    fontWeight: "700",
  },
  hList: {
    paddingRight: 16,
    marginBottom: 32,
  },
  hCard: {
    width: 150,
    marginRight: 14,
    borderRadius: 22,
    overflow: "hidden",
    shadowColor: "#6366f1",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 5,
  },
  hCardGradient: {
    backgroundColor: "#ffffff",
    padding: 12,
  },
  hImageContainer: {
    position: "relative",
    marginBottom: 10,
  },
  hImage: {
    width: "100%",
    height: 130,
    borderRadius: 16,
  },
  hOverlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 45,
    backgroundColor: "rgba(0, 0, 0, 0.15)",
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
  },
  hName: {
    color: "#1e293b",
    fontSize: 14,
    fontWeight: "700",
    marginBottom: 8,
    letterSpacing: -0.2,
  },
  hPriceTag: {
    backgroundColor: "#fef3c7",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 10,
    alignSelf: "flex-start",
    borderWidth: 1.5,
    borderColor: "#fbbf24",
  },
  hPrice: {
    color: "#d97706",
    fontSize: 13,
    fontWeight: "800",
  },
  gridRow: {
    justifyContent: "space-between",
    marginBottom: 14,
  },
  gCard: {
    width: "31.5%",
    backgroundColor: "#ffffff",
    borderRadius: 20,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 4,
  },
  gImageContainer: {
    position: "relative",
  },
  gImage: {
    width: "100%",
    height: 110,
  },
  gGradient: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 40,
  },
  gContent: {
    padding: 10,
  },
  gName: {
    color: "#1e293b",
    fontSize: 12,
    fontWeight: "700",
    minHeight: 32,
    marginBottom: 6,
    letterSpacing: -0.2,
  },
  gPrice: {
    color: "#10b981",
    fontSize: 13,
    fontWeight: "800",
  },
  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 60,
  },
  emptyIconWrapper: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#f1f5f9",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },
  emptyText: {
    color: "#64748b",
    fontSize: 18,
    fontWeight: "700",
    marginTop: 8,
  },
  emptySubtext: {
    color: "#94a3b8",
    fontSize: 14,
    marginTop: 4,
  },
});