import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Colors from '@/constants/Colors';

const PointsViewer = ({ points }) => {
    return (
        <View style={styles.container}>
            <Ionicons name="trophy" size={24} color='white' style={styles.icon} />
            <Text style={styles.pointsText}> <Text style={styles.points}>{points}</Text> Points</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.primary, // Blue background
        paddingVertical: 15,
        paddingHorizontal: 20,
        margin: 10,
        borderRadius: 8,
        alignSelf: 'flex-start', // Adjust width to content
        justifyContent: 'center',
        marginHorizontal: 'auto'
    },
    icon: {
        marginRight: 5,
    },
    points: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#fff', // White text
    },
    pointsText: {
        fontSize: 12,
        fontWeight: 'bold',
        color: '#fff', // White text
    },
});

export default PointsViewer;