import React from 'react';
import {Pressable, View} from 'react-native';

import FloatingButtonComponentStyle from './floating_button_component_styles';
import Icon from 'react-native-vector-icons/FontAwesome';

interface FloatingButtonComponentProps {
  icon?: string | undefined;
  onPress: () => void;
}

const FloattingButtonComponent: React.FC<FloatingButtonComponentProps> = (
  props: FloatingButtonComponentProps,
) => {
  return (
    <Pressable
      onPress={() => props.onPress()}
      style={FloatingButtonComponentStyle.container}>
      <Icon
        name={props.icon ? props.icon : 'plus'}
        size={15}
        color={FloatingButtonComponentStyle.icon.color}
      />
    </Pressable>
  );
};

export default FloattingButtonComponent;
