import React, { useEffect, useMemo, useState } from 'react';
import { Header, ListingsBottomSheet, ListingsMap, CustomDrawerContent } from '@/components';
import { settings, AboutUsScreen, PrivacyPolicyScreen, RefundPolicyScreen, TermsAndConditionsScreen, ContactUsScreen, } from '@/app/otherScreens';
import { createDrawerNavigator } from '@react-navigation/drawer';
import listingsDataGeo from '@/assets/data/airbnb-listings.geo.json';
import { View, Alert } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import axios from 'axios';
import * as Location from 'expo-location';
import {useQueryParams} from '@/hooks/QueryContext'
import { useLocalSearchParams } from 'expo-router';

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
    const { queryParams, updateQueryParams } = useQueryParams();

    useEffect(() => {
        const fetchAds = async () => {
            let qur = '';
            if(queryParams.areaId) qur += `areaId=${queryParams.areaId}&`
            if(queryParams.sortBy) qur += `sortBy=${queryParams.sortBy}&`
            if(queryParams.subArea) qur += `subArea=${queryParams.subArea}&`
            if(queryParams.priceMin) qur += `priceMin=${queryParams.priceMin}&`
            if(queryParams.priceMax) qur += `priceMax=${queryParams.priceMax}&`
            if(queryParams.bedrooms) qur += `bedrooms=${queryParams.bedrooms}&`
            if(queryParams.bathrooms) qur += `bathrooms=${queryParams.bathrooms}&`
            if(queryParams.propertyType) qur += `propertyType=${queryParams.propertyType}&`
    
            let url = `${baseURL}/api/ad/get-ad`
            if(qur) url = url+`?${qur}`

            try {
                console.log("Fetching", url);
                const response = await axios.get(url);
                if (!response.data.success) {
                    Alert.alert('Error', response.data.message);
                    return;
                }
                const newItems = response.data.data;
                setItems(newItems); // Update the listings state
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
        fetchLocation(); // Fetch location when the component mounts
    }, [queryParams]);

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