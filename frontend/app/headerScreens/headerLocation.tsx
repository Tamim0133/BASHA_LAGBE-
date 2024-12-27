import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, Modal, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import Colors from '@/constants/Colors';

const LocationScreen = () => {
    const navigation = useNavigation();
    const baseURL = process.env.EXPO_PUBLIC_BASE_URL
    useEffect(() => {
        // Disable the header for this page
        navigation.setOptions({
            // headerShown: false,
            title: ''
        });
    }, [navigation]);

    // Handle the back button press
    // const handleBackPress = () => {
    //     // Navigate to the 'Tabs' screen or the specific tab you want
    //     router.push('/(tabs)'); // Replace 'Tabs' with the name of your tab screen
    // };

    const [divisions, setDivisions] = useState([])
    const [selectedDivision, setSelectedDivision] = useState(''); 
    const [isDivisionDropdownVisible, setIsDivisionDropdownVisible] = useState(false); 

    const [districts, setDistricts] = useState([]); 
    const [selectedDistrict, setSelectedDistrict] = useState('');
    const [isDistrictDropdownVisible, setIsDistrictDropdownVisible] = useState(false); 

    const [areas, setAreas] = useState([]); 
    const [selectedArea, setSelectedArea] = useState('');
    const [isAreaDropdownVisible, setIsAreaDropdownVisible] = useState(false); 

    const [subAreas, setSubAreas] = useState([]); 
    const [selectedSubArea, setSelectedSubArea] = useState('');
    const [isSubAreaDropdownVisible, setIsSubAreaDropdownVisible] = useState(false); 
    
    useEffect(() => {
        const fetchDivisions = async () => {
            try {
                const response = await fetch(`${baseURL}/api/location/get-divisions`); 
                const data = await response.json();
                setDivisions(data.data); 
                setDistricts([])
                setAreas([])
                setSubAreas([])
                setSelectedDistrict('')
                setSelectedArea('')
                setSelectedSubArea('')
            } catch (error) {
                console.error('Error fetching divisions:', error);
            }
            };
            fetchDivisions();
        }, []
    );
    useEffect(() => {
        const fetchDistricts = async () => {
            try {
                const response = await fetch(`${baseURL}/api/location/get-districts/${selectedDivision}`);
                const data = await response.json();
                setDistricts(data.data); 
                setAreas([])
                setSubAreas([])
                setSelectedArea('')
                setSelectedSubArea('')
            } catch (error) {
                console.error('Error fetching Districts:', error);
            }
        };
        if(selectedDivision) fetchDistricts();
        }, [selectedDivision]
    );

    useEffect(() => {
        const fetchAreas = async () => {
            try {
                
                const response = await fetch(`${baseURL}/api/location/get-areas/${selectedDistrict}`); 
                const data = await response.json();
                setAreas(data.data); 
                setSubAreas([])
                setSelectedSubArea('')
            } catch (error) {
                console.error('Error fetching Areas:', error);
            }
        };
        if(selectedDistrict) fetchAreas();
    }, [selectedDistrict]
);

useEffect(() => {
    const fetchSubAreas = async () => {
        try {
            
            const response = await fetch(`${baseURL}/api/location/get-subareas/${selectedArea}`); 
            const data = await response.json();
            setSubAreas(data.data); 
            } catch (error) {
                console.error('Error fetching SubAreas:', error);
            }
        };
        if(selectedArea) fetchSubAreas();
        }, [selectedArea]
    );
        
    return (
        <SafeAreaView style={styles.container}>
            {/* Header Section */}
            <View style={styles.header}>
                <TouchableOpacity style={styles.icon} >
                    {/* <Ionicons name="arrow-back" size={24} color="#000" /> */}
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Select area</Text>
                <TouchableOpacity>
                    <Text style={styles.resetText}>RESET</Text>
                </TouchableOpacity>
            </View>

            {/* Dropdown Section */}
            <View style={styles.dropdownSection}>
                <TouchableOpacity style={styles.dropdown} onPress={()=>setIsDivisionDropdownVisible(true)}>
                    <Text style={styles.dropdownText}>{selectedDivision || "Division"}</Text>
                    <Ionicons name="chevron-down" size={20} color="#000" />
                </TouchableOpacity>
                <Modal
                    visible={isDivisionDropdownVisible}
                    transparent={true}
                    animationType="fade"
                >
                    <View style={styles.modalOverlay}>
                        <View style={styles.dropdownList}>
                            <FlatList
                                data={divisions}
                                keyExtractor={(item, index) => index.toString()}
                                renderItem={({ item }) => (
                                    <TouchableOpacity
                                        style={styles.dropdownItem}
                                        onPress={() => {
                                            setSelectedDivision(item); // Set selected division
                                            setIsDivisionDropdownVisible(false); // Close dropdown
                                        }}
                                    >
                                        <Text style={styles.dropdownText}>{item}</Text>
                                    </TouchableOpacity>
                                )}
                            />
                        </View>
                    </View>
                </Modal>
                <TouchableOpacity style={styles.dropdown} onPress={()=>setIsDistrictDropdownVisible(true)}>
                    <Text style={styles.dropdownText}>{selectedDistrict || "District"}</Text>
                    <Ionicons name="chevron-down" size={20} color="#000" />
                </TouchableOpacity>
                <Modal
                    visible={isDistrictDropdownVisible}
                    transparent={true}
                    animationType="fade"
                >
                    <View style={styles.modalOverlay}>
                        <View style={styles.dropdownList}>
                            <FlatList
                                data={districts}
                                keyExtractor={(item, index) => index.toString()}
                                renderItem={({ item }) => (
                                    <TouchableOpacity
                                        style={styles.dropdownItem}
                                        onPress={() => {
                                            setSelectedDistrict(item); // Set selected division
                                            setIsDistrictDropdownVisible(false); // Close dropdown
                                        }}
                                    >
                                        <Text style={styles.dropdownText}>{item}</Text>
                                    </TouchableOpacity>
                                )}
                            />
                        </View>
                    </View>
                </Modal>
                <TouchableOpacity style={styles.dropdown} onPress={()=>setIsAreaDropdownVisible(true)}>
                    <Text style={styles.dropdownText}>{selectedArea || "Area"}</Text>
                    <Ionicons name="chevron-down" size={20} color="#000" />
                </TouchableOpacity>
                <Modal
                    visible={isAreaDropdownVisible}
                    transparent={true}
                    animationType="fade"
                >
                    <View style={styles.modalOverlay}>
                        <View style={styles.dropdownList}>
                            <FlatList
                                data={areas}
                                keyExtractor={(item, index) => index.toString()}
                                renderItem={({ item }) => (
                                    <TouchableOpacity
                                        style={styles.dropdownItem}
                                        onPress={() => {
                                            setSelectedArea(item); // Set selected division
                                            setIsAreaDropdownVisible(false); // Close dropdown
                                        }}
                                    >
                                        <Text style={styles.dropdownText}>{item}</Text>
                                    </TouchableOpacity>
                                )}
                            />
                        </View>
                    </View>
                </Modal>

                {(subAreas.length != 0) &&(<TouchableOpacity style={styles.dropdown} onPress={()=>setIsSubAreaDropdownVisible(true)}>
                    <Text style={styles.dropdownText}>{selectedSubArea || "Sub-area"}</Text>
                    <Ionicons name="chevron-down" size={20} color="#000" />
                </TouchableOpacity>)}
                <Modal
                    visible={isSubAreaDropdownVisible}
                    transparent={true}
                    animationType="fade"
                >
                    <View style={styles.modalOverlay}>
                        <View style={styles.dropdownList}>
                            <FlatList
                                data={subAreas}
                                keyExtractor={(item, index) => index.toString()}
                                renderItem={({ item }) => (
                                    <TouchableOpacity
                                        style={styles.dropdownItem}
                                        onPress={() => {
                                            setSelectedSubArea(item); // Set selected division
                                            setIsSubAreaDropdownVisible(false); // Close dropdown
                                        }}
                                    >
                                        <Text style={styles.dropdownText}>{item}</Text>
                                    </TouchableOpacity>
                                )}
                            />
                        </View>
                    </View>
                </Modal>
            </View>

            {/* Show Property Button */}
            <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Show Property</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F5F5',
        padding: 16,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingBottom: 24,
    },
    icon: {
        padding: 8,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#000',
    },
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    dropdownList: {
        margin: 20,
        backgroundColor: '#fff',
        borderRadius: 5,
        maxHeight: 300, // Limit dropdown height
    },
    resetText: {
        fontSize: 14,
        fontWeight: '500',
        color: '#555',
    },
    dropdownSection: {
        marginBottom: 32,
    },
    dropdown: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#FFF',
        padding: 16,
        borderRadius: 8,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: '#E0E0E0',
    },
    dropdownText: {
        fontSize: 16,
        color: '#888',
    },
    button: {
        backgroundColor: Colors.primary,
        paddingVertical: 16,
        borderRadius: 5,
        alignItems: 'center',
    },
    buttonText: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: '600',
    },
    dropdownItem: {
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        // display : 'none'
    },
});

export default LocationScreen;