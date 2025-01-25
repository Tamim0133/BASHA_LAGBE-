import React from 'react';
import { TextInput } from 'react-native';
import styles from './styles'; // Assuming styles are already defined in a separate file

const SearchBar = ({ value, onChange, onSearch }) => {
    return (
        <TextInput
            style={styles.searchBar}
            placeholder="Search location..."
            value={value}
            onChangeText={onChange}
            onSubmitEditing={onSearch}
            returnKeyType="search"
            autoCapitalize="none"
            autoCorrect={false}
        />
    );
};

export default SearchBar;