// Code retrieved from : https://github.com/auth0-samples/auth0-react-native-sample/blob/master/00-Login-Hooks/App.tsx

import React from 'react';
import {Alert, Button, StyleSheet, Text, View} from 'react-native';
import {useAuth0} from 'react-native-auth0';

const TestUserLogin = () => {
  const {authorize, clearSession, user, getCredentials, error, isLoading} =
    useAuth0();

  const onLogin = async () => {
    await authorize({}, {});
    const credentials = await getCredentials();
    Alert.alert('AccessToken: ' + credentials?.accessToken);
  };

  const loggedIn = user !== undefined && user !== null;

  const onLogout = async () => {
    await clearSession({}, {});
  };

  if (isLoading) {
    return (
      <View style={styles.container}>
        <Text>Loading</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}> Crowd-Sourced Shopping App </Text>
      {user && (
        <Text>
          You are logged in as {user.name}, {user.sub}
        </Text>
      )}
      {!user && <Text>You are not logged in</Text>}
      <Button
        onPress={loggedIn ? onLogout : onLogin}
        title={loggedIn ? 'Log Out' : 'Log In'}
      />
      {error && <Text style={styles.error}>{error.message}</Text>}
    </View>
  );
};

export default TestUserLogin

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  header: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  error: {
    margin: 20,
    textAlign: 'center',
    color: '#D8000C',
  },
});

export {TestUserLogin};