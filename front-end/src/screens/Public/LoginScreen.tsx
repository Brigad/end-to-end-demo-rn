import React, {useCallback, useEffect, useState} from 'react';
import type {FunctionComponent} from 'react';

import {
  NavigationProp,
  RouteProp,
  useFocusEffect,
} from '@react-navigation/native';
import {
  Button,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import {PublicNavigatorParams} from '../../navigation/types';
import {setToLocalStorage} from '../../libs/MMKVStorage';
import {getSelectorProps} from '../../utils/SelectorUtils';

type LoginScreenProps = {
  navigation: NavigationProp<PublicNavigatorParams, 'Login'>;
  route: RouteProp<PublicNavigatorParams, 'Login'>;
};

const LoginScreen: FunctionComponent<LoginScreenProps> = ({
  navigation,
  route,
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [signinErrors, setSigninErrors] = useState([]);

  useFocusEffect(
    useCallback(() => {
      setSigninErrors([]);
    }, []),
  );

  useEffect(() => {
    if (route.params?.email) {
      setEmail(route.params.email);
      navigation.setParams(undefined);
    }
  }, [route.params?.email, navigation]);

  const handleSubmitLogin = async () => {
    const data = await fetch(
      `http://${
        Platform.OS === 'android' ? '10.0.2.2:3000' : 'localhost:3000'
      }/sign-in`,
      {
        method: 'POST',
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        body: `emailFromFront=${email}&passwordFromFront=${password}`,
      },
    );

    const body = await data.json();
    if (body.result === true) {
      setToLocalStorage('user_token', body.token);
      setEmail('');
      setPassword('');
    } else {
      setSigninErrors(body.error);
    }
  };

  return (
    <View style={styles.screen}>
      <View style={styles.inputContainer}>
        <Text>Email : </Text>
        <TextInput
          value={email}
          placeholder="Email"
          {...getSelectorProps('email-input')}
          onChangeText={text => setEmail(text)}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text>Password : </Text>
        <TextInput
          value={password}
          placeholder="Password"
          {...getSelectorProps('password-input')}
          onChangeText={text => setPassword(text)}
        />
      </View>
      {signinErrors?.length > 0 && (
        <Text {...getSelectorProps('login-error')} style={styles.error}>
          {signinErrors[0]}
        </Text>
      )}
      <Button
        title="Login"
        {...getSelectorProps('login-button')}
        onPress={handleSubmitLogin}
      />

      <Pressable onPress={() => navigation.navigate('SignUp')}>
        <Text>I don't have an account yet</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputContainer: {flexDirection: 'row', alignItems: 'center'},
  error: {
    color: 'red',
  },
});

export default LoginScreen;
