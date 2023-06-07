import { Text, View, Image } from 'react-native';
import React, { useEffect, useState } from 'react';

const apiKey = '777e48a6b21219c45c998ad624516454';

const Meteo = ({latitude, longitude}) => {
    const [meteoData, setMeteoData] = useState();
    const [meteoIcon, setMeteoIcon] = useState();

    useEffect(() => {
        const fetchMeteoData = () => {
            fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&lang=fr&units=metric`)
              .then(response => response.json())
              .then(data => { 
                setMeteoData(data);
                setMeteoIcon(`http://openweathermap.org/img/wn/${data.weather[0].icon}.png`);
                })
              .catch(error => console.error(error));
        };

        fetchMeteoData();
    }, [])

    return (
        <View>
            {meteoData ? (
                <View>
                    <Text>Vous êtes à {meteoData.name}</Text>
                    <Text>{meteoData.main.temp} °C</Text>
                    {meteoIcon ? 
                        <Image source={{ uri: meteoIcon }} style={{ width: 50, height: 50 }} /> : null
                    }
                    <Text>{meteoData.weather[0].description}</Text>
                </View>
            ) : (
                <Text>Erreur Meteo</Text>
            )}
        </View>
    );
};

export default Meteo;