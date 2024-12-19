import Colors from '@/constants/Colors';
import { StyleSheet } from 'react-native';

export const defaultStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FDFFFF',
  },
  inputField: {
    height: 44,
    borderWidth: 1,
    borderColor: '#ABABAB',
    borderRadius: 8,
    padding: 10,
    backgroundColor: '#fff',
  },
  btn: {
    backgroundColor: Colors.primary, // Background color
    height: 50,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',

    // Border
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

  },
  btnText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'mon-b',
  },
  btnIcon: {
    position: 'absolute',
    left: 16,
  },
  footer: {
    position: 'absolute',
    height: 100,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderTopColor: Colors.grey,
    borderTopWidth: StyleSheet.hairlineWidth,
  },
});
