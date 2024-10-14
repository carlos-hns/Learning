import React, {useCallback, useEffect, useState} from 'react';
import {View} from 'react-native';

import SearchComponent from '../../components/search/search_component';
import WordsComponent from '../../components/words/words_component';
import WordEntity from '../../../domain/entities/word';
import StatusSelectorComponent from '../../components/status_selector/status_selector_component';
import {getDBConnection} from '../../controllers/home_page_controller';
import {
  IWordsDatasource,
  WordsDatasourceImpl,
} from '../../../data/datasources/words_datasource';
import {SQLiteDatabase} from 'react-native-sqlite-storage';
import FloattingButtonComponent from '../../components/floating_button/floating_button_component';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {StackTypes} from '../../../../../main';
import HomePageStyle from './home_page.styles';

const HomePage: React.FC = () => {
  const navigation = useNavigation<StackTypes>();
  const [datasource, setDatasource] = useState<IWordsDatasource>();
  const [filteredText, setFilteredText] = useState<string>('');
  const [status, setStatus] = useState<string>('todos');
  const [words, setWords] = useState<WordEntity[]>([]);

  const loadWords = useCallback(
    async (status: string) => {
      try {
        const words: WordEntity[] = (await datasource?.getWords()) ?? [];
        let wordsFiltered: WordEntity[] = [];

        for (let i = 0; i < words.length; i++) {
          const word: WordEntity = words.at(i)!;

          const matchesFilter =
            filteredText === '' ||
            word.word.toLowerCase().includes(filteredText.toLowerCase());

          if ((status === 'todos' || word.status === status) && matchesFilter) {
            wordsFiltered.push(word);
          }
        }

        setWords(wordsFiltered);
      } catch (error) {
        console.error(error);
      }
    },
    [datasource, status, filteredText],
  );

  useEffect(() => {
    const prepareDatabase = async () => {
      const db: SQLiteDatabase = await getDBConnection();
      const datasource: IWordsDatasource = new WordsDatasourceImpl(db);
      await datasource?.init();
      setDatasource(datasource);
    };

    prepareDatabase();
  }, []);

  useEffect(() => {
    if (datasource) {
      loadWords(status);
    }
  }, [datasource, status, filteredText]);

  useFocusEffect(
    useCallback(() => {
      loadWords(status);
    }, [datasource, status]),
  );

  return (
    <View style={HomePageStyle.container}>
      <SearchComponent
        onChange={text => {
          setFilteredText(text);
        }}
      />
      <View style={{height: 10}} />
      <StatusSelectorComponent onPress={status => setStatus(status)} />
      <View style={{height: 50}} />
      <WordsComponent
        words={words}
        onTapItem={async word => {
          const updatedWord = {...word};

          updatedWord.status =
            updatedWord.status === 'revisar' ? 'aprendido' : 'revisar';

          await datasource?.updateWord(updatedWord);
          loadWords(status);
        }}
      />
      <FloattingButtonComponent
        onPress={() => {
          navigation.navigate('Info');
        }}
      />
    </View>
  );
};

export default HomePage;
