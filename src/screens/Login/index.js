import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  TextInput,
  ActivityIndicator,
  View,
} from 'react-native';
import logo from '../../assets/images/react-keycloak-logo.png';
import qs from 'qs';
import axios from 'axios';

const Login = ({navigation}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [userCredentials, setUserCredentials] = useState({
    username: '',
    password: '',
  });
  const [tokens, setTokens] = useState({});

  const signIn = async () => {
    const data = {
      client_id: 'react-native-app',
      grant_type: 'password',
      ...userCredentials,
    };

    const config = {
      method: 'post',
      url: 'http://20.206.80.63:8585/realms/lighthouse/protocol/openid-connect/token',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      data: qs.stringify(data),
    };

    const response = await axios(config);

    setTokens({
      accessToken: response.data.access_token,
      refreshToken: response.data.refresh_token,
    });

    navigation.navigate('Profile')
  };

  const handleLogin = () => {
    if (!userCredentials.username || !userCredentials.password) {
      setError(true);

      setTimeout(() => {
        setError(false);
      }, 3000);
      return;
    }

    signIn(userCredentials);
    setLoading(true);
  };

  return (
    <SafeAreaView style={styles.container}>
      {!loading ? (
        <>
          <Image style={styles.logo} source={logo} />
          <Text style={styles.title}>Keycloak React Native Custom Login</Text>
          <TextInput
            style={styles.input}
            placeholder="User"
            value={userCredentials.username}
            autocomplete="username"
            onChange={e =>
              setUserCredentials({
                ...userCredentials,
                username: e.nativeEvent.text,
              })
            }
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            value={userCredentials.password}
            autocomplete="password"
            secureTextEntry={true}
            onChange={e =>
              setUserCredentials({
                ...userCredentials,
                password: e.nativeEvent.text,
              })
            }
          />
          <TouchableOpacity style={styles.button} onPress={() => handleLogin()}>
            <Text style={styles.text}>Login</Text>
          </TouchableOpacity>
          <View style={styles.error}>
            {error && <Text>Credenciais inválidas!</Text>}
          </View>
        </>
      ) : (
        <ActivityIndicator size="large" color="#00a5e5" />
      )}
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
    paddingHorizontal: 14,
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
  error: {
    height: 50,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Login;
