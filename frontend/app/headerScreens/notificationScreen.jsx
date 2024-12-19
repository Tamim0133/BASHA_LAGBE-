import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useEffect } from 'react';


const NotificationScreen = ({ navigation }) => {
    const navigation1 = useNavigation();

    useEffect(() => {
        // Disable the header for this page
        navigation1.setOptions({
            // headerShown: false,
            title: ''
        });
    }, [navigation1]);
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Notifications</Text>
            <View style={styles.notificationContainer}>
                <Ionicons name="notifications-off" size={50} color="#ccc" />
                <Text style={styles.message}>No notification yet!</Text>
                <Text style={styles.subMessage}>We'll notify you when something arrived!</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    backButton: {
        position: 'absolute',
        left: 10,
        top: 40,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    notificationContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        marginTop: 50,
    },
    message: {
        fontSize: 18,
        fontWeight: '600',
        marginTop: 10,
    },
    subMessage: {
        fontSize: 14,
        color: '#777',
        marginTop: 5,
    },
});

export default NotificationScreen;