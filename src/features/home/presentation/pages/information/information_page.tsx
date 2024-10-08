import React from 'react';
import {Text, TextInput, View} from 'react-native';

import InformationPageStyle from './information_page.styles';
import FloattingButtonComponent from '../../components/floating_button/floating_button_component';
import {useNavigation} from '@react-navigation/native';
import {StackTypes} from '../../../../../main';

const InformationPage: React.FC = () => {
  const navigation = useNavigation<StackTypes>();

  return (
    <View style={InformationPageStyle.container}>
      <Text style={InformationPageStyle.text}>Palavra:</Text>
      <View style={{height: 10}} />
      <TextInput
        placeholder="Insira uma palavra"
        placeholderTextColor={InformationPageStyle.input.color}
        style={InformationPageStyle.input}
      />
      <FloattingButtonComponent
        icon="save"
        onPress={() => {
          navigation.pop();
        }}
      />
    </View>
  );
};

export default InformationPage;
