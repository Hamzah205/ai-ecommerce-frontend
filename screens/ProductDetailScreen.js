import React, { useContext, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Modal,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { CartContext } from "../utils/CartContext";

import { BASE_URL } from "../utils/config";


export default function ProductDetailScreen({ route, navigation }) {
  const { product } = route.params;
  const { addToCart } = useContext(CartContext);

  const [showQtyBox, setShowQtyBox] = useState(false);
  const [qty, setQty] = useState(1);

  const handleConfirmAdd = () => {
    // Kirim product dengan qty yang dipilih
    addToCart({ ...product, qty });
    setShowQtyBox(false);
    setQty(1);
    alert("✓ Added to cart successfully!");
  };

  return (
    <View style={styles.wrapper}>
      <ScrollView 
        style={styles.container}
        showsVerticalScrollIndicator={false}
      >
        {/* IMAGE CONTAINER */}
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: BASE_URL + product.image }}
            style={styles.mainImage}
          />
          
          {/* GRADIENT OVERLAY */}
          <View style={styles.gradientOverlay} />
          
          {/* BACK BUTTON */}
          <TouchableOpacity
            style={styles.backIcon}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>

          {/* SHARE BUTTON */}
          <TouchableOpacity style={styles.shareIcon}>
            <Ionicons name="share-social-outline" size={22} color="white" />
          </TouchableOpacity>
        </View>

        {/* CONTENT CARD */}
        <View style={styles.contentCard}>
          {/* CATEGORY BADGE */}
          {product.category && (
            <View style={styles.categoryBadge}>
              <Ionicons name="pricetag" size={14} color="#6366f1" />
              <Text style={styles.categoryText}>{product.category}</Text>
            </View>
          )}

          {/* PRODUCT NAME */}
          <Text style={styles.name}>{product.name}</Text>

          {/* RATING & SOLD */}
          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <Ionicons name="star" size={16} color="#fbbf24" />
              <Text style={styles.statText}>4.8</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statText}>127 sold</Text>
            </View>
          </View>

          {/* PRICE CONTAINER */}
          <View style={styles.priceContainer}>
            <View style={styles.priceBox}>
              <Text style={styles.priceLabel}>Price</Text>
              <Text style={styles.price}>
                Rp {product.price.toLocaleString("id-ID")}
              </Text>
            </View>
          </View>

          {/* DIVIDER */}
          <View style={styles.divider} />

          {/* DESCRIPTION SECTION */}
          <View style={styles.descriptionSection}>
            <View style={styles.sectionHeader}>
              <Ionicons name="information-circle" size={20} color="#6366f1" />
              <Text style={styles.sectionTitle}>Product Details</Text>
            </View>
            <Text style={styles.desc}>
              {product.description || "No description available."}
            </Text>
          </View>

          {/* FEATURES SECTION */}
          <View style={styles.featuresSection}>
            <View style={styles.featureItem}>
              <View style={styles.featureIcon}>
                <Ionicons name="shield-checkmark" size={20} color="#10b981" />
              </View>
              <View>
                <Text style={styles.featureTitle}>100% Original</Text>
                <Text style={styles.featureSubtitle}>Guaranteed authentic</Text>
              </View>
            </View>
            
            <View style={styles.featureItem}>
              <View style={styles.featureIcon}>
                <Ionicons name="car-sport" size={20} color="#10b981" />
              </View>
              <View>
                <Text style={styles.featureTitle}>Free Shipping</Text>
                <Text style={styles.featureSubtitle}>For orders over 100k</Text>
              </View>
            </View>
            
            <View style={styles.featureItem}>
              <View style={styles.featureIcon}>
                <Ionicons name="repeat" size={20} color="#10b981" />
              </View>
              <View>
                <Text style={styles.featureTitle}>Easy Return</Text>
                <Text style={styles.featureSubtitle}>7 days return policy</Text>
              </View>
            </View>
          </View>

          {/* SPACING FOR BUTTON */}
          <View style={{ height: 100 }} />
        </View>
      </ScrollView>

      {/* FLOATING BOTTOM BAR */}
      <View style={styles.bottomBar}>
        <TouchableOpacity 
          style={styles.chatBtn}
          activeOpacity={0.7}
        >
          <Ionicons name="chatbubble-outline" size={24} color="#6366f1" />
          <Text style={styles.chatText}>Chat</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.addToCartBtn} 
          onPress={() => setShowQtyBox(true)}
          activeOpacity={0.8}
        >
          <Ionicons name="cart" size={22} color="white" />
          <Text style={styles.addToCartText}>Add to Cart</Text>
        </TouchableOpacity>
      </View>

      {/* QUANTITY MODAL */}
      <Modal
        visible={showQtyBox}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowQtyBox(false)}
      >
        <View style={styles.qtyOverlay}>
          <View style={styles.qtyBox}>
            <Text style={styles.qtyTitle}>Select Quantity</Text>

            <View style={styles.qtyRow}>
              <TouchableOpacity 
                style={styles.qtyBtnMinus}
                onPress={() => setQty(Math.max(1, qty - 1))}
              >
                <Ionicons name="remove" size={20} color="#6366f1" />
              </TouchableOpacity>

              <View style={styles.qtyValueBox}>
                <Text style={styles.qtyValue}>{qty}</Text>
              </View>

              <TouchableOpacity 
                style={styles.qtyBtnPlus}
                onPress={() => setQty(qty + 1)}
              >
                <Ionicons name="add" size={20} color="white" />
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              style={styles.qtyConfirm}
              onPress={handleConfirmAdd}
            >
              <Text style={styles.qtyConfirmText}>
                Add {qty} {qty > 1 ? 'items' : 'item'} to Cart
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.qtyCancel}
              onPress={() => {
                setShowQtyBox(false);
                setQty(1);
              }}
            >
              <Text style={styles.qtyCancelText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: "#f8fafc",
  },
  container: {
    flex: 1,
  },
  imageContainer: {
    position: "relative",
    width: "100%",
    height: 380,
    backgroundColor: "#ffffff",
  },
  mainImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  gradientOverlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 100,
    backgroundColor: "rgba(0, 0, 0, 0.3)",
  },
  backIcon: {
    position: "absolute",
    top: 48,
    left: 16,
    zIndex: 10,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    padding: 10,
    borderRadius: 12,
  },
  shareIcon: {
    position: "absolute",
    top: 48,
    right: 16,
    zIndex: 10,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    padding: 10,
    borderRadius: 12,
  },
  contentCard: {
    marginTop: -30,
    backgroundColor: "#ffffff",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 20,
  },
  categoryBadge: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    backgroundColor: "#ede9fe",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginBottom: 12,
  },
  categoryText: {
    color: "#6366f1",
    fontSize: 13,
    fontWeight: "600",
    marginLeft: 6,
  },
  name: {
    fontSize: 24,
    fontWeight: "800",
    color: "#1e293b",
    lineHeight: 32,
    marginBottom: 12,
  },
  statsRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  statItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  statText: {
    fontSize: 14,
    color: "#64748b",
    fontWeight: "600",
    marginLeft: 4,
  },
  statDivider: {
    width: 1,
    height: 14,
    backgroundColor: "#cbd5e1",
    marginHorizontal: 12,
  },
  priceContainer: {
    marginBottom: 20,
  },
  priceBox: {
    backgroundColor: "#fef3c7",
    borderRadius: 16,
    padding: 16,
    borderWidth: 2,
    borderColor: "#fbbf24",
  },
  priceLabel: {
    color: "#92400e",
    fontSize: 13,
    fontWeight: "600",
    marginBottom: 4,
  },
  price: {
    fontSize: 28,
    color: "#b45309",
    fontWeight: "800",
  },
  divider: {
    height: 1,
    backgroundColor: "#e2e8f0",
    marginVertical: 20,
  },
  descriptionSection: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: "700",
    color: "#1e293b",
    marginLeft: 8,
  },
  desc: {
    color: "#64748b",
    fontSize: 15,
    lineHeight: 24,
  },
  featuresSection: {
    gap: 12,
  },
  featureItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f0fdf4",
    padding: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#bbf7d0",
  },
  featureIcon: {
    marginRight: 12,
    backgroundColor: "#ffffff",
    padding: 8,
    borderRadius: 10,
  },
  featureTitle: {
    color: "#1e293b",
    fontSize: 14,
    fontWeight: "700",
    marginBottom: 2,
  },
  featureSubtitle: {
    color: "#64748b",
    fontSize: 12,
  },
  bottomBar: {
    flexDirection: "row",
    backgroundColor: "#ffffff",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: "#e2e8f0",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 10,
  },
  chatBtn: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ede9fe",
    paddingVertical: 14,
    borderRadius: 12,
    marginRight: 8,
  },
  chatText: {
    color: "#6366f1",
    fontSize: 15,
    fontWeight: "700",
    marginLeft: 6,
  },
  addToCartBtn: {
    flex: 2,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#6366f1",
    paddingVertical: 14,
    borderRadius: 12,
    shadowColor: "#6366f1",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  addToCartText: {
    color: "white",
    fontSize: 16,
    fontWeight: "700",
    marginLeft: 8,
  },
  qtyOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
  },
  qtyBox: {
    backgroundColor: "white",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
    paddingBottom: 32,
  },
  qtyTitle: {
    fontSize: 20,
    fontWeight: "800",
    color: "#1e293b",
    marginBottom: 24,
    textAlign: "center",
  },
  qtyRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 24,
  },
  qtyBtnMinus: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: "#ede9fe",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#c7d2fe",
  },
  qtyValueBox: {
    marginHorizontal: 24,
    minWidth: 60,
    alignItems: "center",
  },
  qtyValue: {
    fontSize: 28,
    fontWeight: "800",
    color: "#1e293b",
  },
  qtyBtnPlus: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: "#6366f1",
    alignItems: "center",
    justifyContent: "center",
  },
  qtyConfirm: {
    backgroundColor: "#6366f1",
    paddingVertical: 16,
    borderRadius: 14,
    marginBottom: 12,
    shadowColor: "#6366f1",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  qtyConfirmText: {
    textAlign: "center",
    color: "white",
    fontSize: 16,
    fontWeight: "800",
  },
  qtyCancel: {
    paddingVertical: 12,
  },
  qtyCancelText: {
    color: "#64748b",
    fontSize: 15,
    fontWeight: "600",
    textAlign: "center",
  },
});