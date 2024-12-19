import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import useAuth from '@/hooks/useAuth';
import Colors from '@/constants/Colors';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { RefreshControl } from 'react-native';

type MenuOption = {
    title: string;
    subtitle: string;
    icon: keyof typeof MaterialCommunityIcons.glyphMap; // Restrict to valid icon names
    action: () => void;
};

const Profile = () => {
    const { signOut, isSignedIn, user } = useAuth();
    const [refreshing, setRefreshing] = useState(false);

    const displayName = user?.displayName || (user?.email ? user.email.split('@')[0] : 'User');
    const router = useRouter();

    const menuOptions: MenuOption[] = [
        { title: 'Order Now', subtitle: 'Order now to find your perfect rental property', icon: 'home', action: () => { } },
        { title: 'Order History', subtitle: 'View your order history', icon: 'history', action: () => { } },
        { title: 'My Properties', subtitle: 'View and manage your added properties', icon: 'briefcase', action: () => { } },
        { title: 'Unlocked Properties', subtitle: 'View your unlocked properties', icon: 'lock-open', action: () => { } },
        { title: 'Buy Package', subtitle: 'Buy a package to unlock premium features', icon: 'shopping', action: () => { } },
        { title: 'Purchase History', subtitle: 'View your purchase history', icon: 'receipt', action: () => { } },
        { title: 'Refer and Earn', subtitle: 'Refer your friends and earn credits', icon: 'account-group', action: () => { } },
        { title: 'Edit Profile', subtitle: 'Edit your profile information', icon: 'account-edit', action: () => { } },
        { title: 'Change Password', subtitle: 'Change your login password', icon: 'lock', action: () => { } },
        { title: 'Logout', subtitle: 'Logout your account', icon: 'exit-to-app', action: () => handleLogOut() }, // Updated logout action
    ];

    // Function to show a confirmation dialog on log out
    const handleLogOut = () => {
        Alert.alert(
            "Log Out",
            "Are you sure you want to log out?",
            [
                {
                    text: "Cancel",
                    style: "cancel",
                },
                {
                    text: "Yes",
                    onPress: () => signOut(),
                    style: "destructive",
                },
            ]
        );
    };

    const handleRefresh = () => {
        setRefreshing(true);

        // Simulate a network request or data reload
        setTimeout(() => {
            setRefreshing(false);
        }, 1500); // You can replace this with your actual data reload logic
    };

    return (
        <View style={styles.container}>
            <ScrollView
                contentContainerStyle={styles.profileContent}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={handleRefresh}
                        colors={[Colors.primary]} // Customize the refresh indicator color
                    />
                }
            >
                <View style={styles.header}>
                    {isSignedIn ? (
                        <>
                            <Text style={styles.name}>{displayName}</Text>
                            <Text style={styles.email}>{user?.email || 'No email provided'}</Text>
                        </>
                    ) : (
                        <Button
                            title="Log In to View Profile"
                            color={Colors.primary}
                            onPress={() => router.push('/(modals)/login')}
                        />
                    )}
                </View>

                <View style={styles.menuSection}>
                    {menuOptions.map((option, index) => (
                        <TouchableOpacity
                            key={index}
                            style={styles.menuItem}
                            onPress={option.action}
                        >
                            <MaterialCommunityIcons
                                name={option.icon}
                                size={24}
                                color={Colors.primary}
                            />
                            <View style={styles.menuTextWrapper}>
                                <Text style={styles.menuTitle}>{option.title}</Text>
                                <Text style={styles.menuSubtitle}>{option.subtitle}</Text>
                            </View>
                        </TouchableOpacity>
                    ))}
                </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f9f9f9',
    },
    profileContent: {
        padding: 20,
    },
    header: {
        alignItems: 'center',
        marginBottom: 20,
    },
    name: {
        fontSize: 20,
        fontWeight: 'bold',
        color: Colors.dark,
    },
    email: {
        fontSize: 16,
        color: Colors.grey,
    },
    menuSection: {
        marginTop: 20,
    },
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15,
        backgroundColor: '#fff',
        borderRadius: 10,
        marginBottom: 10,
        elevation: 2,
    },
    menuTextWrapper: {
        marginLeft: 15,
    },
    menuTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: Colors.dark,
    },
    menuSubtitle: {
        fontSize: 14,
        color: Colors.grey,
    },
});

export default Profile;