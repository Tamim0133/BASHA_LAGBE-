import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Modal,
    Pressable,
    FlatList,
} from 'react-native';
import { FontAwesome, FontAwesome5 } from '@expo/vector-icons'; // For icons
import Colors from '@/constants/Colors';

const countries = ['Bangladesh', 'India', 'Nepal'];
const themes = ['System default', 'Light', 'Dark'];

const settings = () => {
    const [isThemeModalVisible, setThemeModalVisible] = useState(false);
    const [isCountryModalVisible, setCountryModalVisible] = useState(false);
    const [selectedTheme, setSelectedTheme] = useState('System default');
    const [selectedCountry, setSelectedCountry] = useState('Bangladesh');

    const toggleThemeModal = () => setThemeModalVisible(!isThemeModalVisible);
    const toggleCountryModal = () => setCountryModalVisible(!isCountryModalVisible);

    const renderModalItem = (item: string, onSelect: (val: string) => void) => (
        <Pressable
            style={({ pressed }) => [
                styles.modalItem,
                pressed && { backgroundColor: Colors.primary + '20' },
            ]}
            onPress={() => {
                onSelect(item);
                toggleThemeModal();
                toggleCountryModal();
            }}
        >
            <Text style={styles.modalText}>{item}</Text>
            {item === selectedCountry || item === selectedTheme ? (
                <FontAwesome name="check-circle" size={20} color={Colors.primary} />
            ) : null}
        </Pressable>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.sectionTitle}>General</Text>

            {/* Theme Option */}
            <Pressable style={styles.optionContainer} onPress={toggleThemeModal}>
                <FontAwesome5 name="palette" size={20} color={Colors.dark} />
                <View style={styles.optionTextContainer}>
                    <Text style={styles.optionTitle}>Theme</Text>
                    <Text style={styles.optionSubtitle}>{selectedTheme}</Text>
                </View>
            </Pressable>

            {/* Country Option */}
            <Pressable style={styles.optionContainer} onPress={toggleCountryModal}>
                <FontAwesome name="globe" size={20} color={Colors.dark} />
                <View style={styles.optionTextContainer}>
                    <Text style={styles.optionTitle}>Country</Text>
                    <Text style={styles.optionSubtitle}>{selectedCountry}</Text>
                </View>
            </Pressable>

            {/* Modals */}
            {/* Theme Modal */}
            <Modal
                transparent={true}
                animationType="fade"
                visible={isThemeModalVisible}
                onRequestClose={toggleThemeModal}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Theme</Text>
                        <FlatList
                            data={themes}
                            keyExtractor={(item) => item}
                            renderItem={({ item }) => renderModalItem(item, setSelectedTheme)}
                        />
                        <Pressable onPress={toggleThemeModal}>
                            <Text style={styles.modalCancel}>OK</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>

            {/* Country Modal */}
            <Modal
                transparent={true}
                animationType="fade"
                visible={isCountryModalVisible}
                onRequestClose={toggleCountryModal}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Country</Text>
                        <FlatList
                            data={countries}
                            keyExtractor={(item) => item}
                            renderItem={({ item }) => renderModalItem(item, setSelectedCountry)}
                        />
                        <Pressable onPress={toggleCountryModal}>
                            <Text style={styles.modalCancel}>OK</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 20,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: Colors.dark,
        marginBottom: 10,
    },
    optionContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    optionTextContainer: {
        marginLeft: 15,
    },
    optionTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
    },
    optionSubtitle: {
        fontSize: 14,
        color: '#888',
    },
    // Modal Styles
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        width: '80%',
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 20,
        elevation: 5,
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: Colors.primary,
        marginBottom: 10,
    },
    modalItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 10,
    },
    modalText: {
        fontSize: 16,
        color: '#333',
    },
    modalCancel: {
        marginTop: 10,
        textAlign: 'center',
        fontSize: 16,
        color: Colors.primary,
        fontWeight: 'bold',
    },
});

export default settings;