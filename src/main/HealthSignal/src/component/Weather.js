import React, { useEffect, useState } from 'react';

const WeatherComponent = () => {
    const [error, setError] = useState(false);
    const [location, setLocation] = useState({ lat: 0, lon: 0 });
    const [weatherData, setWeatherData] = useState(null);
    const [loading, setLoading] = useState(true);

    const getCurrentLocation = () => {
        navigator.geolocation.getCurrentPosition(position => {
            setLocation({ lat: position.coords.latitude, lon: position.coords.longitude });
        });
    };

    const getWeatherByCurrentLocation = async (lat, lon) => {
        const apikey = 'd2aad764f5d78806b64fdac7a921a3e9';
        let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apikey}`;

        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error('날씨 정보를 가져오는 데 문제가 발생했습니다.');
            }
            const data = await response.json();
            const weatherInfo = {
                icon: "/images/weather/" + data.weather[0].icon + ".svg",
                temp: (data.main.temp - 273.15).toFixed(1) + "℃",
                hum: data.main.humidity + "%"
            };
            setWeatherData(weatherInfo);
            sessionStorage.setItem("weatherData", JSON.stringify(weatherInfo));
            setLoading(false);
        } catch (error) {
            console.error('날씨 정보 가져오기 오류:', error);
            setError(true);
            setLoading(false);
        }
    };

    useEffect(() => {
        const savedWeatherData = sessionStorage.getItem("weatherData");
        if (savedWeatherData) {
            setWeatherData(JSON.parse(savedWeatherData));
            setLoading(false);
        } else {
            getCurrentLocation();
        }
    }, []);

    useEffect(() => {
        if (location.lat !== 0 && location.lon !== 0 && !weatherData) {
            getWeatherByCurrentLocation(location.lat, location.lon);
        }
    }, [location, weatherData]);

    if (loading) {
        return <div className="weather-component"></div>;
    }

    if (error || !weatherData) {
        return <div className="weather-component text-danger">날씨 정보를 가져오는 도중 오류가 발생했습니다.</div>;
    }

    return (
        <div className="weather-component">
            <img  src={weatherData.icon} alt="Weather Icon"  />
            <p style={{fontSize: "10px"}}>{weatherData.temp} / {weatherData.hum}</p>
        </div>
    );
};

export default WeatherComponent;
