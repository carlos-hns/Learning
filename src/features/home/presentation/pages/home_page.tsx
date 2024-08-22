import React from 'react';
import {View} from 'react-native';

import HomePageStyle from './home_page.styles';

import SearchComponent from '../components/search/search_component';
import WordsComponent from '../components/words/words_component';
import WordEntity from '../../domain/entities/word';

const elements: WordEntity[] = [
  {
    id: 1,
    status: 'aprendido',
    word: 'Red',
    explanation: 'Red is a color',
    phrases: ['The car is red'],
  },
  {
    id: 2,
    status: 'revisar',
    word: 'Duck',
    explanation: 'Ducks are birds/waterfowls',
    phrases: [
      'The ducks started quacking loudly when we threw them some bread',
    ],
  },
];

const HomePage: React.FC = () => {
  return (
    <View style={HomePageStyle.container}>
      <SearchComponent />
      <View style={{height: 50}} />
      <WordsComponent words={elements} />
    </View>
  );
};

export default HomePage;
