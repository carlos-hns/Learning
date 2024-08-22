import React from 'react';
import {TextInput, View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import SearchComponentStyle from './search_component_styles';

const SearchComponent: React.FC = () => {
  return (
    <View style={SearchComponentStyle.container}>
      <Icon name="search" size={15} color={SearchComponentStyle.icons.color} />
      <TextInput
        maxLength={40}
        placeholderTextColor={SearchComponentStyle.input.color}
        style={SearchComponentStyle.input}
        placeholder="Procure por uma palavra"
      />
    </View>
  );
};

export default SearchComponent;
