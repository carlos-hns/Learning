import {enablePromise, openDatabase} from 'react-native-sqlite-storage';

enablePromise(true);

export const getDBConnection = async () => {
  return openDatabase({name: 'words.db', location: 'default'});
};
