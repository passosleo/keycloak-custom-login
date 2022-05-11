import React, {useLayoutEffect, useState} from 'react';
import {
  SafeAreaView,
  Text,
  StyleSheet,
  Image,
  TextInput,
  ActivityIndicator,
  View,
  TouchableOpacity
} from 'react-native';
import axios from 'axios';

const Profile = ({route}) => {
  const {accessToken, refreshToken} = route.params;
  const [userInfo, setUserInfo] = useState({});

  useLayoutEffect(() => {
    const getUserInfo = async () => {
      const config = {
        method: 'post',
        url: 'http://20.206.80.63:8585/realms/lighthouse/protocol/openid-connect/userinfo',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: `Bearer ${accessToken}`,
        },
      };

      const response = await axios(config);

      setUserInfo(response.data);
      console.log('User info: ', userInfo);
    };

    getUserInfo();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      {Object.keys(userInfo).length ? (
        <>
          <Text>{`Nome: ${userInfo.name}`}</Text>
          <Text>{`Username: ${userInfo.preferred_username}`}</Text>
          <Text>{`Email: ${userInfo.email}`}</Text>
          <TouchableOpacity style={styles.button} onPress={() => null}>
            <Text style={styles.text}>Logout</Text>
          </TouchableOpacity>
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

export default Profile;
