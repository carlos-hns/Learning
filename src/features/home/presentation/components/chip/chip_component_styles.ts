import {StyleSheet} from 'react-native';

const ChipComponentStyle = StyleSheet.create({
  container: {
    width: 'auto',
    borderWidth: 1,
    borderRadius: 5,
    padding: 5,
  },
  active: {
    color: 'white',
    borderColor: 'white',
  },
  inactive: {
    color: '#a0aab2',
    borderColor: '#a0aab2',
  },
});

export default ChipComponentStyle;
