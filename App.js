import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  TextInput,
} from 'react-native';
import logo from './src/assets/images/react-keycloak-logo.png';

const App = () => {
  const [accessToken, setAccessToken] = useState("");
  const [refreshToken, setRefresToken] = useState("");

  return (
    <SafeAreaView style={styles.container}>
      <Image style={styles.logo} source={logo} />
      <Text style={styles.title}>Keycloak React Native Custom Login</Text>
      <TextInput style={styles.input} placeholder="User"/>
      <TextInput style={styles.input} placeholder="Password"/>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.text}>Login</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#d3dedc',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 120,
    height: 50,
  },
  title: {
    fontSize: 22,
    color: '#505050',
    marginVertical: 30,
    maxWidth: 250,
    textAlign: 'center',
  },
  input: {
    width: 300,
    fontSize: 18,
    color: '#505050',
    backgroundColor: '#fff',
    borderRadius: 6,
    marginBottom: 30,
  },
  button: {
    backgroundColor: '#00a5e5',
    paddingHorizontal: 64,
    paddingVertical: 12,
    borderRadius: 12,
  },
  text: {
    color: '#fff',
    fontSize: 18,
  },
});

export default App;
