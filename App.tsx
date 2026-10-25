
import React, { useState } from 'react';
import {
  Alert,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from 'react-native';
import * as Location from 'expo-location';

export default function App() {
  const [location, setLocation] =
    useState<Location.LocationObject | null>(null);
  const [locationLoading, setLocationLoading] = useState(false);
  const [locationError, setLocationError] = useState('');
  const [showLocation, setShowLocation] = useState(false);

  const getCurrentLocation = async () => {
    setShowLocation(true);
    setLocationLoading(true);
    setLocationError('');

    try {
      const { status } =
        await Location.requestForegroundPermissionsAsync();

      if (status !== 'granted') {
        setLocationError(
          'Location permission denied. Please allow location access in your phone settings.'
        );
        return;
      }

      const servicesEnabled =
        await Location.hasServicesEnabledAsync();

      if (!servicesEnabled) {
        setLocationError(
          'Location services are turned off. Please enable GPS on your phone.'
        );
        return;
      }

      const currentLocation =
        await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.Balanced,
        });

      setLocation(currentLocation);
    } catch (error) {
      setLocationError(
        'Unable to get your location. Please check your GPS and try again.'
      );
    } finally {
      setLocationLoading(false);
    }
  };

  const showFeature = (feature: string) => {
    Alert.alert(
      feature,
      'This feature will be developed in the next phase.'
    );
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
          <Text style={styles.tagline}>
            Explore freely. Travel safely.
          </Text>
        </View>

        <View style={styles.welcome}>
          <Text style={styles.greeting}>
            Welcome, Traveller! 👋
          </Text>
          <Text style={styles.subtitle}>
            Your personal travel safety companion.
          </Text>
        </View>

        <View style={styles.statusCard}>
          <Text style={styles.cardLabel}>YOUR SAFETY STATUS</Text>
          <Text style={styles.safeText}>
            ● Ready to explore
          </Text>
          <Text style={styles.smallText}>
            GPS location is available on demand. Safety monitoring
            is not enabled yet.
          </Text>
        </View>

        <Text style={styles.sectionTitle}>
          Your Safety Toolkit
        </Text>

        <View style={styles.grid}>
          <TouchableOpacity
            style={styles.featureCard}
            onPress={getCurrentLocation}
            accessibilityRole="button"
            accessibilityLabel="Get my current location"
          >
            <Text style={styles.featureIcon}>📍</Text>
            <Text style={styles.featureTitle}>Live Location</Text>
            <Text style={styles.featureDescription}>
              Get your GPS coordinates
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.featureCard}
            onPress={() => showFeature('Safety Zones')}
          >
            <Text style={styles.featureIcon}>🗺️</Text>
            <Text style={styles.featureTitle}>Safety Zones</Text>
            <Text style={styles.featureDescription}>
              Explore nearby areas
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.featureCard}
            onPress={() => showFeature('Emergency Contacts')}
          >
            <Text style={styles.featureIcon}>📞</Text>
            <Text style={styles.featureTitle}>Emergency Help</Text>
            <Text style={styles.featureDescription}>
              Get assistance
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.featureCard}
            onPress={() => showFeature('Explore')}
          >
            <Text style={styles.featureIcon}>🧭</Text>
            <Text style={styles.featureTitle}>Explore Places</Text>
            <Text style={styles.featureDescription}>
              Plan your journey
            </Text>
          </TouchableOpacity>
        </View>

        {showLocation && (
          <View style={styles.locationCard}>
            <Text style={styles.locationTitle}>
              📍 Your Current Location
            </Text>

            {locationLoading ? (
              <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#2457C5" />
                <Text style={styles.smallText}>
                  Getting your location...
                </Text>
              </View>
            ) : locationError ? (
              <Text style={styles.errorText}>
                {locationError}
              </Text>
            ) : location ? (
              <>
                <Text style={styles.coordinateLabel}>
                  Latitude
                </Text>
                <Text style={styles.coordinateValue}>
                  {location.coords.latitude.toFixed(6)}
                </Text>

                <Text style={styles.coordinateLabel}>
                  Longitude
                </Text>
                <Text style={styles.coordinateValue}>
                  {location.coords.longitude.toFixed(6)}
                </Text>

                <Text style={styles.smallText}>
                  Accuracy: approximately{' '}
                  {location.coords.accuracy != null
                    ? `${Math.round(location.coords.accuracy)} metres`
                    : 'unavailable'}
                </Text>
                <Text style={styles.smallText}>
                  Location retrieved successfully. This is not
                  continuous background tracking.
                </Text>
              </>
            ) : null}

            <TouchableOpacity
              style={styles.refreshButton}
              onPress={getCurrentLocation}
              disabled={locationLoading}
            >
              <Text style={styles.refreshButtonText}>
                {locationLoading ? 'Please wait...' : '↻ Refresh Location'}
              </Text>
            </TouchableOpacity>
          </View>
        )}

        <TouchableOpacity
          style={styles.sosButton}
          onPress={handleSOS}
        >
          <Text style={styles.sosTitle}>
            🆘 EMERGENCY SOS
          </Text>
          <Text style={styles.sosSubtitle}>
            Demo button — no alert is sent
          </Text>
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
    lineHeight: 18,
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
  locationCard: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 16,
    marginTop: 8,
    marginBottom: 18,
    borderWidth: 1,
    borderColor: '#DCE5F5',
  },
  locationTitle: {
    color: '#14213D',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  loadingContainer: {
    alignItems: 'center',
    paddingVertical: 16,
  },
  coordinateLabel: {
    color: '#667085',
    fontSize: 13,
    marginTop: 12,
  },
  coordinateValue: {
    color: '#14213D',
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 4,
  },
  errorText: {
    color: '#C92A36',
    fontSize: 14,
    lineHeight: 21,
    marginVertical: 8,
  },
  refreshButton: {
    backgroundColor: '#2457C5',
    padding: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 18,
  },
  refreshButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
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
