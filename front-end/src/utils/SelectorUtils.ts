import {Platform} from 'react-native';

export const getSelectorProps = (label: string) => {
  if (Platform.OS === 'android') {
    return {
      accessibilityLabel: label,
      testID: label,
    };
  }
  return {
    testID: label,
  };
};
