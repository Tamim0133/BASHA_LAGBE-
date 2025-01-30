import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, Modal, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Colors from '@/constants/Colors';

export const LocationSelector = ({ onAreaSelected, onSubAreaSelected }) => {
    const baseURL = process.env.EXPO_PUBLIC_BASE_URL

    const [divisions, setDivisions] = useState([]);
    const [selectedDivision, setSelectedDivision] = useState('');
    const [isDivisionDropdownVisible, setIsDivisionDropdownVisible] = useState(false);

    const [districts, setDistricts] = useState([]);
    const [selectedDistrict, setSelectedDistrict] = useState('');
    const [isDistrictDropdownVisible, setIsDistrictDropdownVisible] = useState(false);

    const [areas, setAreas] = useState([]);
    const [selectedArea, setSelectedArea] = useState('');
    const [selectedAreaObj, setSelectedAreaObj] = useState();
    const [isAreaDropdownVisible, setIsAreaDropdownVisible] = useState(false);

    const [subAreas, setSubAreas] = useState([]);
    const [selectedSubArea, setSelectedSubArea] = useState('');
    const [isSubAreaDropdownVisible, setIsSubAreaDropdownVisible] = useState(false);

    useEffect(() => {
        const fetchDivisions = async () => {
            try {
                const response = await fetch(`${baseURL}/api/location/get-divisions`);
                const data = await response.json();
                console.log(data);
                setDivisions(data.data);
                setDistricts([]);
                setAreas([]);
                setSubAreas([]);
                setSelectedDistrict('');
                setSelectedArea('');
                setSelectedSubArea('');
            } catch (error) {
                console.error('Error fetching divisions:', error);
            }
        };
        fetchDivisions();
    }, [baseURL]);

    useEffect(() => {
        const fetchDistricts = async () => {
            if (!selectedDivision) return;
            try {
                const response = await fetch(`${baseURL}/api/location/get-districts/${selectedDivision}`);
                const data = await response.json();
                setDistricts(data.data);
                setAreas([]);
                setSubAreas([]);
                setSelectedArea('');
                setSelectedSubArea('');
            } catch (error) {
                console.error('Error fetching districts:', error);
            }
        };
        fetchDistricts();
    }, [selectedDivision]);

    useEffect(() => {
        const fetchAreas = async () => {
            if (!selectedDistrict) return;
            try {
                const response = await fetch(`${baseURL}/api/location/get-areas/${selectedDistrict}`);
                const data = await response.json();
                setAreas(data.data);
                setSubAreas([]);
                setSelectedSubArea('');
            } catch (error) {
                console.error('Error fetching areas:', error);
            }
        };
        fetchAreas();
    }, [selectedDistrict]);

    useEffect(() => {
        const fetchSubAreas = async () => {
            if (!selectedArea) return;
            try {
                const response = await fetch(`${baseURL}/api/location/get-subareas/${selectedArea}`);
                const data = await response.json();
                setSubAreas(data.data);
                setSelectedAreaObj(data.location)
                onAreaSelected({ areaId: data.location._id });

            } catch (error) {
                console.error('Error fetching sub-areas:', error);
            }
        };
        fetchSubAreas();
    }, [selectedArea]);
    // useEffect(() => {
    //     const updateSubArea = async () => {
    //         if (!selectedSubArea) return;
    //             onAreaSelected, ({ areaId: selectedAreaObj._id, subarea: selectedSubArea });
    //     };
    //     updateSubArea();
    // }, [selectedSubArea]);

    return (
        <View style={styles.dropdownSection}>
            {/* Division Dropdown */}
            <TouchableOpacity style={styles.dropdown} onPress={() => setIsDivisionDropdownVisible(true)}>
                <Text style={styles.dropdownText}>{selectedDivision || 'Division'}</Text>
                <Ionicons name="chevron-down" size={20} color="#000" />
            </TouchableOpacity>
            <Modal visible={isDivisionDropdownVisible} transparent animationType="fade">
                <DropdownModal
                    data={divisions}
                    onSelect={(item) => {
                        setSelectedDivision(item);
                        setIsDivisionDropdownVisible(false);
                    }}
                />
            </Modal>

            {/* District Dropdown */}
            <TouchableOpacity style={styles.dropdown} onPress={() => setIsDistrictDropdownVisible(true)}>
                <Text style={styles.dropdownText}>{selectedDistrict || 'District'}</Text>
                <Ionicons name="chevron-down" size={20} color="#000" />
            </TouchableOpacity>
            <Modal visible={isDistrictDropdownVisible} transparent animationType="fade">
                <DropdownModal
                    data={districts}
                    onSelect={(item) => {
                        setSelectedDistrict(item);
                        setIsDistrictDropdownVisible(false);
                    }}
                />
            </Modal>

            {/* Area Dropdown */}
            <TouchableOpacity style={styles.dropdown} onPress={() => setIsAreaDropdownVisible(true)}>
                <Text style={styles.dropdownText}>{selectedArea || 'Area'}</Text>
                <Ionicons name="chevron-down" size={20} color="#000" />
            </TouchableOpacity>
            <Modal visible={isAreaDropdownVisible} transparent animationType="fade">
                <DropdownModal
                    data={areas}
                    onSelect={(item) => {
                        setSelectedArea(item);
                        setIsAreaDropdownVisible(false);
                    }}
                />
            </Modal>

            {/* Sub-area Dropdown */}
            {subAreas.length > 0 && (
                <TouchableOpacity style={styles.dropdown} onPress={() => setIsSubAreaDropdownVisible(true)}>
                    <Text style={styles.dropdownText}>{selectedSubArea || 'Sub-area'}</Text>
                    <Ionicons name="chevron-down" size={20} color="#000" />
                </TouchableOpacity>
            )}
            <Modal visible={isSubAreaDropdownVisible} transparent animationType="fade">
                <DropdownModal
                    data={subAreas}
                    onSelect={(item) => {
                        setSelectedSubArea(item);
                        setIsSubAreaDropdownVisible(false);
                        onSubAreaSelected({ subArea: item })
                    }}
                />
            </Modal>
        </View>
    );
};

const DropdownModal = ({ data, onSelect }) => (
    <View style={styles.modalOverlay}>
        <View style={styles.dropdownList}>
            <FlatList
                data={data}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={styles.dropdownItem}
                        onPress={() => onSelect(item)}
                    >
                        <Text style={styles.dropdownText}>{item}</Text>
                    </TouchableOpacity>
                )}
            />
        </View>
    </View>
);

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
    },
});

