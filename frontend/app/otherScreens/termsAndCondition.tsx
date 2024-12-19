import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const TermsAndConditionsScreen = () => {
    return (
        <ScrollView style={styles.container}>
            <Text style={styles.header}>Terms and Conditions</Text>
            <Text style={styles.date}>Last updated: December 1, 2024</Text>

            <Text style={styles.introduction}>
                Welcome to Basha Lagbe?. These Terms and Conditions outline the rules and regulations for the use of our app.
                By accessing or using the Service, you agree to comply with and be bound by these terms.
                If you do not agree with any part of these terms, please do not use the Service.
            </Text>

            <Text style={styles.subheader}>1. Definitions</Text>
            <Text style={styles.description}>
                For the purpose of these Terms and Conditions:
            </Text>
            <Text style={styles.bulletPoint}>
                • <Text style={styles.bold}>Service</Text> refers to the Basha Lagbe? application.
            </Text>
            <Text style={styles.bulletPoint}>
                • <Text style={styles.bold}>User</Text>, or <Text style={styles.bold}>You</Text> means any person who accesses or uses the Service.
            </Text>
            <Text style={styles.bulletPoint}>
                • <Text style={styles.bold}>Company</Text> refers to Basha Lagbe?, operating under the name The Tolet.
            </Text>

            <Text style={styles.subheader}>2. User Responsibilities</Text>
            <Text style={styles.description}>
                As a user of the Service, you agree to:
            </Text>
            <Text style={styles.bulletPoint}>
                • Provide accurate and complete information during the registration process.
            </Text>
            <Text style={styles.bulletPoint}>
                • Keep your account credentials confidential and secure.
            </Text>
            <Text style={styles.bulletPoint}>
                • Notify us immediately if you suspect any unauthorized use of your account.
            </Text>
            <Text style={styles.bulletPoint}>
                • Use the Service only for lawful purposes and in accordance with applicable laws.
            </Text>

            <Text style={styles.subheader}>3. Intellectual Property</Text>
            <Text style={styles.description}>
                All content, features, and functionality of the Service, including but not limited to text, graphics, logos,
                and software, are the exclusive property of the Company. Unauthorized use of any content is strictly prohibited.
            </Text>

            <Text style={styles.subheader}>4. Limitations of Liability</Text>
            <Text style={styles.description}>
                To the fullest extent permitted by law, the Company will not be liable for any direct, indirect, incidental,
                or consequential damages arising from your use of the Service, including but not limited to loss of profits,
                data, or other intangible losses.
            </Text>

            <Text style={styles.subheader}>5. Third-Party Links</Text>
            <Text style={styles.description}>
                Our Service may contain links to third-party websites or services that are not owned or controlled by the Company.
                We have no control over, and assume no responsibility for, the content, privacy policies, or practices of any
                third-party websites or services.
            </Text>

            <Text style={styles.subheader}>6. Changes to Terms</Text>
            <Text style={styles.description}>
                We reserve the right to modify or replace these Terms and Conditions at any time. If the changes are significant,
                we will provide a notice on the Service. Your continued use of the Service after any such changes constitutes
                your acceptance of the new Terms and Conditions.
            </Text>

            <Text style={styles.subheader}>7. Governing Law</Text>
            <Text style={styles.description}>
                These Terms and Conditions shall be governed by and construed in accordance with the laws of Bangladesh.
                Any disputes will be handled in the appropriate courts in Bangladesh.
            </Text>

            <Text style={styles.footer}>
                If you have any questions about these Terms and Conditions, please contact us at support@bashalagbe.com.
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
    introduction: {
        fontSize: 16,
        marginBottom: 10,
        lineHeight: 22,
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
        paddingLeft: 10,
        textAlign: 'left',
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

export default TermsAndConditionsScreen;