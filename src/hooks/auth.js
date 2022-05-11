import {useState} from 'react';
import qs from 'qs';
import axios from 'axios';

export function useAuth() {
  const [tokens, setTokens] = useState({});
  const [isTokenReady, setTokenReady] = useState(false);

  const signIn = async userCredentials => {
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

    setTokenReady(true);
  };

  return {
    signIn,
    isTokenReady,
    tokens,
  };
}
