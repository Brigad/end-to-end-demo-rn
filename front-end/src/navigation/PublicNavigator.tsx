import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {Text} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useStringFromLocalStorage} from '../libs/MMKVStorage';
import HomeScreen from '../screens/Connected/HomeScreen';

import LoginScreen from '../screens/Public/LoginScreen';
import SignUpScreen from '../screens/Public/SignUpScreen';
import {getSelectorProps} from '../utils/SelectorUtils';
import {PublicNavigatorParams} from './types';

const NotVerifiedEmailNavigator = () => {
  const Stack = createStackNavigator<PublicNavigatorParams>();

  const [token] = useStringFromLocalStorage('user_token');

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={token ? 'Home' : 'Login'}>
        {token ? (
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{
              header: () => (
                <SafeAreaView {...getSelectorProps('home-header')}>
                  <Text>{'Home'}</Text>
                </SafeAreaView>
              ),
            }}
          />
        ) : (
          <>
            <Stack.Screen
              name="Login"
              component={LoginScreen}
              options={{
                header: () => (
                  <SafeAreaView {...getSelectorProps('login-header')}>
                    <Text>{'Login'}</Text>
                  </SafeAreaView>
                ),
              }}
            />
            <Stack.Screen name="SignUp" component={SignUpScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default NotVerifiedEmailNavigator;
