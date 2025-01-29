import {
  View,
  Text,
  Button,
  Alert,
  TouchableOpacity,
  ScrollView,
  Image,
  Modal,
  StyleSheet,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { useUserState } from '@/hooks/UserContext';
import Colors from '@/constants/Colors';
import { Link, useRouter } from 'expo-router';
import axios from 'axios';
import { Ionicons } from '@expo/vector-icons';
import { Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const MyProperties = () => {
  const screenWidth = Dimensions.get('window').width;
  const router = useRouter();
  const { currentUser, isLoggedIn } = useUserState();
  const baseURL = process.env.EXPO_PUBLIC_BASE_URL;
  const [items, setItems] = useState([]); // State for storing fetched listings
  const [modalVisible, setModalVisible] = useState(false);
  const [currentImages, setCurrentImages] = useState([]);

  useEffect(() => {
    const fetchAds = async () => {
      try {
        const response = await axios.get(`${baseURL}/api/ad/get-ad`);
        if (!response.data.success) {
          Alert.alert('Error', response.data.message);
          return;
        }
        const newItems = response.data.data;
        const filteredItems = newItems.filter(item => item.owner === currentUser._id);

        setItems(filteredItems);
      } catch (error) {
        const errorMessage =
          error.response?.data?.message || 'An unexpected error occurred. Please try again.';
        Alert.alert('Error', errorMessage);
      }
    };

    if (isLoggedIn) fetchAds();
  }, [isLoggedIn]);

  const openFullscreen = (images) => {
    setCurrentImages(images);
    setModalVisible(true);
  };

  const closeFullscreen = () => {
    setModalVisible(false);
  };

  const handleDeleteAd = (itemId, title) => {
    Alert.alert(
      'Confirm Deletion',
      `Are you sure you want to delete the property: ${title}?`,
      [
        {
          text: 'Cancel',
          onPress: () => { },
          style: 'cancel',
        },
        {
          text: 'Delete',
          onPress: async () => {
            try {
              /*-----------------------------
                   Delete this post
      ------------------------------- */
              // const response = await axios.delete(`${baseURL}/api/ad/delete-ad/${itemId}`);
              if (response.data.success) {
                Alert.alert('Success', 'Property deleted successfully');
                setItems((prevItems) => prevItems.filter((item) => item._id !== itemId));
              } else {
                Alert.alert('Error', response.data.message);
              }
            } catch (error) {
              const errorMessage =
                error.response?.data?.message || 'An unexpected error occurred. Please try again.';
              Alert.alert('Error', errorMessage);
            }
          },
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <>
      {isLoggedIn && (
        <>
          <ScrollView style={{ flex: 1, padding: 16 }} contentContainerStyle={{
            paddingBottom: 150, // Ensures extra space at the bottom for scrolling
          }}>
            <Text style={styles.pageTitle}>My Properties</Text>
            {items.length > 0 ? (
              items.map((item, index) => (
                <Link
                  key={index}
                  href={{
                    pathname: `/listing/${item._id}`,
                    params: {
                      item: JSON.stringify(item), // Serialize the item object
                    },
                  }}
                  asChild
                >
                  <TouchableOpacity activeOpacity={1}>
                    <View style={styles.card}>
                      <View style={{ flexDirection: 'row', justifyContent: 'space-between', flexWrap: 'wrap', marginBottom: 10 }}>
                        {item.images.map((image, idx) => (
                          <Image
                            key={idx}
                            source={{ uri: image || 'default_image_url' }}
                            style={{
                              width: screenWidth / 4 + 5, // 1/4th of the screen width with some margin
                              height: screenWidth / 4 + 5, // Maintain a square aspect ratio
                              borderRadius: 8,
                              marginRight: 8,
                              marginBottom: 8,
                            }}
                          />
                        ))}
                      </View>
                      <View style={{ marginBottom: 5 }}>
                        <Button
                          title="View Images"
                          color={Colors.primary}
                          onPress={() => openFullscreen(item.images)}
                        />
                      </View>
                      {/* Delete Ad Button */}
                      <Button
                        title="Delete Ad"
                        color={Colors.grey}
                        onPress={() => handleDeleteAd(item._id, item.title)}

                      />

                      <View style={styles.infoContainer}>
                        <Text style={styles.title}>{item.title}</Text>
                        <Text style={styles.location}>{item.subarea}</Text>
                        <View style={styles.priceContainer}>
                          <Text style={styles.price}>€ {item.rent}</Text>
                          <Text style={styles.perMonth}>month</Text>
                        </View>
                      </View>
                    </View>
                  </TouchableOpacity>
                </Link>
              ))
            ) : (
              <Text>No properties found</Text>
            )}
          </ScrollView>
        </>
      )}
      {!isLoggedIn && (
        <View style={{ flex: 1, margin: 100 }}>
          <Button
            title="Log In to View Your Properties"
            color={Colors.primary}
            onPress={() => router.push('/(modals)/login')}
          />
        </View>
      )}

      <Modal visible={modalVisible} transparent={true} animationType="fade">
        <View style={styles.modalContainer}>
          <ScrollView showsVerticalScrollIndicator={false}>
            {currentImages.map((image, index) => (
              <Image key={index} source={{ uri: image }} style={styles.verticalImage} />
            ))}
          </ScrollView>
          <Button title="Close" onPress={closeFullscreen} color={Colors.primary} />
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 16,
    marginVertical: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  imageScroll: {
    marginBottom: 10,
  },
  imageScrollContainer: {
    flexDirection: 'row', // Ensures images are displayed horizontally
    alignItems: 'center', // Centers images vertically
  },
  image: {
    width: 120,
    height: 80,
    borderRadius: 8,
    marginRight: 8, // Adds spacing between images
  },
  icon: {
    position: 'absolute',
    right: 16,
    top: 16,
  },
  infoContainer: {
    marginTop: 10,
  },
  title: {
    fontSize: 16,
    fontFamily: 'mon-sb',
  },
  location: {
    fontFamily: 'mon',
    color: '#666',
  },
  priceContainer: {
    flexDirection: 'row',
    gap: 4,
    marginTop: 4,
  },
  price: {
    fontFamily: 'mon-sb',
    fontSize: 16,
    color: Colors.primary,
  },
  perMonth: {
    fontFamily: 'mon',
    fontSize: 14,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    padding: 20,
    justifyContent: 'center',
  },
  verticalImage: {
    width: '100%',
    height: 300,
    borderRadius: 10,
    marginBottom: 20,
  },
  pageTitle: {
    fontSize: 24, // Larger size for prominence
    fontFamily: 'mon-sb', // Using your custom Montserrat Semi-Bold font
    color: Colors.primary, // Align with your theme
    textAlign: 'center', // Center the title
    marginTop: 16, // Spacing above and below
    textTransform: 'uppercase', // Optional: Makes it bold and standout
  },
});

export const screenOptions = {
  headerShown: false, // This disables the header
};

export default MyProperties;