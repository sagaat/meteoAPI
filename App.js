import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Meteo from './components/apiMeteo';
import Geolocalisation from './components/location';

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Meteo/>
      <Geolocalisation/>
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
