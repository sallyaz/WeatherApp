import {Button, StyleSheet, Text, TextInput, View} from 'react-native';
import {searchDimensions} from '../utils/dimensionsHelper';
import React from 'react';

interface SearchPropsType {
  searchKey: string;
  setSearchKey: (newValue: string) => void;
}

const Search: React.FC<SearchPropsType> = ({searchKey, setSearchKey}) => {
  return (
    <View style={styles.searchContainer}>
      <TextInput
        style={styles.textInput}
        onChangeText={setSearchKey}
        value={searchKey}
      />
    </View>
  );
};

export default Search;

const styles = StyleSheet.create({
  searchContainer: {flex: 1, flexDirection: 'row'},
  textInput: {
    color: 'black',
    borderColor: 'grey',
    borderWidth: 1,
    width: searchDimensions - 100,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
    alignSelf: 'center',
  },
});
