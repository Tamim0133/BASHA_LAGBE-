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
    loadingOverlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 2,
    },
    container: {
        flex: 1,
        width: '100%',
        height: 500,
        borderWidth: 3,
        borderColor: Colors.primary,
        marginBottom: 30,
    },
    mapView: {
        flex: 1,
        ...StyleSheet.absoluteFillObject,
        borderWidth: 2,
        borderColor: Colors.primary,
    },
    locateBtn: {
        position: 'absolute',
        top: 70,
        right: 20,
        backgroundColor: '#fff',
        padding: 10,
        borderRadius: 10,
        elevation: 2,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 6,
        shadowOffset: {
            width: 1,
            height: 10,
        },
        borderWidth: 2,
        borderColor: Colors.primary,
    },
    searchBar: {
        position: 'absolute',
        zIndex: 2,
        top: 10,
        left: 10,
        right: 10,
        height: 45,
        paddingLeft: 15,
        paddingRight: 35,
        backgroundColor: '#fff',
        borderRadius: 25,
        borderWidth: 1,
        borderColor: Colors.primary,
        fontSize: 16,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 4 },
        elevation: 5,
    },
});

export default styles;