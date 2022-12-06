import {MMKV, useMMKVString} from 'react-native-mmkv';

export const storage = new MMKV();

export type LocalStorage = Readonly<{
  user_token: string;
}>;

export const setToLocalStorage = <Key extends keyof LocalStorage>(
  key: Key,
  value: LocalStorage[Key],
) => {
  storage.set(key, value);
};

export const getStringFromLocalStorage = <Key extends keyof LocalStorage>(
  key: Key,
) => {
  return storage.getString(key);
};

export const deleteFromLocalStorage = <Key extends keyof LocalStorage>(
  key: Key,
) => {
  return storage.delete(key);
};

export const useStringFromLocalStorage = <Key extends keyof LocalStorage>(
  key: Key,
) => {
  const [value, setValue] = useMMKVString(key, storage);

  return [value, setValue] as [
    LocalStorage[Key] | undefined,
    (key: LocalStorage[Key]) => void,
  ];
};
