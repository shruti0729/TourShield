
import React, { useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import * as Location from 'expo-location';
import { WebView } from 'react-native-webview';

export default function App() {
  const [location, setLocation] =
    useState<Location.LocationObject | null>(null);
  const [locationLoading, setLocationLoading] = useState(false);
  const [locationError, setLocationError] = useState('');
  const [showLocation, setShowLocation] = useState(false);
  const [showMap, setShowMap] = useState(false);

  const getCurrentLocation = async () => {
    setShowLocation(true);
    setLocationLoading(true);
    setLocationError('');

    try {
      const permission =
        await Location.requestForegroundPermissionsAsync();

      if (permission.status !== 'granted') {
        setLocationError(
          'Location permission was denied. Allow location access in your phone settings.'
        );
        return;
      }

      const servicesEnabled =
        await Location.hasServicesEnabledAsync();

      if (!servicesEnabled) {
        setLocationError(
          'GPS is turned off. Please enable Location on your phone and try again.'
        );
        return;
      }

      const currentLocation =
        await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.Balanced,
        });

      setLocation(currentLocation);
      setLocationError('');
    } catch (error) {
      setLocationError(
        'Unable to get your location. Check your GPS and internet settings, then try again.'
      );
    } finally {
      setLocationLoading(false);
    }
  };

  const mapHtml = location
    ? `
<!DOCTYPE html>
<html>
<head>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link
    rel="stylesheet"
    href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
  />
  <style>
    html, body, #map {
      height: 100%;
      width: 100%;
      margin: 0;
      padding: 0;
    }
  </style>
</head>
<body>
  <div id="map"></div>

  <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
  <script>
    const latitude = ${location.coords.latitude};
    const longitude = ${location.coords.longitude};

    const map = L.map('map').setView(
      [latitude, longitude],
      16
    );

    L.tileLayer(
      'https://tile.openstreetmap.org/{z}/{x}/{y}.png',
      {
        maxZoom: 19,
        attribution: '&copy; OpenStreetMap contributors'
      }
    ).addTo(map);

    L.marker([latitude, longitude])
      .addTo(map)
      .bindPopup('Your retrieved GPS location')
      .openPopup();
  </script>
</body>
</html>
`
    : '';

  const showComingSoon = (feature: string) => {
    Alert.alert(
      feature,
      'This feature is planned for the next development phase.'
    );
  };

  const showDemoSOS = () => {
    Alert.alert(
      'SOS Demo',
      'This is a demo only. No emergency services or contacts have been notified.',
      [{ text: 'OK' }]
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="#101B3A"
      />

      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.brandRow}>
            <View style={styles.logo}>
              <Text style={styles.logoText}>T</Text>
            </View>

            <View>
              <Text style={styles.brandName}>TourShield</Text>
              <Text style={styles.brandTagline}>
                Explore safely. Travel confidently.
              </Text>
            </View>
          </View>

          <View style={styles.profileCircle}>
            <Text style={styles.profileText}>TS</Text>
          </View>
        </View>

        {/* Welcome */}
        <View style={styles.welcomeSection}>
          <Text style={styles.greeting}>Hello, Traveller! 👋</Text>
          <Text style={styles.subtitle}>
            Your safety companion for every journey.
          </Text>
        </View>

        {/* Safety status */}
        <View style={styles.statusCard}>
          <View style={styles.statusIcon}>
            <Text style={styles.statusIconText}>🛡️</Text>
          </View>

          <View style={styles.statusContent}>
            <Text style={styles.statusTitle}>
              Ready to explore
            </Text>
            <Text style={styles.statusDescription}>
              GPS is available on demand. Continuous safety
              monitoring is not enabled.
            </Text>
          </View>

          <View style={styles.statusDot} />
        </View>

        {/* Feature heading */}
        <Text style={styles.sectionTitle}>
          Your Safety Toolkit
        </Text>

        <Text style={styles.sectionDescription}>
          Choose a feature to get started.
        </Text>

        {/* Feature cards */}
        <View style={styles.featureGrid}>
          <TouchableOpacity
            style={styles.featureCard}
            activeOpacity={0.8}
            onPress={() => {
              setShowLocation(!showLocation);
              if (!showLocation && !location) {
                void getCurrentLocation();
              }
            }}
          >
            <View
              style={[
                styles.featureIcon,
                { backgroundColor: '#E4F2FF' },
              ]}
            >
              <Text style={styles.featureEmoji}>📍</Text>
            </View>

            <Text style={styles.featureTitle}>
              Live Location
            </Text>
            <Text style={styles.featureDescription}>
              Retrieve your GPS coordinates and view them on a map.
            </Text>

            <Text style={styles.featureAction}>
              {showLocation ? 'Hide details ↑' : 'Get location →'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.featureCard}
            activeOpacity={0.8}
            onPress={() => showComingSoon('Safety Zones')}
          >
            <View
              style={[
                styles.featureIcon,
                { backgroundColor: '#FFF0D9' },
              ]}
            >
              <Text style={styles.featureEmoji}>⚠️</Text>
            </View>

            <Text style={styles.featureTitle}>
              Safety Zones
            </Text>
            <Text style={styles.featureDescription}>
              Planned alerts for verified safety and restricted zones.
            </Text>

            <Text style={styles.featureAction}>
              Coming soon →
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.featureCard}
            activeOpacity={0.8}
            onPress={showDemoSOS}
          >
            <View
              style={[
                styles.featureIcon,
                { backgroundColor: '#FFE5E8' },
              ]}
            >
              <Text style={styles.featureEmoji}>🆘</Text>
            </View>

            <Text style={styles.featureTitle}>
              Emergency Help
            </Text>
            <Text style={styles.featureDescription}>
              Open the SOS demo. It does not contact emergency services.
            </Text>

            <Text style={styles.featureAction}>
              Open demo →
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.featureCard}
            activeOpacity={0.8}
            onPress={() => showComingSoon('Explore Places')}
          >
            <View
              style={[
                styles.featureIcon,
                { backgroundColor: '#E4F8EC' },
              ]}
            >
              <Text style={styles.featureEmoji}>🧭</Text>
            </View>

            <Text style={styles.featureTitle}>
              Explore Places
            </Text>
            <Text style={styles.featureDescription}>
              Discover planned recommendations for places to visit.
            </Text>

            <Text style={styles.featureAction}>
              Coming soon →
            </Text>
          </TouchableOpacity>
        </View>

        {/* GPS details */}
        {showLocation && (
          <View style={styles.locationCard}>
            <View style={styles.locationHeader}>
              <Text style={styles.locationHeading}>
                📍 Your GPS Location
              </Text>

              {location && (
                <View style={styles.gpsBadge}>
                  <Text style={styles.gpsBadgeText}>
                    Retrieved
                  </Text>
                </View>
              )}
            </View>

            <Text style={styles.locationNote}>
              Your location is requested when you use this feature.
              This screen does not continuously track your movement.
            </Text>

            {locationLoading ? (
              <View style={styles.loadingContainer}>
                <ActivityIndicator
                  size="large"
                  color="#3157D5"
                />
                <Text style={styles.loadingText}>
                  Retrieving your location...
                </Text>
              </View>
            ) : location ? (
              <View style={styles.coordinatesBox}>
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

                <Text style={styles.accuracyText}>
                  Reported accuracy: approximately{' '}
                  {location.coords.accuracy != null
                    ? `${Math.round(location.coords.accuracy)} metres`
                    : 'unavailable'}
                </Text>
              </View>
            ) : (
              <Text style={styles.locationPlaceholder}>
                Tap the button below to retrieve your GPS coordinates.
              </Text>
            )}

            {!!locationError && (
              <Text style={styles.errorText}>
                {locationError}
              </Text>
            )}

            <TouchableOpacity
              style={styles.primaryButton}
              onPress={() => void getCurrentLocation()}
              disabled={locationLoading}
              activeOpacity={0.8}
            >
              <Text style={styles.primaryButtonText}>
                {locationLoading
                  ? 'Getting location...'
                  : location
                    ? '↻ Refresh Location'
                    : '📍 Get My Location'}
              </Text>
            </TouchableOpacity>

            {location && !locationLoading && (
              <TouchableOpacity
                style={styles.mapToggleButton}
                onPress={() => setShowMap(!showMap)}
                activeOpacity={0.8}
              >
                <Text style={styles.mapToggleText}>
                  {showMap ? 'Hide Map ▲' : '🗺️ Show Map'}
                </Text>
              </TouchableOpacity>
            )}

            {showMap && location && (
              <View style={styles.mapContainer}>
                <WebView
                  key={`${location.coords.latitude}-${location.coords.longitude}`}
                  originWhitelist={['*']}
                  source={{ html: mapHtml }}
                  style={styles.map}
                  javaScriptEnabled
                  domStorageEnabled
                  onError={() => {
                    setLocationError(
                      'The map could not load. Check your internet connection and try again.'
                    );
                  }}
                />

                <Text style={styles.mapAttribution}>
                  Map data © OpenStreetMap contributors
                </Text>
              </View>
            )}
          </View>
        )}

        {/* SOS demo panel */}
        <View style={styles.emergencyCard}>
          <View style={styles.emergencyTopRow}>
            <Text style={styles.emergencyIcon}>🆘</Text>
            <View style={styles.emergencyTextContainer}>
              <Text style={styles.emergencyTitle}>
                Need emergency assistance?
              </Text>
              <Text style={styles.emergencyDescription}>
                This button is a demonstration only. It does not
                send an SOS or notify anyone.
              </Text>
            </View>
          </View>

          <TouchableOpacity
            style={styles.sosButton}
            onPress={showDemoSOS}
            activeOpacity={0.8}
          >
            <Text style={styles.sosButtonText}>
              SOS — DEMO ONLY
            </Text>
          </TouchableOpacity>
        </View>

        {/* Footer */}
        <Text style={styles.footerText}>
          TourShield • Prototype in development
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#101B3A',
  },
  container: {
    flex: 1,
    backgroundColor: '#F4F7FC',
  },
  content: {
    paddingBottom: 28,
  },
  header: {
    backgroundColor: '#101B3A',
    paddingHorizontal: 22,
    paddingTop: 18,
    paddingBottom: 25,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  brandRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: '#3157D5',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  logoText: {
    fontSize: 25,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  brandName: {
    fontSize: 21,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  brandTagline: {
    fontSize: 11,
    color: '#C2CBE1',
    marginTop: 3,
  },
  profileCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#25365E',
    borderWidth: 1,
    borderColor: '#52658F',
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
  },
  welcomeSection: {
    paddingHorizontal: 22,
    paddingTop: 25,
    paddingBottom: 18,
  },
  greeting: {
    fontSize: 25,
    fontWeight: '800',
    color: '#172344',
  },
  subtitle: {
    fontSize: 14,
    color: '#6C7893',
    marginTop: 7,
    lineHeight: 20,
  },
  statusCard: {
    marginHorizontal: 20,
    marginBottom: 28,
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5EAF4',
  },
  statusIcon: {
    width: 48,
    height: 48,
    borderRadius: 15,
    backgroundColor: '#E5F7ED',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  statusIconText: {
    fontSize: 24,
  },
  statusContent: {
    flex: 1,
  },
  statusTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: '#172344',
  },
  statusDescription: {
    fontSize: 12,
    lineHeight: 18,
    color: '#6C7893',
    marginTop: 4,
  },
  statusDot: {
    width: 9,
    height: 9,
    borderRadius: 5,
    backgroundColor: '#E7A23D',
    marginLeft: 8,
    alignSelf: 'flex-start',
    marginTop: 5,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#172344',
    marginHorizontal: 22,
  },
  sectionDescription: {
    fontSize: 13,
    color: '#7B859C',
    marginHorizontal: 22,
    marginTop: 5,
    marginBottom: 17,
  },
  featureGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  featureCard: {
    width: '48%',
    backgroundColor: '#FFFFFF',
    borderRadius: 17,
    padding: 15,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: '#E6EBF4',
    minHeight: 206,
  },
  featureIcon: {
    width: 48,
    height: 48,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 14,
  },
  featureEmoji: {
    fontSize: 24,
  },
  featureTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: '#172344',
    marginBottom: 7,
  },
  featureDescription: {
    fontSize: 12,
    lineHeight: 18,
    color: '#758099',
    flex: 1,
  },
  featureAction: {
    color: '#3157D5',
    fontWeight: '700',
    fontSize: 12,
    marginTop: 13,
  },
  locationCard: {
    marginHorizontal: 20,
    marginTop: 10,
    marginBottom: 22,
    padding: 17,
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#DDE5F3',
  },
  locationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  locationHeading: {
    fontSize: 17,
    fontWeight: '800',
    color: '#172344',
    flexShrink: 1,
  },
  gpsBadge: {
    backgroundColor: '#DFF7E8',
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginTop: 4,
  },
  gpsBadgeText: {
    color: '#177844',
    fontSize: 11,
    fontWeight: '700',
  },
  locationNote: {
    fontSize: 12,
    color: '#758099',
    lineHeight: 18,
    marginTop: 10,
    marginBottom: 15,
  },
  loadingContainer: {
    alignItems: 'center',
    paddingVertical: 22,
  },
  loadingText: {
    color: '#6C7893',
    fontSize: 13,
    marginTop: 10,
  },
  coordinatesBox: {
    backgroundColor: '#F3F6FC',
    padding: 14,
    borderRadius: 13,
    marginBottom: 15,
  },
  coordinateLabel: {
    fontSize: 12,
    color: '#758099',
    marginTop: 3,
  },
  coordinateValue: {
    fontSize: 18,
    fontWeight: '800',
    color: '#172344',
    marginTop: 4,
    marginBottom: 10,
  },
  accuracyText: {
    fontSize: 11,
    color: '#758099',
    marginTop: 3,
  },
  locationPlaceholder: {
    fontSize: 13,
    color: '#758099',
    lineHeight: 20,
    paddingVertical: 10,
  },
  errorText: {
    color: '#C62828',
    fontSize: 12,
    lineHeight: 18,
    marginBottom: 12,
  },
  primaryButton: {
    backgroundColor: '#3157D5',
    borderRadius: 12,
    minHeight: 48,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 14,
    marginTop: 5,
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '800',
  },
  mapToggleButton: {
    borderWidth: 1,
    borderColor: '#3157D5',
    borderRadius: 12,
    minHeight: 46,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  mapToggleText: {
    color: '#3157D5',
    fontSize: 14,
    fontWeight: '800',
  },
  mapContainer: {
    height: 350,
    marginTop: 16,
    borderRadius: 14,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#DCE5F5',
    backgroundColor: '#F3F6FC',
  },
  map: {
    flex: 1,
    backgroundColor: '#F3F6FC',
  },
  mapAttribution: {
    backgroundColor: '#FFFFFF',
    color: '#526078',
    fontSize: 10,
    textAlign: 'center',
    paddingVertical: 5,
  },
  emergencyCard: {
    marginHorizontal: 20,
    marginTop: 2,
    padding: 17,
    backgroundColor: '#FFF1F2',
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#FFD5D9',
  },
  emergencyTopRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  emergencyIcon: {
    fontSize: 28,
    marginRight: 12,
  },
  emergencyTextContainer: {
    flex: 1,
  },
  emergencyTitle: {
    color: '#8F1D2C',
    fontSize: 15,
    fontWeight: '800',
  },
  emergencyDescription: {
    color: '#97515A',
    fontSize: 12,
    lineHeight: 18,
    marginTop: 6,
  },
  sosButton: {
    backgroundColor: '#D92D42',
    minHeight: 47,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 16,
  },
  sosButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '900',
    letterSpacing: 0.5,
  },
  footerText: {
    textAlign: 'center',
    color: '#929CB1',
    fontSize: 11,
    marginTop: 25,
    paddingHorizontal: 20,
  },
});
