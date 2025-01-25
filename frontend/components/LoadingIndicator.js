import React from 'react';
import { View, Text } from 'react-native';
import styles from '@/styles/myMapComponentStyles';

const LoadingIndicator = () => (
    <View style={styles.loading}>
        <Text>Loading map...</Text>
    </View>
);

export default LoadingIndicator;