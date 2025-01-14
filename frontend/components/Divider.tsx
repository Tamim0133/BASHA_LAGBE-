import Colors from '@/constants/Colors';
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const DividerWithText = () => {
    return (
        <View style={styles.seperatorView}>
            <View
                style={{
                    flex: 1,
                    borderBottomColor: 'black',
                    borderBottomWidth: StyleSheet.hairlineWidth,
                }}
            />
            <View
                style={{
                    flex: 1,
                    borderBottomColor: 'black',
                    borderBottomWidth: StyleSheet.hairlineWidth,
                }}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    seperatorView: {
        flexDirection: 'row',
        gap: 10,
        alignItems: 'center',
        marginVertical: 20,
        marginBottom: 60
    },
    seperator: {
        fontFamily: 'mon-sb',
        color: Colors.grey,
        fontSize: 16,
    },
});

export default DividerWithText;