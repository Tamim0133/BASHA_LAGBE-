import React, { useState } from 'react';
import { View, StyleSheet, TextInput, Text, TouchableOpacity, Alert } from 'react-native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/firebaseConfig'; // Make sure this is the correct path to your firebase config
import { useRouter } from 'expo-router';
import Colors from '@/constants/Colors';
import { defaultStyles } from '@/constants/Styles';
import { Ionicons } from '@expo/vector-icons';

const Login = () => {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errMsg, setErrMsg] = useState<string | null>(null);
    const [passwordVisible, setPasswordVisible] = useState(false);

    const handleInputChange =
        (setter: React.Dispatch<React.SetStateAction<string>>) => (value: string) => {
            setter(value);
            if (errMsg) {
                setErrMsg(null);
            }
        };

    const handleLogin = () => {
        // CLEAR ERROR MESSAGE ON LOGIN BUTTON CLICK
        setErrMsg(null);
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                // SUCCESSFULL LOGIN
                if (user.emailVerified) {
                    Alert.alert('Login Successful', 'Welcome back!');
                    router.push('/'); // GO TO HOME PAGE
                } else {
                    // EMAIL IS NOT VARIFIED
                    Alert.alert('Email Not Verified', 'Please verify your email. A verification has been sent to your email...');
                }
            })
            .catch((error) => {
                const eMsg = error.message || 'An unknown error occurred.';
                setErrMsg(eMsg);
                console.log(eMsg);
            });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Log In</Text>

            <TextInput
                autoCapitalize="none"
                placeholder="Email"
                value={email}
                onChangeText={handleInputChange(setEmail)}
                style={[defaultStyles.inputField, { marginBottom: 20 }]}
            />

            {/* TAKE PASSWORD */}
            <View style={styles.passwordContainer}>
                <TextInput
                    secureTextEntry={!passwordVisible}
                    placeholder="Password"
                    value={password}
                    onChangeText={handleInputChange(setPassword)}
                    style={[defaultStyles.inputField, { flex: 1 }]}
                />
                {/* EYE BUTTON */}
                <TouchableOpacity onPress={() => setPasswordVisible(!passwordVisible)} style={styles.eyeIcon}>
                    <Ionicons
                        name={passwordVisible ? 'eye-off' : 'eye'}
                        size={24}
                        color={Colors.grey}
                    />
                </TouchableOpacity>
            </View>

            {errMsg && <Text style={styles.errorText}>{errMsg}</Text>}

            {/* LOG IN BUTTON */}
            <TouchableOpacity style={defaultStyles.btn} onPress={handleLogin}>
                <Text style={defaultStyles.btnText}>Log In</Text>
            </TouchableOpacity>

            {/* SIGN UP */}
            <View style={styles.signUpContainer}>
                <Text style={styles.signUpText}>Don't have an account?</Text>
                <TouchableOpacity onPress={() => router.push('/(auth)/signUp')}>
                    <Text style={styles.signUpLink}>Sign Up</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default Login;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 26,
        // justifyContent: 'center',
        paddingTop: 200
    },
    title: {
        fontFamily: 'mon-sb',
        fontSize: 24,
        marginBottom: 30,
        color: Colors.primary,
        textAlign: 'center',
    },
    errorText: {
        color: 'red',
        fontSize: 14,
        marginBottom: 20,
        textAlign: 'center',
        fontFamily: 'mon-r',
    },
    passwordContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 30,
    },
    eyeIcon: {
        position: 'absolute',
        right: 10,
        padding: 5,
    },
    signUpContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
    },
    signUpText: {
        fontFamily: 'mon-r',
        color: Colors.grey,
        fontSize: 14,
    },
    signUpLink: {
        fontFamily: 'mon-sb',
        color: Colors.primary,
        fontSize: 14,
        marginLeft: 5,
    },
});