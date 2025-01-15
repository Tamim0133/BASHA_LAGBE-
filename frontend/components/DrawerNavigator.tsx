import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { DrawerContentScrollView, DrawerItemList, DrawerItem, DrawerContentComponentProps } from '@react-navigation/drawer';
import useAuth from '@/hooks/useAuth';
import { useUserState } from "@/hooks/UserContext";
import Colors from '@/constants/Colors';
import { useRouter } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const CustomDrawerContent: React.FC<DrawerContentComponentProps> = (props) => {
    const {currentUser, isLoggedIn} = useUserState()
    const { signOut, isSignedIn, user } = useAuth();
    const displayName = user?.displayName || (user?.email ? user.email.split('@')[0] : 'User');
    const router = useRouter();

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

    return (
        <DrawerContentScrollView {...props}>
            <View style={styles.userInfoContainer}>
                {isLoggedIn ? (
                    <>
                        <Text style={styles.title}>Welcome</Text>
                        <Text style={styles.titleName} >{currentUser.username}</Text>
                    </>
                ) : (
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => router.push('/(modals)/login')}
                        >
                            <Text style={styles.buttonText}>Log In</Text>
                        </TouchableOpacity>
                    </View>
                )}
            </View>

            <DrawerItemList {...props} />

            {isSignedIn && (
                <DrawerItem
                    label="  Log Out"
                    onPress={handleLogOut}
                    labelStyle={{ color: Colors.primary }}
                    icon={() => (
                        <MaterialCommunityIcons
                            name="exit-to-app"
                            size={24}
                            color={Colors.primary}
                        />
                    )}
                />
            )}
        </DrawerContentScrollView>
    );
};

const styles = StyleSheet.create({
    userInfoContainer: {
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: Colors.grey,
        marginBottom: 40
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    titleName: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 5,
        color: Colors.primary
    },
    loginPrompt: {
        fontSize: 16,
        color: Colors.primary,
        textDecorationLine: 'underline',
    },
    buttonContainer: {
        borderRadius: 20,
        overflow: 'hidden',
    },
    button: {
        backgroundColor: Colors.primary,
        borderRadius: 20,
        paddingVertical: 10,
        paddingHorizontal: 20,
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default CustomDrawerContent;