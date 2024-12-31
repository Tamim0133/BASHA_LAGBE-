import { useLocalSearchParams, useNavigation } from 'expo-router';
import React, { useLayoutEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, Dimensions, TouchableOpacity, Share, ScrollView, TouchableWithoutFeedback, Button } from 'react-native';
import listingsData from '@/assets/data/temp-listing.json';
import { FontAwesome, FontAwesome5, Ionicons } from '@expo/vector-icons';
import Colors from '@/constants/Colors';
import Animated, { SlideInDown, interpolate, useAnimatedRef, useAnimatedStyle, useScrollViewOffset } from 'react-native-reanimated';
import { defaultStyles } from '@/constants/Styles';
import Carousel from 'react-native-reanimated-carousel'; 




const { width } = Dimensions.get('window');
const IMG_HEIGHT = 300;

const DetailsPage = () => {
  const { id } = useLocalSearchParams();
  console.log("Selected Id : " + id);
  console.log(typeof id);
  const listingsArray = listingsData as any[];
  listingsArray.forEach((item) => {
    console.log(item._id);
  });

  const listing = (listingsData as any[]).find((item) => String(item._id) === String(id));
  console.log("Listing info : " + listing);

  const navigation = useNavigation();
  const scrollRef = useAnimatedRef<Animated.ScrollView>();

  const [activeIndex, setActiveIndex] = useState(0); // To manage the active slide index

  const shareListing = async () => {
    try {
      await Share.share({
        title: listing.name,
        url: listing.listing_url,
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
          <TouchableOpacity style={styles.roundButton}>
            <Ionicons name="heart-outline" size={22} color={'#000'} />
          </TouchableOpacity>
        </View>
      ),
      headerLeft: () => (
        <TouchableOpacity style={styles.roundButton} onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={24} color={'#000'} />
        </TouchableOpacity>
      ),
    });
  }, []);

  const scrollOffset = useScrollViewOffset(scrollRef);

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
  const screenWidth = Dimensions.get('window').width; // Get screen width in pixels

  const renderCarouselItem = ({ item: image, index }: { item: string; index: number }) => (
    <TouchableWithoutFeedback>
      <Animated.Image
        source={{ uri: image || 'default_image_url' }}
        style={styles.carouselImage}
      />
    </TouchableWithoutFeedback>
  );

  return (
    <View style={styles.container}>
      <Animated.ScrollView
        contentContainerStyle={{ paddingBottom: 100 }}
        ref={scrollRef}
        scrollEventThrottle={16}>

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
                {listing.noOfBedroom}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.outlinedButton}>

              <Text style={styles.outlinedButtonText}>
                <FontAwesome5 name='toilet' size={18} style={{ marginHorizontal: 5 }} />{"   0"}
                {listing.noOfBathroom}</Text>
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
              <Text style={styles.tableCellValue}>{listing.advance_deposit} taka</Text>
            </View>
            <View style={styles.tableRow}>
              <Text style={styles.tableCell}>Refundable Advance:</Text>
              <Text
                style={[
                  styles.tableCellValue,
                  listing.advance_refund ? styles.green : styles.red,
                ]}
              >
                {listing.advance_refund ? '✓' : '✗'}
              </Text>
            </View>
          </View>
        </View>

        {/* Location Information Table */}
        <View style={styles.tableContainer}>
          <Text style={styles.sectionTitle}>Location Information</Text>
          <View style={styles.table}>
            <View style={styles.tableRow}>
              <Text style={styles.tableCell}>Area:</Text>
              <Text style={styles.tableCellValue}>{listing.subarea}</Text>
            </View>
            <View style={styles.tableRow}>
              <Text style={styles.tableCell}>Division:</Text>
              <Text style={styles.tableCellValue}>{listing.district}</Text>
            </View>
            <View style={styles.tableRow}>
              <Text style={styles.tableCell}>District:</Text>
              <Text style={styles.tableCellValue}>{listing.division}</Text>
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
              <Text style={styles.tableCellValue}>{listing.noOfBedroom}</Text>
            </View>
            <View style={styles.tableRow}>
              <Text style={styles.tableCell}>No of Bathrooms:</Text>
              <Text style={styles.tableCellValue}>{listing.noOfBathroom}</Text>
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

      <Animated.View style={defaultStyles.footer} entering={SlideInDown.delay(200)}>
        <View
          style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <View style={styles.footerText}>
            <Ionicons name='lock-closed' size={48} />
            <Text style={styles.footerPrice}> Contact Number</Text>
          </View>

          <TouchableOpacity style={[defaultStyles.btn, { paddingRight: 20, paddingLeft: 20, marginTop: 5 }]}>
            <Text style={defaultStyles.btnText}>
              <FontAwesome name='unlock' size={20} />
              {""} Unlock
            </Text>
          </TouchableOpacity>
        </View>
        <Text style={{ color: Colors.grey, marginLeft: 110, position: 'absolute', top: 45 }}>use points</Text>

      </Animated.View>

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