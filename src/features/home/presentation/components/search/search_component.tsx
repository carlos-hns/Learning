import React from 'react';
import {TextInput, View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import SearchComponentStyle from './search_component_styles';

interface SearchComponentProps {
  onChange: (text: string) => void;
}

const SearchComponent: React.FC<SearchComponentProps> = (
  props: SearchComponentProps,
) => {
  return (
    <View style={SearchComponentStyle.container}>
      <Icon name="search" size={15} color={SearchComponentStyle.icons.color} />
      <TextInput
        maxLength={40}
        placeholderTextColor={SearchComponentStyle.input.color}
        style={SearchComponentStyle.input}
        placeholder="Procure por uma palavra"
        onChangeText={text => props.onChange(text)}
      />
    </View>
  );
};

export default SearchComponent;
