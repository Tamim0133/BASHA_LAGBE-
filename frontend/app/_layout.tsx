import { useFonts } from 'expo-font';
import { Stack, useRouter } from 'expo-router';
import { useEffect, useState, useRef } from 'react';
import { Ionicons } from '@expo/vector-icons';
import Colors from '@/constants/Colors';
import { TouchableOpacity, Animated, StyleSheet, Text } from 'react-native';
import useAuth from '@/hooks/useAuth';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { RefreshProvider } from '@/hooks/RefreshContext';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    'mon': require('../assets/fonts/Montserrat-Regular.ttf'),
    'mon-sb': require('../assets/fonts/Montserrat-SemiBold.ttf'),
    'mon-b': require('../assets/fonts/Montserrat-Bold.ttf'),
  });

  const { isLoaded } = useAuth();

  // Handle errors
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    async function prepareApp() {
      try {
        // Wait for fonts and authentication to load
        await Promise.all([loaded, isLoaded]);
      } catch (err) {
        console.error('Error preparing app:', err);
      } finally {
        // Hide splash screen once everything is loaded
        await SplashScreen.hideAsync();
      }
    }

    prepareApp();
  }, [loaded, isLoaded]);

  // Continuously show splash screen animation until app is ready
  if (!loaded || !isLoaded) {
    return <SplashScreenAnimation />;
  }

  return (
    <>
      <StatusBar style="dark" backgroundColor="transparent" translucent={true} />
      <RootLayoutNav />
    </>
  );
}

// Scale animation for splash screen
function SplashScreenAnimation() {
  const scale = useRef(new Animated.Value(0.5)).current;
  const [dots, setDots] = useState(".");

  // Animation for the splash screen logo
  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(scale, {
          toValue: 0.75,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(scale, {
          toValue: 0.5,
          duration: 1000,
          useNativeDriver: true,
        })
      ])
    ).start();

    // Dot animation for the loader
    const dotAnimation = setInterval(() => {
      setDots((prev) => (prev.length < 3 ? prev + "." : ".")); // Loop through dots
    }, 300); // Add a new dot every 300ms

    return () => {
      clearInterval(dotAnimation); // Cleanup interval on unmount
    };
  }, []);

  return (
    <GestureHandlerRootView style={styles.splashContainer}>
      <Animated.Image
        source={require('../assets/images/s2.png')} // Splash logo
        style={[styles.splashImage, { transform: [{ scale }] }]}
        resizeMode="cover"
      />
      <Text style={styles.loadingText}>{`Loading${dots}`}</Text>
    </GestureHandlerRootView>
  );
}

function RootLayoutNav() {
  const { isLoaded, isSignedIn } = useAuth();
  const router = useRouter();

  // Automatically navigate to login screen if user is not authenticated
  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      router.push('/(modals)/login');
    }
  }, [isLoaded, isSignedIn]);

  return (
    <RefreshProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <Stack>
          <Stack.Screen
            name="(modals)/login"
            options={{
              presentation: 'modal',
              title: '      Log in or sign up',
              headerTitleStyle: { fontFamily: 'mon-sb' },
              headerLeft: () => (
                <TouchableOpacity onPress={() => router.back()}>
                  <Ionicons color={Colors.primary} name="close-outline" size={28} />
                </TouchableOpacity>
              ),
            }}
          />
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="listing/[id]" options={{ headerTitle: '' }} />
          <Stack.Screen name="addHouseScreens/postHouseAd" options={{ headerShown: false }} />
          <Stack.Screen name="(auth)/signUp" options={{ headerTitle: '', headerShadowVisible: false }} />
        </Stack>
      </GestureHandlerRootView>
    </RefreshProvider>
  );
}

const styles = StyleSheet.create({
  splashContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.primary,
  },
  splashImage: {
    width: 400,
    height: 800,
    backgroundColor: Colors.primary,
  },
  loadingText: {
    fontSize: 24,
    fontFamily: 'mon-sb', // Use your custom font
    marginTop: 20,
    color: 'white', // Change this to match your theme
  }
});