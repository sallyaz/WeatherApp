import axios from "axios";
import constants from '../fixture/consts.json'


export const getWeatherInfo =  async (lat: number, lon: number, isImperial: boolean) => {
    const {apiKey} =  constants;
    const {data} =  await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=${isImperial ? 'imperial': 'metric'}&appid=${apiKey}`);
    return data;
    
}

