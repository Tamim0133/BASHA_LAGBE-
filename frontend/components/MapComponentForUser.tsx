import { View, StyleSheet, Text, TouchableOpacity, Alert } from 'react-native';
import React, { memo, useEffect, useRef, useState } from 'react';
import { Marker } from 'react-native-maps';
import MapView from 'react-native-map-clustering';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import * as Location from 'expo-location';
import * as LocationGeocoding from 'expo-location';
import { TextInput } from 'react-native-gesture-handler';
import Colors from '@/constants/Colors';

// Types
interface MarkerLocation {
    latitude: number;
    longitude: number;
}

interface Region extends MarkerLocation {
    latitudeDelta: number;
    longitudeDelta: number;
}

const INITIAL_REGION: Region = {
    latitude: 23.8103,
    longitude: 90.4125,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
};

const MapComponentForUser: React.FC = () => {
    const router = useRouter();
    const mapRef = useRef<MapView | null>(null);

    const [markerLocation, setMarkerLocation] = useState<MarkerLocation | null>(null);
    const [location, setLocation] = useState<MarkerLocation | null>(null);
    const [searchText, setSearchText] = useState<string>('');

    // Request location permissions and get user's current location
    const onLocateMe = async (): Promise<void> => {
        try {
            const { status } = await Location.requestForegroundPermissionsAsync();

            if (status !== 'granted') {
                Alert.alert(
                    'Permission Denied',
                    'Please enable location services to use this feature.',
                    [{ text: 'OK' }]
                );
                return;
            }

            const currentLocation = await Location.getCurrentPositionAsync({});
            const region: Region = {
                latitude: currentLocation.coords.latitude,
                longitude: currentLocation.coords.longitude,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01,
            };

            mapRef.current?.animateToRegion(region);
            console.log('Current Location:', currentLocation.coords);
        } catch (error) {
            console.error('Error getting location:', error);
            Alert.alert('Error', 'Failed to get your location');
        }
    };

    // Search for a location by name
    const onSearchLocation = async (): Promise<void> => {
        try {
            if (!searchText.trim()) {
                Alert.alert('Error', 'Please enter a location to search');
                return;
            }

            const geocode = await LocationGeocoding.geocodeAsync(searchText);

            if (geocode.length > 0) {
                const { latitude, longitude } = geocode[0];
                const region: Region = {
                    latitude,
                    longitude,
                    latitudeDelta: 0.01,
                    longitudeDelta: 0.01,
                };

                mapRef.current?.animateToRegion(region);
                setMarkerLocation({ latitude, longitude });
                confirmLocation(latitude, longitude);
            } else {
                Alert.alert('Not Found', 'Location not found. Please try another search.');
            }
        } catch (error) {
            console.error('Search error:', error);
            Alert.alert('Error', 'Failed to search for location');
        }
    };

    // Confirm selected location
    const confirmLocation = (latitude: number, longitude: number): void => {
        setTimeout(() => {
            Alert.alert(
                'Confirm Location',
                'Is this the correct location?',
                [
                    {
                        text: 'Cancel',
                        style: 'cancel'
                    },
                    {
                        text: 'Confirm',
                        onPress: () => setLocation({ latitude, longitude })
                    },
                ]
            );
        }, 1000);
    };

    // Initialize location when component mounts
    useEffect(() => {
        onLocateMe();
    }, []);

    // Log location changes
    useEffect(() => {
        if (location) {
            console.log('Saved Location:', location);
        }
    }, [location]);

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.searchBar}
                placeholder="Search location..."
                value={searchText}
                onChangeText={setSearchText}
                onSubmitEditing={onSearchLocation}
                returnKeyType="search"
                autoCapitalize="none"
                autoCorrect={false}
            />

            <MapView
                ref={mapRef}
                style={styles.mapView}
                initialRegion={INITIAL_REGION}
                onPress={(e) => {
                    const { latitude, longitude } = e.nativeEvent.coordinate;
                    setMarkerLocation({ latitude, longitude });
                    confirmLocation(latitude, longitude);
                }}
            >
                {markerLocation && (
                    <Marker
                        coordinate={markerLocation}
                        title="Selected Location"
                        description={`${markerLocation.latitude.toFixed(4)}, ${markerLocation.longitude.toFixed(4)}`}
                    />
                )}
            </MapView>

            <TouchableOpacity
                style={styles.locateBtn}
                onPress={onLocateMe}
                activeOpacity={0.7}
            >
                <Ionicons name="navigate" size={24} color={Colors.dark} />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        height: 500,
        borderWidth: 3,
        borderColor: Colors.primary,
        marginBottom: 30,
    },
    searchBar: {
        position: 'absolute',
        top: 10,
        left: 10,
        right: 10,
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 10,
        fontSize: 16,
        zIndex: 1,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    mapView: {
        ...StyleSheet.absoluteFillObject,
        borderWidth: 2,
        borderColor: Colors.primary,
    },
    locateBtn: {
        position: 'absolute',
        top: 70,
        right: 20,
        backgroundColor: '#fff',
        padding: 10,
        borderRadius: 10,
        elevation: 2,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 6,
        shadowOffset: {
            width: 1,
            height: 10,
        },
        borderWidth: 2,
        borderColor: Colors.primary,
    },
});

export default memo(MapComponentForUser);