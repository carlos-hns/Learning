import React, {useState} from 'react';
import {View} from 'react-native';
import ChipComponent from '../chip/chip_component';

interface StatusSelectorComponentProps {
  onPress: (status: string) => void;
}

const StatusSelectorComponent: React.FC<StatusSelectorComponentProps> = (
  props: StatusSelectorComponentProps,
) => {
  const [ative, setActive] = useState<string>('todos');

  return (
    <View
      style={{
        gap: 5,
        flexDirection: 'row',
      }}>
      <ChipComponent
        isActive={ative === 'todos'}
        text={'Todos'}
        onPress={() => {
          props.onPress('todos');
          setActive('todos');
        }}
      />
      <ChipComponent
        isActive={ative === 'aprendido'}
        text={'Aprendido'}
        onPress={() => {
          props.onPress('aprendido');
          setActive('aprendido');
        }}
      />
      <ChipComponent
        isActive={ative === 'revisar'}
        text={'Revisão'}
        onPress={() => {
          props.onPress('revisar');
          setActive('revisar');
        }}
      />
    </View>
  );
};

export default StatusSelectorComponent;
