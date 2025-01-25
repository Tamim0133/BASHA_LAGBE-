import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Colors from '@/constants/Colors';
import styles from './styles'; // Assuming styles are already defined in a separate file

const LocateMeButton = ({ onLocateMe }) => {
    return (
        <TouchableOpacity
            style={styles.locateBtn}
            onPress={onLocateMe}
            activeOpacity={0.7}
        >
            <Ionicons name="navigate" size={24} color={Colors.dark} />
        </TouchableOpacity>
    );
};

export default LocateMeButton;