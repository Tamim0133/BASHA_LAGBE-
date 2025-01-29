import { Stack } from 'expo-router';
import React from 'react';

const _layout = () => {
  return (
    <Stack>
      {/* Hide header for myProperties screen */}
      <Stack.Screen
        name="myProperties"
        options={{
          title: 'My Properties',
          // headerTitleStyle: { fontFamily: 'mon-sb' },
          // headerShown: false, // Hide the header for this screen
        }}
      />
      <Stack.Screen
        name="unlockedProperties"
        options={{
          title: 'Unlocked Properties',
          // headerTitleStyle: { fontFamily: 'mon-sb' },
          // headerShown: false, // Hide the header for this screen
        }}
      />
      <Stack.Screen
        name="ReferAndEarn"
        options={{
          title: '',
          // headerTitleStyle: { fontFamily: 'mon-sb' },
          // headerShown: false, // Hide the header for this screen
        }}
      />

      {/* You can enable these screens and style the header for them */}
      {/* <Stack.Screen
        name="orderHistory"  
        options={{
          title: 'Order History',
          headerTitleStyle: { fontFamily: 'mon-sb' },
        }}
      /> */}

      {/* <Stack.Screen
        name="editProfile"  
        options={{
          title: 'Edit Profile',
          headerTitleStyle: { fontFamily: 'mon-sb' },
        }}
      /> */}
    </Stack>
  );
};

export default _layout;