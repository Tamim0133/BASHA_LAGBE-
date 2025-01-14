import Colors from '@/constants/Colors';
import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, ScrollView } from 'react-native';
import { useRouter } from 'expo-router'; // Importing router for navigation
import { Ionicons } from '@expo/vector-icons';

const addHouse = () => {
    const router = useRouter(); // Initialize router
    const goToYeah = () => {
        router.push('/addHouseScreens/postHouseAd');
    };

    const steps = [
        {
            title: "Tell us about your place",
            description: "Share some basic info, location, how many bedrooms, washrooms, target customers",
            image: require('../../assets/images/1.png'), // replace with your image asset  
        },
        {
            title: "Make it stand out",
            description: "Add 3 more photos plus floor no —we'll help you out.",
            image: require('../../assets/images/2.png'), // replace with your image asset  
        },
        {
            title: "Small Details",
            description: "Give description to your place and tell about it's availability",
            image: require('../../assets/images/4.png'), // replace with your image asset  
        },
        {
            title: "Finish up and publish",
            description: "Choose a starting price, verify a few details, then publish your listing.",
            image: require('../../assets/images/3.png'), // replace with your image asset  
        },
    ];

    return (
        <ScrollView style={styles.container}>
            {/* Back Button */}
            <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
                <Text style={styles.backButtonText}>
                    <Ionicons name='arrow-back' size={24}></Ionicons>
                </Text>
            </TouchableOpacity>

            {/* Header */}
            <Text style={styles.header}>
                It's easy to start listing your property on
                <Text style={{ color: Colors.primary }}> BashaLagbe? </Text>
            </Text>

            {/* Steps */}
            <View style={styles.singleComponent}>
                {steps.map((step, index) => (
                    <View key={index} style={styles.stepContainer}>
                        <View>
                            <Image source={step.image} style={styles.stepImage} />
                        </View>
                        <View style={styles.textContainer}>
                            <Text style={styles.stepTitle}>{`Step - ${index + 1} : ${step.title}`}</Text>
                            <Text style={{ margin: 0, padding: 0 }}></Text>
                            <Text style={styles.stepDescription}>{step.description}</Text>
                        </View>
                    </View>
                ))}
            </View>

            {/* Get Started Button */}
            <TouchableOpacity style={styles.button} onPress={goToYeah}>
                <Text style={styles.buttonText}>Get started</Text>
            </TouchableOpacity>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        marginTop: 40,
    },
    backButton: {
        marginBottom: 10,
        padding: 10,
    },
    backButtonText: {
        color: Colors.primary,
        fontSize: 16,
        fontWeight: 'bold',
    },
    singleComponent: {
        display: 'flex',
        gap: 15,
        padding: 5,
    },
    header: {
        paddingHorizontal: 10,
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    stepContainer: {
        display: 'flex',
        flex: 1,
        flexDirection: 'row-reverse',
        backgroundColor: '#FFFAFA',
        paddingVertical: 10,
        paddingHorizontal: 10,
        elevation: 5,
        shadowOpacity: 0.2,
        shadowRadius: 3.84,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        borderRadius: 10,
        gap: 10,
    },
    textContainer: {
        display: 'flex',
        flex: 1,
    },
    stepImage: {
        width: 120,
        height: 100, // Adjust according to your image  
        resizeMode: 'contain',
        borderRadius: 20,
    },
    stepTitle: {
        fontSize: 18,
        fontWeight: '600',
    },
    stepDescription: {
        fontSize: 14,
        color: '#666',
    },
    button: {
        backgroundColor: Colors.primary,
        paddingVertical: 12,
        borderRadius: 5,
        alignItems: 'center',
        marginTop: 40,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default addHouse;