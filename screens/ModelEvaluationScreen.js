import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

// ❗ FIX: Pakai BASE_URL dari Ngrok
import { BASE_URL } from "../utils/config";


export default function ModelEvaluationScreen() {
  const [metrics, setMetrics] = useState(null);

  // 🔥 FETCH DATA MODEL EVALUATION
  useEffect(() => {
    fetch(`${BASE_URL}/ai/model-eval`)
      .then((res) => res.json())
      .then((data) => {
        console.log("MODEL EVAL:", data);
        setMetrics(data);
      })
      .catch((err) => console.log("MODEL EVAL ERROR:", err));
  }, []);

  if (!metrics) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loading}>Loading model evaluation...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Model Evaluation</Text>
      <Text style={styles.subtitle}>
        Hasil evaluasi model AI berdasarkan RMSE, MAE, dan Precision@K.
      </Text>

      {/* RMSE & MAE */}
      <View style={styles.metricsRow}>
        <View style={[styles.metricCard, styles.glowBlue]}>
          <Text style={styles.metricLabel}>RMSE</Text>
          <Text style={styles.metricValue}>{metrics.rmse}</Text>
        </View>

        <View style={[styles.metricCard, styles.glowPurple]}>
          <Text style={styles.metricLabel}>MAE</Text>
          <Text style={styles.metricValue}>{metrics.mae}</Text>
        </View>
      </View>

      {/* Precision@K */}
      <View style={[styles.metricCard, styles.glowPink, { marginTop: 18 }]}>
        <Text style={styles.metricLabel}>Precision@K</Text>
        <Text style={styles.metricValue}>{metrics.precisionAtK}</Text>

        <Text style={styles.helper}>
          Semakin tinggi Precision@K, semakin baik model dalam memberikan
          rekomendasi paling relevan.
        </Text>
      </View>

      {/* Note */}
      <View style={[styles.noteCard, styles.glowSoft]}>
        <Text style={styles.note}>{metrics.note}</Text>
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
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 13,
    color: "#94a3b8",
    marginBottom: 22,
  },

  loadingContainer: {
    flex: 1,
    backgroundColor: "#020617",
    justifyContent: "center",
    alignItems: "center",
  },
  loading: { color: "#818cf8", fontSize: 14 },

  metricsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  metricCard: {
    flex: 1,
    backgroundColor: "#0f172a",
    borderRadius: 16,
    padding: 18,
    marginRight: 10,
    borderWidth: 1,
    borderColor: "#1e293b",
  },

  metricLabel: {
    color: "#9ca3af",
    fontSize: 13,
    marginBottom: 4,
  },

  metricValue: {
    color: "#c4b5fd",
    fontSize: 22,
    fontWeight: "800",
  },

  helper: {
    color: "#9ca3af",
    fontSize: 12,
    marginTop: 10,
    lineHeight: 18,
  },

  noteCard: {
    backgroundColor: "#0f172a",
    padding: 16,
    borderRadius: 14,
    marginTop: 20,
  },

  note: {
    color: "#a5b4fc",
    fontSize: 13,
    textAlign: "center",
  },

  glowBlue: {
    shadowColor: "#3b82f6",
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 6,
  },
  glowPurple: {
    shadowColor: "#8b5cf6",
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 6,
  },
  glowPink: {
    shadowColor: "#ec4899",
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 6,
  },
  glowSoft: {
    shadowColor: "#6366f1",
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 4,
  },
});
