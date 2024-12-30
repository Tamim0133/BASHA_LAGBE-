import Colors from '@/constants/Colors';
import { Entypo, Ionicons, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet, Alert, ScrollView, Image, Button, Modal } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Checkbox } from 'react-native-paper'; // Import CheckBox
import * as ImagePicker from "expo-image-picker";
import { LocationSelector } from '@/components/LocationSelector';
import axios from 'axios'



// Type for form data
interface FormData {
    title: string;
    areaId: string;
    subarea: string;
    bedrooms: (Number | String);
    bathrooms: (Number | String);
    images: ImagePicker.ImagePickerAsset[]; // array of photo URIs
    floor: Number,
    category: 'Family' | 'Bachelor'| 'Hostel'| 'Office'| 'Sublet'| 'Female' | 'Shop' | 'Garage';
    rent: Number;
    advanceDeposit: Number;
    willRefundAdvance: boolean;
    availableFrom:
    'January' | 'February' | 'March' | 'April' | 'May' | 'June'
    | 'July' | 'August' | 'September' | 'October' | 'November' | 'December',
    isAvailable: boolean,
    facilities: string[];
    description: string;


}

// Props for each step component
interface StepProps {
    formData: FormData;
    setFormData: React.Dispatch<React.SetStateAction<FormData>>;
}

// Main Onboarding Screen Component
const OnboardingScreen: React.FC = () => {
    const [formData, setFormData] = useState<FormData>({
        title: '',
        areaId: '',
        subarea: '',
        bedrooms: 0,
        bathrooms: 0,
        images: [],
        rent: 0,
        advanceDeposit: 0,
        willRefundAdvance: true,
        category: 'Family',
        floor: 0,
        availableFrom: 'January',
        isAvailable: true,
        facilities: [],
        description: '',
    });
    

    const router = useRouter();
    const [currentStep, setCurrentStep] = useState<number>(0);
    const [error, setError] = useState<string>(''); // State to show error message

    

    // Steps array
    const steps: { title: string; component: React.FC<StepProps> }[] = [
        { title: 'Step 1: Basic Info', component: BasicInfo },
        { title: 'Step 2: Property Details', component: PropertyDetails },
        { title: 'Step 3: Upload Images', component: Uploadimages },
        { title: 'Step 4: Pricing and Publish', component: Pricing },
    ];

    // Validation for each step
    const validateStep = (): boolean => {
        if (currentStep === 0) {
            // if (!formData.title.trim() || !formData.areaId.trim()) {
            // if (!formData.title.trim() || !formData.subarea.trim()) {
            //     setError('Please fill in all fields for Step 1.');
            //     return false;
            // }
        } else if (currentStep === 1) {
            // if (!formData.bedrooms || !formData.bathrooms) {
            //     setError('Please fill in all fields for Step 2.');
            //     return false;
            // }
        } else if (currentStep === 3) {
            // if (!formData.rent) {
            //     setError('Please set a rent.');
            //     return false;
            // }
        }
        setError('');
        return true;
    };

    const nextStep = () => {
        if (validateStep()) {
            console.log(formData);
            setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
        }
    };

    const prevStep = () => {
        setCurrentStep((prev) => Math.max(prev - 1, 0));
        setError('');
    };

    const handleExit = () => {
        Alert.alert(
            'Exit',
            'Are you sure you want to exit without publishing the ad?',
            [
                { text: 'Cancel', style: 'cancel' },
                { text: 'Exit', onPress: () => { router.back() } },
            ]
        );
    };

    const CurrentStepComponent = steps[currentStep].component;

    return (
        <View style={styles.container}>
            {/* Exit Button in the top-left corner */}
            <TouchableOpacity onPress={handleExit} style={styles.exitButton}>
                <Ionicons name='exit-outline' size={20} style={{ color: '#f44336' }}></Ionicons>
                <Text style={styles.exitButtonText}>
                    Exit
                </Text>
            </TouchableOpacity>
            <ScrollView>

                <CurrentStepComponent formData={formData} setFormData={setFormData} />

                {/* Show error message */}
                {error ? <Text style={styles.error}>{error}</Text> : null}

                <View style={styles.buttonContainer}>
                    {currentStep > 0 && (
                        <TouchableOpacity onPress={prevStep} style={styles.colorButton}>
                            <Ionicons name='arrow-back' size={28} color='white'></Ionicons>
                        </TouchableOpacity>
                    )}
                    {currentStep < steps.length - 1 ? (
                        <TouchableOpacity onPress={nextStep} style={styles.colorButton}>
                            {/* <Text style={styles.buttonText}>Next</Text> */}
                            <Ionicons name='arrow-forward' size={28} color='white'></Ionicons>
                        </TouchableOpacity>
                    ) : (

                        <Text></Text>
                    )}
                </View>
            </ScrollView>
        </View >
    );
};

// Step 1: Basic Info
const BasicInfo: React.FC<StepProps> = ({ formData, setFormData }) => {

    const Catagory: string[] = ['Family', 'Bachelor', 'Office', 'Sublet', 'Hostel', 'Female', 'Shop', 'Garage'];
    const Bedrooms: (number | string)[] = [1, 2, 3, 4, 5, 6, '6+'];
    const Bathrooms: (number | string)[] = [1, 2, 3, 4, 5, 6, '6+'];
    const Facilities: string[] = ['Wifi', 'Gas', 'Parking', 'Lift', 'Water Supply', 'Sunlight & Ventilation', 'Markets Nearby', 'Security', 'High Commode', 'Balcony'];

    const [title, setTitle] = useState(formData.title);

    // Text handle korar jonno
    const handleTitleChange = (text: string) => {
        if (text.length <= 100) {
            setTitle(text);
            setFormData({ ...formData, title: text });
            console.log(formData);
        }
    };

    // Room No koyta kobe oita main data te change hobe
    const handleBedRooms = (text: (Number | String)) => {
        setFormData({ ...formData, bedrooms: text });
        console.log(formData);

    };

    // Bathroom koyta oita o change hobe
    const handleBathRooms = (text: (Number | String)) => {
        setFormData({ ...formData, bathrooms: text });
        console.log(formData);

    };

    //Kun catagory er basha
    const handleCategory = (text: 'Family' | 'Bachelor'| 'Hostel'| 'Office'| 'Sublet'| 'Female' | 'Shop' | 'Garage') => {
        setFormData({ ...formData, category: text });
        console.log(formData);
        
    };
    const handleLocation = (obj : any)=>{
        setSelectedArea(obj.areaId)
        setSelectedSubArea(obj.subArea)
        setFormData({ ...formData, areaId:selectedArea, subarea:selectedSubArea });
        console.log(formData);

    }

    const [selectedPropertyType, setSelectedPropertyType] = useState<string | null>(formData.category);
    const [selectedBedroom, setSelectedBedroom] = useState<Number | String | null>(formData.bedrooms);
    const [selectedBathroom, setSelectedBathroom] = useState<Number | String | null>(formData.bathrooms);
    const [selectedFeatures, setSelectedFeatures] = useState<string[]>(formData.facilities);
    const [selectedArea, setSelectedArea] = useState<string>(formData.areaId);
    const [selectedSubArea, setSelectedSubArea] = useState<string>(formData.subarea);

    return (
        <View>
            <Text style={styles.sectionTitle}>Enter a Suitable Title:</Text>
            <TextInput
                style={styles.input}
                value={title}
                onChangeText={handleTitleChange}
                placeholder="What describe your property ..."
                multiline={true} // Allow multiple lines
                numberOfLines={2} // Makes the input field a bit larger (initial lines)
                maxLength={50} // Limit the input to 100 characters
            />
            <Text style={styles.counter}>{title.length} / 50</Text>
            <Text></Text>

            <View>
                {/* Property Types */}
                <Text style={styles.sectionTitle}>Property Types :</Text>

                <View style={styles.buttonGroup}>
                    {Catagory.map((type) => (
                        <TouchableOpacity
                            key={type}
                            style={[styles.button, selectedPropertyType === type && styles.selectedButton]}
                            onPress={() => {
                                setSelectedPropertyType(type as 'Family' | 'Bachelor'| 'Hostel'| 'Office'| 'Sublet'| 'Female' | 'Shop' | 'Garage');
                                handleCategory(type as 'Family' | 'Bachelor'| 'Hostel'| 'Office'| 'Sublet'| 'Female' | 'Shop' | 'Garage');
                            }}
                        >
                            <Text style={[selectedPropertyType === type ? styles.showButtonText : styles.selectedText]}>{type}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
                <Text style={styles.sectionTitle}>Number of Bedrooms:</Text>
                <View style={styles.buttonGroup}>
                    {Bedrooms.map((num) => (
                        <TouchableOpacity
                            key={num}
                            style={[styles.button, selectedBedroom === num && styles.selectedButton]}
                            onPress={() => { setSelectedBedroom(num); handleBedRooms(num); }}
                        >
                            <Text style={[selectedBedroom === num ? styles.showButtonText : styles.selectedText]}>{num}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
                <Text style={styles.sectionTitle}>Number of Bathrooms:</Text>
                <View style={styles.buttonGroup}>
                    {Bathrooms.map((num) => (
                        <TouchableOpacity
                            key={num}
                            style={[styles.button, selectedBathroom === num && styles.selectedButton]}
                            onPress={() => { setSelectedBathroom(num); handleBathRooms(num) }}
                        >
                            <Text style={[selectedBathroom === num ? styles.showButtonText : styles.selectedText]}>{num}</Text>
                        </TouchableOpacity>
                    ))}

                </View>
            </View>
            <Text style={styles.sectionTitle}>Location:</Text>
            <LocationSelector onLocationSelected={handleLocation} />
            

        </View>
    );
};

// Step 2: Property Details -> Photo and Floor No
const PropertyDetails: React.FC<StepProps> = ({ formData, setFormData }) => {
    const [flr, setFlr] = useState<string>(formData.floor.toString()); // Start as string
    const [images, setImages] = useState<ImagePicker.ImagePickerAsset[]>(formData.images); // Initialize with formData.images
    const [isModalVisible, setIsModalVisible] = useState(false);

    const handleTitleChange = (text: string) => {
        const numberValue = text ? parseInt(text, 10) : NaN;
        if (!isNaN(numberValue)) {
            setFlr(numberValue.toString());
            setFormData({ ...formData, floor: numberValue });
        } else {
            setFlr("");
        }
    };

    const pickImages = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
            Alert.alert("Permission Denied", "We need access to your gallery to pick images.");
            return;
        }

        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: "images",
            allowsMultipleSelection: true,
            selectionLimit: 10, // Maximum limit is 10
        });

        if (!result.canceled) {
            const selectedImages = result.assets//.map(asset => asset.uri);

            const updatedImages = [...images, ...selectedImages];

            if (updatedImages.length < 3) {
                Alert.alert("Minimum Images Required", "Please select at least 3 images.");
            } else if (updatedImages.length > 10) {
                Alert.alert("Maximum Images Limit Exceeded", "You can select up to 10 images only.");
            } else {
                setImages(updatedImages);
                setFormData({ ...formData, images: updatedImages }); // Update formData with new images
            }
        }
    };

    const removeImage = (index: number) => {
        const updatedImages = images.filter((_, i) => i !== index);
        setImages(updatedImages);
        setFormData({ ...formData, images: updatedImages }); // Update formData with remaining images   
    };

    return (
        <ScrollView>
            <View>
                <Text style={styles.sectionTitle}>Enter a Floor No:</Text>
                <TextInput
                    style={styles.input}
                    value={flr}
                    onChangeText={handleTitleChange}
                    placeholder="Floor No"
                    keyboardType="numeric"
                    maxLength={50}
                />

                <Text style={styles.sectionTitle}>Upload Property images:</Text>
                <Text></Text>

                <View style={{ marginBottom: 10 }}>
                    <Text style={{ marginTop: 10 }}>
                        Selected Images ({images.length}/10): <Text style={{ color: Colors.grey, fontSize: 12 }}>(minimum 3)</Text>
                    </Text>
                    {images.length > 0 && (
                        <View>
                            <ScrollView horizontal style={{ maxHeight: 200, marginTop: 10 }}>
                                {images.map((image, index) => (
                                    <View key={index} style={styles.imageContainer}>
                                        <Image source={{ uri: image.uri }} style={styles.thumbnail} />
                                        <TouchableOpacity
                                            style={styles.removeButton}
                                            onPress={() => removeImage(index)}
                                        >
                                            <Entypo name='cross' size={16} color='white'></Entypo>

                                        </TouchableOpacity>
                                    </View>
                                ))}
                            </ScrollView>
                            <Text></Text>
                            <Text></Text>
                            <Button
                                title="View Selected Images"
                                onPress={() => setIsModalVisible(true)}
                                color={Colors.grey}
                            />
                        </View>
                    )}
                </View>
                <Button title="Pick Images" onPress={pickImages} color={Colors.grey} />
                <Text></Text>
                <Text></Text>

                {/* Fullscreen Modal */}
                <Modal
                    visible={isModalVisible}
                    animationType="slide"
                    onRequestClose={() => setIsModalVisible(false)}
                >
                    <View style={styles.modalContainer}>
                        <Text style={styles.modalTitle}>Selected Images</Text>
                        <ScrollView>
                            {images.map((image, index) => (
                                <View key={index} style={styles.imageContainer}>
                                    <Image source={{ uri: image.uri }} style={styles.fullImage} />
                                    <TouchableOpacity
                                        style={styles.removeButton}
                                        onPress={() => removeImage(index)}
                                    >
                                        <Entypo name='cross' size={28} color='white'></Entypo>

                                    </TouchableOpacity>
                                </View>
                            ))}
                        </ScrollView>
                        <Button
                            title="Close"
                            onPress={() => setIsModalVisible(false)}
                            color={Colors.primary}
                        />
                    </View>
                </Modal>
            </View>
        </ScrollView>
    );
};

// Step 3: Available From and Description
const Uploadimages: React.FC<StepProps> = ({ formData, setFormData }) => {
    const [availableFrom, setAvailableFrom] = useState<string>(formData.availableFrom); // Month
    const [description, setDescription] = useState<string>(formData.description); // Description




    const handleDescriptionChange = (text: string) => {
        if (text.length <= 250) {
            setDescription(text); // Only set if length is within the limit
            setFormData({ ...formData, description: text })
        }
    };

    const features = [
        { name: 'Wifi', icon: 'wifi' },
        { name: 'Gas', icon: 'gas-cylinder' },
        { name: 'Parking', icon: 'car-brake-parking' },
        { name: 'Lift', icon: 'elevator-up' },
        { name: 'Water Supply', icon: 'cup-water' },
        { name: 'Sunlight & Ventilation', icon: 'fan-plus' },
        { name: 'Markets Nearby', icon: 'shopping-outline' },
        { name: 'Security', icon: 'shield-check-outline' },
        { name: 'High Commode', icon: 'toilet' },
        { name: 'Balcony', icon: 'balcony' } // Use another suitable icon
    ];
    const [selectedFeatures, setSelectedFeatures] = useState<string[]>(formData.facilities);

    // Define the function to toggle the selection of a feature
    const toggleFeature = (item: string) => {
        // Update the `selectedFeatures` state by checking the current selection
        setSelectedFeatures((prev) => {
            // Determine the new state for `selectedFeatures`
            const newSelectedFeatures = prev.includes(item)
                ? prev.filter((feature) => feature !== item) // If the item is selected, remove it
                : [...prev, item]; // If the item is not selected, add it

            // Update `formData` with the new value for `selectedFeatures`
            setFormData({ ...formData, facilities: newSelectedFeatures });

            return newSelectedFeatures; // Return the new state for `selectedFeatures`
        });
    };
    return (
        <View style={styles.containerFor3rd}>
            <Text style={styles.sectionTitle}>Available From:</Text>
            <View style={styles.pickerContainer}>
                <Picker
                    selectedValue={availableFrom}
                    style={styles.picker}
                    onValueChange={(itemValue) => {
                        setAvailableFrom(itemValue);
                        setFormData({
                            ...formData, availableFrom: itemValue as 'January' | 'February' | 'March' | 'April' | 'May' | 'June'
                                | 'July' | 'August' | 'September' | 'October' | 'November' | 'December'
                        });
                    }}
                >
                    <Picker.Item label="January" value="January" />
                    <Picker.Item label="February" value="February" />
                    <Picker.Item label="March" value="March" />
                    <Picker.Item label="April" value="April" />
                    <Picker.Item label="May" value="May" />
                    <Picker.Item label="June" value="June" />
                    <Picker.Item label="July" value="July" />
                    <Picker.Item label="August" value="August" />
                    <Picker.Item label="September" value="September" />
                    <Picker.Item label="October" value="October" />
                    <Picker.Item label="November" value="November" />
                    <Picker.Item label="December" value="December" />
                </Picker></View>

            {/* // Features */}
            <Text style={styles.sectionTitle}>Select Features</Text>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                {features.map((feature) => (
                    <TouchableOpacity
                        key={feature.name}
                        onPress={() => toggleFeature(feature.name)}
                        style={{
                            width: '48%', // Adjust width to fit two items in each row with some margin
                            margin: '1%', // Add margin for spacing between items
                            flexDirection: 'row',
                            alignItems: 'center',
                        }}                    >
                        <MaterialCommunityIcons name={feature.icon} size={20} style={selectedFeatures.includes(feature.name) ? styles.selectedButton : styles.button} />
                        <Text style={{ marginLeft: 8 }}>{feature.name}</Text>
                    </TouchableOpacity>
                ))}
            </View>

            {/* Description */}
            <Text style={[styles.sectionTitle, { marginTop: 70 }]}>Description:</Text>
            <TextInput

                value={description}
                onChangeText={handleDescriptionChange}
                placeholder="Enter description (max 250 characters)"
                maxLength={250}
                multiline={true}
                numberOfLines={4}
            />
            <Text style={styles.charCount}>{description.length}/250</Text>
        </View>
    );
};


// Step 4: Pricing
const Pricing: React.FC<StepProps> = ({ formData, setFormData }) => {
    const [rent, setrent] = useState<Number>(formData.rent); // Month
    const [adv, setAdv] = useState<Number>(formData.advanceDeposit);
    const [toggleCheckBox, setToggleCheckBox] = useState(false)

    const baseURL = process.env.EXPO_PUBLIC_BASE_URL
    const handleSubmit = async () => {
        if (formData.images.length < 3) {
          Alert.alert("Minimum Images Required", "Please select at least 3 images.");
          return;
        }
      
        const fd = new FormData();
      
        // Handle image uploads
        formData.images.forEach((image, index) => {
          // ImagePickerAsset already contains the necessary file information
          fd.append('images', {
            uri: image.uri,
            type: image.mimeType || 'image/jpeg', // Use the actual mime type if available
            name: image.fileName || `image${index}.jpg`, // Use the actual filename if available
          }as unknown as Blob);
        });
      
        // Add other form data
        const { images, ...otherData } = formData;
        fd.append('data', JSON.stringify(otherData));
      
        try {
          const response = await axios.post('http://192.168.0.101:8000/api/ad/insert-ad', fd, {
            headers: {
              'Content-Type': 'multipart/form-data',
              Accept: 'application/json',
            },
          });
          
          console.log('Upload Success:', response.data);
        } catch (error) {
          console.error('Upload Error:', error);
          Alert.alert('Upload Failed', 'An error occurred while posting the ad.');
        }
      };
    
    

    return (
        <View style={styles.container}>
            {/* rent Input */}
            <Text style={styles.sectionTitle}>Set Rent:<Text style={{ color: Colors.grey }}> (rent in taka per month) </Text></Text>
            <TextInput
                style={styles.inputMoney}
                value={rent !== 0 ? String(rent) : ''}
                onChangeText={(text) => {
                    setrent(Number(text));
                    setFormData({ ...formData, rent: Number(text) })
                    // console.log(rent);

                }}
                placeholder=" ৳ ...."
                keyboardType="numeric"
            />

            {/* Advance Deposit Input */}
            <Text style={styles.sectionTitle}>Advance Deposit Amount:</Text>
            <TextInput
                style={styles.input}
                value={String(adv)}
                onChangeText={(text) => {
                    setAdv(Number(text));
                    setFormData({ ...formData, advanceDeposit: Number(text) })

                }} placeholder="Enter advance deposit"
                keyboardType="numeric"
            />

            {/* Refundable Checkbox */}
            <View style={styles.checkboxContainer}>
                <Checkbox
                    status={toggleCheckBox ? 'checked' : 'unchecked'}
                    onPress={() => {
                        setToggleCheckBox(!toggleCheckBox);
                        setFormData({ ...formData, willRefundAdvance: !toggleCheckBox })
                    }

                    }
                />
                <Text style={styles.checkboxLabel}>Advance is Refundable</Text>
            </View>
            <TouchableOpacity onPress={handleSubmit}
                style={styles.colorButton}
            >
                <Text style={styles.buttonText}>Submit</Text>
            </TouchableOpacity>
        </View>
    );
};
const styles = StyleSheet.create({
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    checkboxLabel: {
        fontSize: 16,
        marginLeft: 10,
        fontWeight: '600'
    },
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: '#fff',
        marginTop: 40,
        paddingTop: 80,
        paddingBottom: 50
    },
    containerFor3rd: {
        flex: 1,
        padding: 10,
        backgroundColor: '#fff',
        marginTop: 40,
        // paddingTop: 80,
        paddingBottom: 50
    },
    sectionTitle: {
        fontSize: 22,
        fontWeight: '800',
        marginBottom: 12,
        marginTop: 20,
    },
    underline: {
        height: 2,
        backgroundColor: 'black', // Change to your desired color
        width: '100%', // Adjust width if needed
    },
    input: {
        borderWidth: 2,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        marginBottom: 20,
        // height: 100, // Makes the input field larger
    },
    inputMoney: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        marginBottom: 20,
        fontSize: 48,
        fontWeight: '700',
        color: Colors.primary
    },
    counter: {
        marginTop: 5,
        color: '#666',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    colorButton: {
        backgroundColor: Colors.primary,
        padding: 12,
        borderRadius: 5,
    },
    backNext: {
        backgroundColor: Colors.dark,
        padding: 12,
        borderRadius: 5,
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        textAlign: 'center'
    },
    error: {
        color: 'red',
        marginBottom: 10,
        textAlign: 'center',
    },
    button: {
        borderWidth: 1,
        borderColor: '#cccccc',
        borderRadius: 10,
        padding: 10,
        margin: 5,
        alignItems: 'center',
    },
    exitButton: {
        display: 'flex',
        flexDirection: 'row',
        gap: '10',
        position: 'absolute',
        top: 20,
        left: 20,
        // backgroundColor: Colors,
        paddingVertical: 5,
        paddingHorizontal: 12,
        borderRadius: 5,
        borderColor: '#f44336',
        borderWidth: 2
    },
    exitButtonText: {
        color: '#f44336',
        fontWeight: 'bold',
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
    label: {
        fontSize: 16,
        marginBottom: 5,
    },
    picker: {
        height: 70,
        width: '100%',
        // marginBottom: 20,
    },
    pickerContainer: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        // overflow: 'hidden',
        marginBottom: 20,
    },
    resetButtonText: {
        color: '#fff',
    },

    buttonGroup: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginBottom: 10,
    },

    selectedButton: {
        backgroundColor: Colors.primary,
        borderColor: Colors.dark,
        color: '#fff',
        borderRadius: 10,
        padding: 10,
        margin: 5,
        alignItems: 'center',
    },
    rentRange: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
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
    },
    charCount: {
        textAlign: 'right',
        fontSize: 12,
        color: '#888',
    },
    thumbnail: {
        width: 200,
        height: 200,
        resizeMode: "cover",
        marginRight: 10,
        padding: 20
    },
    modalContainer: {
        flex: 1,
        backgroundColor: "white",
        padding: 10,
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 10,
    },
    removeButton: {
        position: "absolute",
        top: 0,
        right: 0,
        backgroundColor: "red",
        // color: 'red',
        padding: 5,
        borderRadius: 5,
    },
    imageContainer: {
        marginBottom: 20,
        position: "relative",
    },
    fullImage: {
        width: "100%",
        height: 600,
        resizeMode: "contain",
        // margin: 10,
        borderWidth: 2, // Add border thickness
        borderColor: "#000", // Set border color (black in this case)
        borderRadius: 10,

    },
});
export default OnboardingScreen;