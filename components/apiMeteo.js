import { Text, View, Image, ScrollView, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';

const apiKey = '777e48a6b21219c45c998ad624516454';

const formatDate = (date) => {
    const dateObj = new Date(date);
    const day = dateObj.getDate().toString().padStart(2, '0');
    const month = (dateObj.getMonth() + 1).toString().padStart(2, '0');
    const year = dateObj.getFullYear();
    return day + '/' + month + '/' + year;
};

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
                const forecastMidi = data.list.filter((forecast, index) => {
                    return forecast.dt_txt.includes("12:00:00") ;
                });
                data.list = forecastMidi;
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
            <Text style={styles.titre}>Météo</Text>
            {meteoData ? (
                <View style={styles.meteo}>
                    <Text style={styles.texte}>{meteoData.name}</Text>
                    <Text style={styles.texte}>{meteoData.main.temp} °C</Text>
                    {meteoIcon ? 
                        <Image source={{ uri: meteoIcon }} style={{ width: 70, height: 70 }} /> : null
                    }
                    <Text style={styles.texte}>{meteoData.weather[0].description}</Text>
                </View>
            ) : (
                <Text>Erreur Meteo</Text>
            )}
            <Text style={styles.texte}>Prévisions sur 5J à 12h :</Text>
            {forecastData ? (
                <ScrollView horizontal={true} style={styles.scroll}>
                    {forecastData.list.map((forecast, index) => (
                        <View key={index} style={styles.card}> 
                            <Text style={styles.texte}>{formatDate(forecast.dt_txt)}</Text>
                            <Text style={styles.texte}>{forecast.main.temp} °C</Text>
                            {forecast.weather[0].icon ?
                                <Image source={{ uri: `http://openweathermap.org/img/wn/${forecast.weather[0].icon}.png` }} style={{ width: 70, height: 70 }} /> : null
                            }
                            <Text style={styles.texte}>{forecast.weather[0].description}</Text>
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
    titre: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 30,
        marginTop: 70,
    },
    texte: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 20,
    },
    meteo: {
        backgroundColor: '#67B7D1',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        width: 300,
        height: 200,
        margin: 50,
    },
    scroll: {
        marginLeft: 20,
    },
    card: {
        backgroundColor: '#67B7D1',
        alignItems: 'center',
        justifyContent: 'center',
        width: 200,
        height: 200,
        margin: 5,
        marginTop: 15,
        borderRadius: 10,
    },
});

export default Meteo;