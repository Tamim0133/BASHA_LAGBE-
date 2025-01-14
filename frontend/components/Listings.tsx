import { View, Text, StyleSheet, ListRenderItem, Dimensions, TouchableWithoutFeedback, Touchable } from 'react-native';
import { defaultStyles } from '@/constants/Styles';
import { Ionicons } from '@expo/vector-icons';
import { Link } from 'expo-router';
import Animated, { FadeInRight, FadeOutLeft } from 'react-native-reanimated';
import { useEffect, useRef, useState } from 'react';
import { BottomSheetFlatList, BottomSheetFlatListMethods } from '@gorhom/bottom-sheet';
import Carousel from 'react-native-reanimated-carousel'; // Import the carousel library
import { TouchableOpacity } from 'react-native';
import { useUserState } from '@/hooks/UserContext';

interface Props {
  listings: any[];
  refresh: number;
  category: string;
}

const screenWidth = Dimensions.get('window').width; // Get screen width in pixels

const Listings = ({ listings: items, refresh, category }: Props) => {
  const listRef = useRef<BottomSheetFlatListMethods>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [activeIndex, setActiveIndex] = useState<number>(0); // Track the active index

  useEffect(() => {
    if (refresh) {
      scrollListTop();
    }
  }, [refresh]);

  const scrollListTop = () => {
    listRef.current?.scrollToOffset({ offset: 0, animated: true });
  };

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 200);
  }, [category]);

  const renderRow: ListRenderItem<any> = ({ item }) => {
    console.log('Item data:', item); // Log the item data

    // Carousel render function
    const renderCarouselItem = ({ item: image, index }: { item: string; index: number }) => (
      // <TouchableWithoutFeedback>
      <Animated.Image
        source={{ uri: image || 'default_image_url' }}
        style={styles.carouselImage}
      />
      // </TouchableWithoutFeedback>
    );

    return (
      <Link href={`/listing/${item._id}`} asChild>
        <TouchableOpacity>
          <Animated.View style={styles.listing} entering={FadeInRight} exiting={FadeOutLeft}>
            {/* Carousel for Images */}
            <Carousel
              data={item.images || []} // Use images array from item
              renderItem={renderCarouselItem}
              width={screenWidth - 35} // Use screen width in pixels
              height={styles.image.height} // Match the image height
              loop={false} // Enable infinite looping
              scrollAnimationDuration={300} // Smooth transition between images
              onSnapToItem={(index) => setActiveIndex(index)} // Update the active index on snap
            />

            {/* Custom Pagination Dots inside the carousel */}
            <View style={[styles.pagination, { bottom: 10 }]}>
              {item.images.map((_: number, index: number) => (
                <View
                  key={index}
                  style={[
                    styles.dot,
                    { backgroundColor: index === activeIndex ? '#000' : 'rgba(0, 0, 0, 0.3)' },
                  ]}
                />
              ))}
            </View>

            {/* Heart Icon */}
            <Ionicons
              name="heart-outline"
              size={24}
              color="#000" // '#4feb34'
              style={{ position: 'absolute', right: 30, top: 30, borderRadius: 17,}}
              backgroundColor = ''
            />

            {/* Title */}
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text style={{ fontSize: 16, fontFamily: 'mon-sb' }}>{item.title}</Text>
            </View>

            {/* Location */}
            <Text style={{ fontFamily: 'mon' }}>
              {item.district + (Array.isArray(item.subarea) ? item.subarea.join(', ') : item.district)}
            </Text>

            {/* Rent Per Month */}
            <View style={{ flexDirection: 'row', gap: 4 }}>
              <Text style={{ fontFamily: 'mon-sb' }}>€ {item.rent}</Text>
              <Text style={{ fontFamily: 'mon' }}>month</Text>
            </View>
          </Animated.View>
        </TouchableOpacity>
      </Link>
    );
  };

  return (
    <View style={defaultStyles.container}>
      <BottomSheetFlatList
        renderItem={renderRow}
        data={loading ? [] : items}
        ref={listRef}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  listing: {
    padding: 16,
    gap: 10,
    marginVertical: 16,
  },
  image: {
    width: '100%',
    height: 300,
    borderRadius: 10,
  },
  carouselImage: {
    width: '100%',
    height: 300,
    borderRadius: 10,
  },
  pagination: {
    position: 'absolute',
    top: 300,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
  info: {
    textAlign: 'center',
    fontFamily: 'mon-sb',
    fontSize: 16,
    marginTop: 4,
  },
});

export default Listings;