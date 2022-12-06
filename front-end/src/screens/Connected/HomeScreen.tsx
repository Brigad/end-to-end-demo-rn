import React from 'react';

import {Button, Text, View} from 'react-native';
import {deleteFromLocalStorage} from '../../libs/MMKVStorage';

const HomeScreen = () => {
  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Text>Welcome !</Text>
      <Button
        title="Disconnect"
        onPress={() => deleteFromLocalStorage('user_token')}
      />
    </View>
  );
};

export default HomeScreen;
