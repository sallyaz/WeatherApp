import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useCallback, useEffect, useState} from 'react';
import {ImageBackground, StyleSheet, Text, View} from 'react-native';

// Api
import {getWeatherInfo} from '../api/weatherApi';

// Components
import Toggle from '../components/Toggle';
import Weather from '../components/Weather';

type RootStackParamList = {
  title: string;
};

type CityDetailsScreenType = NativeStackScreenProps<
  //   @ts-ignore:
  RootStackParamList,
  'city-details'
>;

const CityDetailsScreen: React.FC<CityDetailsScreenType> = ({
  navigation,
  route,
}) => {
  const [isImperial, setIsImperial] = useState(false);
  const {city}: any = route.params;
  const {lat, lng} = city.coords;

  const [weatherInfo, setWeatherInfo] = useState();

  useEffect(() => {
    getData(false);
  }, []);

  const getData = async (isImperial: boolean) => {
    setWeatherInfo(await getWeatherInfo(lat, lng, isImperial));
  };

  return (
    <View style={styles.mainContainer}>
      <View style={styles.imageContainer}>
        <ImageBackground
          source={{uri: city.image}}
          style={styles.imageBackground}>
          <View style={styles.imageTitle}>
            <Text style={styles.tileText}>{city.country}</Text>
          </View>
        </ImageBackground>
      </View>
      <View style={styles.cityContent}>
        <Text style={styles.countryTitle}>{city.name}</Text>
        <Text style={styles.countryDescription}>{city.description}</Text>
      </View>
      <View style={styles.weatherContainer}>
        <Toggle
          isImperial={isImperial}
          setIsImperial={setIsImperial}
          getData={getData}
        />
        {weatherInfo && (
          <Weather isImperial={isImperial} weatherInfo={weatherInfo} />
        )}
      </View>
    </View>
  );
};

export default CityDetailsScreen;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  imageContainer: {height: '40%', width: '100%'},
  imageBackground: {
    opacity: 0.6,
    backgroundColor: 'black',
  },
  imageTitle: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  tileText: {
    width: '100%',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 20,
    color: 'black',
  },
  cityContent: {
    height: '25%',
    justifyContent: 'space-evenly',
  },
  countryTitle: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 20,
    textAlign: 'center',
    marginVertical: 20,
  },
  countryDescription: {
    color: 'black',
    fontSize: 18,
    textAlign: 'center',
  },
  weatherContainer: {height: '15%'},
});
