import React from 'react';
import {Pressable, Text, View} from 'react-native';
import ChipComponentStyle from './chip_component_styles';

interface ChipComponentProps {
  isActive: boolean;
  text: string;
  onPress: Function;
}

const ChipComponent: React.FC<ChipComponentProps> = (
  props: ChipComponentProps,
) => {
  return (
    <Pressable onPress={event => props.onPress()}>
      <View
        style={{
          ...ChipComponentStyle.container,
          ...(props.isActive
            ? ChipComponentStyle.active
            : ChipComponentStyle.inactive),
        }}>
        <Text style={ChipComponentStyle.active}>{props.text}</Text>
      </View>
    </Pressable>
  );
};

export default ChipComponent;
