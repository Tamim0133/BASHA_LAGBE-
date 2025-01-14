
import React from 'react';
import { Tabs, useNavigation } from 'expo-router';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import Colors from '@/constants/Colors';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';



const Layout = () => {
    const BackButton = () => {
        const navigation = useNavigation();
        return (
            <TouchableOpacity
                onPress={() => navigation.goBack()} // Simplified navigation
                style={{ marginLeft: 10 }}
            >
                <Ionicons name="arrow-back" size={24} color={Colors.primary} />
            </TouchableOpacity>
        );
    };

    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: Colors.primary,
                tabBarLabelStyle: { fontFamily: 'mon-sb' },
                tabBarStyle: {
                    height: 60,
                    backgroundColor: '#fff',
                },
                headerStyle: {
                    backgroundColor: '#fff',
                },
                headerTitleStyle: { fontFamily: 'mon-sb' },
                headerLeft: () => <BackButton />, // Add BackButton to all headers
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    headerShown: false,
                    tabBarLabel: 'Explore',
                    tabBarIcon: ({ color, size }) => <Ionicons name="search" color={color} size={size} />,
                }}
            />
            <Tabs.Screen
                name="wishlists"
                options={{
                    tabBarLabel: 'Wishlists',
                    tabBarIcon: ({ color, size }) => <Ionicons name="heart-outline" color={color} size={size} />,
                }}
            />
            <Tabs.Screen
                name="addHouse"
                options={{
                    headerShown: false,
                    tabBarLabel: 'Add Home',
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="bank-plus" color={color} size={35} />
                    ),
                    tabBarBadge: '$', // Optional: Add a badge
                    tabBarBadgeStyle: {
                        backgroundColor: '#87CEEB', // Badge background color
                        color: '#FFFFFF', // Badge text colo
                        fontWeight: 'bold',
                    },
                }}
            />
            <Tabs.Screen
                name="inbox"
                options={{
                    headerTitle: 'Inbox',
                    tabBarLabel: 'Inbox',
                    tabBarIcon: ({ color, size }) => <MaterialCommunityIcons name="message-outline" color={color} size={size} />,
                }}
            />
            <Tabs.Screen
                name="profile"
                options={{
                    headerTitle: 'Profile',
                    tabBarLabel: 'Profile',
                    tabBarIcon: ({ color, size }) => <Ionicons name="person-circle-outline" color={color} size={size} />,
                }}
            />
        </Tabs>
    );
};



export default Layout;