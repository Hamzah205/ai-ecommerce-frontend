import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

import { BASE_URL } from "../utils/config";



export default function UserClusteringScreen() {
  const [cluster, setCluster] = useState(null);

  // 🔥 FETCH CLUSTER RESULT
  useEffect(() => {
    fetch(`${BASE_URL}/ai/cluster?user=Ilham`)
      .then((res) => res.json())
      .then((data) => {
        console.log("CLUSTER RESULT:", data);
        setCluster(data);
      })
      .catch((err) => console.log("CLUSTER ERROR:", err));
  }, []);

  if (!cluster) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loading}>AI sedang menganalisis cluster...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>User Segmentation — K-Means</Text>
      <Text style={styles.subtitle}>
        Pengelompokan pengguna berdasarkan behavior digital.
      </Text>

      {/* CLUSTER CARD */}
      <View style={[styles.card, styles.glowPurple]}>
        <Text style={styles.clusterLabel}>Cluster Result</Text>
        <Text style={styles.clusterName}>{cluster.cluster}</Text>

        <Text style={styles.desc}>{cluster.description}</Text>

        <Text style={styles.userLabel}>User:</Text>
        <Text style={styles.userValue}>{cluster.user}</Text>
      </View>

      {/* SIMULATED BEHAVIOR LIST */}
      <View style={[styles.card, styles.glowBlue]}>
        <Text style={styles.subheading}>Behavior Patterns</Text>

        <Text style={styles.behavior}>• Frequent browsing in preferred category</Text>
        <Text style={styles.behavior}>• High engagement on recommended items</Text>
        <Text style={styles.behavior}>• Responsive to discounts & flash sales</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#020617",
    paddingHorizontal: 16,
    paddingTop: 48,
  },

  title: {
    fontSize: 22,
    fontWeight: "700",
    color: "#e5e7eb",
    marginBottom: 4,
  },

  subtitle: {
    fontSize: 13,
    color: "#94a3b8",
    marginBottom: 20,
  },

  loadingContainer: {
    flex: 1,
    backgroundColor: "#020617",
    justifyContent: "center",
    alignItems: "center",
  },

  loading: {
    color: "#818cf8",
    fontSize: 14,
  },

  card: {
    backgroundColor: "#0f172a",
    borderRadius: 16,
    padding: 18,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#1e293b",
  },

  clusterLabel: {
    fontSize: 13,
    color: "#9ca3af",
    marginBottom: 4,
  },

  clusterName: {
    fontSize: 20,
    fontWeight: "800",
    color: "#c084fc",
    marginBottom: 8,
  },

  desc: {
    color: "#9ca3af",
    fontSize: 13,
    lineHeight: 20,
    marginBottom: 12,
  },

  userLabel: {
    fontSize: 12,
    color: "#94a3b8",
  },

  userValue: {
    fontSize: 14,
    color: "#38bdf8",
    fontWeight: "700",
  },

  subheading: {
    color: "#e5e7eb",
    fontWeight: "700",
    fontSize: 15,
    marginBottom: 10,
  },

  behavior: {
    color: "#a5b4fc",
    fontSize: 13,
    marginBottom: 6,
  },

  glowPurple: {
    shadowColor: "#8b5cf6",
    shadowOpacity: 0.4,
    shadowRadius: 14,
    elevation: 6,
  },

  glowBlue: {
    shadowColor: "#3b82f6",
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 6,
  },
});
