import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import logo from './src/assets/images/react-keycloak-logo.png';
import Login from 'react-native-login';

const config = {
  url: 'http://20.206.80.63:8585/',
  realm: 'lighthouse',
  client_id: 'react-native-app',
  redirect_uri: 'keycloak://app',
  appsite_uri: 'keycloak://app',
  kc_idp_hint: 'facebook',
};

const App = () => {
  const [tokens, setTokens] = useState({});

  useEffect(() => {
    Login.tokens()
      .then(tokens => {
        setTokens(tokens);
      })
      .catch(() => {
        setTokens(null);
      });
  }, []);

  const onLogin = () => {
    Login.start(config)
      .then(tokens => {
        setTokens(tokens);
      })
      .catch(() => {
        setTokens(null);
      });
  };

  const onLogout = () => {
    Login.end();
    setTokens(null);
  };

  // const details = Login.decodeToken(tokens.access_token);

  console.log(tokens);
  // console.log(details);

  return (
    <SafeAreaView style={styles.container}>
      <Image source={logo} />
      <Text style={styles.title}>Keycloak React Native Demo App</Text>
      <TouchableOpacity onPress={() => onLogin()} style={styles.button}>
        <Text style={styles.text}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => onLogout()} style={styles.button}>
        <Text style={styles.text}>Logout</Text>
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
  title: {
    fontSize: 22,
    color: '#000',
    marginVertical: 64,
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
