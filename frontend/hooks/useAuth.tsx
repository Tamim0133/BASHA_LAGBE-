import { useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged, signOut as firebaseSignOut, User } from 'firebase/auth'; // Import User type from Firebase
import { initializeApp } from 'firebase/app';

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDjtmTKvwGiD6UJzRoKB6p-AvXSL729O7k",
    authDomain: "bashalagbeauth.firebaseapp.com",
    projectId: "bashalagbeauth",
    storageBucket: "bashalagbeauth.firebasestorage.app",
    messagingSenderId: "958503574004",
    appId: "1:958503574004:web:8e04e2ba441dfc6ea981a1"
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);

type AuthContext = {
    user: User | null; // User is either a firebase.User object or null
    isLoaded: boolean;
    isSignedIn: boolean;
    signOut: () => Promise<void>;
};

const useAuth = (): AuthContext => {
    const [user, setUser] = useState<User | null>(null); // Define user as either a User or null
    const [isLoaded, setIsLoaded] = useState<boolean>(false);
    const auth = getAuth(app); // Get auth instance

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
                setUser(currentUser); // Set the user when authenticated
            }
            setIsLoaded(true); // Set loading state to false once auth state is known
        });

        return () => unsubscribe(); // Cleanup on unmount
    }, [auth]);

    // Sign out the user
    const signOut = async () => {
        try {
            await firebaseSignOut(auth); // Use the correct signOut function from Firebase
            setUser(null); // Optionally reset the user state
        } catch (error) {
            console.error('Error signing out:', error);
        }
    };

    return {
        user, // Return user so it can be accessed in Profile
        isLoaded,
        isSignedIn: !!user, // `!!` to convert `user` into a boolean (true or false)
        signOut,
    };
};

export default useAuth;