import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Header, ListingsBottomSheet, ListingsMap, CustomDrawerContent } from '@/components';
import { settings, AboutUsScreen, PrivacyPolicyScreen, RefundPolicyScreen, TermsAndConditionsScreen, ContactUsScreen, } from '@/app/otherScreens';
import { createDrawerNavigator } from '@react-navigation/drawer';
import listingsDataGeo from '@/assets/data/airbnb-listings.geo.json';
import { View, Alert } from 'react-native';
import axios from 'axios';
import * as Location from 'expo-location';
import { useFocusEffect } from '@react-navigation/native';

const Drawer = createDrawerNavigator();

const MainScreen = () => {
    const initialLocation = {
        latitude: 23.8103,
        longitude: 90.4125,
    };

    const [category, setCategory] = useState('Tiny homes');
    const [myLocation, setMyLocation] = useState(initialLocation); // User location state
    const [pin, setPin] = useState(initialLocation); // Default pin location
    const baseURL = process.env.EXPO_PUBLIC_BASE_URL;

    const getoItems = useMemo(() => listingsDataGeo, []);

    const [items, setItems] = useState([]); // State for storing fetched listings
    useFocusEffect(
        useCallback(() => {
            const fetchAds = async () => {
                try {
                    const response = await axios.get(`${baseURL}/api/ad/get-ad`);
                    if (!response.data.success) {
                        Alert.alert('Error', response.data.message);
                        return;
                    }
                    setItems(response.data.data); // Update the listings state
                } catch (error) {
                    const errorMessage =
                        error.response?.data?.message || 'An unexpected error occurred. Please try again.';
                    Alert.alert('Error', errorMessage);
                }
            };

            const fetchLocation = async () => {
                try {
                    const { status } = await Location.requestForegroundPermissionsAsync();
                    if (status !== 'granted') {
                        console.warn("Location permission not granted");
                        return;
                    }
                    const location = await Location.getCurrentPositionAsync({});
                    setMyLocation(location.coords); // Update state with fetched location
                } catch (err) {
                    console.warn("Error getting location:", err);
                }
            };

            fetchAds();
            fetchLocation();

            return () => {
                // Cleanup if necessary
            };
        }, [])
    );

    return (
        <View style={{ flex: 1 }}>
            <Header />
            <View style={{ flex: 1 }}>
                <ListingsMap pin={pin} myLocation={myLocation} items={items} />
                <ListingsBottomSheet listings={items} category={category} />
            </View>
        </View>
    );
};

const App = () => {
    return (
        // <NavigationContainer>
        <Drawer.Navigator
            drawerContent={(props) => <CustomDrawerContent {...props} />}
            screenOptions={{
                // headerShown: false,
                // drawerStyle: { backgroundColor: Colors.primaryLight },
            }}
        >
            <Drawer.Screen
                name="Main"
                component={MainScreen}
                options={{ headerShown: false }} // Hide the header for the Main screen
            />
            <Drawer.Screen name="Settings" component={settings} />
            <Drawer.Screen name="About Us" component={AboutUsScreen} />
            <Drawer.Screen name="Privacy Policy" component={PrivacyPolicyScreen} />
            <Drawer.Screen name="Refund Policy" component={RefundPolicyScreen} />
            <Drawer.Screen name="Terms & Conditions" component={TermsAndConditionsScreen} />
            <Drawer.Screen name="Contact Us" component={ContactUsScreen} />
        </Drawer.Navigator>
        // </NavigationContainer>
    );
};

export default App;