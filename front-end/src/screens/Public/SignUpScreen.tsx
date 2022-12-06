import React, {useState} from 'react';
import type {FunctionComponent} from 'react';

import type {NavigationProp} from '@react-navigation/native';
import {
  Button,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import {PublicNavigatorParams} from '../../navigation/types';

type SignUpScreenProps = {
  navigation: NavigationProp<PublicNavigatorParams, 'SignUp'>;
};

const SignUpScreen: FunctionComponent<SignUpScreenProps> = ({navigation}) => {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [signupErrors, setSignupErrors] = useState([]);

  const handleSubmitSignup = async () => {
    const data = await fetch('http://localhost:3000/sign-up', {
      method: 'POST',
      headers: {'Content-Type': 'application/x-www-form-urlencoded'},
      body: `usernameFromFront=${userName}&emailFromFront=${email}&passwordFromFront=${password}`,
    });

    const body = await data.json();

    if (body.result === true) {
      navigation.navigate('Login', {email});
      setUserName('');
      setEmail('');
      setPassword('');
    } else {
      setSignupErrors(body.error);
    }
  };

  return (
    <View style={styles.screen}>
      <View style={styles.inputContainer}>
        <Text>Username : </Text>
        <TextInput
          value={userName}
          placeholder="User name"
          onChangeText={text => setUserName(text)}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text>Email : </Text>
        <TextInput
          value={email}
          placeholder="Email"
          onChangeText={text => setEmail(text)}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text>Password : </Text>
        <TextInput
          value={password}
          placeholder="Password"
          onChangeText={text => setPassword(text)}
        />
      </View>
      {signupErrors?.length > 0 && (
        <View>
          {signupErrors.map((error, index) => (
            <Text style={styles.error} key={index}>
              {error}
            </Text>
          ))}
        </View>
      )}
      <Button title="Sign-up" onPress={handleSubmitSignup} />
      <Pressable onPress={() => navigation.navigate('Login')}>
        <Text>I already have an account</Text>
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

export default SignUpScreen;
