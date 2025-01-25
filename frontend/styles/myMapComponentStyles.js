import { StyleSheet } from 'react-native';
import Colors from '@/constants/Colors'; // Adjust the import path if necessary

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        height: 500,
        borderWidth: 3,
        borderColor: Colors.primary,
        marginBottom: 30,
    },
    map: {
        width: '100%',
        height: '100%',
    },
    loading: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default styles;