import Colors from '@/constants/Colors';
import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView } from 'react-native';

// Define the type for features  
type Feature = 'LIFT' | 'GARAGE' | 'CCTV' | 'GAS' | 'WIFI';
// Define the type for property types and bedrooms and bathrooms  
type PropertyType = 'Family' | 'Bachelor' | 'Office' | 'Sublet' | 'Hostel' | 'Female' | 'Shop';
type BedroomCount = 1 | 2 | 3 | 4 | 5 | 6 | 7;
type BathroomCount = 1 | 2 | 3 | 4 | 5 | 6 | '6+';

const FilterScreen: React.FC = () => {
    const [minPrice, setMinPrice] = useState<string>('');
    const [maxPrice, setMaxPrice] = useState<string>('');
    const [keyword, setKeyword] = useState<string>('');
    const [selectedPropertyType, setSelectedPropertyType] = useState<PropertyType | null>(null);
    const [selectedBedroom, setSelectedBedroom] = useState<BedroomCount | null>(null);
    const [selectedBathroom, setSelectedBathroom] = useState<BathroomCount | null>(null);
    const [selectedFeatures, setSelectedFeatures] = useState<Feature[]>([]);

    const propertyTypes: PropertyType[] = ['Family', 'Bachelor', 'Office', 'Sublet', 'Hostel', 'Female', 'Shop'];
    const bedrooms: BedroomCount[] = [1, 2, 3, 4, 5, 6, 7];
    const bathrooms: BathroomCount[] = [1, 2, 3, 4, 5, 6, '6+'];
    const features: Feature[] = ['LIFT', 'GARAGE', 'CCTV', 'GAS', 'WIFI'];

    // Update types for the item parameter  
    const toggleFeature = (item: Feature) => {
        setSelectedFeatures((prev) => {
            if (prev.includes(item)) {
                return prev.filter((feature) => feature !== item);
            } else {
                return [...prev, item];
            }
        });
    };

    const handleReset = () => {
        setMinPrice('');
        setMaxPrice('');
        setKeyword('');
        setSelectedPropertyType(null);
        setSelectedBedroom(null);
        setSelectedBathroom(null);
        setSelectedFeatures([]);
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>Filter</Text>
            <TouchableOpacity onPress={handleReset} style={styles.resetButton}>
                <Text style={styles.resetButtonText}>RESET</Text>
            </TouchableOpacity>

            {/* Property Types */}
            <Text style={styles.sectionTitle}>Property Types</Text>
            <View style={styles.buttonGroup}>
                {propertyTypes.map((type) => (
                    <TouchableOpacity
                        key={type}
                        style={[styles.button, selectedPropertyType === type && styles.selectedButton]}
                        onPress={() => setSelectedPropertyType(type)}
                    >
                        <Text style={[selectedPropertyType === type ? styles.showButtonText : styles.selectedText]}>{type}</Text>
                    </TouchableOpacity>
                ))}
            </View>

            {/* Price Range */}
            <Text style={styles.sectionTitle}>Price range</Text>
            <View style={styles.priceRange}>
                <TextInput
                    style={styles.input}
                    placeholder="Minimum"
                    keyboardType="numeric"
                    value={minPrice}
                    onChangeText={setMinPrice}
                />
                <Text style={styles.toText}>to</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Maximum"
                    keyboardType="numeric"
                    value={maxPrice}
                    onChangeText={setMaxPrice}
                />
            </View>

            {/* Bedrooms */}
            <Text style={styles.sectionTitle}>Bedrooms</Text>
            <View style={styles.buttonGroup}>
                {bedrooms.map((num) => (
                    <TouchableOpacity
                        key={num}
                        style={[styles.button, selectedBedroom === num && styles.selectedButton]}
                        onPress={() => setSelectedBedroom(num)}
                    >
                        <Text style={[selectedBedroom === num ? styles.showButtonText : styles.selectedText]}>{num}</Text>
                    </TouchableOpacity>
                ))}
            </View>

            {/* Bathrooms */}
            <Text style={styles.sectionTitle}>Bathrooms</Text>
            <View style={styles.buttonGroup}>
                {bathrooms.map((num) => (
                    <TouchableOpacity
                        key={num}
                        style={[styles.button, selectedBathroom === num && styles.selectedButton]}
                        onPress={() => setSelectedBathroom(num)}
                    >
                        <Text style={[selectedBathroom === num ? styles.showButtonText : styles.selectedText]}>{num}</Text>
                    </TouchableOpacity>
                ))}
                {/* <TouchableOpacity
                    style={[styles.button, selectedBathroom === '6+' && styles.selectedButton]}
                    onPress={() => setSelectedBathroom('6+')}
                >
                    <Text>6+</Text>
                </TouchableOpacity> */}
            </View>

            {/* Features */}
            <Text style={styles.sectionTitle}>Features</Text>
            <View style={styles.buttonGroup}>
                {features.map((feature) => (
                    <TouchableOpacity
                        key={feature}
                        style={[styles.button, selectedFeatures.includes(feature) && styles.selectedButton]}
                        onPress={() => toggleFeature(feature)}
                    >
                        <Text style={[selectedFeatures.includes(feature) ? styles.showButtonText : styles.selectedText]}>{feature}</Text>
                    </TouchableOpacity>
                ))}
            </View>

            {/* Keyword */}
            <Text style={styles.sectionTitle}>Keyword</Text>
            <TextInput
                style={styles.keywordInput}
                placeholder="Enter relevant keyword"
                value={keyword}
                onChangeText={setKeyword}
            />

            {/* Show Property Button */}
            <TouchableOpacity style={styles.showButton}>
                <Text style={styles.showButtonText}>Show Property</Text>
            </TouchableOpacity>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 16,
        backgroundColor: '#f8f8f8',
        flexGrow: 1,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        // marginBottom: 20,
    },
    resetButton: {
        alignSelf: 'flex-end',
        // marginBottom: 20,
        padding: 10,
        backgroundColor: Colors.dark,
        borderRadius: 5,
    },
    resetButtonText: {
        color: '#fff',
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 8,
        marginTop: 10,
    },
    buttonGroup: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginBottom: 10,
    },
    button: {
        borderWidth: 1,
        borderColor: '#cccccc',
        borderRadius: 10,
        padding: 10,
        margin: 5,
        alignItems: 'center',
    },
    selectedButton: {
        backgroundColor: Colors.primary,
        borderColor: Colors.dark,
        color: '#fff',
        borderWidth: 2,
    },
    priceRange: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    input: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#cccccc',
        borderRadius: 5,
        padding: 10,
        marginRight: 5,
    },
    toText: {
        marginRight: 5,
    },
    keywordInput: {
        borderWidth: 1,
        borderColor: '#cccccc',
        borderRadius: 5,
        padding: 10,
        marginBottom: 20,
        backgroundColor: '#fff',
    },
    showButton: {
        padding: 15,
        backgroundColor: Colors.primary,
        borderRadius: 5,
        alignItems: 'center',
    },
    showButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    selectedText: {
    }
});

export default FilterScreen;