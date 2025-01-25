import { Dimensions, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import MapView, { Marker } from 'react-native-maps';

const ListingsMap = ({ pin, myLocation }) => {
    const [isLoading, setIsLoading] = useState(true);

    console.log("pin: " + pin);
    console.log("myLocation : " + myLocation)

    useEffect(() => {
        const timer = setTimeout(() => {
            console.log("10 seconds passed");
            setIsLoading(false);
        }, 10000); // 10 seconds

        // Cleanup the timer when the component unmounts
        return () => clearTimeout(timer);
    }, []); // Empty dependency array ensures this runs only once


    return (
        <View style={styles.container}>
            {!isLoading ? (
                <MapView
                    style={styles.map}
                    initialRegion={{
                        latitude: myLocation?.latitude || pin.latitude,
                        longitude: myLocation?.longitude || pin.longitude,
                        latitudeDelta: 0.01,
                        longitudeDelta: 0.01,
                    }}
                    provider="google"
                >
                    <Marker
                        coordinate={{
                            latitude: pin.latitude,
                            longitude: pin.longitude,
                        }}
                        title="Marker Location"
                        description="This is the selected location"
                    />
                </MapView>
            ) : (
                <View style={styles.loading}>
                    <Text>Loading map...</Text>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    map: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
    loading: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default ListingsMap;