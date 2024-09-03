import React, {useCallback, useEffect, useState} from 'react';
import {View} from 'react-native';

import HomePageStyle from './home_page.styles';

import SearchComponent from '../components/search/search_component';
import WordsComponent from '../components/words/words_component';
import WordEntity from '../../domain/entities/word';
import StatusSelectorComponent from '../components/status_selector/status_selector_component';
import {getDBConnection} from '../controllers/home_page_controller';
import {
  IWordsDatasource,
  WordsDatasourceImpl,
} from '../../data/datasources/words_datasource';
import {SQLiteDatabase} from 'react-native-sqlite-storage';

const HomePage: React.FC = () => {
  const [status, setStatus] = useState<string>('todos');
  const [words, setWords] = useState<WordEntity[]>([]);

  const loadWords = useCallback(async (status: string) => {
    try {
      const db: SQLiteDatabase = await getDBConnection();
      const datasource: IWordsDatasource = new WordsDatasourceImpl(db);

      await datasource.init();

      console.log(status);

      if (status === 'todos') {
        setWords(await datasource.getWords());
        return;
      } else {
        const words: WordEntity[] = await datasource.getWords();
        let wordsFiltered: WordEntity[] = [];

        for (let i = 0; i < words.length; i++) {
          const word: WordEntity | undefined = words.at(i);

          if (word?.status === status) {
            wordsFiltered.push(word);
          }
        }

        setWords(wordsFiltered);
      }

      // await datasource.saveWord({
      //   id: 1,
      //   status: 'aprendido',
      //   word: 'Red',
      //   explanation: 'Red is a color',
      //   phrases: ['The car is red'],
      // });

      // await datasource.saveWord({
      //   id: 2,
      //   status: 'revisar',
      //   word: 'Duck',
      //   explanation: 'Ducks are birds/waterfowls',
      //   phrases: [
      //     'The ducks started quacking loudly when we threw them some bread',
      //   ],
      // });
    } catch (error) {
      console.error(error);
    }
  }, []);

  // useEffect(() => {
  //   loadWords(status);
  // }, [loadWords]);

  useEffect(() => {
    loadWords(status);
  }, [status]);

  return (
    <View style={HomePageStyle.container}>
      <SearchComponent />
      <View style={{height: 10}} />
      <StatusSelectorComponent onPress={status => setStatus(status)} />
      <View style={{height: 50}} />
      <WordsComponent words={words} />
    </View>
  );
};

export default HomePage;
