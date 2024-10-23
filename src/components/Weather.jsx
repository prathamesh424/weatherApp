/* eslint-disable no-unused-vars */
import { useState } from 'react';
import { useFetchWeather } from '../hooks/useFetchWeather';
import useGeolocation from '../hooks/useGeolocation';
import { WeatherCard } from './WeatherCard';
import { Forecast } from './Forecast';
import { useTranslate } from '@tolgee/react';

export default function Weather() {
  const { loading, error, data: geoData } = useGeolocation();
  const [city, setCity] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const {
    data,
    error: apiError,
    isLoading: apiLoading,
  } = useFetchWeather(geoData, searchQuery);
  const { t } = useTranslate();
  if (loading) {
    return <p className='text-blue-500 text-lg font-semibold'>Loading ...</p>;
  }

  const { currentWeather, forecast } = data || {};

  const handleSearch = (e) => {
    e.preventDefault();
    if (city.trim()) {
      console.log('city=', city);
      setSearchQuery(city.trim());
    }
  };


  return (
    <div>
      {error && <p>{error.message}</p>}
      {apiError && <p>{apiError.message}</p>}
      <div className='bg-white shadow-md p-2 rounded-lg mb-4 w-full'>
        <form onSubmit={handleSearch}>
          <input
            type='text'
            placeholder='Enter city name'
            className='p-2 border text-white border-gray-300 rounded'
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <button
            type='submit'
            className='ml-2 p-2 bg-blue-500 text-white rounded'
          >
            {t('search-key', 'Search')}
          </button>
        </form>
      </div>

      {currentWeather && (
        <div className='bg-white shadow-md p-6 rounded-lg mb-4 w-full'>
          <WeatherCard data={currentWeather} />
        </div>
      )}

      {forecast && (
        <div className='bg-white shadow-md p-6 rounded-lg mb-4 w-full'>
          <Forecast forecast={forecast} />
        </div>
      )}
    </div>
  );
}
