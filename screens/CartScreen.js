import React, { useContext } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { CartContext } from "../utils/CartContext";
import { BASE_URL } from "../utils/config";


export default function CartScreen({ navigation }) {
  const { cart, removeFromCart, clearCart, updateQuantity } = useContext(CartContext);

  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* HEADER */}
        <View style={styles.header}>
          <TouchableOpacity 
            onPress={() => navigation.goBack()}
            style={styles.backBtn}
          >
            <Ionicons name="arrow-back" size={24} color="#1e293b" />
          </TouchableOpacity>
          <View>
            <Text style={styles.title}>Shopping Cart</Text>
            <Text style={styles.subtitle}>{totalItems} items</Text>
          </View>
          <View style={{ width: 40 }} />
        </View>

        {cart.length === 0 ? (
          <View style={styles.emptyContainer}>
            <View style={styles.emptyIconBox}>
              <Ionicons name="cart-outline" size={80} color="#cbd5e1" />
            </View>
            <Text style={styles.emptyText}>Your cart is empty</Text>
            <Text style={styles.emptySubtext}>
              Start shopping and add items to your cart
            </Text>
            <TouchableOpacity 
              style={styles.shopNowBtn}
              onPress={() => navigation.goBack()}
            >
              <Text style={styles.shopNowText}>Start Shopping</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <>
            <ScrollView 
              style={styles.scrollView}
              showsVerticalScrollIndicator={false}
            >
              {cart.map((item, index) => (
                <View key={index} style={styles.card}>
                  <View style={styles.imageContainer}>
                    <Image
                      source={{ uri: BASE_URL + item.image }}
                      style={styles.image}
                    />
                  </View>

                  <View style={styles.details}>
                    <Text style={styles.name} numberOfLines={2}>
                      {item.name}
                    </Text>

                    <Text style={styles.price}>
                      Rp {item.price.toLocaleString("id-ID")}
                    </Text>

                    {/* QUANTITY CONTROLS */}
                    <View style={styles.qtyControls}>
                      <TouchableOpacity
                        style={styles.qtyBtn}
                        onPress={() => {
                          if (item.qty > 1) {
                            updateQuantity(index, item.qty - 1);
                          }
                        }}
                      >
                        <Ionicons name="remove" size={16} color="#6366f1" />
                      </TouchableOpacity>

                      <Text style={styles.qtyText}>{item.qty}</Text>

                      <TouchableOpacity
                        style={styles.qtyBtn}
                        onPress={() => updateQuantity(index, item.qty + 1)}
                      >
                        <Ionicons name="add" size={16} color="#6366f1" />
                      </TouchableOpacity>
                    </View>

                    {/* SUBTOTAL */}
                    <View style={styles.subtotalBox}>
                      <Text style={styles.subtotalLabel}>Subtotal:</Text>
                      <Text style={styles.subtotal}>
                        Rp {(item.qty * item.price).toLocaleString("id-ID")}
                      </Text>
                    </View>
                  </View>

                  {/* DELETE BUTTON */}
                  <TouchableOpacity
                    style={styles.deleteBtn}
                    onPress={() => removeFromCart(index)}
                  >
                    <Ionicons name="trash-outline" size={20} color="#ef4444" />
                  </TouchableOpacity>
                </View>
              ))}

              {/* PROMO SECTION */}
              <View style={styles.promoSection}>
                <Ionicons name="pricetag" size={20} color="#6366f1" />
                <Text style={styles.promoText}>Have a promo code?</Text>
                <TouchableOpacity>
                  <Text style={styles.promoLink}>Apply</Text>
                </TouchableOpacity>
              </View>

              {/* SUMMARY */}
              <View style={styles.summaryBox}>
                <Text style={styles.summaryTitle}>Order Summary</Text>
                
                <View style={styles.summaryRow}>
                  <Text style={styles.summaryLabel}>Subtotal ({totalItems} items)</Text>
                  <Text style={styles.summaryValue}>
                    Rp {total.toLocaleString("id-ID")}
                  </Text>
                </View>

                <View style={styles.summaryRow}>
                  <Text style={styles.summaryLabel}>Shipping Fee</Text>
                  <Text style={styles.summaryValueFree}>FREE</Text>
                </View>

                <View style={styles.summaryDivider} />

                <View style={styles.summaryRow}>
                  <Text style={styles.totalLabel}>Total</Text>
                  <Text style={styles.totalValue}>
                    Rp {total.toLocaleString("id-ID")}
                  </Text>
                </View>
              </View>

              {/* CLEAR CART BUTTON */}
              <TouchableOpacity 
                style={styles.clearCartBtn} 
                onPress={clearCart}
              >
                <Ionicons name="trash-outline" size={18} color="#ef4444" />
                <Text style={styles.clearCartText}>Clear Cart</Text>
              </TouchableOpacity>

              <View style={{ height: 120 }} />
            </ScrollView>

            {/* FLOATING CHECKOUT */}
            <View style={styles.checkoutBar}>
              <View style={styles.totalContainer}>
                <Text style={styles.checkoutLabel}>Total Payment</Text>
                <Text style={styles.checkoutTotal}>
                  Rp {total.toLocaleString("id-ID")}
                </Text>
              </View>

              <TouchableOpacity style={styles.checkoutBtn}>
                <Text style={styles.checkoutText}>Checkout</Text>
                <Ionicons name="arrow-forward" size={20} color="white" />
              </TouchableOpacity>
            </View>
          </>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f8fafc",
  },
  container: {
    flex: 1,
    backgroundColor: "#f8fafc",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: "#ffffff",
    borderBottomWidth: 1,
    borderBottomColor: "#e2e8f0",
  },
  backBtn: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "800",
    color: "#1e293b",
    textAlign: "center",
  },
  subtitle: {
    fontSize: 13,
    color: "#64748b",
    textAlign: "center",
    marginTop: 2,
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 16,
  },
  card: {
    flexDirection: "row",
    backgroundColor: "#ffffff",
    padding: 14,
    borderRadius: 16,
    marginTop: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  imageContainer: {
    width: 90,
    height: 90,
    borderRadius: 12,
    overflow: "hidden",
    backgroundColor: "#f1f5f9",
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  details: {
    flex: 1,
    marginLeft: 14,
    justifyContent: "space-between",
  },
  name: {
    color: "#1e293b",
    fontSize: 15,
    fontWeight: "700",
    marginBottom: 4,
  },
  price: {
    color: "#64748b",
    fontSize: 14,
    fontWeight: "600",
  },
  qtyControls: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
  },
  qtyBtn: {
    width: 28,
    height: 28,
    borderRadius: 8,
    backgroundColor: "#ede9fe",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#c7d2fe",
  },
  qtyText: {
    fontSize: 15,
    fontWeight: "700",
    color: "#1e293b",
    marginHorizontal: 16,
    minWidth: 20,
    textAlign: "center",
  },
  subtotalBox: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 6,
  },
  subtotalLabel: {
    fontSize: 12,
    color: "#94a3b8",
    marginRight: 6,
  },
  subtotal: {
    color: "#10b981",
    fontSize: 14,
    fontWeight: "700",
  },
  deleteBtn: {
    padding: 8,
    alignSelf: "flex-start",
  },
  promoSection: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ffffff",
    padding: 16,
    borderRadius: 12,
    marginTop: 16,
  },
  promoText: {
    flex: 1,
    marginLeft: 12,
    color: "#1e293b",
    fontSize: 14,
    fontWeight: "600",
  },
  promoLink: {
    color: "#6366f1",
    fontSize: 14,
    fontWeight: "700",
  },
  summaryBox: {
    backgroundColor: "#ffffff",
    padding: 20,
    borderRadius: 16,
    marginTop: 16,
  },
  summaryTitle: {
    fontSize: 17,
    fontWeight: "800",
    color: "#1e293b",
    marginBottom: 16,
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  summaryLabel: {
    fontSize: 14,
    color: "#64748b",
  },
  summaryValue: {
    fontSize: 14,
    fontWeight: "600",
    color: "#1e293b",
  },
  summaryValueFree: {
    fontSize: 14,
    fontWeight: "700",
    color: "#10b981",
  },
  summaryDivider: {
    height: 1,
    backgroundColor: "#e2e8f0",
    marginVertical: 12,
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: "700",
    color: "#1e293b",
  },
  totalValue: {
    fontSize: 18,
    fontWeight: "800",
    color: "#6366f1",
  },
  clearCartBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ffffff",
    paddingVertical: 14,
    borderRadius: 12,
    marginTop: 16,
    borderWidth: 1,
    borderColor: "#fee2e2",
  },
  clearCartText: {
    color: "#ef4444",
    fontSize: 15,
    fontWeight: "700",
    marginLeft: 8,
  },
  checkoutBar: {
    backgroundColor: "#ffffff",
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: "#e2e8f0",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 10,
  },
  totalContainer: {
    marginBottom: 12,
  },
  checkoutLabel: {
    fontSize: 13,
    color: "#64748b",
    marginBottom: 4,
  },
  checkoutTotal: {
    fontSize: 22,
    fontWeight: "800",
    color: "#1e293b",
  },
  checkoutBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#6366f1",
    paddingVertical: 16,
    borderRadius: 14,
    shadowColor: "#6366f1",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  checkoutText: {
    color: "white",
    fontSize: 17,
    fontWeight: "800",
    marginRight: 8,
  },
  emptyContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 40,
  },
  emptyIconBox: {
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: "#f1f5f9",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 24,
  },
  emptyText: {
    fontSize: 22,
    fontWeight: "800",
    color: "#1e293b",
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 15,
    color: "#64748b",
    textAlign: "center",
    marginBottom: 32,
  },
  shopNowBtn: {
    backgroundColor: "#6366f1",
    paddingHorizontal: 32,
    paddingVertical: 14,
    borderRadius: 12,
  },
  shopNowText: {
    color: "white",
    fontSize: 16,
    fontWeight: "700",
  },
});