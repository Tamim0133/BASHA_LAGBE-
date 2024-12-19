import Colors from '@/constants/Colors';
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'; // Import icons

const ContactUsScreen = () => {
    const handleCallPress = () => {
        Linking.openURL('tel:+8801902008974');
    };

    const handleEmailPress = () => {
        Linking.openURL('mailto:contact@bashalagbe.com');
    };

    const handleDeveloperContactPress = () => {
        Linking.openURL('https://web.facebook.com/tamimdewan2003/');
    };

    const handleOfficeAddressPress = () => {
        Linking.openURL('https://www.google.com/maps/place/Department+of+Computer+Science+and+Engineering,+University+of+Dhaka/');
    };

    const handleFacebookPress = () => {
        Linking.openURL('https://web.facebook.com/naimul.islam.3745496');
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Contact Us</Text>

            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress={handleCallPress}>
                    <Icon name="phone" size={20} color="#fff" style={styles.icon} />
                    <Text style={styles.buttonText}>Call Us</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.button} onPress={handleEmailPress}>
                    <Icon name="email" size={20} color="#fff" style={styles.icon} />
                    <Text style={styles.buttonText}>Email Us</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.contactDetails}>
                <TouchableOpacity style={styles.contactItem} onPress={handleDeveloperContactPress}>
                    <Icon name="github" size={24} color={Colors.primary} style={styles.contactIcon} />
                    <View>
                        <Text style={styles.contactText}>Contact with Developer</Text>
                        <Text style={styles.contactSubText}>GitHub link</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity style={styles.contactItem} onPress={handleOfficeAddressPress}>
                    <Icon name="map-marker" size={24} color={Colors.primary} style={styles.contactIcon} />
                    <View>
                        <Text style={styles.contactText}>Office Address</Text>
                        <Text style={styles.contactSubText}>Dept of CSE, Dhaka University</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity style={styles.contactItem} onPress={handleFacebookPress}>
                    <Icon name="facebook" size={24} color={Colors.primary} style={styles.contactIcon} />
                    <View>
                        <Text style={styles.contactText}>Facebook</Text>
                        <Text style={styles.contactSubText}>42k+ followers</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
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
        textAlign: 'center',
        marginBottom: 20,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 20,
    },
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15,
        backgroundColor: Colors.primary,
        borderRadius: 5,
        flex: 0.45,
        justifyContent: 'center',
    },
    icon: {
        marginRight: 10,
    },
    buttonText: {
        color: '#fff',
        fontWeight: '600',
        fontSize: 16,
    },
    contactDetails: {
        marginTop: 20,
    },
    contactItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15,
        backgroundColor: '#f8f8f8',
        borderRadius: 5,
        marginBottom: 10,
        borderWidth: 1,
        borderColor: '#ddd',
    },
    contactIcon: {
        marginRight: 10,
        fontSize: 48,

    },
    contactText: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    contactSubText: {
        fontSize: 14,
        color: '#555',
    },
});

export default ContactUsScreen;