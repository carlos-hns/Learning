import React from 'react';
import {View} from 'react-native';
import SearchComponent from '../components/search/search_component';
import HomePageStyle from './home_page.styles';

const HomePage: React.FC = () => {
  return (
    <View style={HomePageStyle.container}>
      <SearchComponent />
    </View>
  );
};

export default HomePage;
