import React, { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

import Colors from '@/constants/Colors';
import { router } from 'expo-router';

const LocationScreen = () => {
    const navigation = useNavigation();

    useEffect(() => {
        // Disable the header for this page
        navigation.setOptions({
            // headerShown: false,
            title: ''
        });
    }, [navigation]);

    // Handle the back button press
    // const handleBackPress = () => {
    //     // Navigate to the 'Tabs' screen or the specific tab you want
    //     router.push('/(tabs)'); // Replace 'Tabs' with the name of your tab screen
    // };

    return (
        <SafeAreaView style={styles.container}>
            {/* Header Section */}
            <View style={styles.header}>
                <TouchableOpacity style={styles.icon} >
                    {/* <Ionicons name="arrow-back" size={24} color="#000" /> */}
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Select area</Text>
                <TouchableOpacity>
                    <Text style={styles.resetText}>RESET</Text>
                </TouchableOpacity>
            </View>

            {/* Dropdown Section */}
            <View style={styles.dropdownSection}>
                <TouchableOpacity style={styles.dropdown}>
                    <Text style={styles.dropdownText}>Division</Text>
                    <Ionicons name="chevron-down" size={20} color="#000" />
                </TouchableOpacity>

                <TouchableOpacity style={styles.dropdown}>
                    <Text style={styles.dropdownText}>District</Text>
                    <Ionicons name="chevron-down" size={20} color="#000" />
                </TouchableOpacity>

                <TouchableOpacity style={styles.dropdown}>
                    <Text style={styles.dropdownText}>Area</Text>
                    <Ionicons name="chevron-down" size={20} color="#000" />
                </TouchableOpacity>
            </View>

            {/* Show Property Button */}
            <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Show Property</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F5F5',
        padding: 16,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingBottom: 24,
    },
    icon: {
        padding: 8,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#000',
    },
    resetText: {
        fontSize: 14,
        fontWeight: '500',
        color: '#555',
    },
    dropdownSection: {
        marginBottom: 32,
    },
    dropdown: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#FFF',
        padding: 16,
        borderRadius: 8,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: '#E0E0E0',
    },
    dropdownText: {
        fontSize: 16,
        color: '#888',
    },
    button: {
        backgroundColor: Colors.primary,
        paddingVertical: 16,
        borderRadius: 5,
        alignItems: 'center',
    },
    buttonText: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: '600',
    },
});

export default LocationScreen;