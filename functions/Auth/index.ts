import * as localAuthentication from 'expo-local-authentication';

const Auth = async () => {
  const result = await localAuthentication.authenticateAsync({
    promptMessage: 'Para acessar ao stokio se autentique!',
  });
  return result.success;
};

export { Auth };
