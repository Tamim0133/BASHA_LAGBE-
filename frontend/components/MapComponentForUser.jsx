import React, { useEffect, useState } from 'react';
import LocationFetcher from './LocationFetcher';
import MapContainer from './MapContainer';
import LoadingIndicator from './LoadingIndicator';
import styles from '@/styles/myMapComponentStyles';
import { Alert, View } from 'react-native';

const initialLocation = {
    latitude: 23.8103,
    longitude: 90.4125,
};

const ListingsMap = ({ setLatitude, setLongitude, handleLocationConfirmation }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [myLocation, setMyLocation] = useState(initialLocation); // User location state
    const [pin, setPin] = useState(initialLocation);
    const [adLocation, setadLocation] = useState({})

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
                <MapContainer
                    myLocation={myLocation}
                    pin={pin}
                    handleMapPress={handleMapPress}
                />
            ) : (
                <LoadingIndicator />
            )}
        </View>
    );
};

export default ListingsMap;