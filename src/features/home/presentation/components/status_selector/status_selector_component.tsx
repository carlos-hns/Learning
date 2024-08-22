import React, {useState} from 'react';
import {View} from 'react-native';
import ChipComponent from '../chip/chip_component';

const StatusSelectorComponent: React.FC = () => {
  const [ative, setActive] = useState<string>('revisar');

  return (
    <View
      style={{
        gap: 5,
        flexDirection: 'row',
      }}>
      <ChipComponent
        isActive={ative === 'aprendido'}
        text={'Aprendido'}
        onPress={() => setActive('aprendido')}
      />
      <ChipComponent
        isActive={ative === 'revisar'}
        text={'Revisão'}
        onPress={() => setActive('revisar')}
      />
      <ChipComponent
        isActive={ative === 'todos'}
        text={'Todos'}
        onPress={() => setActive('todos')}
      />
    </View>
  );
};

export default StatusSelectorComponent;
