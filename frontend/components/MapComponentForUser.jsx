import React, { useEffect, useRef, useState } from 'react';
import LocationFetcher from './LocationFetcher';
import MapContainer from './MapContainer';
import LoadingIndicator from './LoadingIndicator';
import styles from '@/styles/myMapComponentStyles';
import { ActivityIndicator, Alert, TextInput, View } from 'react-native';
import * as Location from 'expo-location';
import * as LocationGeocoding from 'expo-location';
import Colors from '@/constants/Colors';

const initialLocation = {
    latitude: 23.8103,
    longitude: 90.4125,
};

const ListingsMap = ({ setLatitude, setLongitude, handleLocationConfirmation }) => {
    const [isLocating, setIsLocating] = useState(false);
    const [searchText, setSearchText] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [myLocation, setMyLocation] = useState(initialLocation); // User location state
    const [pin, setPin] = useState(initialLocation);
    const [adLocation, setadLocation] = useState({})

    const mapRef = useRef(null);

    const handleMapPress = (event) => {
        const { latitude, longitude } = event.nativeEvent.coordinate;
        setPin({ latitude, longitude });
        console.log("New pin location: ", { latitude, longitude });

        // Show alert asking for confirmation
        Alert.alert(
            "Confirm Location",
            "Is this the correct location for your property?",
            [
                {
                    text: "No",
                    onPress: () => console.log("Location not confirmed"),
                    style: "cancel"
                },
                {
                    text: "Yes",
                    onPress: () => {
                        setadLocation({ latitude, longitude });
                        setLatitude(latitude);
                        setLongitude(longitude);
                        console.log("Location confirmed and saved:", { latitude, longitude });
                        handleLocationConfirmation(latitude, longitude);
                    }
                }
            ]
        );
    };

    const onSearchLocation = async () => {
        try {
            setIsLocating(true);
            if (!searchText.trim()) {
                Alert.alert('Error', 'Please enter a location to search');
                return;
            }

            const geocode = await LocationGeocoding.geocodeAsync(searchText);

            if (geocode.length > 0) {
                const { latitude, longitude } = geocode[0];
                const region = {
                    latitude,
                    longitude,
                    latitudeDelta: 0.01,
                    longitudeDelta: 0.01,
                };

                mapRef.current?.animateToRegion(region);
            } else {
                Alert.alert('Not Found', 'Location not found. Please try another search.');
            }
        } catch (error) {
            Alert.alert('Not Found', 'Location not found. Please try another search.');
        } finally {
            setIsLocating(false);
            setSearchText('');
        }
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 10000);

        return () => clearTimeout(timer);
    }, []);

    return (
        <View style={styles.container}>

            <LocationFetcher setLocation={setMyLocation} />

            {!isLoading ? (
                <>
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
                    {isLocating && (
                        <View style={styles.loadingOverlay}>
                            <ActivityIndicator size="large" color={Colors.primary} />
                        </View>
                    )}
                    <MapContainer
                        myLocation={myLocation}
                        pin={pin}
                        handleMapPress={handleMapPress}
                        mapref={mapRef}
                    />
                </>
            ) : (
                <LoadingIndicator />
            )}
        </View>
    );
};

export default ListingsMap;