import {ImageBackground, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {WeatherDetailsType} from '../types/types';
import {
  weatherContainer,
  weatherContainerHeight,
  weatherTile,
} from '../utils/dimensionsHelper';

interface WeatherInfo {
  weatherInfo: WeatherDetailsType;
  isImperial: boolean;
}

const Weather: React.FC<WeatherInfo> = ({weatherInfo, isImperial}) => {
  return (
    <View style={styles.mainContainer}>
      <View style={styles.weatherContainer}>
        <Text style={styles.mainTemp}>
          {weatherInfo.main.temp} {isImperial ? '°F' : '°C'}
        </Text>
        <Text style={styles.feelsLike}>Feels Like</Text>
        <Text>
          {weatherInfo.main.feels_like} {isImperial ? '°F' : '°C'}
        </Text>
      </View>
      {weatherInfo.weather.map((item, key) => {
        return (
          <View
            key={key}
            style={[styles.weatherContainer, {backgroundColor: '#E5E5E5'}]}>
            <ImageBackground
              style={styles.imageContainer}
              source={{
                uri: `https://openweathermap.org/img/w/${item.icon}.png`,
              }}></ImageBackground>
            <View style={{marginBottom: 10}}>
              <Text style={styles.tileText}>
                {item.description.toUpperCase()}
              </Text>
            </View>
          </View>
        );
      })}
    </View>
  );
};

export default Weather;

const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: 'row',
    marginTop: 20,
    width: weatherTile,
    justifyContent: 'space-evenly',

    alignSelf: 'center',
  },
  weatherContainer: {
    backgroundColor: '#ADD8E6',
    width: weatherContainer,
    height: weatherContainerHeight,
    borderWidth: 0.1,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageContainer: {
    width: 100,
    height: 90,
  },
  tileText: {
    textAlign: 'center',
    fontWeight: '500',
    color: 'black',
  },
  mainTemp: {
    fontSize: 18,
    fontWeight: 'bold',
    paddingVertical: 5,
  },
  feelsLike: {
    fontSize: 16,
    marginBottom: 2,
  },
});
