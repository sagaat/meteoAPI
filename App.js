import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import * as Location from 'expo-location';
import Meteo from './components/apiMeteo';

export default function App() {
  
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
          setErrorMsg('Permission to access location was denied');
          return;
      }

      let location = await Location.getCurrentPositionAsync({});
        setLocation(location);
        setLatitude(location.coords.latitude);
        setLongitude(location.coords.longitude);
        console.log('lat : ' + latitude + ' long : ' + longitude);
    })();
  }, []);
  
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      { latitude && longitude && <Meteo latitude={latitude} longitude={longitude} /> }
      { errorMsg && <Text>{errorMsg}</Text>}
    </View>
      
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFDAB9',
  },
});
