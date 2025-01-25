import React, { useMemo, useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import ListingsBottomSheet from '@/components/ListingsBottomSheet';
import ListingsMap from '@/components/ListingsMap';
import listingsDataGeo from '@/assets/data/airbnb-listings.geo.json';
import Header from '@/components/Header';
import settings from '../otherScreens/settings';
import CustomDrawerContent from '@/components/DrawerNavigator';
import { View, Alert } from 'react-native';
import Colors from '@/constants/Colors';
import AboutUsScreen from '../otherScreens/aboutUs';
import PrivacyPolicyScreen from '../otherScreens/privacyPolicy';
import RefundPolicyScreen from '../otherScreens/refundPolicy';
import TermsAndConditionsScreen from '../otherScreens/termsAndCondition';
import ContactUsScreen from '../otherScreens/contactUs';
import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import axios from 'axios';
import * as Location from 'expo-location'; // Import location package

const Drawer = createDrawerNavigator();

const MainScreen = () => {
    const initialLocation = {
        latitude: 23.8103,
        longitude: 90.4125,
    };

    const [category, setCategory] = useState('Tiny homes');
    const [items, setItems] = useState([]); // State for storing fetched listings
    const [myLocation, setMyLocation] = useState(initialLocation); // User location state
    const [pin, setPin] = useState(initialLocation); // Default pin location
    const baseURL = process.env.EXPO_PUBLIC_BASE_URL;

    const getoItems = useMemo(() => listingsDataGeo, []);

    // Re-fetch or reload items when the screen comes into focus

    useFocusEffect(
        React.useCallback(() => {
            const fetchAds = async () => {
                try {
                    const response = await axios.get(`${baseURL}/api/ad/get-ad`);
                    if (!response.data.success) {
                        Alert.alert('Error', response.data.message);
                        return;
                    }
                    const newItems = response.data.data;
                    setItems(newItems); // Update the listings state
                    setCategory('Tiny homes'); // Reset category if needed
                } catch (error) {
                    const errorMessage =
                        error.response?.data?.message || 'An unexpected error occurred. Please try again.';
                    Alert.alert('Error', errorMessage);
                }
            };

            const fetchLocation = async () => {
                try {
                    let { status } = await Location.requestForegroundPermissionsAsync();
                    if (status !== 'granted') {
                        console.warn("Location permission not granted");
                        return;
                    }
                    let location = await Location.getCurrentPositionAsync({});
                    setMyLocation(location.coords); // Update state with fetched location
                    console.log(myLocation)
                } catch (err) {
                    console.warn("Error getting location:", err);
                }
            };




            fetchAds();
            fetchLocation(); // Fetch location on screen focus
        }, [])
    );

    return (
        <View style={{ flex: 1 }}>
            <Header />
            <View style={{ flex: 1 }}>
                <ListingsMap pin={pin} myLocation={myLocation} />
                <ListingsBottomSheet listings={items} category={category} />
            </View>
        </View>
    );
};

export default MainScreen;