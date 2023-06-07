import { Text, View, Image, ScrollView, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';

const apiKey = '777e48a6b21219c45c998ad624516454';

const Meteo = ({latitude, longitude}) => {
    const [meteoData, setMeteoData] = useState();
    const [meteoIcon, setMeteoIcon] = useState();
    const [forecastData, setForecastData] = useState();

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

        const fetchForecastData = () => {
            fetch(`http://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${apiKey}&lang=fr&units=metric`)
              .then(response => response.json())
              .then(data => { 
                setForecastData(data);
                console.log(data);
                })
              .catch(error => console.error(error));
        };

        fetchMeteoData();
        fetchForecastData();
    }, [])

    return (
        <View>
            {meteoData ? (
                <View style={styles.meteo}>
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
            {forecastData ? (
                <ScrollView horizontal={true} style={styles.scroll} >
                    {forecastData.list.map((forecast, index) => (
                        <View key={index} style={styles.card} > 
                            <Text>{forecast.dt_txt}</Text>
                            <Text>{forecast.main.temp} °C</Text>
                            {forecast.weather[0].icon ?
                                <Image source={{ uri: `http://openweathermap.org/img/wn/${forecast.weather[0].icon}.png` }} style={{ width: 50, height: 50 }} /> : null
                            }
                            <Text>{forecast.weather[0].description}</Text>
                        </View>
                    ))}
                </ScrollView>
            ) : (
                <Text>Erreur Forecast</Text>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    meteo: {
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        width: 200,
        height: 150,
        margin: 100,
    },
    scroll: {
        marginLeft: 10,
    },
    card: {
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        width: 200,
        height: 150,
        margin: 10,
        padding: 10,
        borderRadius: 10,
    },
});

export default Meteo;