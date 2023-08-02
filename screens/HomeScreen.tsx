import React, {Fragment, useRef, useState} from 'react';
import {
  SafeAreaView,
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import {Modalize} from 'react-native-modalize';

// Components
import Search from '../components/Search';
import City from '../components/Cities';

const HomeScreen = () => {
  const [searchKey, setSearchKey] = useState<string>('');
  const [distanceValue, setDistanceValue] = useState<string>('');
  const [filterCategory, setFilterCategory] = useState<string>('');
  const filterIcon = <Icon name="filter" size={30} color="grey" />;

  const modalizeRef = useRef<Modalize>();

  enum filterType {
    name = 'Name',
    distance = 'Distance',
    none = 'Default',
  }

  const filterByType = (
    Object.keys(filterType) as (keyof typeof filterType)[]
  ).map((key, index) => {
    return (
      <TouchableOpacity
        style={styles.modal}
        key={index}
        onPress={() => {
          modalizeRef.current?.close();
          setFilterCategory(key);
        }}>
        {filterType[key] == 'Distance' ? (
          <View style={styles.Distance}>
            <TextInput
              placeholder="Distance"
              onChangeText={setDistanceValue}
              value={distanceValue}
            />
            <Text style={styles.distanceInput}>Search</Text>
          </View>
        ) : (
          <Text style={{textAlign: 'center', fontSize: 16}}>
            {filterType[key]}
          </Text>
        )}
      </TouchableOpacity>
    );
  });
  const onOpen = () => {
    modalizeRef?.current?.open();
  };

  const ModalHeader = () => {
    return (
      <View>
        <Text style={styles.modalActions}>Sort By</Text>
      </View>
    );
  };
  return (
    <Fragment>
      <SafeAreaView style={{flex: 1}}>
        <View style={styles.topHeader}>
          <Search searchKey={searchKey} setSearchKey={setSearchKey} />
          <TouchableOpacity onPress={onOpen}>{filterIcon}</TouchableOpacity>
        </View>
        <City
          distanceValue={distanceValue}
          filterCategory={filterCategory}
          searchKey={searchKey}
        />
      </SafeAreaView>
      <Modalize
        HeaderComponent={<ModalHeader />}
        ref={modalizeRef}
        modalStyle={{overflow: 'hidden'}}
        adjustToContentHeight={true}
        panGestureEnabled={false}
        closeOnOverlayTap={true}>
        <View style={styles.modalPopup}>{filterByType}</View>
      </Modalize>
    </Fragment>
  );
};
const styles = StyleSheet.create({
  modalPopup: {
    justifyContent: 'center',
    width: '100%',
    height: 150,
  },
  topHeader: {
    flexDirection: 'row',
    width: '100%',
    paddingHorizontal: 20,
  },
  modalActions: {
    textAlign: 'center',
    marginTop: 10,
    fontSize: 16,
    fontWeight: 'bold',
  },
  Distance: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  modal: {
    marginVertical: 5,
    borderWidth: 0.2,
    borderRadius: 5,
    width: '60%',
    alignSelf: 'center',
  },
  distanceInput: {
    textAlign: 'center',
    fontSize: 16,
    marginHorizontal: 10,
  },
});

export default HomeScreen;
