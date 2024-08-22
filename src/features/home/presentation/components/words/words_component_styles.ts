import {StyleSheet} from 'react-native';

const WordsComponentStyle = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: {
    color: 'white',
    fontSize: 15,
  },
  hasItemText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 15,
  },
});

export default WordsComponentStyle;
