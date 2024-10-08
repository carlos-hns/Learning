import {StyleSheet} from 'react-native';

const FloatingButtonComponentStyle = StyleSheet.create({
  container: {
    zIndex: 10,
    position: 'absolute',
    bottom: 15,
    right: 15,
    height: 50,
    width: 50,
    borderRadius: 6,
    display: 'flex',
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#c7cedb',
  },
  icon: {
    color: 'grey',
  },
});

export default FloatingButtonComponentStyle;
