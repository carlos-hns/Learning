import {StyleSheet} from 'react-native';

const WordComponentStyle = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',

    backgroundColor: '#7e9181',
    borderRadius: 12,

    gap: 10,
    paddingLeft: 15,
    paddingRight: 10,
    height: 45,
  },
  borderLearned: {
    borderColor: '#a0aab2',
    borderWidth: 2,
  },
  borderRevision: {
    borderColor: 'white',
    borderWidth: 2,
  },
  borderNoStatus: {},
});

export default WordComponentStyle;
