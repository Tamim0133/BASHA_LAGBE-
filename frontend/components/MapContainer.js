import React from 'react';
import MapView, { Marker } from 'react-native-maps';
import { View } from 'react-native';
import styles from '@/styles/myMapComponentStyles';

const MapContainer = ({ myLocation, pin, handleMapPress }) => (
    <>
        <MapView
            style={styles.map}
            initialRegion={{
                latitude: myLocation?.latitude || pin.latitude,
                longitude: myLocation?.longitude || pin.longitude,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01,
            }}
            provider="google"
            onPress={handleMapPress}
        >
            <Marker
                coordinate={{
                    latitude: pin.latitude,
                    longitude: pin.longitude,
                }}
                title="Marker Location"
                description="This is the selected location"
                draggable
            />
        </MapView>
    </>
);

export default MapContainer;