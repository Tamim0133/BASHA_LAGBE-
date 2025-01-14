import React, { useState, useRef, useEffect } from 'react';
import { View, StyleSheet, TextInput, Text, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
import { useRouter } from 'expo-router';
import Colors from '@/constants/Colors';
import { defaultStyles } from '@/constants/Styles';
import { signInWithPhoneNumber, RecaptchaVerifier, PhoneAuthProvider, signInWithCredential } from 'firebase/auth';
import { FontAwesome5, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import DividerWithText from '@/components/Divider';
import { auth } from '@/firebaseConfig';
import PhoneInput from "react-native-phone-number-input";
import axios from 'axios';


const SignUp = () => {
    const router = useRouter();

    // State variables (no TypeScript types)
    const [email, setEmail] = useState(''); // Input Email State Handle
    const [password, setPassword] = useState(''); // Input Password State Handle
    const [confirmPassword, setConfirmPassword] = useState(''); // Input Confirm Password State Handle

    const [errMsg, setErrMsg] = useState(null); // Error message

    const [emailSent, setEmailSent] = useState(false); // Verification Email Sent or Not

    const [phoneNumber, setPhoneNumber] = useState(''); // Phone Auth States
    const [verificationCode, setVerificationCode] = useState('');
    const [verificationId, setVerificationId] = useState(null);

    const [isEmailSignup, setIsEmailSignup] = useState(true); // Toggle state, email or phone-based sign-up
    const [loading, setLoading] = useState(false); // Loader state
    const [passwordVisible, setPasswordVisible] = useState(false); // State for the eye inside the password field

    const [value, setValue] = useState("");
    const [formattedValue, setFormattedValue] = useState("");
    const recaptchaContainerRef = useRef(null);

    const handleInputChange = (setter) => (value) => {
        setter(value);
        if (errMsg) {
            setErrMsg(null);
        }
    };

    const handleSignup = async () => {
        const baseURL = process.env.EXPO_PUBLIC_BASE_URL
        try {
            const response = await axios.post(`${baseURL}/api/user/register-user`, {
                username: email,
                contactNo: formattedValue,
                password: password
            });
            if (!response.data.success) {
                Alert.alert('Error', response.data.message);
                return;
            }

            Alert.alert('Success', response.data.message);
            router.push('/login');
        } catch (error) {
            console.log(error);
            const errorMessage =
                error.response?.data?.message || 'An unexpected error occurred. Please try again.';
            Alert.alert('Error', errorMessage);
        }
    };


    return (
        <View style={styles.container}>
            <Text style={styles.title}>Sign Up</Text>
            <>

                <>
                    {/* The Toggle button email -> phone number */}
                    <TouchableOpacity style={[styles.toggleButton]} onPress={() => setIsEmailSignup(false)}>
                        <Text style={styles.toggleText}>
                            <FontAwesome5 name='phone-alt' size={20} /> {"  "} Sign Up with Phone Number
                        </Text>
                    </TouchableOpacity>

                    <DividerWithText />

                    <Text style={{ color: Colors.grey }}>Continue With Phone Number </Text>
                    <Text />

                    {/*Phone Number Field*/}
                    <PhoneInput
                        defaultCode='AF'
                        layout="first"
                        containerStyle={[

                            { width: '98%' }, // Adjust the width here
                        ]}
                        onChangeText={(text) => {
                            setValue(text);
                        }}
                        onChangeFormattedText={(text) => {
                            setFormattedValue(text);
                        }}
                        withDarkTheme
                        withShadow
                        autoFocus
                    />
                    <Text /> <Text />
                    {/* Email Field */}
                    <TextInput
                        autoCapitalize="none"
                        placeholder="Username"
                        value={email}
                        onChangeText={handleInputChange(setEmail)}
                        style={[defaultStyles.inputField, { marginBottom: 20 }]}
                    />

                    {/* Password Field */}
                    <View style={styles.passwordContainer}>
                        <TextInput
                            secureTextEntry={!passwordVisible}
                            placeholder="Password"
                            value={password}
                            onChangeText={handleInputChange(setPassword)}
                            style={[defaultStyles.inputField, { flex: 1 }]}
                        />
                        {/* Eye icon */}
                        <TouchableOpacity onPress={() => setPasswordVisible(!passwordVisible)} style={styles.eyeIcon}>
                            <Ionicons
                                name={passwordVisible ? 'eye-off' : 'eye'}
                                size={24}
                                color={Colors.grey}
                            />
                        </TouchableOpacity>
                    </View>

                    {/* Confirm Password field */}
                    <TextInput
                        secureTextEntry
                        autoCapitalize="none"
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        onChangeText={handleInputChange(setConfirmPassword)}
                        style={[defaultStyles.inputField, { marginBottom: 20 }]}
                    />
                    {loading && <ActivityIndicator size="large" color={Colors.primary} />} {/* Loader */}

                </>

            </>

            {errMsg && <Text style={styles.errorText}>{errMsg}</Text>}

            <TouchableOpacity style={[defaultStyles.btn]} onPress={handleSignup}>
                <Text style={defaultStyles.btnText}>Sign Up</Text>
            </TouchableOpacity>

            <View style={styles.loginContainer}>
                <Text style={styles.loginText}>Already have an account?</Text>
                <TouchableOpacity onPress={() => router.push('/login')}>
                    <Text style={styles.loginLink}>Log In</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 26,
        paddingTop: 50
    },
    title: {
        fontFamily: 'mon-sb',
        fontSize: 24,
        marginBottom: 30,
        color: Colors.primary,
        textAlign: 'center',
    },
    toggleContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 20,
    },
    toggleButton: {
        padding: 10,
        borderRadius: 10,
        marginHorizontal: 40,
        marginBottom: 10,
        alignItems: 'center',

        // Gray border
        borderWidth: 1, // Border thickness
        borderColor: '#ccc', // Light gray border color

        // Shadow for iOS
        shadowColor: '#000', // Black shadow color
        shadowOffset: { width: 0, height: 2 }, // Horizontal and vertical shadow
        shadowOpacity: 0.2, // Opacity of shadow
        shadowRadius: 3, // Blur radius of shadow

        // Shadow for Android
        elevation: 5, // Adds shadow on Android
        backgroundColor: '#ffffff', // Required for elevation to work
    },
    activeButton: {
        backgroundColor: Colors.primary,
    },
    toggleText: {
        fontFamily: 'mon-r',
        color: Colors.dark,
        fontSize: 16,
    },
    errorText: {
        color: 'red',
        fontSize: 14,
        marginBottom: 20,
        textAlign: 'center',
        fontFamily: 'mon-r',
    },
    loginContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
    },
    loginText: {
        fontFamily: 'mon-r',
        color: Colors.grey,
        fontSize: 14,
    },
    loginLink: {
        fontFamily: 'mon-sb',
        color: Colors.primary,
        fontSize: 14,
        marginLeft: 5,
    },
    passwordContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    eyeIcon: {
        position: 'absolute',
        right: 10,
        padding: 5,
    },
});

export default SignUp;