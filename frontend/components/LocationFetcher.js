import React, { useEffect } from 'react';
import * as Location from 'expo-location'; // Make sure to import this

const LocationFetcher = ({ setLocation }) => {
    useEffect(() => {
        const fetchLocation = async () => {
            try {
                let { status } = await Location.requestForegroundPermissionsAsync();
                if (status !== 'granted') {
                    console.warn("Location permission not granted");
                    return;
                }
                let location = await Location.getCurrentPositionAsync({});
                setLocation(location.coords);
            } catch (err) {
                console.warn("Error getting location:", err);
            }
        };

        fetchLocation();
    }, [setLocation]);

    return null; // This component doesn't need to render anything
};

export default LocationFetcher;