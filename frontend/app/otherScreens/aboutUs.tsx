import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Linking } from 'react-native';

const AboutUsScreen = () => {
    return (
        <ScrollView style={styles.container}>
            <Text style={styles.header}>Basha Lagbe?</Text>
            <Text style={styles.description}>
                Welcome to "Basha Lagbe?" The app was founded with the vision to simplify the house rental process
                in Bangladesh. We aim to solve all housing-related issues for families, bachelors, offices,
                and lodgers.
            </Text>
            <Text style={styles.description}>
                Our mission is to provide a digital solution for finding and renting homes easily, without the
                hassles of traditional broker systems. With "Basha Lagbe?", you can explore various housing
                options tailored to your needs from anywhere in the world.
            </Text>
            <Text style={styles.description}>
                By using "Basha Lagbe?", landlords and tenants can connect directly, minimizing costs and
                maximizing convenience. You can publish your rental listings and easily search for homes
                in your area.
            </Text>

            <Text style={styles.quote}>
                "Changing lives, one home at a time."
            </Text>

            <Text style={styles.description}>
                To get started, log in or register for free. Simply install the "Basha Lagbe?" app from the
                Google Play Store using the link below:
            </Text>
            <TouchableOpacity onPress={() => Linking.openURL('https://play.google.com/store/apps/details?id=com.bashalagbe')}>
                <Text style={styles.link}>Download "Basha Lagbe?" App</Text>
            </TouchableOpacity>
            <Text style={styles.footer}>
                Trade License Number: 512, Netrokona Pourashava, Netrokona, Bangladesh.
            </Text>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    description: {
        fontSize: 16,
        marginBottom: 10,
        lineHeight: 22,
    },
    quote: {
        fontSize: 18,
        fontStyle: 'italic',
        textAlign: 'center',
        marginVertical: 20,
    },
    link: {
        fontSize: 16,
        color: '#007BFF',
        textDecorationLine: 'underline',
    },
    footer: {
        fontSize: 14,
        marginTop: 20,
        color: '#555',
    },
});

export default AboutUsScreen;