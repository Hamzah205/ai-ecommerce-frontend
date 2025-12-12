import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { featureImportance } from '../data/mockData';

export default function FeatureImportanceScreen() {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Feature Importance — Random Forest</Text>
      <Text style={styles.subtitle}>
        Fitur yang paling berpengaruh dalam menentukan rekomendasi produk.
      </Text>

      {featureImportance.map((f) => (
        <View key={f.feature} style={styles.row}>
          <View style={styles.labelCol}>
            <Text style={styles.feature}>{f.feature}</Text>
            <Text style={styles.value}>{f.importance}%</Text>
          </View>
          <View style={styles.barBackground}>
            <View style={[styles.barFill, { width: `${f.importance}%` }]} />
          </View>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#020617',
    paddingHorizontal: 16,
    paddingTop: 48,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#e5e7eb',
  },
  subtitle: {
    fontSize: 13,
    color: '#9ca3af',
    marginBottom: 16,
  },
  row: {
    marginBottom: 12,
  },
  labelCol: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  feature: {
    color: '#e5e7eb',
    fontSize: 14,
  },
  value: {
    color: '#a5b4fc',
    fontSize: 13,
  },
  barBackground: {
    width: '100%',
    height: 10,
    borderRadius: 999,
    backgroundColor: '#020617',
    borderWidth: 1,
    borderColor: '#1f2937',
    overflow: 'hidden',
  },
  barFill: {
    height: '100%',
    borderRadius: 999,
    backgroundColor: '#4f46e5',
  },
});
