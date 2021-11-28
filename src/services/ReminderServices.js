import http from '@/http/axios';

export const ReminderServices = {
  getWeatherOfCity
}

async function getWeatherOfCity(City)
{
  let result =  await http.get(`?q=${City}&appid=${process.env.VUE_APP_APIKEY_WEATHER_SERVICE}`)
  return result.data
}