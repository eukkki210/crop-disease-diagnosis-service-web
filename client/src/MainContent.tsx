import React, { useState, useEffect } from 'react';
import './MainContent.css';
import axios from 'axios';

enum WindDirection {
  N = '북',
  NE = '북동',
  E = '동',
  SE = '남동',
  S = '남',
  SW = '남서',
  W = '서',
  NW = '북서',
}

const WeatherComponent: React.FC = () => {
  const [weatherData, setWeatherData] = useState<any>(null);
  const [location, setLocation] = useState<{ lat: number; lon: number } | null>(null);
  const [backgroundImage, setBackgroundImage] = useState<string | null>(null);


  const API_KEY = process.env.REACT_APP_API_KEY;

  const weatherBackgrounds: { [key: string]: string } = {
    '01d': 'day-clear-sky.jpg',
    '01n': 'night-clear-sky.jpg',
    '02d': 'day-few-clouds.jpg',
    '02n': 'night-few-clouds.jpg',
    '03d': 'day-scattered-clouds.jpg',
    '03n': 'night-scattered-clouds.jpg',
    '04d': 'day-broken-clouds.jpg',
    '04n': 'night-broken-clouds.jpg',
    '09d': 'day-shower-rain.jpg',
    '09n': 'night-shower-rain.jpg',
    '10d': 'day-rain.jpg',
    '10n': 'night-rain.jpg',
    '11d': 'day-thunderstorm.jpg',
    '11n': 'night-thunderstorm.jpg',
    '13d': 'day-snow.jpg',
    '13n': 'night-snow.jpg',
    '50d': 'day-mist.jpg',
    '50n': 'night-mist.jpg',
  };

  const diseaseInfo: { [weatherCondition: string]: string } = {
    Clear: '일반적으로 질병이 발생하지 않습니다.',
    Rain: '비가 내려 습한 환경이 되어 곰팡이 질병 등이 발생할 수 있습니다.',
    Clouds: '흐린 날씨로 기온이 떨어져 노균병 등의 병이 발생할 수 있습니다.',
  };

  function degreesToDirection(degrees: number): WindDirection {
    const directions: WindDirection[] = [
      WindDirection.N, WindDirection.NE, WindDirection.E, WindDirection.SE,
      WindDirection.S, WindDirection.SW, WindDirection.W, WindDirection.NW,
    ];

    const index = Math.round(degrees / 45) % 8;
    return directions[index];
  }

  function getDiseaseInfo(weather: string): string {
    return diseaseInfo[weather] || '질병 정보를 찾을 수 없습니다.';
  }

  useEffect(() => {
    const getGeoLocation = () => {
      if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            setLocation({
              lat: position.coords.latitude,
              lon: position.coords.longitude,
            });
          },
          (error) => {
            console.error('사용자 위치를 가져오는 중 오류 발생: ', error);
          }
        );
      } else {
        console.error('브라우저가 위치 정보를 지원하지 않습니다.');
      }
    };

    getGeoLocation();
  }, []);

  useEffect(() => {
    if (location) {
      const API_URL = `https://api.openweathermap.org/data/2.5/weather?lat=${location.lat}&lon=${location.lon}&appid=${API_KEY}&lang=kr`;

      axios
        .get(API_URL)
        .then((res) => {
          console.log('responseData', res)
          setWeatherData(res.data);
        })
        .catch((error) => {
          console.error('날씨 데이터를 가져오는 중 오류 발생: ', error);
        });
    }
  }, [location]);

  useEffect(() => {
    if (weatherData && weatherData.weather[0] && weatherBackgrounds[weatherData.weather[0].icon]) {
      setBackgroundImage(weatherBackgrounds[weatherData.weather[0].icon]);
    }
  }, [weatherData]);

  return (
    <div className="main-content">
      <div className="top-section" style={{ backgroundImage: backgroundImage ? `url(${backgroundImage})` : '' }}>        <div className="current-location">{weatherData ? weatherData.name : ''}</div>
        <div className="temperature">{weatherData ? `${Math.floor(weatherData.main.temp - 273.15)} °C` : ''}</div>
      </div>
      {weatherData ? (
        <div className="bottom-section">
          <div className="group">
            <div className="weather-description">
              <img
                src={`https://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`}
                alt={weatherData.weather[0].description}
              />
              <p>{weatherData.weather[0].main}</p>
            </div>
            <div className="temp-range">
              <p>{Math.floor(weatherData.main.temp_max - 273.15)} °C / {Math.floor(weatherData.main.temp_min - 273.15)} °C</p>
            </div>
          </div>
          <div className="group">
            <div className="humidity">
              <p>습도: {weatherData.main.humidity} %</p>
            </div>
            <div className="rainfall">
              <p>강수량: {weatherData.rain ? weatherData.rain['3h'] : 0} mm (3시간)</p>
            </div>
          </div>
          <div className="group">
            <div className="windspeed">
              <p>풍속: {weatherData.wind.speed} m/s</p>
            </div>
            <div className="winddeg">
              <p>풍향: {weatherData.wind.deg}° ({degreesToDirection(weatherData.wind.deg)})</p>
            </div>
          </div>
          <div className="group">
            <div className="disease-warning">
              <img src="/images/warning.png" />
              {/* <p>{diseaseInfo[weatherData.weather[0].main] + ' 주의보' || '없음'} </p> */}
              <p>{getDiseaseInfo(weatherData.weather[0].main)}</p>
            </div>
          </div>
        </div>
      ) : (
        <div>날씨 정보를 가져오는 중...</div>
      )}
    </div>
  );
};

export default WeatherComponent;
