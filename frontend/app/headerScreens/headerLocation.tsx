import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, Modal, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Colors from '@/constants/Colors';
import { LocationSelector } from '@/components/LocationSelector';

const LocationScreen = () => {
    const navigation = useNavigation();
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
    const [areaId, setAreaId] = useState<String>("")
    const [subArea, setSubArea] = useState<String>("")
    const handleArea = (obj : any)=>{
        setAreaId(obj.areaId)
    }
    const handleSubArea = (obj : any)=>{
        setSubArea(obj.subArea)
    }
    return (
        <SafeAreaView style={styles.container}>
           
           <LocationSelector onAreaSelected={handleArea} onSubAreaSelected={handleSubArea} />
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

});

export default LocationScreen;