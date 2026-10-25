
import React from 'react';
import {
  Alert,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

export default function App() {
  const showFeature = (feature: string) => {
    Alert.alert(feature, 'This feature will be developed in the next phase.');
  };

  const handleSOS = () => {
    Alert.alert(
      'Emergency SOS',
      'This is a demo only. No emergency services have been contacted.'
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#101B35" />

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <Text style={styles.logo}>🛡️ TourShield</Text>
          <Text style={styles.tagline}>Explore freely. Travel safely.</Text>
        </View>

        <View style={styles.welcome}>
          <Text style={styles.greeting}>Welcome, Traveller! 👋</Text>
          <Text style={styles.subtitle}>
            Your personal travel safety companion.
          </Text>
        </View>

        <View style={styles.statusCard}>
          <Text style={styles.cardLabel}>YOUR SAFETY STATUS</Text>
          <Text style={styles.safeText}>● Ready to explore</Text>
          <Text style={styles.smallText}>
            Live safety monitoring is not enabled yet.
          </Text>
        </View>

        <Text style={styles.sectionTitle}>Your Safety Toolkit</Text>

        <View style={styles.grid}>
          <TouchableOpacity
            style={styles.featureCard}
            onPress={() => showFeature('Live Location')}
          >
            <Text style={styles.featureIcon}>📍</Text>
            <Text style={styles.featureTitle}>Live Location</Text>
            <Text style={styles.featureDescription}>Location services</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.featureCard}
            onPress={() => showFeature('Safety Zones')}
          >
            <Text style={styles.featureIcon}>🗺️</Text>
            <Text style={styles.featureTitle}>Safety Zones</Text>
            <Text style={styles.featureDescription}>Explore nearby areas</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.featureCard}
            onPress={() => showFeature('Emergency Contacts')}
          >
            <Text style={styles.featureIcon}>📞</Text>
            <Text style={styles.featureTitle}>Emergency Help</Text>
            <Text style={styles.featureDescription}>Get assistance</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.featureCard}
            onPress={() => showFeature('Explore')}
          >
            <Text style={styles.featureIcon}>🧭</Text>
            <Text style={styles.featureTitle}>Explore Places</Text>
            <Text style={styles.featureDescription}>Plan your journey</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.sosButton} onPress={handleSOS}>
          <Text style={styles.sosTitle}>🆘  EMERGENCY SOS</Text>
          <Text style={styles.sosSubtitle}>Demo button — no alert is sent</Text>
        </TouchableOpacity>

        <Text style={styles.footer}>
          TourShield • Your journey, your safety
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F6FC',
  },
  content: {
    padding: 20,
    paddingBottom: 32,
  },
  header: {
    backgroundColor: '#101B35',
    padding: 24,
    borderRadius: 20,
    marginBottom: 24,
  },
  logo: {
    color: '#FFFFFF',
    fontSize: 28,
    fontWeight: 'bold',
  },
  tagline: {
    color: '#C8D5F0',
    fontSize: 14,
    marginTop: 8,
  },
  welcome: {
    marginBottom: 22,
  },
  greeting: {
    color: '#14213D',
    fontSize: 23,
    fontWeight: 'bold',
  },
  subtitle: {
    color: '#667085',
    fontSize: 14,
    marginTop: 7,
  },
  statusCard: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 16,
    marginBottom: 26,
    borderWidth: 1,
    borderColor: '#DCE5F5',
  },
  cardLabel: {
    color: '#667085',
    fontSize: 12,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  safeText: {
    color: '#16845B',
    fontSize: 19,
    fontWeight: 'bold',
    marginTop: 12,
  },
  smallText: {
    color: '#667085',
    fontSize: 12,
    marginTop: 8,
  },
  sectionTitle: {
    color: '#14213D',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 14,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  featureCard: {
    backgroundColor: '#FFFFFF',
    width: '48%',
    minHeight: 145,
    padding: 16,
    borderRadius: 16,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: '#E1E7F0',
  },
  featureIcon: {
    fontSize: 28,
    marginBottom: 12,
  },
  featureTitle: {
    color: '#14213D',
    fontSize: 15,
    fontWeight: 'bold',
  },
  featureDescription: {
    color: '#667085',
    fontSize: 12,
    marginTop: 7,
  },
  sosButton: {
    backgroundColor: '#C92A36',
    padding: 19,
    borderRadius: 16,
    alignItems: 'center',
    marginTop: 8,
  },
  sosTitle: {
    color: '#FFFFFF',
    fontSize: 19,
    fontWeight: 'bold',
  },
  sosSubtitle: {
    color: '#FFE5E7',
    fontSize: 12,
    marginTop: 7,
  },
  footer: {
    color: '#667085',
    textAlign: 'center',
    marginTop: 24,
    fontSize: 12,
  },
});
