import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Modal,
    Pressable,
} from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import Colors from '@/constants/Colors';
import { Link, router, useNavigation } from 'expo-router';
import { DrawerActions } from '@react-navigation/native'; // Added DrawerActions import
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { CompositeNavigationProp } from '@react-navigation/native';
import {useQueryParams} from '@/hooks/QueryContext'

type HeaderNavigationProp = CompositeNavigationProp<
    DrawerNavigationProp<any, any>,
    any
>;

const Header: React.FC = () => {
    const navigation = useNavigation<HeaderNavigationProp>();
    const [isSortModalVisible, setSortModalVisible] = useState<boolean>(false);
    const [selectedSortOption, setSelectedSortOption] = useState<string>('Newest');
    const { queryParams, updateQueryParams } = useQueryParams();
    const toggleDrawer = (): void => {
        navigation.dispatch(DrawerActions.toggleDrawer());
    };

    const openSortModal = (): void => {
        setSortModalVisible(true);
    };

    //  "priceLowToHigh", "priceHighToLow", "newest"
    const closeSortModal = (): void => {
        if (selectedSortOption === 'Newest') {
            updateQueryParams({ sortBy: 'newest' });
        }
        else if (selectedSortOption === 'Price (High to Low)') {
            updateQueryParams({ sortBy: 'priceHighToLow' });
        }
        else if (selectedSortOption === 'Price (Low to High)') {
            updateQueryParams({ sortBy: 'priceLowToHigh' });
        
        }
        
        setSortModalVisible(false);
    };

    const handleSortOptionSelect = (option: string): void => {
        setSelectedSortOption(option);
    };

    const getSortLabel = (): string => {
        if (selectedSortOption === 'Newest') {
            return 'Newest'; // Default option
        }
        if (selectedSortOption === 'Price (High to Low)') {
            return 'H -> L'; // For "Price (High to Low)"
        }
        if (selectedSortOption === 'Price (Low to High)') {
            return 'L -> H'; // For "Price (Low to High)"
        }
        return selectedSortOption; // In case of any other option (though there shouldn't be any)
    };

    return (
        <View style={styles.headerContainer}>
            <View style={styles.topBar}>
                <TouchableOpacity onPress={toggleDrawer}>
                    <Ionicons name="menu" size={28} color="#000" />
                </TouchableOpacity>
                <Text style={styles.title}>BASHA LAGBE ?</Text>
                <Link href="/headerScreens/notificationScreen" asChild>
                    <TouchableOpacity>
                        <Ionicons name="notifications-outline" size={28} color="#000" />
                    </TouchableOpacity>
                </Link>
            </View>

            <View style={styles.actionButtons}>
                <TouchableOpacity style={styles.button} onPress={openSortModal}>
                    {/* Show the selected sort option inside the button */}
                    <MaterialIcons name="sort" size={20} color="#000" />
                    <Text style={styles.selectedSortText}>{getSortLabel()}</Text>
                    <Ionicons name="chevron-down" size={16} color="#000" />
                </TouchableOpacity>

                <Link href="/headerScreens/headerLocation" asChild>
                    <TouchableOpacity style={styles.button}>
                        <View style={styles.linkContainer}>
                            <Ionicons name="location-outline" size={20} color="#000" />
                            <Text style={styles.buttonText}>Location</Text>
                            <Ionicons name="chevron-down" size={16} color="#000" />
                        </View>
                    </TouchableOpacity>
                </Link>
                <Link href="/headerScreens/filter" asChild>
                    <TouchableOpacity style={styles.button}>
                        <MaterialIcons name="filter-list" size={20} color="#000" />
                        <Text style={styles.buttonText}>Filter</Text>
                        <Ionicons name="chevron-down" size={16} color="#000" />
                    </TouchableOpacity>
                </Link>
            </View>

            {/* Sort Modal */}
            <Modal
                visible={isSortModalVisible}
                transparent={true}
                animationType="slide"
                onRequestClose={closeSortModal}>
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Sort By</Text>
                        {['Newest', 'Price (Low to High)', 'Price (High to Low)'].map(
                            (option, index) => (
                                <Pressable
                                    key={index}
                                    style={styles.modalOption}
                                    onPress={() => handleSortOptionSelect(option)}>
                                    <View style={styles.radioContainer}>
                                        <View
                                            style={[
                                                styles.radioButton,
                                                selectedSortOption === option && styles.selectedRadioButton,
                                            ]}
                                        />
                                        <Text style={styles.modalOptionText}>{option}</Text>
                                    </View>
                                </Pressable>
                            )
                        )}
                        <Pressable onPress={closeSortModal} style={styles.modalCloseButton}>
                            <Text style={styles.modalCloseText}>Ok</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    headerContainer: {
        backgroundColor: '#fff',
        marginTop: 40,
        paddingTop: 10,
        paddingBottom: 10,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 3,
        shadowOffset: { width: 0, height: 2 },
    },
    topBar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
        marginBottom: 10,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#000',
    },
    actionButtons: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingHorizontal: 10,
    },
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFF',
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: Colors.dark,
        gap: 5,
    },
    selectedSortText: {
        fontSize: 14,
        fontWeight: '600',
        color: Colors.primary, // Use the primary color for the selected option
        marginRight: 8, // Add space between the text and icons
    },
    linkContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalContent: {
        backgroundColor: '#fff',
        padding: 20,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        elevation: 5,
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        color: Colors.primary,
    },
    modalOption: {
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
        flexDirection: 'row',
        alignItems: 'center',
    },
    modalOptionText: {
        fontSize: 16,
        color: '#000',
    },
    radioContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    radioButton: {
        width: 20,
        height: 20,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '#ddd',
        marginRight: 10,
    },
    selectedRadioButton: {
        backgroundColor: Colors.primary,
        borderColor: Colors.primary,
    },
    modalCloseButton: {
        marginTop: 10,
        alignItems: 'center',
    },
    modalCloseText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: Colors.primary,
    },
    buttonText: {
        fontSize: 14,
        fontWeight: '600',
        color: '#000',
    },
});

export default Header;