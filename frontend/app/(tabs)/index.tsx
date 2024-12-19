import { GestureHandlerRootView } from 'react-native-gesture-handler';
import React, { useMemo, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import ListingsBottomSheet from '@/components/ListingsBottomSheet';
import listingsData from '@/assets/data/temp-listing.json';
import ListingsMap from '@/components/ListingsMap';
import listingsDataGeo from '@/assets/data/airbnb-listings.geo.json';
import Header from '@/components/Header';
import settings from '../otherScreens/settings';
import CustomDrawerContent from '@/components/DrawerNavigator';
import { View } from 'react-native';
import Colors from '@/constants/Colors';
import AboutUsScreen from '../otherScreens/aboutUs';
import PrivacyPolicyScreen from '../otherScreens/privacyPolicy';
import RefundPolicyScreen from '../otherScreens/refundPolicy';
import TermsAndConditionsScreen from '../otherScreens/termsAndCondition';
import ContactUsScreen from '../otherScreens/contactUs';
import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';




const Drawer = createDrawerNavigator();

const MainScreen = () => {
    const [category, setCategory] = useState<string>('Tiny homes');
    const [items, setItems] = useState<any>(listingsData);

    const getoItems = useMemo(() => listingsDataGeo, []);

    // Re-fetch or reload items when the screen comes into focus
    useFocusEffect(
        React.useCallback(() => {
            setItems(listingsData); // Force reload items
            setCategory('Tiny homes'); // Reset category if needed
        }, [])
    );

    return (
        <View style={{ flex: 1, marginTop: 0 }}>
            <Header />
            <View style={{ flex: 1 }}>
                <ListingsMap listings={getoItems} />
                <ListingsBottomSheet listings={items} category={category} />
            </View>
        </View>
    );
};

const Page = () => {
    return (

        <Drawer.Navigator
            initialRouteName="Home"
            drawerContent={(props) => <CustomDrawerContent {...props} />}
            screenOptions={{
                drawerActiveTintColor: Colors.primary, // Text color for active item
                drawerInactiveTintColor: Colors.grey, // Text color for inactive items
                drawerActiveBackgroundColor: '#f0f0f0', // Background color for active item
                drawerIcon: ({ color, size }) => (
                    <Ionicons name="home" size={size} color={color} />
                ),
            }}
        >
            <Drawer.Screen
                name="Home"
                component={MainScreen}
                options={{
                    headerShown: false,
                    drawerIcon: ({ color, size }) => (
                        <Ionicons name="home" size={size} color={color} />
                    ),
                }}
            />
            <Drawer.Screen
                name="Privacy Policy"
                component={PrivacyPolicyScreen}
                options={{
                    drawerIcon: ({ color, size }) => (
                        <Ionicons name="document-lock" size={size} color={color} />
                    ),
                }}
            />
            <Drawer.Screen
                name="Refund Policy"
                component={RefundPolicyScreen}
                options={{
                    drawerIcon: ({ color, size }) => (
                        <Ionicons name="documents-sharp" size={size} color={color} />
                    ),
                }}
            />
            <Drawer.Screen
                name="Terms and Conditions"
                component={TermsAndConditionsScreen}
                options={{
                    drawerIcon: ({ color, size }) => (
                        <Ionicons name="document-text" size={size} color={color} />
                    ),
                }}
            />
            <Drawer.Screen
                name="About Us"
                component={AboutUsScreen}
                options={{
                    drawerIcon: ({ color, size }) => (
                        <Ionicons name="information-circle" size={size} color={color} />
                    ),
                }}
            />
            <Drawer.Screen
                name="Contact Us"
                component={ContactUsScreen}
                options={{
                    drawerIcon: ({ color, size }) => (
                        <Ionicons name="call" size={size} color={color} />
                    ),
                }}
            />
            <Drawer.Screen
                name="Settings"
                component={settings}
                options={{
                    drawerIcon: ({ color, size }) => (
                        <Ionicons name="settings" size={size} color={color} />
                    ),
                }}
            />
        </Drawer.Navigator>
    );
};

export default Page;