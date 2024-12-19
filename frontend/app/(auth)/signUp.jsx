import React, { useState, useRef, useEffect } from 'react';
import { View, StyleSheet, TextInput, Text, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
import { useRouter } from 'expo-router';
import Colors from '@/constants/Colors';
import { defaultStyles } from '@/constants/Styles';
import { signInWithPhoneNumber, RecaptchaVerifier, PhoneAuthProvider, signInWithCredential } from 'firebase/auth';
import { FontAwesome5, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import DividerWithText from '@/components/DividerWithText';
import { auth } from '@/firebaseConfig';


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

    const recaptchaContainerRef = useRef(null);



    const handleInputChange = (setter) => (value) => {
        setter(value);
        if (errMsg) {
            setErrMsg(null);
        }
    };

    useEffect(() => {
        if (recaptchaContainerRef.current) {
            // You can only render this if this is being executed in a web environment.  
            setTimeout(() => {
                const verifier = new RecaptchaVerifier(
                    recaptchaContainerRef.current,
                    {
                        size: 'invisible', // Adjust the size based on your needs  
                        callback: (response) => {
                            console.log('reCAPTCHA solved:', response);
                        },
                        'expired-callback': () => {
                            console.log('reCAPTCHA expired');
                        },
                    },
                    auth
                );

                verifier.render()
                    .then(() => {
                        setRecaptchaVerifier(verifier);
                    })
                    .catch(error => console.error('Error rendering reCAPTCHA:', error));
            }, 100); // Adding a slight timeout to ensure the ref is accessible  
        }
    }, [recaptchaContainerRef.current]);

    const handleSignup = () => {
        setErrMsg(null); // Reset error message before each attempt  

        // EMAIL SIGN UP  
        if (isEmailSignup) {
            if (password !== confirmPassword) {
                setErrMsg('Passwords do not match!');
                return;
            }

            setLoading(true);

            createUserWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    const user = userCredential.user;
                    sendEmailVerification(user)
                        .then(() => {
                            setLoading(false); // Hide loader  
                            Alert.alert('Verification Sent', 'A verification email has been sent to your email address. Verify it to log in.');
                            router.push('/login'); // Redirect to login page  
                        })
                        .catch((error) => {
                            setLoading(false); // Hide loader  
                            setErrMsg(error.message || 'An unknown error occurred.');
                        });
                })
                .catch((error) => {
                    setLoading(false); // Hide loader  
                    setErrMsg(error.message || 'An unknown error occurred.');
                });
        } else {
            const formattedPhoneNumber = phoneNumber.startsWith('+880') ? phoneNumber : `+880${phoneNumber}`;
            if (recaptchaVerifier) {
                const formattedPhoneNumber = phoneNumber.startsWith('+880') ? phoneNumber : `+880${phoneNumber}`;

                // Sign in with phone number  
                signInWithPhoneNumber(auth, formattedPhoneNumber, recaptchaVerifier)
                    .then((verificationResult) => {
                        setVerificationId(verificationResult.verificationId);
                        Alert.alert('Code Sent', 'We have sent an SMS with a verification code.');
                        setEmailSent(true);
                        setLoading(false); // Hide loader  
                    })
                    .catch((error) => {
                        setLoading(false); // Hide loader  
                        setErrMsg(error.message || 'An error occurred while sending the verification code.');
                    });
            } else {
                setErrMsg('Please complete the reCAPTCHA verification.');
            }
            // Sign in with phone number  
            signInWithPhoneNumber(auth, formattedPhoneNumber)
                .then((verificationResult) => {
                    setVerificationId(verificationResult.verificationId);
                    Alert.alert('Code Sent', 'We have sent an SMS with a verification code.');
                    setEmailSent(true);
                    setLoading(false); // Hide loader  
                })
                .catch((error) => {
                    setLoading(false); // Hide loader  
                    setErrMsg(error.message || 'An error occurred while sending the verification code.');
                });
        }
    };

    const handleCodeVerification = () => {
        if (verificationId && verificationCode) {
            const credential = PhoneAuthProvider.credential(verificationId, verificationCode);

            signInWithCredential(auth, credential)
                .then(() => {
                    Alert.alert('Login Successful', 'Welcome back!');
                    router.push('/login'); // Redirect to
                })
                .catch((error) => {
                    setErrMsg(error.message || 'Invalid verification code.');
                });
        } else {
            setErrMsg('Please enter the verification code.');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Sign Up</Text>
            {/* // If the varification mail is not sent -> */}
            {!emailSent ? (
                <>
                    {/* If currently Email Sign Up is in progress */}
                    {isEmailSignup ? (
                        <>
                            {/* The Toggle button email -> phone number */}
                            <TouchableOpacity style={[styles.toggleButton, !isEmailSignup && styles.activeButton]} onPress={() => setIsEmailSignup(false)}>
                                <Text style={styles.toggleText}>
                                    <FontAwesome5 name='phone-alt' size={20} /> {"  "} Sign Up with Phone Number
                                </Text>
                            </TouchableOpacity>

                            <DividerWithText />

                            <Text style={{ color: Colors.grey }}>Continue With Email</Text>
                            <Text />

                            {/* Email Field */}
                            <TextInput
                                autoCapitalize="none"
                                placeholder="Email"
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
                    ) : (
                        // Else Part of the condition : User choose Phone no sign in 
                        <>
                            {/* The Toggle button phone number -> email */}
                            <TouchableOpacity
                                style={[styles.toggleButton, isEmailSignup]}
                                onPress={() => setIsEmailSignup(true)}
                            >
                                <Text style={styles.toggleText}>
                                    <MaterialCommunityIcons name='email-open-multiple' size={24} /> {"  "}
                                    Sign Up with Email
                                </Text>
                            </TouchableOpacity>

                            <DividerWithText />

                            <Text style={{ color: Colors.grey }}>Continue With Phone Number</Text>
                            <Text></Text>

                            {/* Phone No picker input field */}
                            <TextInput
                                keyboardType="phone-pad"
                                placeholder="Phone Number (without +880)"
                                value={phoneNumber}
                                onChangeText={handleInputChange(setPhoneNumber)}
                                style={[defaultStyles.inputField, { marginBottom: 20 }]}
                            />
                        </>
                    )}
                </>
            ) : (
                // If a Phone Verification CODE is sent for verification then this page will be shown
                <>
                    {/* INput Field to capture the Varifica */}
                    <TextInput
                        autoCapitalize="none"
                        placeholder="Verification Code"
                        value={verificationCode}
                        onChangeText={handleInputChange(setVerificationCode)}
                        style={[defaultStyles.inputField, { marginBottom: 20 }]}
                    />

                    <TouchableOpacity style={defaultStyles.btn} onPress={handleCodeVerification}>
                        <Text style={defaultStyles.btnText}>Verify Code</Text>
                    </TouchableOpacity>
                </>
            )}

            {errMsg && <Text style={styles.errorText}>{errMsg}</Text>}
            {/* A final Button to handle  */}
            {!emailSent ? (
                <TouchableOpacity style={[defaultStyles.btn]} onPress={handleSignup}>
                    <Text style={defaultStyles.btnText}>Sign Up</Text>
                </TouchableOpacity>
            ) : (
                <Text>A verification message has been sent to your phone. Please verify your login.</Text>
            )}

            <View style={styles.loginContainer}>
                <Text style={styles.loginText}>Already have an account?</Text>
                <TouchableOpacity onPress={() => router.push('/login')}>
                    <Text style={styles.loginLink}>Log In</Text>
                </TouchableOpacity>
            </View>

            {/* Invisible reCAPTCHA container */}
            <View ref={recaptchaContainerRef}></View>
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