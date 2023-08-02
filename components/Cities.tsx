import {
  FlatList,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {cities} from '../fixture/data.json';
import {tileDimension} from '../utils/dimensionsHelper';
import {CityType} from '../types/types';

interface CityPropsType {
  searchKey: string;
  filterCategory: string;
  distanceValue: string;
}

const City: React.FC<CityPropsType> = ({
  searchKey,
  filterCategory,
  distanceValue,
}) => {
  const navigation = useNavigation();

  const filteredCities: CityType[] = cities.filter(item => {
    if (searchKey !== '') {
      return (
        item.active &&
        (item.name.toLowerCase().includes(searchKey.toLowerCase()) || //move to utils and import here to avoid repetition
          item.country.toLowerCase().includes(searchKey.toLowerCase()))
      );
    }
    return item.active;
  });
  // Sample usage
  const [displayCities, setDisplayCities] =
    useState<CityType[]>(filteredCities);
  const res = displayCities.filter(item => item.name === distanceValue)[0]
    ?.coords;

  useEffect(() => {
    switch (filterCategory) {
      case 'name':
        setDisplayCities(sortByName(filteredCities));
        break;
      case 'distance':
        setDisplayCities(sortCitiesByDistance(cities, res?.lat, res?.lng));
        break;
      default:
        setDisplayCities(filteredCities);
        break;
    }
  }, [filterCategory]);

  const sortByName = (filteredCities: CityType[]): CityType[] => {
    return filteredCities.sort((a, b) => a.name.localeCompare(b.name));
  };

  const calculateDistance = (
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number,
  ): number => {
    // The approximate radius of the Earth in kilometers
    const R = 6371.0;

    // Convert latitude and longitude from degrees to radians
    const lat1Rad = (lat1 * Math.PI) / 180;
    const lon1Rad = (lon1 * Math.PI) / 180;
    const lat2Rad = (lat2 * Math.PI) / 180;
    const lon2Rad = (lon2 * Math.PI) / 180;

    // Haversine formula
    const dlon = lon2Rad - lon1Rad;
    const dlat = lat2Rad - lat1Rad;
    const a =
      Math.sin(dlat / 2) ** 2 +
      Math.cos(lat1Rad) * Math.cos(lat2Rad) * Math.sin(dlon / 2) ** 2;
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;

    return distance;
  };

  const sortCitiesByDistance = (
    cities: CityType[],
    locationLat: number,
    locationLon: number,
  ): CityType[] => {
    return cities.slice().sort((a, b) => {
      const distanceA = calculateDistance(
        a.coords.lat,
        a.coords.lng,
        locationLat,
        locationLon,
      );
      const distanceB = calculateDistance(
        b.coords.lat,
        b.coords.lng,
        locationLat,
        locationLon,
      );
      return distanceA - distanceB;
    });
  };

  const navigate = (city: CityType) => {
    // @ts-ignore:
    navigation.navigate('city-details', {city});
  };

  const cityGrid = (
    <View>
      <FlatList
        scrollEnabled={false}
        style={styles.productsContainer}
        numColumns={2}
        data={displayCities}
        keyExtractor={item => item.country}
        renderItem={({item}) => (
          <TouchableOpacity
            style={styles.cityContainer}
            onPress={navigate.bind(this, item)}>
            <ImageBackground source={{uri: item.image}} style={styles.image}>
              <View style={styles.mainContainer}>
                <Text style={styles.tileText}>{item.name}</Text>
              </View>
            </ImageBackground>
          </TouchableOpacity>
        )}
      />
    </View>
  );

  return (
    <View>
      {filteredCities.length > 0 ? (
        <ScrollView contentContainerStyle={styles.gridLayout}>
          {cityGrid}
        </ScrollView>
      ) : (
        <View style={styles.noResultsText}>
          <Text style={{textAlign: 'center'}}>No results found</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cityContainer: {
    overflow: 'hidden',
    height: tileDimension,
    width: tileDimension,
    elevation: 4,
    borderRadius: 20,
    margin: 5,
    backgroundColor: 'black',
  },
  tileText: {
    position: 'absolute',
    width: '100%',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 18,
    color: 'white',
  },
  gridLayout: {
    alignItems: 'center',
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  productsContainer: {
    flex: 1,
    alignSelf: 'center',
  },
  noResultsText: {
    width: '100%',
    minHeight: '90%',
    alignSelf: 'center',
    justifyContent: 'center',
  },
  image: {
    width: tileDimension,
    height: tileDimension,
    opacity: 0.8,
  },
});

export default City;
