import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useRouter } from 'expo-router';
import Colors from '@/constants/Colors';

const ReferAndEarn = () => {
    const router = useRouter();

    const handleRefer = () => {
        // Add your referral logic here
        alert('Referral link shared!');
    };

    return (
        <View style={styles.container}>
            <Icon name="account-group" size={50} color={Colors.primary} />
            <Text style={styles.title}>Refer and Earn</Text>
            <Text style={styles.subtitle}>
                Refer your friends and earn credits
            </Text>
            <TouchableOpacity style={styles.button} onPress={handleRefer}>
                <Text style={styles.buttonText}>Refer Now</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginTop: 10,
    },
    subtitle: {
        fontSize: 16,
        color: '#666',
        textAlign: 'center',
        marginVertical: 10,
    },
    button: {
        marginTop: 20,
        backgroundColor: Colors.primary,
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 10,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default ReferAndEarn;