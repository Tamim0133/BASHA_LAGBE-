import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const RefundPolicyScreen = () => {
    return (
        <ScrollView style={styles.container}>
            <Text style={styles.header}>Refund Policy</Text>
            <Text style={styles.date}>Last updated: December 1, 2024</Text>

            <Text style={styles.description}>
                At Basha Lagbe?, we strive to provide the best service possible. However, if you are not satisfied with your purchase, we are here to help.
            </Text>

            <Text style={styles.subheader}>Eligibility for Refunds</Text>
            <Text style={styles.description}>
                You are eligible for a refund if:
            </Text>
            <Text style={styles.bulletPoint}>
                • You requested a refund within 14 days of your initial purchase.
            </Text>
            <Text style={styles.bulletPoint}>
                • The service you purchased was not delivered as promised.
            </Text>
            <Text style={styles.bulletPoint}>
                • There was an error on our part (e.g., double billing).
            </Text>

            <Text style={styles.subheader}>Non-Refundable Items</Text>
            <Text style={styles.description}>
                Certain types of purchases cannot be refunded:
            </Text>
            <Text style={styles.bulletPoint}>
                • Services that have already been completed or partially used.
            </Text>
            <Text style={styles.bulletPoint}>
                • Fees associated with subscription services after the billing cycle has started.
            </Text>

            <Text style={styles.subheader}>How to Request a Refund</Text>
            <Text style={styles.description}>
                To initiate a refund, please follow these steps:
            </Text>
            <Text style={styles.bulletPoint}>
                1. Contact our customer support team within 14 days of your purchase.
            </Text>
            <Text style={styles.bulletPoint}>
                2. Provide your order number and the reason for the refund request.
            </Text>
            <Text style={styles.bulletPoint}>
                3. Wait for a confirmation email regarding your refund status.
            </Text>

            <Text style={styles.subheader}>Processing Refunds</Text>
            <Text style={styles.description}>
                Refunds will be processed within 7-10 business days after approval. The funds will be returned to the original payment method used during the purchase.
            </Text>

            <Text style={styles.subheader}>Changes to This Policy</Text>
            <Text style={styles.description}>
                We reserve the right to update or change our refund policy at any time. Any changes will be posted on this page with an updated effective date.
            </Text>

            <Text style={styles.footer}>
                If you have any questions or concerns about our refund policy, please contact our support team.
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
        paddingLeft: 10,
        textAlign: 'left',
    },
    footer: {
        fontSize: 16,
        marginTop: 20,
        color: '#555',
        textAlign: 'center',
    },
});

export default RefundPolicyScreen;