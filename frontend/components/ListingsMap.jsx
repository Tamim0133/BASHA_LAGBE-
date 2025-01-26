import { Dimensions, StyleSheet, Text, TouchableOpacity, View, Modal, Image, ScrollView } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import MapView, { Marker } from 'react-native-maps';
import Colors from '@/constants/Colors';
import { useNavigation } from '@react-navigation/native'; // Assuming you're using React Navigation
import { Link } from 'expo-router';

const ListingsMap = ({ pin, myLocation, items }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [selectedMarker, setSelectedMarker] = useState(null); // To store selected marker details
    const mapRef = useRef(null);
    const navigation = useNavigation(); // React Navigation hook for navigation

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 10000); // 10 seconds

        return () => clearTimeout(timer);
    }, []);

    const openModal = (markerDetails) => {
        console.log(markerDetails.item);
        setSelectedMarker(markerDetails);
    };

    const closeModal = () => {
        setSelectedMarker(null);
    };

    const handleShowMore = () => {
        if (selectedMarker?.item?._id) {
            console.log("Selected Item on map : " + selectedMarker.item);
            // navigation.navigate(`/listing/${selectedMarker.item._id}`);
        }
    };

    return (
        <View style={styles.container}>
            {!isLoading ? (
                <>
                    <MapView
                        style={styles.map}
                        initialRegion={{
                            latitude: myLocation?.latitude || pin.latitude,
                            longitude: myLocation?.longitude || pin.longitude,
                            latitudeDelta: 0.05,
                            longitudeDelta: 0.05,
                        }}
                        showsUserLocation
                        showsMyLocationButton
                        provider="google"
                        ref={mapRef}
                    >
                        {items
                            .filter(
                                (item) =>
                                    item.latitude &&
                                    item.longitude &&
                                    item.latitude !== 0 &&
                                    item.longitude !== 0
                            )
                            .map((item, index) => (
                                <Marker
                                    key={index}
                                    coordinate={{
                                        latitude: item.latitude,
                                        longitude: item.longitude,
                                    }}
                                    onPress={() => openModal({ index, item })}
                                />
                            ))
                        }
                    </MapView>

                    {selectedMarker && (
                        <Modal
                            animationType="fade"
                            transparent={true}
                            visible={!!selectedMarker}
                            onRequestClose={closeModal}
                        >
                            <View style={styles.modalContainer}>
                                {/* Modal Background */}
                                <View style={styles.modalContent}>
                                    {/* Close Button */}
                                    <TouchableOpacity
                                        style={styles.closeButtonTop}
                                        onPress={closeModal}
                                    >
                                        <Text style={styles.closeButtonText}>X</Text>
                                    </TouchableOpacity>

                                    {/* Marker Details */}
                                    <Text style={styles.modalTitle}>{selectedMarker?.item?.title || 'Marker Details'}</Text>
                                    <Text>Category: {selectedMarker?.item?.category || 'No category provided'}</Text>
                                    <Text>Location: {selectedMarker?.item?.detailedLocation || 'No location provided'}</Text>
                                    <Text>Subarea: {selectedMarker?.item?.subarea || 'No subarea provided'}</Text>
                                    <Text>Floor: {selectedMarker?.item?.floor || 'Not specified'}</Text>
                                    <Text>Bedrooms: {selectedMarker?.item?.bedrooms || 'N/A'}</Text>
                                    <Text>Bathrooms: {selectedMarker?.item?.bathrooms || 'N/A'}</Text>
                                    <Text>Rent: {selectedMarker?.item?.rent || 'N/A'} USD</Text>
                                    <Text>Advance Deposit: {selectedMarker?.item?.advanceDeposit || 'N/A'} months</Text>
                                    <Text>Available From: {selectedMarker?.item?.availableFrom || 'Not mentioned'}</Text>
                                    <Text>Description: {selectedMarker?.item?.description || 'No description available'}</Text>
                                    <Text>Facilities: {selectedMarker?.item?.facilities?.join(', ') || 'None'}</Text>
                                    <Text>Refundable Advance: {selectedMarker?.item?.willRefundAdvance ? 'Yes' : 'No'}</Text>

                                    {/* Images (if available) */}
                                    <Text>Images:</Text>
                                    <ScrollView
                                        horizontal
                                        showsHorizontalScrollIndicator={false}
                                        contentContainerStyle={styles.imageRow}
                                    >
                                        {selectedMarker?.item?.images?.map((image, index) => (
                                            <Image
                                                key={index}
                                                source={{ uri: image }}
                                                style={styles.imageInRow}
                                            />
                                        ))}
                                    </ScrollView>

                                    {/* Show More Button */}
                                    <Link
                                        href={{
                                            pathname: `/listing/${selectedMarker.item._id}`,
                                            params: {
                                                item: JSON.stringify(selectedMarker.item) // Serialize the item object
                                            }
                                        }}
                                        asChild
                                    >
                                        <TouchableOpacity
                                            style={styles.showMoreButton}
                                            onPress={handleShowMore}
                                        >
                                            <Text style={styles.showMoreButtonText}>Show More</Text>
                                        </TouchableOpacity>
                                    </Link>
                                </View>
                            </View>
                        </Modal>
                    )}
                </>
            ) : (
                <View style={styles.loading}>
                    <Text>Loading map...</Text>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({

    imageRow: {
        flexDirection: 'row', // Ensures images are laid out in a row
        marginVertical: 10,  // Adds spacing around the row
    },
    imageInRow: {
        width: 100,         // Set width for each image
        height: 100,        // Set height for each image
        borderRadius: 5,    // Rounded corners for better aesthetics
        marginRight: 10,    // Spacing between images
    },

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
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    closeButtonTop: {
        position: 'absolute',
        top: -10,
        left: -10,
        backgroundColor: Colors.primary,
        borderRadius: 50,
        padding: 10,
        zIndex: 10,
    },
    closeButtonText: {
        color: 'white',
        fontWeight: 'bold',
    },
    modalContent: {
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 20,
        width: '80%',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    showMoreButton: {
        marginTop: 15,
        padding: 10,
        backgroundColor: Colors.primary,
        borderRadius: 5,
        alignItems: 'center',
    },
    showMoreButtonText: {
        color: 'white',
        fontWeight: 'bold',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalContent: {
        width: '90%',
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 10,
        elevation: 5,
    },
    closeButtonTop: {
        position: 'absolute',
        top: 10,
        right: 10,
        zIndex: 1,
    },
    closeButtonText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'red',
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    modalImage: {
        width: '100%',
        height: 150,
        marginTop: 10,
        borderRadius: 5,
    },
    showMoreButton: {
        marginTop: 20,
        padding: 10,
        backgroundColor: Colors.primary,
        borderRadius: 5,
        alignItems: 'center',
    },
    showMoreButtonText: {
        color: '#fff',
        fontSize: 16,
    },
});

export default ListingsMap;