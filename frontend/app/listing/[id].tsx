import { useLocalSearchParams, useNavigation, useRouter } from 'expo-router';
import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, Image, Dimensions, TouchableOpacity, Share, ScrollView, TouchableWithoutFeedback, Button, Alert } from 'react-native';
import { FontAwesome, FontAwesome5, Ionicons } from '@expo/vector-icons';
import Colors from '@/constants/Colors';
import Animated, { SlideInDown, interpolate, useAnimatedRef, useAnimatedScrollHandler, useAnimatedStyle, useScrollViewOffset, useSharedValue } from 'react-native-reanimated';
import { defaultStyles } from '@/constants/Styles';
import Carousel from 'react-native-reanimated-carousel';
import axios from 'axios';
import { useUserState } from '@/hooks/UserContext';
import {
  configureReanimatedLogger,
  ReanimatedLogLevel,
} from 'react-native-reanimated';

import PhoneInput from "react-native-phone-number-input";
import * as SecureStore from 'expo-secure-store';
import AsyncStorage from '@react-native-async-storage/async-storage';
// This is the default configuration
configureReanimatedLogger({
  level: ReanimatedLogLevel.warn,
  strict: true, // Reanimated runs in strict mode by default
});



const { width } = Dimensions.get('window');

const IMG_HEIGHT = 300;

const baseURL = process.env.EXPO_PUBLIC_BASE_URL;

// const navigation = useNavigation();

const DetailsPage = () => {
  // const { id } = useLocalSearchParams();
  // console.log("Component rendering");  // Add this at the top
  const { item: serializedItem } = useLocalSearchParams();
  const item = JSON.parse(serializedItem as string);
  // console.log(item);
  const [owner, setOwner] = useState<any>(null)
  const baseURL = process.env.EXPO_PUBLIC_BASE_URL
  const [listing, setListing] = useState<any>(item)
  const [location, setLocation] = useState<any>(null)
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const scrollRef = useAnimatedRef();  // Remove the type annotation
  const scrollOffset = useSharedValue(0);
  const [activeIndex, setActiveIndex] = useState(0)
  const { currentUser, setCurrentUser, isLoggedIn, setIsLoggedIn } = useUserState()
  const [isLoved, setIsLoved] = useState<boolean>(false)

  // Rest of your state declarations...

  // Modify your Animated.ScrollView to include onScroll handler
  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollOffset.value = event.contentOffset.y;
    },
  });

  const verifyLoggedIn = async () => {
    async function getToken() {
      try {
        const accessToken = await SecureStore.getItemAsync("accessToken");
        const refreshToken = await SecureStore.getItemAsync("refreshToken");
        return { accessToken, refreshToken };
      } catch (error) {
        console.error("Error fetching tokens:", error);
        throw error;
      }
    }

    try {
      const { accessToken, refreshToken } = await getToken();
      const response = await axios.get(`${baseURL}/api/user/verify-user`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "x-refresh-token": refreshToken,
        },
      });

      const user = response.data.data.user;
      console.log(user);
      setCurrentUser(user);


    } catch (error: any) {
      console.log(error);
      const errorMessage =
        error.response?.data?.message ||
        "An unexpected error occurred. Please try again.";
      Alert.alert("Error", errorMessage);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const response2 = await axios.get(
          `${baseURL}/api/location/get-one/${item.areaId}`
        );
        if (!response2.data.success) {
          Alert.alert("Error!", response2.data.message);
        } else setLocation(response2.data.data);

        const response = await axios.get(
          `${baseURL}/api/user/get-owner/${item.owner}`
        );
        if (response.data.success) {
          setOwner(response.data.user);
        } else {
          Alert.alert("Error", response.data.message || "Failed to fetch owner.");
        }
      } catch (error) {
        Alert.alert("Error", "Unable to fetch detailed ad or owner.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    console.log("cureent user : ", currentUser);
    // Load wishlist from AsyncStorage based on user ID
    const loadWishlist = async () => {
      try {
        if (!currentUser?._id) return;
        const storedWishlist = await AsyncStorage.getItem(
          `wishlist_${currentUser._id}`
        );
        if (storedWishlist) {
          const wishlist = JSON.parse(storedWishlist);
          console.log("Asol Wishlist : ", wishlist);
          console.log("item id : " + item._id);
          if (wishlist.includes(item._id)) {
            setIsLoved(true);
          }
        }
      } catch (error) {
        console.error("Failed to load wishlist:", error);
      }
    };

    loadWishlist();
  }, [currentUser]);

  const handleLoved = async () => {
    if (!isLoggedIn) {
      Alert.alert("Sorry!", "You must login first.");
      return;
    }

    // Optimistically update the UI
    setIsLoved((prev) => !prev);

    try {
      // Update wishlist in AsyncStorage using userId
      const storedWishlist = await AsyncStorage.getItem(
        `wishlist_${currentUser._id}`
      );
      let wishlist = storedWishlist ? JSON.parse(storedWishlist) : [];
      console.log("wishlist button chapar por: " + wishlist);

      if (isLoved) {
        wishlist = wishlist.filter((id: any) => id !== listing._id);
      } else {
        wishlist.push(listing._id);
      }

      await AsyncStorage.setItem(
        `wishlist_${currentUser._id}`,
        JSON.stringify(wishlist)
      );

    } catch (error: any) {
      setIsLoved((prev) => !prev);
      console.error("Error in handleLoved:", error);
    }

    verifyLoggedIn();
  };

  // To manage the active slide index

  const shareListing = async () => {
    try {
      await Share.share({
        title: listing.name,
        url: listing.images[0], //?
      });
    } catch (err) {
      console.log(err);
    }
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: '',
      headerTransparent: true,
      headerBackground: () => (
        <Animated.View style={[headerAnimatedStyle, styles.header]}></Animated.View>
      ),
      headerRight: () => (
        <View style={styles.bar}>
          <TouchableOpacity style={styles.roundButton} onPress={shareListing}>
            <Ionicons name="share-outline" size={22} color={'#000'} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.roundButton} onPress={handleLoved}>
            <Ionicons name="heart-outline" size={22} color={!isLoved ? '#000' : '#4feb34'} />
          </TouchableOpacity>
        </View>
      ),
      headerLeft: () => (
        <TouchableOpacity style={styles.roundButton} onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={24} color={'#000'} />
        </TouchableOpacity>
      ),
    });
  }, [isLoved]);

  const imageAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: interpolate(
            scrollOffset.value,
            [-IMG_HEIGHT, 0, IMG_HEIGHT, IMG_HEIGHT],
            [-IMG_HEIGHT / 2, 0, IMG_HEIGHT * 0.75]
          ),
        },
        {
          scale: interpolate(scrollOffset.value, [-IMG_HEIGHT, 0, IMG_HEIGHT], [2, 1, 1]),
        },
      ],
    };
  });

  const headerAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(scrollOffset.value, [0, IMG_HEIGHT / 1.5], [0, 1]),
    };
  }, []);

  // Custom pagination dots
  const renderPagination = () => {
    return (
      <View style={styles.pagination}>
        {listing.images.map((_: any, index: any) => (
          <View
            key={index}
            style={[
              styles.paginationDot,
              index === activeIndex && styles.activePaginationDot,
            ]}
          />
        ))}
      </View>
    );
  };
  const screenWidth = Dimensions.get('window').width;

  const router = useRouter();
  const { id } = useLocalSearchParams();
  console.log("ID ----- > ", id);

  /*------------------------------------- 
        Naiiiiiiimulllllll 
--------------------------------------- */
  const [isOkToLoadContact, setIsOkToLoadContact] = useState(false);
  const [justUnlocked, setJustUnlocked] = useState(false);

  const handleCreditEchange = async () => {
    try {
      const response = await axios.post(`${baseURL}/api/user/unlock-owner`, {
        userId: currentUser._id,
        ownerId: owner._id
      });

      if (!response.data.success) {
        Alert.alert('Error', response.data.message || 'Failed to unlock owner.');
      }
      else {
        Alert.alert("Success!", "Unlocked Owner...", [
          { text: "OK", onPress: () => { setJustUnlocked(true); setIsOkToLoadContact(true); verifyLoggedIn(); } },
        ]);
      }
    } catch (error: any) {
      console.error('Error unlocking owner:', error);
      if (error.response) {
        Alert.alert('Error', error.response.data.message || 'An error occurred.');
      } else {
        Alert.alert('Error', 'Network error. Please check your connection...');
      }
    }
    finally {
      setLoading(false);
    }
  }
  /*------------------------------------- 
    Unlock Button e click korle jeita hobe
  --------------------------------------- */

  useEffect(() => {
    if (currentUser?.unlockedPersons?.includes(item.owner)) {
      setIsOkToLoadContact(true);
    }
  }, [currentUser, item.owner]);

  const handleUnlock = async () => {
    if (currentUser.unlockedPersons.indexOf(item.owner) == -1) { // unlocked na
      Alert.alert(
        "Unlock This Owners Property",
        "Unlocking this property will cost you 10 credits !?",
        [
          {
            text: "Cancel",
            style: "cancel",
          },
          {
            text: "Yes",
            onPress: () => {
              if (!currentUser) {
                Alert.alert(
                  "Please, Login!",
                  "You must login first to see owner contact info."
                )
                setIsOkToLoadContact(false);
                return;
              }
              // if (currentUser.credits < 10) {
              //   Alert.alert(
              //     "Insufficient Credits",
              //     "You can increase your credits in the profile section!"
              //   )
              //   isOkToLoadContact = false;
              //   return;
              // }
              handleCreditEchange();
            },
            style: "destructive",
          },
        ]
      );
    }
    if (isOkToLoadContact) {
      console.log(currentUser.unlockedPersons)
    }
  }



  const renderCarouselItem = ({ item: image, index }: { item: string; index: number }) => (
    <TouchableWithoutFeedback>
      <Animated.Image
        source={{ uri: image || 'default_image_url' }}
        style={styles.carouselImage}
      />
    </TouchableWithoutFeedback>
  );
  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Loading...</Text>
      </View>
    );
  }

  if (!listing || !location) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Data not available</Text>
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <Animated.ScrollView
        ref={scrollRef as any}
        onScroll={scrollHandler}
        scrollEventThrottle={16}
        contentContainerStyle={{ paddingBottom: 100 }}>

        {/* Carousel of images */}
        <Carousel
          data={listing.images || []} // Use images array from item
          renderItem={renderCarouselItem}
          width={screenWidth} // Use screen width in pixels
          height={styles.image.height} // Match the image height
          loop={false} // Enable infinite looping
          scrollAnimationDuration={300} // Smooth transition between images
          onSnapToItem={(index) => setActiveIndex(index)} // Update the active index on snap
        />

        {renderPagination()}
        {/* General Information Table */}
        <View style={styles.infoContainer}>
          <Text style={styles.name}>{listing.title}</Text>
          <View style={{ display: 'flex', flexDirection: 'row', gap: 20 }}>
            <TouchableOpacity style={styles.outlinedButton}>
              <Text style={styles.outlinedButtonText}>
                <FontAwesome name='bed' size={18} style={{ marginHorizontal: 5 }} />{"   0"}
                {listing.bedrooms}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.outlinedButton}>

              <Text style={styles.outlinedButtonText}>
                <FontAwesome5 name='toilet' size={18} style={{ marginHorizontal: 5 }} />{"   0"}
                {listing.bathrooms}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.outlinedButton}>
              <Text style={styles.outlinedButtonText}>
                <FontAwesome name='calendar' size={18} style={{ marginHorizontal: 5 }} />{"   "}
                {listing.availableFrom}</Text>
            </TouchableOpacity>
          </View>
        </View>


        {/* Price Information Table */}
        <View style={styles.tableContainer}>
          <Text style={styles.sectionTitle}>Price Information</Text>
          <View style={styles.table}>
            <View style={styles.tableRow}>
              <Text style={styles.tableCell}>Price:</Text>
              <Text style={styles.tableCellValue}>{listing.rent} taka</Text>
            </View>
            <View style={styles.tableRow}>
              <Text style={styles.tableCell}>Advance Deposit:</Text>
              <Text style={styles.tableCellValue}>{listing.advanceDeposit} taka</Text>
            </View>
            <View style={styles.tableRow}>
              <Text style={styles.tableCell}>Refundable Advance:</Text>
              <Text
                style={[
                  styles.tableCellValue,
                  listing.willRefundAdvance ? styles.green : styles.red,
                ]}
              >
                {listing.willRefundAdvance ? '✓' : '✗'}
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.tableContainer}>
          <Text style={styles.sectionTitle}>Location Information</Text>
          <View style={styles.table}>
            <View style={styles.tableRow}>
              <Text style={styles.tableCell}>Division:</Text>
              <Text style={styles.tableCellValue}>{location.division}</Text>
            </View>
            <View style={styles.tableRow}>
              <Text style={styles.tableCell}>District:</Text>
              <Text style={styles.tableCellValue}>{location.district}</Text>
            </View>
            <View style={styles.tableRow}>
              <Text style={styles.tableCell}>Area:</Text>
              <Text style={styles.tableCellValue}>{location.area}</Text>
            </View>
            <View style={styles.tableRow}>
              <Text style={styles.tableCell}>Subarea :</Text>
              <Text style={styles.tableCellValue}>{listing.subarea}</Text>
            </View>
          </View>
        </View>

        {/* Basic Information Table */}
        <View style={styles.tableContainer}>
          <Text style={styles.sectionTitle}>Basic Information</Text>
          <View style={styles.table}>
            <View style={styles.tableRow}>
              <Text style={styles.tableCell}>Available From:</Text>
              <Text style={styles.tableCellValue}>{listing.availableFrom}</Text>
            </View>
            <View style={styles.tableRow}>
              <Text style={styles.tableCell}>Category:</Text>
              <Text style={styles.tableCellValue}>{listing.category}</Text>
            </View>
            <View style={styles.tableRow}>
              <Text style={styles.tableCell}>No of Bedrooms:</Text>
              <Text style={styles.tableCellValue}>{listing.bedrooms}</Text>
            </View>
            <View style={styles.tableRow}>
              <Text style={styles.tableCell}>No of Bathrooms:</Text>
              <Text style={styles.tableCellValue}>{listing.bathrooms}</Text>
            </View>
            <View style={styles.tableRow}>
              <Text style={styles.tableCell}>Floor no :</Text>
              <Text style={styles.tableCellValue}>{listing.floor}</Text>
            </View>
          </View>
        </View>

        {/* Facilities Information Table */}
        <View style={styles.tableContainer}>
          <Text style={styles.sectionTitle}>Facilities</Text>
          <View style={styles.table}>
            {listing.facilities.map((facility: any, index: any) => (
              <View key={index} style={styles.tableRow}>
                <Text style={styles.green}>  ✅  </Text>
                <Text style={styles.tableCellValue}>{facility}</Text>
              </View>
            ))}
          </View>
        </View>
        {/* Facilities Information Table */}
        <View style={styles.tableContainer}>
          <Text style={styles.sectionTitle}>Additional Description : </Text>
          <Text style={styles.location}>{listing.description}</Text>
        </View>
      </Animated.ScrollView >


      {/* -------------------------------------
                Unlock Section Footer 
                Todo : Naimul -> 
      --------------------------------------- */ }

      {
        !isOkToLoadContact &&
        <Animated.View style={defaultStyles.footer} entering={SlideInDown.delay(200)}>
          <View
            style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <View style={styles.footerText}>
              <Ionicons name='lock-closed' size={48} />
              <Text style={styles.footerPrice}> Contact Number</Text>
            </View>

            <TouchableOpacity style={[defaultStyles.btn, { paddingRight: 20, paddingLeft: 20, marginTop: 5 }]} onPress={() => handleUnlock()}>
              <Text style={defaultStyles.btnText}>
                <FontAwesome name='unlock' size={20} />
                {""} Unlock
              </Text>
            </TouchableOpacity>
          </View>
          <Text style={{ color: Colors.grey, marginLeft: 110, position: 'absolute', top: 45 }}>use points</Text>

        </Animated.View>
      }
      {
        (isOkToLoadContact || justUnlocked) &&
        <Animated.View style={defaultStyles.footer} entering={SlideInDown.delay(200)}>

          <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            <Text style={styles.footerPrice}> Owner : {owner.username}</Text>
            <Text style={styles.footerPrice}> Contact : {owner.contactNo}</Text>
          </View>




        </Animated.View>
      }

    </View >
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    // marginTop: 5,
    // margin: 10
  },
  outlinedButton: {
    borderWidth: 2, // Thickness of the outline
    borderColor: Colors.primary, // Outline color
    backgroundColor: '#F2F0F1', // Make the background transparent
    paddingVertical: 6, // Vertical padding for the button
    paddingHorizontal: 10, // Horizontal padding for the button
    borderRadius: 10, // Rounded corners
    alignItems: 'center', // Align text in the center horizontally
    justifyContent: 'center', // Align text in the center vertically
  },
  outlinedButtonText: {
    fontSize: 16, // Font size for the button text
    color: Colors.primary, // Text color (same as the outline)
    fontWeight: '900', // Bold text
  },
  image: {
    height: IMG_HEIGHT,
    width: width - 10,
  },
  infoContainer: {
    padding: 24,
    backgroundColor: '#fff',
  },
  name: {
    fontSize: 26,
    fontWeight: 'bold',
    fontFamily: 'mon-sb',
    marginVertical: 10
  },
  location: {
    fontSize: 18,
    marginTop: 10,
    fontFamily: 'mon-sb',
  },
  rooms: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.primary,
    marginVertical: 4,
    fontFamily: 'mon',
  },
  description: {
    fontSize: 16,
    marginTop: 10,
    fontFamily: 'mon',
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: Colors.grey,
    marginVertical: 16,
  },
  footerText: {
    height: '100%',
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  roundButton: {
    width: 40,
    height: 40,
    borderRadius: 50,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    color: Colors.primary,
  },
  bar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  header: {
    backgroundColor: '#fff',
    height: 100,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: Colors.grey,
  },
  pagination: {
    position: 'absolute',
    top: 260,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  paginationDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: Colors.grey,
    margin: 5,
  },
  activePaginationDot: {
    backgroundColor: Colors.primary,
  },
  carouselImage: {
    width: '100%',
    height: 300,
    // borderRadius: 10,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.primary,
    marginBottom: 10,
  },
  detail: {
    fontSize: 16,
    marginBottom: 5,
  },
  highlight: {
    color: Colors.primary,
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: Colors.primary,
    paddingVertical: 15,
    paddingHorizontal: 50,
    borderRadius: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },

  tableContainer: {
    marginBottom: 20,
    marginHorizontal: 10,
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    padding: 15,
  },
  table: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    overflow: 'hidden',
  },
  tableRow: {
    flexDirection: 'row',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  tableCell: {
    flex: 1,
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.primary,
    paddingLeft: 10,
  },
  tableCellValue: {
    flex: 2,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    paddingRight: 10,
  },
  footer: {
    padding: 20,
    backgroundColor: '#fff',
    borderTopWidth: StyleSheet.hairlineWidth,
    borderColor: '#ccc',
    alignItems: 'center',
  },
  footerPrice: {
    fontSize: 18,
    fontFamily: 'mon-sb',
  },
  green: {
    color: 'green',
    fontSize: 24,
    fontWeight: '900'
  },
  red: {
    color: 'red',
    fontSize: 24,
    fontWeight: '900'
  },
});

export default DetailsPage;
