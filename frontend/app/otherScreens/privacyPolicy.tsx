import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const PrivacyPolicyScreen = () => {
    return (
        <ScrollView style={styles.container}>
            <Text style={styles.date}>Last updated: December 1, 2024</Text>
            <Text style={styles.header}>Privacy Policy</Text>
            <Text style={styles.description}>
                This Privacy Policy describes our policies and procedures on the collection, use, and disclosure of your information when you use the Service and tells you about your privacy rights and how the law protects you.
            </Text>
            <Text style={styles.description}>
                We use your personal data to provide and improve the Service. By using the Service, you agree to the collection and use of information in accordance with this Privacy Policy.
            </Text>

            <Text style={styles.subheader}>Interpretation and Definitions</Text>
            <Text style={styles.subheader}>Interpretation</Text>
            <Text style={styles.description}>
                The words of which the initial letter is capitalized have meanings defined under the following conditions. The following definitions shall have the same meaning regardless of whether they appear in singular or in plural.
            </Text>

            <Text style={styles.subheader}>Definitions</Text>
            <Text style={styles.description}>
                For the purposes of this Privacy Policy:
            </Text>
            <Text style={styles.bulletPoint}>
                • <Text style={styles.bold}>Account</Text> means a unique account created for you to access our Service or parts of our Service.
            </Text>
            <Text style={styles.bulletPoint}>
                • <Text style={styles.bold}>Company</Text> (referred to as either "the Company", "We", "Us" or "Our" in this Agreement) refers to Basha Lagbe?, H.N: 752/2, Mukterpara, Netrakona Sadar, Bangladesh.
            </Text>
            <Text style={styles.bulletPoint}>
                • <Text style={styles.bold}>Cookies</Text> are small files that are placed on your computer, mobile device, or any other device by a website, containing the details of your browsing history on that website among its many uses.
            </Text>
            <Text style={styles.bulletPoint}>
                • <Text style={styles.bold}>Country</Text> refers to: Bangladesh.
            </Text>
            <Text style={styles.bulletPoint}>
                • <Text style={styles.bold}>Device</Text> means any device that can access the Service such as a computer, a cellphone, or a digital tablet.
            </Text>

            {/* Add Additional Sections */}
            <Text style={styles.subheader}>Collection of Data</Text>
            <Text style={styles.description}>
                We collect several different types of information for various purposes to provide and improve our Service to you.
            </Text>
            <Text style={styles.bulletPoint}>
                • Personal Data: While using our Service, we may ask you to provide us with certain personally identifiable information that can be used to contact you, such as your name, email address, phone number, and address.
            </Text>
            <Text style={styles.bulletPoint}>
                • Usage Data: We may also collect information on how the Service is accessed and used. This Usage Data may include information such as the computer's Internet Protocol address (e.g., IP address), browser type, browser version, the pages of our Service that you visit, the time and date of your visit, the time spent on those pages, and other diagnostic data.
            </Text>

            <Text style={styles.subheader}>Use of Data</Text>
            <Text style={styles.description}>
                Basha Lagbe? uses the collected data for various purposes:
            </Text>
            <Text style={styles.bulletPoint}>
                • To provide and maintain our Service
            </Text>
            <Text style={styles.bulletPoint}>
                • To notify you about changes to our Service
            </Text>
            <Text style={styles.bulletPoint}>
                • To allow you to participate in interactive features of our Service when you choose to do so
            </Text>
            <Text style={styles.bulletPoint}>
                • To provide customer support
            </Text>
            <Text style={styles.bulletPoint}>
                • To gather analysis or valuable information so that we can improve our Service
            </Text>
            <Text style={styles.bulletPoint}>
                • To monitor the usage of our Service
            </Text>
            <Text style={styles.bulletPoint}>
                • To detect, prevent and address technical issues
            </Text>
            <Text style={styles.bulletPoint}>
                • To fulfill any other purpose for which you provide it
            </Text>

            <Text style={styles.footer}>
                For any questions regarding this Privacy Policy, please contact us.
            </Text>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    date: {
        fontSize: 14,
        color: '#777',
        marginBottom: 5,
        textAlign: 'center',
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    subheader: {
        fontSize: 20,
        fontWeight: '600',
        marginVertical: 10,
    },
    description: {
        fontSize: 16,
        marginBottom: 10,
        lineHeight: 22,
    },
    bulletPoint: {
        fontSize: 16,
        marginBottom: 5,
        lineHeight: 22,
    },
    bold: {
        fontWeight: '700',
    },
    footer: {
        fontSize: 16,
        marginTop: 20,
        color: '#555',
        textAlign: 'center',
    },
});

export default PrivacyPolicyScreen;